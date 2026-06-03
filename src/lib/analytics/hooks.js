"use client";

/**
 * Opt-in React hooks for interactive elements whose events the global DOM
 * trackers cannot infer on their own (a calculator "compute", a video reaching
 * 100%, a successful form POST, etc.).
 *
 * They are intentionally tiny wrappers over the trackers in ./index so that
 * adding tracking to a new modal/calculator/video is a one-liner and naming
 * stays governed by the EVENTS/PARAMS constants.
 */
import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  trackFormView,
  trackFormStart,
  trackFormFieldInteraction,
  trackFormSubmit,
  trackFormSuccess,
  trackFormError,
  trackFormAbandon,
  trackSectionView,
  trackVideoPlay,
  trackVideoComplete,
  trackCalculatorUse,
  trackModalOpen,
  trackTabInteraction,
  trackAccordionOpen,
  trackSearch,
} from "./index";

/**
 * Full form-funnel helper. Returns memoised handlers + a ref. Spread the
 * handlers onto a <form>; the ref's first focus fires form_start once, submit
 * fires form_submit, and call success()/error() from your async result.
 *
 * @param {string} formName
 * @param {{ formType?: string }} [opts]
 */
export function useFormTracking(formName, { formType } = {}) {
  const started = useRef(false);
  const viewed = useRef(false);
  const submitted = useRef(false);
  const ref = useRef(null);

  // form_view once, when the form mounts/scrolls in.
  useEffect(() => {
    const node = ref.current;
    if (!node || viewed.current || typeof IntersectionObserver === "undefined") {
      if (!viewed.current) {
        viewed.current = true;
        trackFormView(formName, { formType });
      }
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !viewed.current) {
          viewed.current = true;
          trackFormView(formName, { formType });
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [formName, formType]);

  // form_abandonment if started but never submitted.
  useEffect(() => {
    const onLeave = () => {
      if (started.current && !submitted.current) {
        trackFormAbandon(formName, { form_type: formType });
      }
    };
    window.addEventListener("pagehide", onLeave);
    return () => {
      window.removeEventListener("pagehide", onLeave);
      onLeave();
    };
  }, [formName, formType]);

  const onFocus = useCallback(() => {
    if (!started.current) {
      started.current = true;
      trackFormStart(formName, { form_type: formType });
    }
  }, [formName, formType]);

  const onFieldBlur = useCallback(
    (fieldName) => trackFormFieldInteraction(formName, fieldName),
    [formName]
  );

  const onSubmit = useCallback(() => {
    trackFormSubmit(formName, { form_type: formType });
  }, [formName, formType]);

  const success = useCallback(
    (extra = {}) => {
      submitted.current = true;
      trackFormSuccess(formName, { form_type: formType, ...extra });
    },
    [formName, formType]
  );

  const error = useCallback(
    (message, extra = {}) => {
      trackFormError(formName, { form_type: formType, message, ...extra });
    },
    [formName, formType]
  );

  return useMemo(
    () => ({ ref, onFocus, onFieldBlur, onSubmit, success, error }),
    [onFocus, onFieldBlur, onSubmit, success, error]
  );
}

/**
 * Fire section_view once when a section scrolls into view. Returns a ref to
 * attach to the section element.
 * @param {string} sectionName
 */
export function useSectionView(sectionName, { threshold = 0.5 } = {}) {
  const ref = useRef(null);
  const seen = useRef(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !seen.current) {
          seen.current = true;
          trackSectionView(sectionName);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [sectionName, threshold]);
  return ref;
}

/**
 * Video tracking: returns handlers for onPlay / onTimeUpdate / onEnded.
 * @param {string} title
 */
export function useVideoTracking(title) {
  const played = useRef(false);
  const completed = useRef(false);
  return useMemo(
    () => ({
      onPlay: () => {
        if (!played.current) {
          played.current = true;
          trackVideoPlay(title);
        }
      },
      onTimeUpdate: (e) => {
        const el = e?.currentTarget || e?.target;
        if (!el || completed.current || !el.duration) return;
        if (el.currentTime / el.duration >= 0.95) {
          completed.current = true;
          trackVideoComplete(title, { video_percent: 100 });
        }
      },
      onEnded: () => {
        if (!completed.current) {
          completed.current = true;
          trackVideoComplete(title, { video_percent: 100 });
        }
      },
    }),
    [title]
  );
}

/**
 * Calculator usage. Returns a `track(action, extra)` fn — call it on compute /
 * input change / result, debounced by the caller as appropriate.
 * @param {string} calculatorName
 */
export function useCalculatorTracking(calculatorName) {
  return useCallback(
    (action = "compute", extra = {}) => trackCalculatorUse(calculatorName, { action, ...extra }),
    [calculatorName]
  );
}

/**
 * Modal/popup tracking. Pass the open boolean; fires modal_open (as cta-style
 * event) on each false→true transition.
 * @param {string} modalName
 * @param {boolean} isOpen
 */
export function useModalTracking(modalName, isOpen) {
  const prev = useRef(false);
  useEffect(() => {
    if (isOpen && !prev.current) trackModalOpen(modalName);
    prev.current = isOpen;
  }, [modalName, isOpen]);
}

/** Returns a `track(tabName)` fn for tab switches. */
export function useTabTracking(group) {
  return useCallback((tabName) => trackTabInteraction(tabName, { tab_group: group }), [group]);
}

/** Returns a `track(label)` fn for accordion opens. */
export function useAccordionTracking(group) {
  return useCallback(
    (label, isOpen = true) => {
      if (isOpen) trackAccordionOpen(label, { accordion_group: group });
    },
    [group]
  );
}

/** Returns a debounced `track(term, results)` fn for search inputs. */
export function useSearchTracking(searchName, { debounceMs = 800 } = {}) {
  const timer = useRef(null);
  useEffect(() => () => timer.current && clearTimeout(timer.current), []);
  return useCallback(
    (term, results) => {
      if (!term) return;
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(
        () => trackSearch(term, { results, search_name: searchName }),
        debounceMs
      );
    },
    [searchName, debounceMs]
  );
}

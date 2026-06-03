# NimbleS2P — Website-Wide Analytics Architecture

A centralized, **zero-per-page** GA4 tracking layer. Add a new page, button,
form, calculator, modal, or download link anywhere in the app and it is tracked
automatically — no analytics code required on the new element.

- **Transport:** events → GTM dataLayer (container `GTM-T8WFVVR6`) → GA4 (`G-1Y9ZVS01GG`)
- **Mount point:** `<AnalyticsProvider/>` in `app/layout.jsx` (one line, site-wide)
- **Governance:** every event/param name lives in `src/lib/analytics/events.js`

---

## 1. Architecture diagram

```
                       ┌─────────────────────────────────────────────┐
                       │  app/layout.jsx  (root, every route)         │
                       │    <GoogleTagManager gtmId="GTM-T8WFVVR6"/>   │
                       │    <AnalyticsProvider/>   ← mount once        │
                       └───────────────────┬─────────────────────────┘
                                           │ composes (each isolated)
        ┌──────────────┬──────────────┬────┴─────────┬──────────────┬─────────────┐
        ▼              ▼              ▼              ▼              ▼             ▼
  useAutoPageViews  useGlobalClick  useGlobalForm  useScrollDepth  useTimeOnPage useWebVitals
   (route changes)  (delegated body  (delegated doc  (rAF scroll)   (visible      (next/
        │            click → CTA/     focusin/submit  │              time)         web-vitals)
        │            link/download)   /view/abandon)  │              │             │
        └──────────────┴──────────────┴──────────────┴──────────────┴─────────────┘
                                           │
                       Opt-in hooks (src/lib/analytics/hooks.js) for things
                       the DOM can't infer: useFormTracking, useVideoTracking,
                       useCalculatorTracking, useModalTracking, useSectionView,
                       useTabTracking, useAccordionTracking, useSearchTracking
                                           │
                                           ▼
                       ┌─────────────────────────────────────────────┐
                       │  src/lib/analytics/index.js  (track* helpers) │
                       └───────────────────┬─────────────────────────┘
                                           ▼
                       ┌─────────────────────────────────────────────┐
                       │  core.emit(event, params)                    │
                       │   • attaches page_path / page_title / _loc   │
                       │   • drops empty params, de-dupes (600ms)     │
                       │   • try/catch — never throws into the UI     │
                       │   • records to ring buffer (audit/debug)     │
                       └───────────────────┬─────────────────────────┘
                                           ▼
                          sendGTMEvent() → window.dataLayer
                                           ▼
                        GTM (GTM-T8WFVVR6)  →  GA4 (G-1Y9ZVS01GG)
                                           ▲
                       /analytics-audit ───┘ reads ring buffer (live QA)
```

---

## 2. Event catalogue

| Event | When it fires | Fired by |
|---|---|---|
| `page_view` | Initial load + every client-side route change | auto |
| `cta_click` | Any `<a>` / `<button>` / `[role=button]` click | auto |
| `file_download` | Click on a link with a download ext or `download` attr | auto |
| `form_view` | A `<form>` scrolls into view | auto |
| `form_start` | First focus inside a form | auto |
| `form_field_interaction` | First blur of each field | auto |
| `form_submit` | Native form submit | auto |
| `form_success` | Successful submit result | explicit (`trackLead`/`trackFormSuccess`) |
| `form_error` | Failed submit result | explicit (`trackFormError`) |
| `form_abandonment` | Started, not submitted, then route change/unload | auto |
| `scroll_depth` | 25 / 50 / 75 / 90 / 100 % reached | auto |
| `time_on_page` | Engaged (visible) time, flushed on leave | auto |
| `web_vitals` | LCP, CLS, INP, FCP, TTFB (+FID) | auto |
| `section_view` | A tracked section scrolls in | opt-in `useSectionView` |
| `video_play` / `video_complete` | Video start / ≥95 % watched | opt-in `useVideoTracking` |
| `calculator_use` | Calculator compute/interaction | opt-in `useCalculatorTracking` |
| `modal_open` | Modal/popup opens | opt-in `useModalTracking` |
| `tab_interaction` | Tab switch | opt-in `useTabTracking` |
| `accordion_open` | Accordion expands | opt-in `useAccordionTracking` |
| `search_performed` | Search query (debounced) | opt-in `useSearchTracking` |
| `chat_interaction` | Chat open/message | opt-in `trackChatInteraction` |
| `website_lead` | Lead conversion (key event) | explicit `trackLead` (legacy, kept) |
| `resource_download_click` | Gated/resource CTA click | explicit (legacy, kept) |
| `webinar_register_click` | Webinar CTA click | explicit (legacy, kept) |

## 3. Standard parameters

Every event automatically gets: `page_path`, `page_location`, `page_title`,
`event_timestamp`. Event-specific params (all snake_case, defined in
`events.js` → `PARAMS`):

`cta_text`, `cta_location`, `cta_destination`, `link_url`, `link_domain`,
`link_type` (internal|external|email|phone|whatsapp|download), `file_name`,
`file_extension`, `file_url`, `resource_slug`, `form_name`, `form_type`,
`form_status`, `field_name`, `error_message`, `percent_scrolled`,
`engagement_time_msec`, `section_name`, `video_title`, `video_percent`,
`calculator_name`, `calculator_action`, `modal_name`, `tab_name`,
`accordion_label`, `search_term`, `search_results`, `chat_action`,
`metric_name`, `metric_value`, `metric_rating`.

---

## 4. How to use it (developer guide)

### New page / button / link / form / download — do nothing
Page views, CTA clicks, link/download classification, the form funnel, scroll
depth, time-on-page and web vitals are all automatic.

### Override the auto-derived label/location (optional)
```jsx
<button data-analytics-id="Start free trial" data-analytics-location="pricing_hero">…</button>
<section data-analytics-location="footer_cta">…</section>
```

### Opt an element/subtree OUT
```jsx
<div data-no-track> … not tracked … </div>
```

### Name a form cleanly
```jsx
<form data-analytics-form="newsletter" data-analytics-form-type="newsletter"> … </form>
```

### Report success / error (the only thing the DOM can't see)
```jsx
import { trackFormSuccess, trackFormError } from "@/lib/analytics";
try   { await submit(); trackFormSuccess("newsletter"); }
catch (e) { trackFormError("newsletter", { message: e.message }); }
```
`trackLead(formName, extra)` already emits both `website_lead` (key event) and
`form_success`, so the three lead forms need no extra wiring.

### Interactive widgets (opt-in hooks)
```jsx
import { useVideoTracking, useCalculatorTracking, useModalTracking,
         useSectionView, useTabTracking, useAccordionTracking,
         useSearchTracking } from "@/lib/analytics/hooks";

const v = useVideoTracking("hero_demo");      <video {...v}/>
const calc = useCalculatorTracking("roi");    calc("compute", { savings });
useModalTracking("demo_popup", isOpen);
const ref = useSectionView("pricing_table");  <section ref={ref}/>
```

---

## 5. Files created / modified

**Created**
- `src/lib/analytics/events.js` — event + param name governance
- `src/lib/analytics/core.js` — `emit()`, page context, de-dupe, ring buffer, GTM check
- `src/lib/analytics/index.js` — public `track*` API (+ backward-compat exports)
- `src/lib/analytics/hooks.js` — opt-in React hooks
- `src/components/analytics/AnalyticsProvider.jsx` — orchestrator (mount once)
- `src/components/analytics/autoPageViews.js`
- `src/components/analytics/globalClicks.js`
- `src/components/analytics/globalForms.js`
- `src/components/analytics/scrollDepth.js`
- `src/components/analytics/timeEngagement.js`
- `src/components/analytics/webVitals.js`
- `src/components/analytics/AnalyticsAudit.jsx` — QA dashboard
- `app/analytics-audit/page.jsx` — QA route (noindex)
- `docs/ANALYTICS.md` — this file

**Modified**
- `app/layout.jsx` — mounted `<AnalyticsProvider/>`
- `src/lib/analytics.js` — replaced by the `src/lib/analytics/` directory module (all existing `@/lib/analytics` imports keep working)
- `src/components/GetStartedPage.jsx`, `BookDemoPage.jsx`, `GatedDownloadForm.jsx`, `shared/GatedLeadDownloadForm.jsx` — `form_error` wired, form tagged with `data-analytics-form*`, redundant inline `form_start` removed (global tracker owns it)

---

## 6. One-time GTM setup (makes ALL future events flow to GA4)

The app pushes events to the dataLayer; GTM forwards them to GA4. To avoid
adding a tag per event name, create **one catch-all GA4 Event tag**:

1. **GA4 Configuration tag** → set "Send a page view event when this
   configuration loads" to **OFF** (the app fires `page_view` itself for both
   initial load and SPA route changes — leaving it on double-counts).
2. **Trigger:** *All Custom Events* (Event name matches RegEx `.*`).
3. **Tag:** GA4 Event → Event Name = `{{Event}}`, and under *Event Parameters*
   add a row per param (or use the "send all dataLayer variables" pattern):
   create Data Layer Variables for the params in §3 and forward them.
4. **GA4 Admin → Custom definitions:** register the params you want to slice by
   (`form_name`, `cta_location`, `cta_text`, `link_type`, `resource_slug`,
   `metric_name`, …) as event-scoped custom dimensions.

After this, any new event name from `events.js` reaches GA4 with no further GTM
work.

---

## 7. Verify in GA4 DebugView

1. **Enable debug:** open any page with `?analytics_debug=1` (logs every event to
   the console), or install the *Google Analytics Debugger* / *Tag Assistant*
   extension to stream into GA4 **Admin → DebugView**.
2. Visit `/analytics-audit` — the dashboard shows GTM health, per-event counts,
   a live feed, and a sandbox (button / external link / download / form) to
   trigger each auto-tracker on demand.
3. In **GA4 → Admin → DebugView**, confirm events appear in real time:
   - load a page → `page_view`
   - navigate to another route → second `page_view` (route change)
   - click any button/link → `cta_click` (or `file_download`)
   - focus + submit a form → `form_start` → `form_submit` → `form_success`
   - scroll down → `scroll_depth` (25/50/75/90/100)
   - `web_vitals` arrive as metrics settle (LCP/CLS/INP/FCP/TTFB)
4. Click any event in DebugView to confirm parameters (`cta_text`,
   `cta_location`, `form_name`, etc.) are populated.

**QA checklist** (also automated on `/analytics-audit`): GA4 loaded ✓, page
views firing ✓, route changes firing ✓, CTA tracking ✓, form tracking ✓,
scroll tracking ✓, web vitals ✓ — and because tracking is global, **no page can
be "missing" instrumentation**.

# Gated guide downloads (2 PDFs)

Use this workflow when you upload **guides** that require an email before the file downloads to the visitor’s machine.

## 1. Update the WordPress plugin

1. Copy or zip `wordpress-plugin/nimbles-mega-menu/` into `wp-content/plugins/nimbles-mega-menu/`
2. In **Plugins**, activate or re-activate **NimbleS2P Mega Menu Resources** (v1.1.0+)

## 2. Upload both PDFs

1. **Media → Add New** — upload each guide PDF
2. Open each file in the library and **Copy URL** (e.g. `https://nimbles2p.com/wp-content/uploads/2025/05/guide-name.pdf`)

## 3. Create two posts (one per guide)

For each guide:

| Step | Action |
|------|--------|
| Title | Guide name (shown on the gated landing page) |
| Excerpt | Short pitch — shown under the title (not the full PDF text) |
| Featured image | Optional cover thumbnail |
| Category / tags | As usual for Resources |
| **Gated Guide Download** sidebar | Check **Gated resource** |
| **PDF download URL** | Paste the Media Library URL |
| **Download filename** | Optional, e.g. `vdd-onboarding-mistakes.pdf` |

Publish both posts. Note each post **slug** (e.g. `7-onboarding-mistakes`) — the live URL is:

`https://nimbles2p.com/resources/{slug}`

## 4. What visitors see

- The **full article HTML is not shown** for gated posts
- They see title, excerpt, cover, and an email form
- After submitting a valid email:
  - A lead is sent to **Web3Forms** (same inbox as Get Started unless you set a separate key)
  - The PDF opens/downloads in the browser
  - **Download again** is available in the same session (stored in `sessionStorage`)

## 5. Verify REST meta

```bash
curl -s "https://nimbles2p.com/wp-json/wp/v2/posts?slug=YOUR-SLUG" | jq '.[0].meta'
```

Expect:

```json
{
  "nimbles_gated_resource": true,
  "nimbles_download_url": "https://nimbles2p.com/wp-content/uploads/.../guide.pdf",
  "nimbles_download_filename": "guide.pdf"
}
```

## 6. Environment (Next.js)

Optional dedicated Web3Forms form for gated downloads:

```env
NEXT_PUBLIC_WEB3FORMS_GATED_ACCESS_KEY=your_key_here
```

If omitted, gated leads use `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (Get Started form).

## 7. Link from product pages (optional)

Product-page lead magnets can link to the gated resource URL, e.g. `/resources/7-onboarding-mistakes`, instead of the inline fake form.

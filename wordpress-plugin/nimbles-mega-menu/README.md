# NimbleS2P Mega Menu — WordPress fields

Install this plugin on **nimbles2p.com** so the Next.js site can read featured resources for each product in the **Products** mega menu.

## Install

1. Zip the `nimbles-mega-menu` folder or copy it to `wp-content/plugins/nimbles-mega-menu/`
2. In WP Admin → **Plugins**, activate **NimbleS2P Mega Menu Resources**

## Edit a post

In the post editor sidebar, open **Mega Menu — Featured Resource**:

| Field | Purpose |
|--------|---------|
| **Show as featured resource in Products mega menu** | Checkbox — enable for this post |
| **Product module** | Which product row uses this post (VDD, Supplier Portal, Invoice, RFx, Early Financing, Supplier Analytics) |

Rules:

- Only check the box when this post should appear in the mega menu.
- Pick exactly **one module** per featured post.
- If multiple posts are featured for the same module, the **newest** post is used.

## REST API

After activation, each post exposes:

```json
"meta": {
  "nimbles_mega_menu_featured": true,
  "nimbles_mega_menu_module": "vdd"
}
```

Verify: `https://nimbles2p.com/wp-json/wp/v2/posts?per_page=1`

## Module ids (must match exactly)

| Value | Product |
|--------|---------|
| `vdd` | Supplier Due Diligence |
| `supplier` | Supplier Portal |
| `invoice` | Invoice Processing |
| `rfq` | RFx Management |
| `finance` | Early Financing |
| `analytics` | Supplier Analytics |

If meta is missing, the site falls back to the static copy in `megaMenuData.js`.

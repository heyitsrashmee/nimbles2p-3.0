import test from "node:test";
import assert from "node:assert/strict";

import {
  buildResourcesIndex,
  extractOgImageUrl,
  mapWpcomPostToArticle,
  mapWpcomPostToResourceCard,
  resolveWpcomPostsEndpoint,
} from "./service";

function makePost(overrides: Record<string, unknown> = {}) {
  return {
    id: 101,
    slug: "latest-post",
    date: "2025-02-26T23:28:11",
    title: { rendered: "9 Ways to Transform Invoice Management for&nbsp;Enterprises" },
    excerpt: { rendered: "<p>Lead smarter procurement with practical guidance.</p>", protected: false },
    content: {
      rendered:
        "<p>Full article body.</p><h2>Section</h2><p>More detail for procurement and supplier teams.</p>",
      protected: false,
    },
    featured_media: 999,
    jetpack_featured_media_url: "",
    _embedded: {
      author: [{ name: "NimbleS2P Research Team" }],
      "wp:featuredmedia": [
        {
          source_url: "https://i0.wp.com/resourcesnimbles2p.wordpress.com/wp-content/uploads/2025/02/hero.png",
          alt_text: "Invoice transformation cover",
          media_details: {
            sizes: {
              medium_large: {
                source_url:
                  "https://i0.wp.com/resourcesnimbles2p.wordpress.com/wp-content/uploads/2025/02/hero-medium.png",
              },
            },
          },
        },
      ],
      "wp:term": [
        [{ taxonomy: "category", slug: "blogs", name: "Blogs" }],
        [
          { taxonomy: "post_tag", slug: "featured", name: "featured" },
          { taxonomy: "post_tag", slug: "nimbles2p", name: "nimbles2p" },
        ],
      ],
    },
    ...overrides,
  };
}

test("buildResourcesIndex promotes the featured-tagged post and excludes it from the grid", () => {
  const latest = makePost({
    id: 1,
    slug: "latest-post",
    _embedded: {
      author: [{ name: "Editorial Team" }],
      "wp:featuredmedia": [],
      "wp:term": [[{ taxonomy: "category", slug: "blogs", name: "Blogs" }], []],
    },
  });
  const featured = makePost({
    id: 2,
    slug: "featured-post",
  });

  const result = buildResourcesIndex([latest, featured]);

  assert.equal(result.featuredPost?.slug, "/resources/featured-post");
  assert.deepEqual(
    result.posts.map((post) => post.slug),
    ["/resources/latest-post"],
  );
});

test("mapWpcomPostToResourceCard normalizes title, excerpt, category, date, and image", () => {
  const post = makePost();

  const result = mapWpcomPostToResourceCard(post);

  assert.equal(result.title, "9 Ways to Transform Invoice Management for Enterprises");
  assert.equal(result.excerpt, "Lead smarter procurement with practical guidance.");
  assert.equal(result.category, "Blog");
  assert.equal(result.slug, "/resources/latest-post");
  assert.equal(result.author, "NimbleS2P Research Team");
  assert.equal(
    result.coverImage,
    "https://i0.wp.com/resourcesnimbles2p.wordpress.com/wp-content/uploads/2025/02/hero-medium.png",
  );
  assert.equal(result.coverAlt, "Invoice transformation cover");
  assert.match(result.date, /2025/);
});

test("mapWpcomPostToArticle preserves full HTML content and tag metadata", () => {
  const post = makePost();

  const result = mapWpcomPostToArticle(post);

  assert.equal(result.slug, "latest-post");
  assert.equal(result.title, "9 Ways to Transform Invoice Management for Enterprises");
  assert.equal(result.author.name, "NimbleS2P Research Team");
  assert.deepEqual(result.tags, ["featured", "nimbles2p"]);
  assert.deepEqual(result.content, [
    {
      type: "html",
      html: "<p>Full article body.</p><h2>Section</h2><p>More detail for procurement and supplier teams.</p>",
    },
  ]);
});

test("mapWpcomPostToResourceCard repairs WordPress punctuation artifacts in card copy", () => {
  const post = makePost({
    title: { rendered: "The Shift from Traditional AP Tools ?" },
    excerpt: {
      rendered:
        "<p>Invoice management is all about keeping track of invoices?from creating and sending them. It?s a key part of a business?s finances.</p>",
      protected: false,
    },
    content: {
      rendered:
        "<p>Invoice management is all about keeping track of invoices?from creating and sending them. It?s a key part of a business?s finances.</p>",
      protected: false,
    },
  });

  const result = mapWpcomPostToResourceCard(post);

  assert.equal(result.title, "The Shift from Traditional AP Tools?");
  assert.match(result.excerpt, /invoices - from creating and sending them\./);
  assert.match(result.excerpt, /It's a key part of a business's finances\./);
});

test("mapWpcomPostToArticle repairs punctuation artifacts inside HTML content", () => {
  const post = makePost({
    content: {
      rendered:
        "<h2>The Shift from Traditional AP Tools ?</h2><p>It?s about invoices?from start to finish.</p>",
      protected: false,
    },
  });

  const result = mapWpcomPostToArticle(post);

  assert.equal(
    result.content[0]?.html,
    "<h2>The Shift from Traditional AP Tools?</h2><p>It's about invoices - from start to finish.</p>",
  );
});

test("extractOgImageUrl reads the public page og:image", () => {
  const html = `
    <html>
      <head>
        <meta property="og:title" content="Example" />
        <meta property="og:image" content="https://cdn.example.com/cover.jpg" />
      </head>
    </html>
  `;

  assert.equal(extractOgImageUrl(html), "https://cdn.example.com/cover.jpg");
});

test("resolveWpcomPostsEndpoint accepts the exact posts endpoint", () => {
  assert.equal(
    resolveWpcomPostsEndpoint(
      "https://public-api.wordpress.com/wp/v2/sites/resourcesnimbles2p.wordpress.com/posts",
    ),
    "https://public-api.wordpress.com/wp/v2/sites/resourcesnimbles2p.wordpress.com/posts",
  );
});

test("resolveWpcomPostsEndpoint still supports the older site-base format", () => {
  assert.equal(
    resolveWpcomPostsEndpoint("https://public-api.wordpress.com/wp/v2/sites/resourcesnimbles2p.wordpress.com"),
    "https://public-api.wordpress.com/wp/v2/sites/resourcesnimbles2p.wordpress.com/posts",
  );
});

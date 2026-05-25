export interface WpRenderedField {
  rendered?: string;
  protected?: boolean;
}

export interface WpMediaSize {
  source_url?: string;
}

export interface WpFeaturedMedia {
  source_url?: string;
  alt_text?: string;
  media_details?: {
    sizes?: Record<string, WpMediaSize>;
  };
}

export interface WpAuthor {
  name?: string;
}

export interface WpTerm {
  taxonomy?: string;
  slug?: string;
  name?: string;
}

export interface WpEmbeddedData {
  author?: WpAuthor[];
  "wp:featuredmedia"?: WpFeaturedMedia[];
  "wp:term"?: WpTerm[][];
}

export interface WpcomPost {
  id: number;
  slug: string;
  date: string;
  link?: string;
  title?: WpRenderedField;
  excerpt?: WpRenderedField;
  content?: WpRenderedField;
  featured_media?: number;
  jetpack_featured_media_url?: string;
  _embedded?: WpEmbeddedData;
}

export interface ResourceCardData {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  slug: string;
  coverImage: string;
  coverAlt: string;
  author: string;
  gated: boolean;
  downloadUrl: string;
  downloadFilename: string;
}

export interface ResourceRelatedPost {
  slug: string;
  title: string;
  readTime: string;
  category: string;
}

export interface ResourceArticleData {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  publishedAtDisplay: string;
  author: {
    name: string;
    title: string;
    initials: string;
  };
  tags: string[];
  coverImage: string;
  coverAlt: string;
  content: Array<{ type: "html"; html: string }>;
  relatedPosts: ResourceRelatedPost[];
  gated: boolean;
  downloadUrl: string;
  downloadFilename: string;
}

export interface ResourcesIndexData {
  featuredPost: ResourceCardData | null;
  posts: ResourceCardData[];
}

export type ResourcesIndexResult =
  | ({ status: "success" } & ResourcesIndexData)
  | ({ status: "empty" } & ResourcesIndexData)
  | ({ status: "error"; errorMessage: string } & ResourcesIndexData);

export type ResourceArticleResult =
  | { status: "success"; article: ResourceArticleData }
  | { status: "not_found" }
  | { status: "error"; errorMessage: string };

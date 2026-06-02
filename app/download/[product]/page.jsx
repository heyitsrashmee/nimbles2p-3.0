import { notFound } from "next/navigation";
import ProductGatedDownloadClient from "@/components/ProductGatedDownloadClient";
import {
  getProductGatedResourcePageData,
  isValidProductGatedKey,
} from "@/lib/gatedResourceConfig";

export function generateStaticParams() {
  return [{ product: "vdd" }, { product: "supplier" }];
}

export async function generateMetadata({ params }) {
  const { product } = await params;
  const post = getProductGatedResourcePageData(product);
  if (!post) return { title: "Download | NimbleS2P" };

  return {
    title: `${post.title} | NimbleS2P`,
    description: post.excerpt,
    robots: { index: false, follow: true },
  };
}

export default async function ProductDownloadPage({ params }) {
  const { product } = await params;
  if (!isValidProductGatedKey(product)) notFound();

  const post = getProductGatedResourcePageData(product);
  if (!post) notFound();

  return <ProductGatedDownloadClient post={post} />;
}

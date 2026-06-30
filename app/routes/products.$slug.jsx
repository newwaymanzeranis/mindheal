import { Link, useLoaderData } from "react-router";

import PageTitle from "~/components/PageTitle";
import ProductAddToCart from "~/components/ProductAddToCart";
import ProductEmotionalTags from "~/components/ProductEmotionalTags";
import ProductPrice from "~/components/ProductPrice";
import { fetchProductBySlug } from "~/lib/fetchApi.server";
import { bottleImageSrc, imageSrc, productMindHealLabel } from "~/utils/format";

import cartCss from "~/styles/cart.css?url";

export const links = () => [{ rel: "stylesheet", href: cartCss }];

export async function loader({ params, request }) {
  const product = await fetchProductBySlug(params.slug, { request });
  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }
  return { product };
}

export default function ProductDetail() {
  const { product } = useLoaderData();
  const showHealingNote =
    product.description &&
    product.description.trim() !== (product.shortDescription || "").trim();

  return (
    <main className="main">
      <PageTitle
        title={product.name}
        description={
          product.shortDescription || product.description || product.name
        }
        current="Products"
        backgroundImage="/assets/img/page-title-bg.jpg"
      />

      <section className="section">
        <div className="container">
          <div className="row gy-4 align-items-start">
            <div className="col-lg-5 product-detail-img-col">
              <img
                src={imageSrc(product.image)}
                alt={product.name}
                className="img-fluid rounded product-detail-scene"
              />
              <img
                src={bottleImageSrc(product)}
                alt={`${product.name} bottle`}
                className="product-detail-bottle position-absolute start-0"
              />
            </div>
            <div className="col-lg-7">
              <p className="text-success fw-bold mb-2">
                {productMindHealLabel(product.mindHealNo, product.sortOrder)}
              </p>
              <h1 className="mb-3">{product.name}</h1>
              {product.shortDescription && (
                <p className="lead product-short-lead">{product.shortDescription}</p>
              )}
              <ProductPrice product={product} size="lg" />
              <ProductEmotionalTags
                emotionalTags={product.emotionalTags}
                className="mt-3"
              />
              <ProductAddToCart product={product} />
              <div className="mt-2">
                <Link to="/contact" className="btn btn-link text-success p-0">
                  {/* Need help ordering? Contact us → */}
                  Need help finding the right remedy? Talk to us →
                </Link>
              </div>
              {showHealingNote && (
                <div className="product-healing-note mt-4 pt-4 border-top">
                  <h2 className="h5 mb-3">Healing Note</h2>
                  <p className="lead product-healing-lead mb-0">{product.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

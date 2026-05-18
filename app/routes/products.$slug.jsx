import { Link, useLoaderData } from "react-router";

import PageTitle from "~/components/PageTitle";
import ProductAddToCart from "~/components/ProductAddToCart";
import ProductPrice from "~/components/ProductPrice";
import { fetchProductBySlug } from "~/lib/fetchApi.server";
import { imageSrc, productMindHealLabel } from "~/utils/format";

import cartCss from "~/styles/cart.css?url";

export const links = () => [{ rel: "stylesheet", href: cartCss }];

export async function loader({ params }) {
  const product = await fetchProductBySlug(params.slug);
  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }
  return { product };
}

export default function ProductDetail() {
  const { product } = useLoaderData();

  return (
    <main className="main">
      <PageTitle
        title={product.name}
        description={product.description || product.name}
        current="Products"
        backgroundImage="/assets/img/page-title-bg.jpg"
      />

      <section className="section">
        <div className="container">
          <div className="row gy-4 align-items-start">
            <div className="col-lg-5">
              <img
                src={imageSrc(product.image)}
                alt={product.name}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-lg-7">
              <p className="text-success fw-bold mb-2">
                {productMindHealLabel(product.mindHealNo, product.sortOrder)}
              </p>
              <h1 className="mb-3">{product.name}</h1>
              {product.description && (
                <p className="lead">{product.description}</p>
              )}
              <ProductPrice product={product} size="lg" />
              {product.emotionalTag && (
                <div className="mt-3">
                  <strong>Tag: </strong>
                  <span className="badge bg-light text-dark">{product.emotionalTag.name}</span>
                </div>
              )}
              <ProductAddToCart product={product} />
              <div className="mt-2">
                <Link to="/contact" className="btn btn-link text-success p-0">
                  Need help ordering? Contact us →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

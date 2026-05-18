import { useParams } from "react-router";

import ProductForm from "~/components/admin/ProductForm";

export default function AdminProductsEdit() {
  const { id } = useParams();
  return <ProductForm productId={id} />;
}

import { type RouteConfig } from "@react-router/dev/routes";
import { index, route } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

const publicRoutes = await flatRoutes({
  ignoredRouteFiles: ["**/admin/**"],
});

const adminChildren = [
  index("routes/admin/_index.jsx"),
  route("login", "routes/admin/login.jsx"),
  route("posts", "routes/admin/posts.jsx"),
  route("posts/new", "routes/admin/posts.new.jsx"),
  route("posts/:id/edit", "routes/admin/posts.$id.edit.jsx"),
  route("products", "routes/admin/products.jsx"),
  route("products/new", "routes/admin/products.new.jsx"),
  route("products/:id/edit", "routes/admin/products.$id.edit.jsx"),
  route("testimonials", "routes/admin/testimonials.jsx"),
  route("orders", "routes/admin/orders.jsx"),
];

export default [
  route("admin", "routes/admin/route.jsx", adminChildren),
  ...publicRoutes,
] satisfies RouteConfig;

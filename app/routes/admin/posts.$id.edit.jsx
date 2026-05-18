import { useParams } from "react-router";

import PostForm from "~/components/admin/PostForm";

export default function AdminPostsEdit() {
  const { id } = useParams();
  return <PostForm postId={id} />;
}

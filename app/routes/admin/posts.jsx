import { useEffect, useState } from "react";
import { Link } from "react-router";

import { postsApi } from "~/lib/api";

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    postsApi
      .list("limit=50")
      .then((res) => setPosts(res.posts || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this post?")) return;
    try {
      await postsApi.remove(id);
      load();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Blog Posts</h2>
        <Link to="/admin/posts/new" className="btn btn-success">
          <i className="bi bi-plus-lg" /> Add Post
        </Link>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="admin-card">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Author</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>
                    <span className={`admin-badge ${post.published ? "success" : "muted"}`}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>{post.author || "—"}</td>
                  <td className="admin-actions">
                    <Link to={`/admin/posts/${post.id}/edit`} className="btn btn-sm btn-outline-primary">
                      Edit
                    </Link>
                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(post.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && posts.length === 0 && <p className="text-muted mb-0">No posts yet.</p>}
      </div>
    </>
  );
}

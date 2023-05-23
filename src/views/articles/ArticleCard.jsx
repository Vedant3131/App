import { Link, useNavigate } from "react-router-dom";
import "./shared.css";
import { useContext } from "react";
import { Context, Server } from "../../shared/helper";

export function ArticleCard({
  article,
  user,
  categories,
  updatedAt,
  createdAt,
  truncate = true,
}) {
  const { context, setContext } = useContext(Context);
  const currentUser = context.currentUser;
  const navigate = useNavigate();

  function deleteArticle() {
    if (window.confirm("Are you sure?")) {
      Server.delete(`/articles/${article.id}`).then((response) => {
        navigate("/");
      });
    }
  }

  return (
    <div className="container">
      <div className="card text-center shadow p-3 mb-5 bg-white rounded">
        {/* Header */}
        <div className="card-header" style={{ backgroundColor: "white" }}>
          <h5 className="card-title">{article.title}</h5>
        </div>

        {/* Body */}
        <div className="card-body">
          <p className="card-text">
            {truncate && article.description.substring(0, 100) + " ..."}
            {!truncate && article.description}
          </p>

          <div className="row justify-content-md-center">
            {categories.map((category) => (
              <div className="mt-2 col-auto" key={category.id}>
                <Link
                  to={`/categories/${category.id}`}
                  className="categoryLink badge badge-pill badge-info"
                  style={{
                    backgroundColor: "mediumpurple",
                    margin: "2px",
                    textDecoration: "none",
                  }}
                >
                  {category.name}
                </Link>
              </div>
            ))}
          </div>

          <br />

          <div>
            <Link
              to={`/articles/${article.id}`}
              className="btn btn-outline-primary"
            >
              Show
            </Link>

            {currentUser.id === user.id && (
              <>
                <Link
                  to={`/articles/${article.id}/edit`}
                  className="btn btn-outline-warning ms-2"
                >
                  Edit
                </Link>

                <button
                  onClick={deleteArticle}
                  className="btn btn-outline-danger ms-2"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>

        {/* Title */}
        <div
          className="card-footer text-muted"
          style={{ backgroundColor: "white" }}
        >
          <small>
            Created By :{" "}
            <Link to={`/users/${user.id}`} style={{ textDecoration: "none" }}>
              {user.username}
            </Link>{" "}
            {createdAt} ago
          </small>
          <br />
          <small>Updated : {updatedAt} ago</small>
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";

export function CategoryCard({ category, mentionedIn, createdAt, updatedAt }) {
  return (
    <div className="container">
      <div className="card text-center shadow p-3 mb-5 bg-white rounded">
        {/* Body */}
        <div className="card-body">
          <h5 className="card-title text-center">
            <Link
              to={`/categories/${category.id}`}
              style={{ textDecoration: "none" }}
            >
              {category.name}
            </Link>
          </h5>
          <button
            className="btn btn-sm btn-dark disabled"
            style={{ margin: "10px", height: "30px", width: "165px" }}
          >
            Mentioned in {mentionedIn}
          </button>
          <br />
        </div>

        {/* Title */}
        <div
          className="card-footer text-muted"
          style={{ backgroundColor: "white" }}
        >
          <small>Created : {createdAt} ago</small>
          <br />
          <small>Updated : {updatedAt} ago</small>
        </div>
      </div>
    </div>
  );
}

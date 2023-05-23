import { Link } from "react-router-dom";
import "./shared.css";

export function SearchResultsItem({
  itemTitle,
  itemLabel,
  itemLink,
  itemBadge,
  itemAssetLink,
}) {
  return (
    <div id="searched-item" className="card bg-transparent">
      <div className="card-body" id="searched-item-card-body">
        <h6>
          <img
            className="rounded-circle"
            alt="search-image"
            width={60}
            src={itemAssetLink}
          ></img>
          <Link
            to={itemLink}
            className="card-title"
            style={{ textDecoration: "none", color: "white" }}
          >
            {itemTitle}
          </Link>
        </h6>

        <span className={`badge bg-${itemBadge}`} style={{ float: "right" }}>
          {itemLabel}
        </span>
      </div>
    </div>
  );
}

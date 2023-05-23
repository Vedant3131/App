import { useEffect } from "react";
import { Link } from "react-router-dom";

export function ArticleForm({
  categories,
  title,
  setTitle,
  description,
  setDescription,
  categoryIds,
  setCategoryIds,
  onSubmit,
}) {
  function handleCategories(e) {
    let options = e.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(parseInt(options[i].value));
      }
    }

    setCategoryIds(value);
  }

  return (
    <form>
      <div className="form-group row" style={{ margin: "10px" }}>
        <label className="col-2 col-form-label">Title</label>
        <div className="col-9">
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your title here"
          ></input>
          <small className="form-text text-muted">
            Must be 6-100 characters long.
          </small>
        </div>
      </div>

      <div className="form-group row" style={{ margin: "10px" }}>
        <label className="col-2 col-form-label">Description</label>
        <div className="col-9">
          <textarea
            rows={10}
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your description here"
          ></textarea>
          <small className="form-text text-muted">
            Must be 6-100 characters long.
          </small>
        </div>
      </div>

      <div className="form-group row" style={{ margin: "10px" }}>
        <label className="col-2 col-form-label select-label">Categories</label>
        <div className="col-9">
          <select
            className="custom-select form-select mb-3 rounded"
            size={8}
            multiple
            onChange={(e) => {
              handleCategories(e);
            }}
          >
            {categories.map((category) => (
              <option
                value={category.id}
                selected={categoryIds.includes(category.id)}
              >
                {category.name}
              </option>
            ))}
          </select>
          <small className="form-text text-muted">
            Make your selection from the list above (can be empty).
          </small>
        </div>
      </div>

      <div className="form-group row" style={{ margin: "10px" }}>
        <div className="col-2"></div>
        <div className="col">
          <button
            type="button"
            onClick={onSubmit}
            className="btn btn-outline-success btn-block w-100"
          >
            Submit
          </button>
        </div>
        <div className="col">
          <Link to="/articles" className="btn btn-outline-danger w-100">
            Cancel
          </Link>
        </div>
        <div className="col-1"></div>
      </div>
    </form>
  );
}

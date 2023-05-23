import { Link, useParams } from "react-router-dom";
import { ArticleCard } from "./ArticleCard";
import { useEffect, useState } from "react";
import { Server } from "../../shared/helper";

export function ShowArticle() {
  const id = useParams().id;
  const [object, setObject] = useState(false);

  useEffect(() => {
    Server.get(`/articles/${id}`).then((response) => {
      setObject(response.data);
    });
  }, [id]);

  if (object) {
    return (
      <div id="page-content">
        {/* <h1 className="text-center mt-4">{object.article.title}</h1> */}
        <br />
        <div className="container">
          <ArticleCard
            article={object.article}
            user={object.user}
            categories={object.categories}
            createdAt={object.createdAt}
            updatedAt={object.updatedAt}
            truncate={false}
          />

          <Link
            to="/articles"
            className="btn btn-outline-primary btn-lg btn-block col-12"
          >
            Return
          </Link>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

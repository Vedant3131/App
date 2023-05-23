import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Server } from "../../shared/helper";
import { GridView } from "../../components/gridview";
import { ArticleCard } from "../articles/ArticleCard";

export function ShowCategory() {
  const id = useParams().id;
  const [object, setObject] = useState(false);

  useEffect(() => {
    Server.get(`/categories/${id}`).then((response) => {
      setObject(response.data);
    });
  }, [id]);

  if (object) {
    return (
      <div id="page-content">
        <div className="container">
          <div className="main-body" style={{ marginTop: "50px" }}>
            <div className="row gutters-sm">
              <div className="col-md-4 mb-3">
                <div className="card shadow-lg p-3 mb-5 bg-white rounded">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <div className="mt-3">
                        <h4>{object.category.name}</h4>
                        <p
                          className="text-secondary"
                          style={{ margin: "30px" }}
                        >
                          Mentioned In{" "}
                          <button
                            className="btn btn-sm btn-dark disabled"
                            style={{
                              marginLeft: "10px",
                              height: "30px",
                              width: "85px",
                            }}
                          >
                            {object.mentionedIn}
                          </button>
                        </p>
                      </div>
                      <div
                        className="card-footer text-muted"
                        style={{ backgroundColor: "white" }}
                      >
                        <small>Created at : {object.createdAt} ago</small>
                        <br />
                        <small>Updated at : {object.updatedAt} ago</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-8 shadow-lg p-3 mb-5 bg-white rounded">
                <h2 className="text-center mt-4">Articles</h2>
                <br />

                <GridView columns={2}>
                  {object.allArticles.map((obj) => (
                    <div className="col" key={obj.article.id}>
                      <ArticleCard
                        article={obj.article}
                        user={obj.user}
                        categories={obj.categories}
                        createdAt={obj.createdAt}
                        updatedAt={obj.updatedAt}
                        key={obj.article.id}
                      />
                    </div>
                  ))}
                </GridView>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

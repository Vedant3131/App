import { useState, useEffect } from "react";
import { GridView } from "../../components/gridview";
import { ArticleCard } from "./ArticleCard";
import React from "react";
import { Server } from "../../shared/helper";
import { useSearchParams } from "react-router-dom";

export function ShowArticles() {
  const [allArticles, setAllArticles] = useState([]);
  const [searchParams] = useSearchParams();
  const param = searchParams.get("show");

  useEffect(() => {
    const adder = !param ? "" : `?show=${param}`;

    Server.get("/articles" + adder).then((response) => {
      setAllArticles(response.data.allArticles);
    });
  }, [param]);

  return (
    <div id="page-content">
      <h1 className="text-center mt-4">Listing Articles</h1>
      <br />

      <GridView columns={3}>
        {allArticles.map((object) => (
          <div className="col" key={object.article.id}>
            <ArticleCard
              article={object.article}
              user={object.user}
              categories={object.categories}
              createdAt={object.createdAt}
              updatedAt={object.updatedAt}
              key={object.article.id}
            />
          </div>
        ))}
      </GridView>
    </div>
  );
}

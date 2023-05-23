import { useEffect, useState } from "react";
import { ArticleForm } from "./ArticleForm";
import { useNavigate } from "react-router-dom";
import { Server } from "../../shared/helper";
import { Error } from "../../components";

export function NewArticle({}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Server.get("/categories").then((response) => {
      const categories = response.data.allCategories.map((obj) => ({
        id: obj.category.id,
        name: obj.category.name,
      }));
      setAllCategories(categories);
    });
  }, []);

  function onSubmit(e) {
    e.preventDefault();

    Server.post("/articles", {
      article: {
        title: title,
        description: description,
      },
      category_ids: categoryIds,
    }).then((response) => {
      setErrorMessages(response.data.errors);

      const articleId = response.data.article.article.id;
      navigate(`/articles/${articleId}`);
    });
  }

  return (
    <div id="page-content">
      <h1 className="text-center mt-4">Create New Article</h1>

      <Error
        errorHeading={"Following errors prevented article from saving."}
        errorMessages={errorMessages}
      />

      <ArticleForm
        categories={allCategories}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        categoryIds={categoryIds}
        setCategoryIds={setCategoryIds}
        onSubmit={onSubmit}
      />
    </div>
  );
}

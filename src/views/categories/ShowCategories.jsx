import { useState } from "react";
import { GridView } from "../../components/gridview";
import { CategoryCard } from "./CategoryCard";
import { useEffect } from "react";
import { Server } from "../../shared/helper";

export function ShowCategories() {
  const [object, setObject] = useState([]);

  useEffect(() => {
    Server.get("/categories").then((response) => {
      setObject(response.data.allCategories);
    });
  }, []);

  return (
    <div id="page-content">
      <h1 className="text-center mt-4">Listing All Categories</h1>
      <br />

      <GridView columns={3}>
        {object.map((obj) => (
          <div className="col" key={obj.category.id}>
            <CategoryCard
              category={obj.category}
              mentionedIn={obj.mentionedIn}
              createdAt={obj.createdAt}
              updatedAt={obj.updatedAt}
            />
          </div>
        ))}
      </GridView>
    </div>
  );
}

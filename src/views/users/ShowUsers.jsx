import { useState, useEffect } from "react";
import { GridView } from "../../components/gridview";
import { UserCard } from "./UserCard";
import React from "react";
import { Server } from "../../shared/helper";

export function ShowUsers() {
  const [object, setObject] = useState([]);
  const [followChange, setFollowChange] = useState({});

  useEffect(() => {
    Server.get("/users").then((response) => {
      setObject(response.data.allUsers);
    });
  }, [followChange]);

  if (object) {
    return (
      <div id="page-content">
        <h1 className="text-center mt-4">Alpha Bloggers</h1>
        <br />

        <GridView columns={3}>
          {object.map((obj) => (
            <div className="col" key={obj.user.id}>
              <UserCard
                user={obj.user}
                totalArticles={obj.totalArticles}
                totalFollowers={obj.totalFollowers}
                totalFollowing={obj.totalFollowing}
                createdAt={obj.createdAt}
                isFollowing={obj.isFollowing}
                followBack={obj.followBack}
                followChange={followChange}
                setFollowChange={setFollowChange}
                key={obj.user.id}
              />
            </div>
          ))}
        </GridView>
      </div>
    );
  } else {
    return <></>;
  }
}

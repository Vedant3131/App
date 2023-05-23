import { useContext } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { Context, Server } from "../../shared/helper";
import userLogo from "../../assets/images/user-logo.png";

export function UserCard({
  user,
  totalArticles,
  totalFollowers,
  totalFollowing,
  createdAt,
  isFollowing,
  followBack,
  followChange,
  setFollowChange,
}) {
  const { context, setContext } = useContext(Context);
  const currentUser = context.currentUser;
  const gender = user.id % 2 ? "male" : "female";

  function handleFollow(event) {
    if (isFollowing) {
      Server.post(`/users/${user.id}/unfollow`).then((response) => {
        setFollowChange(!followChange);
      });
    } else {
      Server.post(`/users/${user.id}/follow`).then((response) => {
        setFollowChange(!followChange);
      });
    }
  }

  return (
    <div className="container">
      <div className="card text-center shadow p-3 mb-5 bg-white rounded">
        {/* Header */}
        <div className="card-header" style={{ backgroundColor: "white" }}>
          {currentUser.id === user.id && (
            <button className="btn btn-sm btn-info fw-bold">You</button>
          )}

          {!(currentUser.id === user.id) && (
            <>
              <button
                className="btn btn-warning btn-sm fw-bold"
                onClick={(event) => {
                  handleFollow(event);
                }}
              >
                {isFollowing ? "✓ Following" : "✛ Follow"}{" "}
                {followBack ? "back" : ""}
              </button>
            </>
          )}
        </div>

        {/* Body */}
        <div className="card-body">
          <img
            src={`https://xsgames.co/randomusers/avatar.php?g=${gender}&id=${user.id}`}
            alt="Profile Image"
            className="rounded-circle"
            width="150"
            style={{ marginTop: "15px", marginBottom: "15px" }}
            onError={(e) => {
              e.target.src = userLogo;
            }}
          />
          <h5 className="card-title">{user.username}</h5>
          <div className="text-secondary" style={{ fontStyle: "italic" }}>
            Joined : {createdAt} ago
          </div>

          <div
            className="row"
            style={{ alignItems: "flex-end", marginTop: "1.5rem" }}
          >
            <Link
              to={`/users/${user.id}?show=Articles`}
              className="btn btn-md btn-light col-4"
              style={{ overflowWrap: "normal" }}
            >
              <b>{totalArticles}</b>
              <p>Articles</p>
            </Link>

            <Link
              to={`/users/${user.id}?show=Followers`}
              className="btn btn-md btn-light col-4"
              style={{ overflowWrap: "normal" }}
            >
              <b>{totalFollowers}</b>
              <p>Followers</p>
            </Link>

            <Link
              to={`/users/${user.id}?show=Following`}
              className="btn btn-md btn-light col-4"
              style={{ overflowWrap: "normal" }}
            >
              <b>{totalFollowing}</b>
              <p>Followings</p>
            </Link>
          </div>

          <Link
            to={`/users/${user.id}`}
            className="btn btn-outline-primary btn-md"
            style={{ marginTop: "1rem" }}
          >
            Show Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

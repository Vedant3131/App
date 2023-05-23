import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../shared/helper";

export function UserControls({
  id,
  userEmail,
  joinedAgo,
  totalArticles,
  totalFollowers,
  totalFollowings,
}) {
  const { context, setContext } = useContext(Context);
  const currentUser = context.currentUser;

  return (
    <div className="card mt-3 shadow-lg p-3 mb-5 bg-white rounded">
      <ul className="list-group list-group-flush">
        <ul className="list-group list-group-flush">
          <ul className="list-group list-group-flush">
            <h5 className="mb-0">
              <b>Account</b>
            </h5>
            <br />

            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <h6 className="mb-0"> Email</h6>
              <span className="text-secondary">{userEmail}</span>
            </li>

            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <h6 className="mb-0"> Joined </h6>
              <span className="text-secondary">{joinedAgo} ago</span>
            </li>

            {currentUser && currentUser.id == id && (
              <>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0"> Edit Profile </h6>
                  <Link to="/accounts/edit" className="btn btn-sm btn-primary">
                    Proceed
                  </Link>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0"> Delete Profile </h6>
                  <Link to="/accounts/delete" className="btn btn-sm btn-danger">
                    Proceed
                  </Link>
                  {/* TODO : <%= link_to "Proceed", registration_path(current_user), class: "btn btn-sm btn-danger", data: { confirm: "Are you sure?", turbo_confirm: "Are you sure?" }, method: :delete%> */}
                </li>
              </>
            )}

            <br />
          </ul>

          <ul className="list-group list-group-flush">
            <h5 className="mb-0">
              <b>Analytics</b>
            </h5>
            <br />

            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <h6 className="mb-0"> Articles </h6>
              <Link
                to={`/users/${id}?show=Articles`}
                className="btn btn-sm btn-warning"
              >
                {totalArticles}
              </Link>
            </li>

            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <h6 className="mb-0"> Followers </h6>
              <Link
                to={`/users/${id}?show=Followers`}
                className="btn btn-sm btn-warning"
              >
                {totalFollowers}
              </Link>
            </li>

            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <h6 className="mb-0"> Following </h6>
              <Link
                to={`/users/${id}?show=Following`}
                className="btn btn-sm btn-warning"
              >
                {totalFollowings}
              </Link>
            </li>
            <br />
          </ul>
        </ul>
      </ul>
    </div>
  );
}

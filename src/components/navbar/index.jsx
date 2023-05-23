import "./shared.css";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { Server, Context } from "../../shared/helper";
import { SearchBar } from "../search";

export function NavBar() {
  const { context, setContext } = useContext(Context);
  const currentUser = context.currentUser;

  function logout() {
    Server.delete("/accounts/logout").then((response) => {
      localStorage.removeItem("token");
      setContext({ ...context, authToken: undefined, currentUser: undefined });
    });
  }

  function deleteProfile() {
    if (window.confirm("Are you sure?")) {
      Server.delete("/delete-account").then((response) => {
        localStorage.removeItem("token");
        setContext({
          ...context,
          authToken: undefined,
          currentUser: undefined,
        });
      });
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand" id="logo">
          ALPHA ❄ BLOG
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {currentUser && (
              <>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    id="home-nav-link"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Articles
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        to="/articles?show=my-feed"
                        className="dropdown-item"
                      >
                        My Feed
                      </Link>
                    </li>
                    <li>
                      <Link to="/articles" className="dropdown-item">
                        View All Articles
                      </Link>
                    </li>
                    <li>
                      <Link to="/articles/new" className="dropdown-item">
                        Create New Article
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    id="home-nav-link"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categories
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/categories" className="dropdown-item">
                        View All Categories
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link to="/users" className="nav-link" id="home-nav-link">
                    Bloggers
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  {/* TODO : replace username with current_user.username */}
                  <a
                    className="nav-link dropdown-toggle"
                    id="home-nav-link"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {currentUser.username}
                  </a>
                  <ul className="dropdown-menu">
                    {/* TODO : replace user_id with current_user.id */}
                    <li>
                      <Link
                        to={`/users/${currentUser.id}`}
                        className="dropdown-item"
                      >
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/accounts/edit" className="dropdown-item">
                        Edit Profile
                      </Link>
                    </li>
                    <li>
                      <button onClick={logout} className="dropdown-item">
                        Logout
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={deleteProfile}
                        className="dropdown-item text-danger"
                      >
                        Delete Profile
                      </button>
                    </li>
                    {/* TODO : <li><%= link_to "Delete Profile", registration_path(current_user), data: { confirm: "Are you sure?", turbo_confirm: "Are you sure?" }, method: :delete, class: "dropdown-item text-danger" %> */}
                  </ul>
                </li>

                {/* TODO : <%= form_tag root_path, method: :get, class: 'd-flex form-group column', role: 'search' do %>
                                <%= text_field_tag :searchphrase, params[:searchphrase], placeholder: 'Search', class: 'form-control me-2 search-bar' %> */}
              </>
            )}

            {/* TODO : replace true with is_signed_in() */}
            {!currentUser && (
              <>
                <li className="nav-item">
                  <Link
                    to="/accounts/login"
                    className="nav-link"
                    id="home-nav-link"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/accounts/signup"
                    className="nav-link"
                    id="home-nav-link"
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>

          {currentUser && <SearchBar />}
        </div>
      </div>
    </nav>
  );
}

import "./App.css";

import "bootstrap/dist/js/bootstrap";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { NavBar } from "./components";
import { Home } from "./views/pages";
import { Login, Signup, EditAccount } from "./views/accounts";
import {
  NewArticle,
  EditArticle,
  ShowArticle,
  ShowArticles,
} from "./views/articles";
import { ShowCategory, ShowCategories } from "./views/categories";
import { ShowUser, ShowUsers } from "./views/users";
import { useContext, useEffect, useState } from "react";

import { Context, Server } from "./shared/helper";

function Tester() {
  return <></>;
}

function RequireSignIn({ children }) {
  const { context, setContext } = useContext(Context);

  if (context.currentUser || localStorage.getItem("token")) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
  }
}

function RequireLogout({ children }) {
  const { context, setContext } = useContext(Context);

  if (!(context.currentUser || localStorage.getItem("token"))) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
  }
}

function App() {
  const [context, setContext] = useState({
    authToken: localStorage.getItem("token"),
  });

  useEffect(() => {
    Server.defaults.headers.common["Authorization"] = context.authToken;
  }, [context]);

  useEffect(() => {
    if (context.authToken) {
      Server.get("/member-data").then((res) => {
        setContext({ ...context, currentUser: res.data });
      });
    }
  }, []);

  return (
    <Context.Provider value={{ context, setContext }}>
      <Router>
        <NavBar />

        <Routes>
          {/* Basic Route */}
          <Route path="/testing" exact element={<Tester />} />
          <Route path="/" exact element={<Home />} />

          {/* Accounts Routes */}
          <Route
            path="/accounts/login"
            exact
            element={
              <RequireLogout>
                <Login />
              </RequireLogout>
            }
          />
          <Route
            path="/accounts/signup"
            exact
            element={
              <RequireLogout>
                <Signup />
              </RequireLogout>
            }
          />
          <Route
            path="/accounts/edit"
            exact
            element={
              <RequireSignIn>
                <EditAccount />
              </RequireSignIn>
            }
          />

          {/* Articles Routes */}
          <Route
            path="/articles"
            exact
            element={
              <RequireSignIn>
                <ShowArticles />
              </RequireSignIn>
            }
          />
          <Route
            path="/articles/:id"
            exact
            element={
              <RequireSignIn>
                <ShowArticle />
              </RequireSignIn>
            }
          />
          <Route
            path="/articles/new"
            exact
            element={
              <RequireSignIn>
                <NewArticle />
              </RequireSignIn>
            }
          />
          <Route
            path="/articles/:id/edit"
            exact
            element={
              <RequireSignIn>
                <EditArticle />
              </RequireSignIn>
            }
          />

          {/* Categories Routes */}
          <Route
            path="/categories"
            exact
            element={
              <RequireSignIn>
                <ShowCategories />
              </RequireSignIn>
            }
          />
          <Route
            path="/categories/:id"
            exact
            element={
              <RequireSignIn>
                <ShowCategory />
              </RequireSignIn>
            }
          />

          {/* Users Routes */}
          <Route
            path="/users"
            exact
            element={
              <RequireSignIn>
                <ShowUsers />
              </RequireSignIn>
            }
          />
          <Route
            path="/users/:id"
            exact
            element={
              <RequireSignIn>
                <ShowUser />
              </RequireSignIn>
            }
          />
        </Routes>
      </Router>
    </Context.Provider>
  );
}

export default App;

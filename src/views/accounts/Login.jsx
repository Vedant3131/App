import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { Context, Server } from "../../shared/helper";
import { Error } from "../../components";

export function Login({}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);

  const { context, setContext } = useContext(Context);

  function onSubmit(e) {
    e.preventDefault();

    Server.post("/accounts/login", {
      user: {
        email: email,
        password: password,
      },
    })
      .then((response) => {
        if (response.headers.hasAuthorization()) {
          const token = response.headers.getAuthorization();
          localStorage.setItem("token", token);

          Server.defaults.headers.common["Authorization"] = token;

          Server.get("/member-data").then((res) => {
            setContext({ ...context, authToken: token, currentUser: res.data });
          });
        }

        navigate("/");
      })
      .catch((error) => {
        setErrorMessages([
          "Email or password did not match. Please try again.",
        ]);
      });
  }

  return (
    <div id="page-content">
      <h1 className="text-center mt-4" style={{ margin: "30px" }}>
        Login to Alpha-Blog
      </h1>
      <Error errorHeading={""} errorMessages={errorMessages} />
      <form>
        <div className="form-group row" style={{ margin: "10px" }}>
          <label className="col-2 col-form-label">Email</label>
          <div className="col-9">
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            ></input>
          </div>
        </div>

        <div className="form-group row" style={{ margin: "10px" }}>
          <label className="col-2 col-form-label">Password</label>
          <div className="col-9">
            <input
              type="password"
              id="inputPassword3"
              autoComplete="new-password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            ></input>
          </div>
        </div>

        {/* TODO : check if remember me div should be kept or removed */}
        <div className="form-group row">
          <div className="col-6"></div>
          <div className="form-check form-switch col"></div>
          <div className="col-1"></div>
        </div>

        <div className="form-group row" style={{ margin: "10px" }}>
          <div className="col-2"></div>
          <div className="col">
            <button
              type="button"
              onClick={onSubmit}
              className="btn btn-outline-success btn-block w-100"
            >
              Login
            </button>
          </div>
          <div className="col">
            <Link to="/" className="btn btn-outline-danger w-100">
              Cancel
            </Link>
          </div>
          <div className="col-1"></div>
        </div>
      </form>
    </div>
  );
}

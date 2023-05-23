import "./shared.css";
import { HomeFooter } from "./footer";
import { Link } from "react-router-dom";
import { SearchResultsView } from "../../../components/search";
import { useContext } from "react";
import { Context } from "../../../shared/helper";
import { useSearchParams } from "react-router-dom";

export function Home() {
  const { context, setContext } = useContext(Context);
  const currentUser = context.currentUser;

  const [searchParams] = useSearchParams();
  const querySearchphrase = searchParams.get("searchphrase");

  return (
    <>
      {querySearchphrase && currentUser && (
        <SearchResultsView querySearchphrase={querySearchphrase} />
      )}
      <div className="container" id="home-container">
        <div className="text-center text-white" id="home-headings">
          <h1
            className="display-4 text-white fw-bold"
            style={{ fontSize: "46px" }}
          >
            Welcome to Alpha-Blog
          </h1>
          <p
            className="lead fw-bold"
            style={{ color: "slategray", fontStyle: "italic" }}
          >
            The world lives here
          </p>

          {currentUser && (
            <Link
              to="/articles?show=my-feed"
              className="btn btn-outline-info btn-lg fw-bold"
            >
              My Feed
            </Link>
          )}
          {!currentUser && (
            <Link
              to="/accounts/signup"
              className="btn btn-outline-info btn-lg fw-bold"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
      <HomeFooter footerText="Made by @neonklr" />
    </>
  );
}

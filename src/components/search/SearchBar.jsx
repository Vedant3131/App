import { useState } from "react";
import "./shared.css";
import { useNavigate } from "react-router-dom";

export function SearchBar() {
  const [searchphrase, setSearchphrase] = useState("");
  const navigate = useNavigate();

  function search() {
    if (searchphrase && searchphrase !== "") {
      navigate(`/?searchphrase=${searchphrase}`);
    } else if (searchphrase === "") {
      navigate("/");
    }
  }

  return (
    <input
      type="text"
      className="form-control me-2 search-bar"
      placeholder="Search..."
      value={searchphrase}
      onChange={(e) => setSearchphrase(e.target.value)}
      onKeyDown={(e) => (e.key === "Enter" ? search() : null)}
    ></input>
  );
}

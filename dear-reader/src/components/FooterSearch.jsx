import { useState, useEffect } from "react";
import { searchBooks } from "../api/api";
import FooterSearchCard from "./FooterSearchCard";

function FooterSearch({ setResults, setSearch }) {
  const [query, setQuery] = useState("");
  const [params, setParams] = useState("title:");

  const handleQuery = (e) => {
    if (e.target.value === "") {
      setSearch("");
    }
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      searchBooks(query, params).then(({ items }) => {
        if (!items) {
          setSearch("No books found");
        } else setResults(items);
      });
    }, 800);

    return () => clearTimeout(delayDebounce);
  }, [query, params]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for books..."
        value={query}
        onChange={handleQuery}
        style={{
          padding: "8px",
          width: "100%",
          fontSize: "16px",
          marginBottom: "12px",
        }}
      />
    </div>
  );
}

export default FooterSearch;

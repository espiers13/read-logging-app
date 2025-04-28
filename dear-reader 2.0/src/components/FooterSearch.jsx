import { useState, useEffect } from "react";
import { searchBooks } from "../api/api";
import FooterSearchCard from "./FooterSearchCard";

function FooterSearch({ setResults }) {
  const [query, setQuery] = useState("");
  const [params, setParams] = useState("title:");

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      searchBooks(query, params).then(({ items }) => {
        setResults(items);
      });
    }, 300);

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

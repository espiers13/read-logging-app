import { useParams } from "react-router";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { searchBooks, searchOpenLibrary } from "../api/api";
import SearchBar from "../components/SearchBar";
import SearchResultsCard from "../components/SearchResultsCard";
import { useNavigate } from "react-router-dom";
import SearchFilters from "../components/SearchFilters";
import Error from "../components/Error";

function SearchResults() {
  const { search_query } = useParams();
  const [searchQuery, setSearchQuery] = useState(search_query || "");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    searchBooks(search_query, params)
      .then(({ items }) => {
        if (items && items.length > 0) {
          setSearchResults(items);
        } else {
          setSearchResults([]);
          setError(404);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setError(500);
        setIsLoading(false);
      });
  }, [search_query, params]);

  useEffect(() => {
    searchOpenLibrary(search_query, params);
  }, []);

  searchResults.sort((a, b) => {
    const dateA = new Date(a.volumeInfo.publishedDate);
    const dateB = new Date(b.volumeInfo.publishedDate);
    return dateB - dateA;
  });

  return (
    <main className="w-full mb-10">
      <div className="flex items-center space-x-2">
        <button onClick={handleGoBack}>
          <svg
            className="h-8 w-8"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <polyline points="15 6 9 12 15 18" />
          </svg>
        </button>
        <div className="flex-grow">
          <SearchBar value={searchQuery} onChange={handleSearchQueryChange} />
        </div>
      </div>
      <SearchFilters setParams={setParams} />
      {isLoading ? (
        <Loading />
      ) : error === 404 ? (
        <Error />
      ) : (
        <ul className="mt-5">
          {searchResults.map((book, index) => {
            return (
              <li key={index}>
                <SearchResultsCard book={book} />
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}

export default SearchResults;

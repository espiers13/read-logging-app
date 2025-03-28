import { useEffect, useState } from "react";
import { searchBooksByGenre } from "../api/api";
import { useParams } from "react-router";
import SearchResultsCard from "../components/SearchResultsCard";
import Loading from "../components/Loading";

function SearchByGenre() {
  const [searchResults, setSearchResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { genre } = useParams();

  useEffect(() => {
    searchBooksByGenre(genre).then(({ items }) => {
      setSearchResults(items);
      setIsLoading(false);
    });
  }, [genre]);

  if (Object.keys(searchResults).length === 0) {
    return <Loading />;
  }

  if (Object.keys(searchResults).length > 0) {
    searchResults.sort((a, b) => {
      const dateA = new Date(a.volumeInfo.publishedDate);
      const dateB = new Date(b.volumeInfo.publishedDate);
      return dateB - dateA;
    });
  }

  return (
    <main>
      {isLoading ? (
        <Loading />
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

export default SearchByGenre;

import SearchBar from "../components/SearchBar";
import GenreSearch from "../components/GenreSearch";
import { useState } from "react";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [genresOpen, setGenresOpen] = useState(false);
  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleGenre = (e) => {
    setGenresOpen(!genresOpen);
  };

  const handleRated = (e) => {
    console.log("rated");
  };

  return (
    <main className="mb-10">
      <SearchBar onChange={handleSearchQuery} value={searchQuery} />
      <p className="mt-3 ml-4 font-roboto tracking-widest">Browse by</p>
      <div className="ml-4 mr-4 font-roboto tracking-wide text-sm">
        <hr className="bg-gray-400 border-0 clear-both w-full h-0.5 mt-2 mb-2" />
        <button
          className="flex justify-between items-center space-x-4 bg-transparent w-full"
          onClick={handleGenre}
        >
          <p>Genres</p>
          <svg
            className={`h-6 w-6 text-slate-200 transform transition-transform duration-500 ease-in-out ${
              genresOpen ? "rotate-90" : "rotate-0"
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {genresOpen ? <GenreSearch /> : <></>}
        <hr className="bg-gray-400 border-0 clear-both w-full h-0.5 mt-2 mb-2" />
        <button
          className="flex justify-between items-center space-x-4 bg-transparent w-full"
          onClick={handleRated}
        >
          <p>Highest Rated</p>
          <svg
            className="h-6 w-6 text-slate-200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
        <hr className="bg-gray-400 border-0 clear-both w-full h-0.5 mt-2 mb-2" />
      </div>
    </main>
  );
}

export default Search;

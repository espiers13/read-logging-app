import { useNavigate } from "react-router-dom";

function GenreSearch() {
  const navigate = useNavigate();

  const handleGenre = (e) => {
    navigate(`/search/genre/${e.currentTarget.dataset.value}`);
  };

  const bookGenres = [
    "Action & Adventure",
    "Art",
    "Biographies & Memoirs",
    "Business & Economics",
    "Children's Books",
    "Classics",
    "Comics & Graphic Novels",
    "Cookbooks",
    "Crime & Mystery",
    "Fantasy",
    "Health & Wellness",
    "History",
    "Horror",
    "Literary Fiction",
    "Mystery",
    "Nonfiction",
    "Parenting",
    "Poetry",
    "Psychology",
    "Religion & Spirituality",
    "Romance",
    "Science & Technology",
    "Science Fiction",
    "Self-Help",
    "Sports & Outdoors",
    "Thrillers",
    "Travel",
    "Young Adult",
    "Children's Fiction",
    "Educational",
    "Arts & Photography",
    "Reference",
    "Politics & Social Sciences",
  ];

  return (
    <main>
      <ul>
        {bookGenres.map((genre, index) => {
          return (
            <li key={index}>
              <button
                className="flex justify-between items-center space-x-4 bg-transparent w-full"
                onClick={handleGenre}
                data-value={genre}
              >
                <p>{genre}</p>
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
              {index === bookGenres.length - 1 ? (
                <></>
              ) : (
                <hr className="bg-gray-600 border-0 clear-both w-full h-0.5 mt-1 mb-1" />
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default GenreSearch;

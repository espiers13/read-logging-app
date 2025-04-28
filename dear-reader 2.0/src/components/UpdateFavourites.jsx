import { deleteFromFavourites } from "../api/api";

function UpdateFavourites({
  favourite,
  currentUser,
  setFavouritesUpdated,
  favouritesUpdated,
}) {
  const { isbn, title, thumbnail } = favourite;
  const { id } = currentUser;

  const handleDeleteFavourite = (e) => {
    deleteFromFavourites(id, isbn).then((data) => {
      setFavouritesUpdated(favouritesUpdated + 1);
    });
  };

  return (
    <div className="relative inline-block book-menu-top-shadow">
      <img src={thumbnail} alt={title} className="w-24" />
      <button
        className="absolute top-0.5 right-0.5 bg-black text-white text-xs p-1 rounded-lg "
        onClick={handleDeleteFavourite}
      >
        <svg
          className="h-2.5 w-2.5 text-gray-100"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <path stroke="none" d="M0 0h24v24H0z" />{" "}
          <line x1="18" y1="6" x2="6" y2="18" />{" "}
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

export default UpdateFavourites;

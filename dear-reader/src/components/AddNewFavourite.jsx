import { useEffect, useState } from "react";
import { addToFavourites } from "../api/api";
import SearchForFavourite from "./SearchForFavourite";

function AddNewFavourite({
  currentUser,
  setFavouritesUpdated,
  favouritesUpdated,
}) {
  const { username, id } = currentUser;
  const [isVisible, setIsVisible] = useState(false);

  const handleOpenSearch = (e) => {
    setIsVisible(!isVisible);
  };

  return (
    <main className="w-24 button flex items-center justify-center book-menu-top-shadow">
      <button className="" onClick={handleOpenSearch}>
        <svg
          className="h-8 w-8 text-slate-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
      {isVisible ? (
        <SearchForFavourite
          setIsVisible={setIsVisible}
          isVisible={isVisible}
          currentUser={currentUser}
          setFavouritesUpdated={setFavouritesUpdated}
          favouritesUpdated={favouritesUpdated}
        />
      ) : (
        <></>
      )}
    </main>
  );
}

export default AddNewFavourite;

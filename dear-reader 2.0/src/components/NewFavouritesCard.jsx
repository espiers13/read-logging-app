import { addToFavourites } from "../api/api";

function NewFavouritesCard({
  user_id,
  favourite,
  setIsExiting,
  setBackdropExiting,
  setFavouritesUpdated,
  favouritesUpdated,
  setTimeout,
  setIsVisible,
}) {
  const { thumbnail, title, isbn, authors, datePublished } = favourite;
  const year = datePublished.split("-")[0];

  const handleFavourite = (e) => {
    const newBook = { isbn };
    addToFavourites(user_id, newBook).then((data) => {
      console.log(data);
      setIsExiting(true);
      setBackdropExiting(true);
      setFavouritesUpdated(favouritesUpdated + 1);
      setTimeout(() => {
        setIsVisible(false);
      }, 700);
    });
  };

  return (
    <main>
      <div className="p-1.5 text-sm">
        <button
          className="w-full flex items-center gap-3 text-left"
          onClick={handleFavourite}
        >
          <img className="w-12 ml-1" src={thumbnail} alt={title} />
          <div className="flex flex-col">
            <p className="font-medium">{title}</p>
            <p className="text-xs">{year}</p>
            <p className="text-xs">by {authors}</p>
          </div>
        </button>
        <hr className="border-0 h-px bg-gray-300 mt-2.5 -mb-3.5 mr-2" />
      </div>
    </main>
  );
}

export default NewFavouritesCard;

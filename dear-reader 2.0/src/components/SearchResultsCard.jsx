import { useNavigate } from "react-router-dom";

const SearchResultsCard = ({ book }) => {
  const navigate = useNavigate();
  const {
    title,
    authors,
    imageLinks,
    subtitle,
    publishedDate,
    industryIdentifiers,
  } = book.volumeInfo;
  let image = "https://www.press.uillinois.edu/books/images/no_cover.jpg";

  const date = new Date(publishedDate);
  const year = date.getFullYear();

  if (imageLinks) {
    image = imageLinks.thumbnail;
  }

  let bookUrl = `/404`;

  if (industryIdentifiers) {
    bookUrl = `/book/${industryIdentifiers[0].identifier}`;
  }

  let authorsArr = authors;

  if (!authors) {
    authorsArr = ["unknown"];
  }

  return (
    <button
      className="mb-3 grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
      onClick={() => {
        navigate(bookUrl);
      }}
    >
      <div className="flex items-start space-x-4">
        <img src={image} alt="Book cover" className="w-24 object-cover" />
        <div className="w-48 mt-3 text-left">
          <p className="font-serif font-bold line-clamp-2">{title}</p>
          {authorsArr.map((author, index) => {
            return (
              <p
                className="text-sm font-roboto text-slate-400 uppercase"
                key={index}
              >
                by {author}
              </p>
            );
          })}
          <p>{year}</p>
          <p className="text-sm italic mt-1 line-clamp-1">{subtitle}</p>
        </div>
      </div>
      <hr className="bg-gray-400 border-0 clear-both w-full h-0.5" />
    </button>
  );
};

export default SearchResultsCard;

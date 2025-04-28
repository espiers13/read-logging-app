import { useNavigate } from "react-router";
function BookCard({ book }) {
  const { book_image, title, primary_isbn10 } = book;
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(`/book/${primary_isbn10}`);
  };

  return (
    <button className="object-cover w-20 p-1" onClick={handleClick}>
      <img src={book_image} alt={title} aria-valuetext={primary_isbn10} />
    </button>
  );
}

export default BookCard;

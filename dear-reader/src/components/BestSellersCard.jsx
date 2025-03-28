import { useNavigate } from "react-router";
function BestSellers({ book, setIsExiting }) {
  const { book_image, author, description, title, primary_isbn10 } = book;
  const navigate = useNavigate();

  const handleClick = (e) => {
    setIsExiting(true);
    setTimeout(() => {
      navigate(`/book/${primary_isbn10}`);
    }, 700);
  };

  return (
    <button className="object-cover w-20 p-1" onClick={handleClick}>
      <img src={book_image} alt={title} aria-valuetext={primary_isbn10} />
    </button>
  );
}

export default BestSellers;

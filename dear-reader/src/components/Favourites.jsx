import { useNavigate } from "react-router-dom";

function Favourites({ favourite }) {
  const navigate = useNavigate();
  const { isbn, title, thumbnail } = favourite;

  return (
    <main className="">
      <button
        onClick={() => {
          navigate(`/book/${isbn}`);
        }}
      >
        <img src={thumbnail} alt={title} className="h-32" />
      </button>
    </main>
  );
}

export default Favourites;

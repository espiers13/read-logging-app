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
        <img src={thumbnail} alt={title} className="h-40" />
      </button>
    </main>
  );
}

export default Favourites;

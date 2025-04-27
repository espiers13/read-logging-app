import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";

function RecentActivity({ book }) {
  const navigate = useNavigate();
  const { thumbnail, rating = null, title, date_read, isbn } = book;

  const date = new Date(date_read);
  const dateRead = date.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <main className="">
      <button
        onClick={() => {
          navigate(`/book/${isbn}`);
        }}
      >
        <img src={thumbnail} alt={title} className="h-32" />
      </button>

      <div className="">
        <Rating
          name="read-only"
          value={rating}
          readOnly
          size="small"
          sx={{ color: "#a1afbf" }}
          precision={0.5}
        />
      </div>
      <h4 className="text-xs">{dateRead}</h4>
    </main>
  );
}

export default RecentActivity;

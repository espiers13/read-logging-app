import Rating from "@mui/material/Rating";

function RecentActivity({ book }) {
  const { thumbnail, rating = null, title, date_read } = book;

  const date = new Date(date_read);
  const dateRead = date.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  console.log(dateRead);

  return (
    <main className="ml-2 flex flex-col items-center justify-center">
      <img src={thumbnail} alt={title} className="h-40" />
      <div className="mt-1">
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

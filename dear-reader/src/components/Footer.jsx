import { useLocation, useNavigate } from "react-router-dom";

function Footer() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleAdd = (e) => {
    console.log("add");
  };

  if (pathname === "/login") {
    return <></>;
  }
  return (
    <footer className="footer">
      <div className="flex justify-between items-center space-x-4 ml-2 mr-2">
        <button onClick={() => navigate("/")}>
          <svg
            className="h-8 w-8 text-slate-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </button>
        <button onClick={() => navigate("/search")}>
          <svg
            className="h-8 w-8 text-slate-50"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <circle cx="10" cy="10" r="7" />{" "}
            <line x1="21" y1="21" x2="15" y2="15" />
          </svg>
        </button>
        <button onClick={handleAdd}>
          <svg
            className="h-8 w-8 text-green-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />{" "}
            <line x1="12" y1="8" x2="12" y2="16" />{" "}
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        </button>
        <button onClick={() => navigate("/friends")}>
          <svg
            className="h-8 w-8 text-slate-50"
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
            <circle cx="12" cy="12" r="9" />{" "}
            <line x1="9" y1="10" x2="9.01" y2="10" />{" "}
            <line x1="15" y1="10" x2="15.01" y2="10" />{" "}
            <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
          </svg>
        </button>
        <button onClick={() => navigate("/profile")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 w-8 text-slate-50"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
}

export default Footer;

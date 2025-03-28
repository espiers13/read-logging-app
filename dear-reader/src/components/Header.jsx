import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const genre = pathname.split("/search/genre/")[1];

  const decodedGenre = decodeURIComponent(genre);

  const handleHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (pathname === "/") {
    return (
      <header className="header">
        <h1 className="font-serif text-5xl mt-3">Dear Reader</h1>
      </header>
    );
  }

  if (pathname === "/search") {
    return (
      <header className="header">
        <h1 className="font-serif text-5xl mt-3">Search</h1>
      </header>
    );
  }

  if (pathname === "/friends") {
    return (
      <header className="header">
        <h1 className="font-serif text-5xl mt-3">Friends</h1>
      </header>
    );
  }

  if (pathname.includes("/profile")) {
    return (
      <header className="header">
        <h1 className="font-serif text-5xl mt-3">Profile</h1>
      </header>
    );
  }

  if (pathname === "/login") {
    return <></>;
  }

  if (pathname.includes(`/book/`)) {
    return <></>;
  }

  if (pathname === "/404") {
    return (
      <div className="mt-2">
        <button onClick={handleHome}>
          <svg
            className="h-8 w-8 mt-2 ml-2"
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
            <polyline points="15 6 9 12 15 18" />
          </svg>
        </button>
      </div>
    );
  }

  if (pathname.includes(`/genre/`)) {
    return (
      <div className="flex items-center justify-between ml-2 mr-2 mt-2 w-full">
        <button onClick={handleGoBack} className="flex-shrink-0">
          <svg
            className="h-8 w-8 mt-2 ml-2"
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
            <polyline points="15 6 9 12 15 18" />
          </svg>
        </button>
        <p className="text-center flex-1 text-lg font-serif font-bold mt-1">
          {decodedGenre}
        </p>
        <div className="w-15"></div>
      </div>
    );
  }

  return null;
}

export default Header;

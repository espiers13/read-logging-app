import { useLocation, useNavigate } from "react-router-dom";
import ShareButton from "./ShareButton";

function Header({ currentUser, setCurrentUser }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const genre = pathname.split("/search/genre/")[1];
  const friendUsername = pathname.split("/")[2];

  const decodedGenre = decodeURIComponent(genre);

  const handleHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  if (pathname === "/") {
    return (
      <header className="header">
        <h1 className="font-serif text-5xl mt-3">Dear Reader</h1>
      </header>
    );
  }

  if (pathname.includes(`/user/`)) {
    return (
      <header className="flex justify-between items-center space-x-4 ml-2 mr-2 header">
        <button onClick={handleGoBack}>
          <svg
            className="h-8 w-8 mt-2"
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
        <h1 className="font-serif text-4xl mt-3">{friendUsername}</h1>
        <div className="w-7"></div>
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

  if (pathname.includes("/settings")) {
    return (
      <div className="flex items-center justify-between ml-2 mr-2 mt-2">
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
          Settings
        </p>
        <button className="button mr-2 p-1 rounded-lg" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    );
  }

  if (pathname === "/login") {
    return <></>;
  }

  if (pathname === "/signup") {
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

  if (pathname.includes(currentUser.id)) {
    return (
      <header className="flex justify-between items-center space-x-4 ml-2 mr-2 header">
        <button onClick={() => navigate(`/${currentUser.id}/settings`)}>
          <svg
            className="h-8 w-8 text-slate-50 mt-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
        <h1 className="font-serif text-4xl mt-3">{currentUser.username}</h1>
        <ShareButton />
      </header>
    );
  }

  return null;
}

export default Header;

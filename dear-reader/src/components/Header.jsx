import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

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

  if (pathname === "/login") {
    return <></>;
  }

  if (pathname.includes(`/book/`)) {
    return <></>;
  }

  return null;
}

export default Header;

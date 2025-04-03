import { useNavigate } from "react-router-dom";

function Settings({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div>
      <ul>
        <li className="ml-1 mr-3">
          <button className="button " onClick={handleLogout}>
            Log Out
          </button>
        </li>
        <li className="ml-1 mr-3 mt-2">Update Password</li>
        <li className="ml-1 mr-3 mt-2">PROFILE SETTINGS</li>
        <li className="ml-1 mr-3 mt-2">username</li>
        <li className="ml-1 mr-3 mt-2">email address</li>
        <li className="ml-1 mr-3 mt-2">pronouns</li>
        <li className="ml-1 mr-3 mt-2">favourite books</li>
        <li className="ml-1 mr-3 mt-2">upload a new avatar</li>
        <li className="ml-1 mr-3 mt-2">delete account</li>
      </ul>
    </div>
  );
}

export default Settings;

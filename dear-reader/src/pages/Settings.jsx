import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFavourites, getBookByIsbn, updateUserDetails } from "../api/api";
import UpdateFavourites from "../components/UpdateFavourites";
import AddNewFavourite from "../components/AddNewFavourite";
import Loading from "../components/Loading";

function Settings({ currentUser, setCurrentUser }) {
  const { username, avatar, email, id } = currentUser;
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [usernameUpdate, setUsernameUpdate] = useState(username);
  const [emailUpdate, setEmailUpdate] = useState(email);
  const [pronounsUpdate, setPronounsUpdate] = useState("she/her");
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favouritesUpdated, setFavouritesUpdated] = useState(0);
  const navigate = useNavigate();
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    navigate("/login");
  };
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [matchingPasswords, setMatchingPasswords] = useState(true);
  const [message, setMessage] = useState("");
  const [disabledPassword, setDisabledPassword] = useState(true);
  const [noPassword, setNoPassword] = useState(false);

  useEffect(() => {
    setFavourites([]);
    setIsLoading(true);
    getFavourites(currentUser.id).then((favouritesData) => {
      const promises = favouritesData.map((favourite) => {
        return getBookByIsbn(favourite.isbn).then(({ items }) => {
          const newBook = {
            thumbnail: items[0].volumeInfo.imageLinks.thumbnail,
            title: items[0].volumeInfo.title,
            isbn: favourite.isbn,
          };
          return newBook;
        });
      });
      Promise.all(promises).then((newBooks) => {
        setFavourites((prevFavourites) => [...prevFavourites, ...newBooks]);
        setIsLoading(false);
      });
    });
  }, [currentUser.id, favouritesUpdated]);

  const handleOpen = (e) => {
    setSettingsOpen(!settingsOpen);
  };

  const handleOpenPassword = () => {
    setPasswordOpen(!passwordOpen);
  };

  const handleCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    if (e.target.value !== newPassword) {
      setMatchingPasswords(false);
      setMessage("Passwords do not match");
    }
    if (e.target.value === newPassword) {
      setMatchingPasswords(true);
      setMessage("Passwords match!");
      setDisabledPassword(false);
    }
  };

  const handlePassword = (e) => {
    e.preventDefault();
    if (currentPassword && newPassword) {
      console.log("change password");
    } else {
      console.log("need more info");
      setNoPassword(true);
    }
  };

  const handleUsername = (e) => {
    setUsernameUpdate(e.target.value);
  };

  const handleEmail = (e) => {
    setEmailUpdate(e.target.value);
  };

  const handlePronouns = (e) => {
    setPronounsUpdate(e.target.value);
  };

  const handleAvatar = (e) => {
    console.log("avatar");
  };

  const updateUser = (e) => {
    console.log("update user");
  };

  return (
    <div className="book-menu rounded-lg">
      <div className="h-0.5"></div>
      <p className="banner mt-5 px-1 py-1 text-center font-serif">
        Signed in as {username}
      </p>
      <div className="book-menu p-5 rounded-lg">
        <ul>
          <li className="ml-1 text-center">
            <button
              className="button px-2 py-0.5 rounded-lg"
              onClick={handleLogout}
            >
              Log Out
            </button>
            <hr className="border-0 h-px bg-gray-300 my-2" />
          </li>

          <li className="ml-1 mt-2 flex justify-between items-center">
            <span className="text-sm text-gray-300">UPDATE PASSWORD</span>
            <button className="rotate-button" onClick={handleOpenPassword}>
              <svg
                className={`icon ${passwordOpen ? "rotated" : ""}`}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          </li>
          {passwordOpen && (
            <form className="ml-3">
              <div className="flex justify-between items-center text-sm">
                <p>Current password</p>

                <input
                  type="password"
                  onChange={handleCurrentPassword}
                  className="py-0.5 px-2 border rounded-lg border-gray-600 input-settings bg-transparent w-24"
                  placeholder="*******"
                  required
                />
              </div>
              {noPassword && (
                <p className="text-xs -mb-1.5 -mt-1.5 text-red-400">
                  Please enter your password
                </p>
              )}

              <div className="flex justify-between items-center mt-2 text-sm">
                New password
                <input
                  type="password"
                  onChange={handleNewPassword}
                  className="py-0.5 px-2 border rounded-lg border-gray-600 input-settings bg-transparent w-24"
                  placeholder="*******"
                  required
                />
              </div>
              <div className="flex justify-between items-start mt-2 text-sm">
                <label className="pt-1">Confirm new password</label>
                <div className="flex flex-col items-end">
                  <input
                    type="password"
                    onChange={handleConfirmPassword}
                    className={`py-0.5 px-2 rounded-lg bg-transparent w-24 ${
                      matchingPasswords
                        ? "border border-gray-600 input-settings"
                        : "border border-red-700 bg-red-100 text-black"
                    }`}
                    placeholder="*******"
                    required
                  />
                  <p className="text-xs mt-1 text-right">{message}</p>
                </div>
              </div>
              <li className="ml-1 text-center">
                <button
                  type="submit"
                  className="button px-2 py-0.5 rounded-lg mt-2"
                  onClick={handlePassword}
                  disabled={disabledPassword}
                >
                  Save
                </button>
              </li>
            </form>
          )}

          <hr className="border-0 h-px bg-gray-300 my-2" />
          <li className="ml-1 mt-2 flex justify-between items-center">
            <span className="text-sm text-gray-300">PROFILE SETTINGS</span>
            <button className="rotate-button" onClick={handleOpen}>
              <svg
                className={`icon ${settingsOpen ? "rotated" : ""}`}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          </li>

          {settingsOpen && (
            <div className="transition-all duration-500 ease-in-out max-h-[500px] opacity-100 transform scale-y-100 origin-top overflow-hidden">
              <li className="ml-1 mr-3 mt-2 text-sm">
                <div className="flex justify-between items-center">
                  username
                  <input
                    type="text"
                    value={usernameUpdate}
                    onChange={handleUsername}
                    className="py-0.5 px-2 border rounded-lg border-gray-600 input-settings bg-transparent w-24"
                  />
                </div>
                <hr className="border-0 h-px mt-0.5 bg-gray-600" />
              </li>
              <li className="ml-1 mr-3 mt-2 text-sm">
                <div className="flex justify-between items-center">
                  email address
                  <input
                    type="text"
                    value={emailUpdate}
                    onChange={handleEmail}
                    className="py-0.5 px-2 border rounded-lg border-gray-600 input-settings bg-transparent w-50"
                  />
                </div>
                <hr className="border-0 h-px mt-0.5 bg-gray-600" />
              </li>
              <li className="ml-1 mr-3 mt-2 text-sm">
                <div className="flex justify-between items-center">
                  pronouns
                  <input
                    type="text"
                    value={pronounsUpdate}
                    onChange={handlePronouns}
                    className="py-0.5 px-2 border rounded-lg border-gray-600 input-settings bg-transparent w-24"
                  />
                </div>
                <hr className="border-0 h-px mt-0.5 bg-gray-600" />
              </li>
              <li className="ml-1 mr-3 mt-2 text-center">
                <button
                  className="button px-2 py-0.5 rounded-lg"
                  onClick={updateUser}
                >
                  Save
                </button>
              </li>
            </div>
          )}

          <hr className="border-0 h-px bg-gray-300 my-2 w-full" />
          <li className="ml-1 mr-3 mt-2 mb-3 text-sm text-gray-300">
            FAVOURITE BOOKS
            {isLoading ? (
              <Loading />
            ) : (
              <div className="grid-cols-4 flex gap-2 mb-2 mt-2">
                {favourites.map((favourite, index) => {
                  return (
                    <UpdateFavourites
                      favourite={favourite}
                      currentUser={currentUser}
                      key={index}
                      setFavouritesUpdated={setFavouritesUpdated}
                      favouritesUpdated={favouritesUpdated}
                    />
                  );
                })}
                {Array.from({ length: 4 - favourites.length }).map(
                  (_, index) => (
                    <AddNewFavourite
                      currentUser={currentUser}
                      key={index}
                      setFavouritesUpdated={setFavouritesUpdated}
                      favouritesUpdated={favouritesUpdated}
                    />
                  )
                )}
              </div>
            )}
          </li>
          <hr className="border-0 h-px bg-gray-300 my-2 w-full" />
          <li className="ml-1 mr-3 mt-2">upload a new avatar</li>
          <hr className="border-0 h-px bg-gray-300 my-2 w-full" />
          <li className="ml-1 mr-3 mt-2 text-center text-red-400">
            delete account
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Settings;

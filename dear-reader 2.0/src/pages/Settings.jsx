import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getFavourites,
  getBookByIsbn,
  updateUserDetails,
  updateUserPassword,
  loginUser,
  deleteUser,
  fetchBookByISBN,
} from "../api/api";
import UpdateFavourites from "../components/UpdateFavourites";
import AddNewFavourite from "../components/AddNewFavourite";
import Loading from "../components/Loading";
import UploadNewAvatar from "../components/UploadNewAvatar";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { storageRef } from "../api/firebase";

function Settings({ currentUser, setCurrentUser }) {
  const { username, avatar, email, id, pronouns } = currentUser;
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [usernameUpdate, setUsernameUpdate] = useState(username);
  const [emailUpdate, setEmailUpdate] = useState(email);
  const [pronounsUpdate, setPronounsUpdate] = useState(pronouns);
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favouritesUpdated, setFavouritesUpdated] = useState(0);
  const navigate = useNavigate();
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [matchingPasswords, setMatchingPasswords] = useState(true);
  const [message, setMessage] = useState("");
  const [disabledPassword, setDisabledPassword] = useState(true);
  const [noPassword, setNoPassword] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [userUpdated, setUserUpdated] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [fadeOut, setFadeOut] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarUpdate, setAvatarUpdate] = useState(null);

  useEffect(() => {
    setFavourites([]);
    setIsLoading(true);
    getFavourites(currentUser.id).then((favouritesData) => {
      const promises = favouritesData.map((favourite) => {
        return fetchBookByISBN(favourite.isbn).then((data) => {
          const newBook = {
            thumbnail:
              data.cover?.large ||
              "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930",
            title: data.title,
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

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

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
      setErrorMsg("Passwords do not match");
    }
    if (e.target.value === newPassword) {
      setMatchingPasswords(true);
      setErrorMsg("");
      setDisabledPassword(false);
    }
  };

  const handlePassword = (e) => {
    e.preventDefault();
    if (currentPassword && newPassword) {
      setUpdateLoading(true);
      updateUserPassword(username, currentPassword, newPassword)
        .then((data) => {
          setUpdateLoading(false);
          setPasswordUpdated(true);
          setTimeout(() => {
            setCurrentUser(null);
            localStorage.removeItem("currentUser");
            navigate("/login");
          }, 2000);
        })
        .catch((err) => {
          setErrorMsg(err.response.data.msg);
          setUpdateLoading(false);
        });
    } else {
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

  const updateUserCheck = (e) => {
    setCheckPassword(e.target.value);
  };

  const handleDeleteConfirm = (e) => {
    setDeletePopup(!deletePopup);
  };

  const handleDeleteUser = (e) => {
    setUpdateLoading(true);
    deleteUser(username, deletePassword)
      .then((data) => {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUser = (e) => {
    e.preventDefault();
    if (avatarUpdate !== null) {
      const userFolderRef = ref(storageRef, `avatars/${currentUser.id}`);
      const newFileRef = ref(userFolderRef, `${currentUser.id}-avatar`);

      setUpdateLoading(true);

      listAll(userFolderRef)
        .then((res) => {
          const deletePromises = res.items.map((itemRef) =>
            deleteObject(itemRef)
          );
          return Promise.all(deletePromises);
        })
        .then(() => uploadBytes(newFileRef, avatarUpdate))
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((downloadURL) => {
          const newData = {
            pronouns: pronounsUpdate,
            username: usernameUpdate,
            email: emailUpdate,
            avatar: downloadURL,
          };

          return updateUserDetails(username, checkPassword, newData);
        })
        .then((data) => {
          const user = { username: data.username, password: checkPassword };
          setUserError("");
          loginUser(user)
            .then((data) => {
              setCurrentUser(data);
              setCheckPassword("");
              setUpdateLoading(false);
              setUserUpdated(true);
              setFadeOut(false);
              setTimeout(() => {
                setFadeOut(true);
              }, 1500);
              setTimeout(() => {
                setUserUpdated(false);
                navigate(`/${currentUser.id}/profile`);
              }, 2000);
            })
            .catch((err) => {
              setUserError(err.response.data.msg);
              setUpdateLoading(false);
            });
        })
        .catch((err) => {
          setUserError(err.response.data.msg);
          setUpdateLoading(false);
        });
    } else {
      const newData = {
        pronouns: pronounsUpdate,
        username: usernameUpdate,
        email: emailUpdate,
      };
      updateUserDetails(username, checkPassword, newData)
        .then((data) => {
          const user = { username: data.username, password: checkPassword };
          setUserError("");
          loginUser(user)
            .then((data) => {
              setCurrentUser(data);
              setCheckPassword("");
              setUpdateLoading(false);
              setUserUpdated(true);
              setFadeOut(false);
              setTimeout(() => {
                setFadeOut(true);
              }, 1500);
              setTimeout(() => {
                setUserUpdated(false);
                navigate(`/${currentUser.id}/profile`);
              }, 2000);
            })
            .catch((err) => {
              setUserError(err.response.data.msg);
              setUpdateLoading(false);
            });
        })
        .catch((err) => {
          setUserError(err.response.data.msg);
          setUpdateLoading(false);
        });
    }
  };

  return (
    <>
      {updateLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center ">
          <Loading />
        </div>
      )}
      {passwordUpdated && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm sm:text-base ">
          Password updated. Logging you out...
        </div>
      )}
      {userUpdated && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm sm:text-base animate__animated text-center ${
            fadeOut ? "animate__fadeOut" : ""
          }`}
        >
          Profile updated successfully! Returning to profile...
        </div>
      )}
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

            <li className="ml-1 mt-2">
              <button
                className="flex justify-between items-center w-full text-sm text-gray-300"
                onClick={handleOpenPassword}
              >
                <span>UPDATE PASSWORD</span>
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
              <form className="ml-3" onSubmit={handlePassword}>
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
                  {errorMsg && (
                    <div
                      className="flex items-center px-2 py-1 mb-1 mt-2 text-sm text-red-800 rounded-lg bg-red-50"
                      role="alert"
                    >
                      <svg
                        className="shrink-0 inline w-4 h-4 me-3 mr-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <div>
                        <span className="text-sm">{errorMsg}</span>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="button px-2 py-0.5 rounded-lg mt-2"
                    disabled={disabledPassword}
                  >
                    Save
                  </button>
                </li>
              </form>
            )}

            <hr className="border-0 h-px bg-gray-300 my-2" />

            <li className="ml-1 mt-2">
              <button
                className="flex justify-between items-center w-full text-sm text-gray-300"
                onClick={handleOpen}
              >
                <span>PROFILE SETTINGS</span>
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
              <form
                className="transition-all duration-500 ease-in-out max-h-[500px] opacity-100 transform scale-y-100 origin-top overflow-hidden"
                onSubmit={updateUser}
              >
                <li className="ml-1 mr-3 mt-2 text-sm">
                  <div className="flex justify-between items-center">
                    username
                    <input
                      type="text"
                      value={usernameUpdate}
                      onChange={handleUsername}
                      className="py-0.5 px-2 border rounded-lg border-gray-600 input-settings bg-transparent w-24"
                      required
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
                      required
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
                <li className="ml-1 mr-3 mt-2">
                  <UploadNewAvatar
                    currentUser={currentUser}
                    setAvatarUpdate={setAvatarUpdate}
                  />
                </li>
                <hr className="border-0 h-px mt-0.5 bg-gray-600" />
                <li className="ml-1 mr-3 mt-2 text-center flex flex-col items-center gap-2">
                  <p className="text-sm italic">
                    Enter your password to make changes
                  </p>
                  <input
                    type="password"
                    placeholder="******"
                    value={checkPassword}
                    onChange={updateUserCheck}
                    className="py-0.5 px-2 border rounded-lg border-gray-600 input-settings bg-transparent w-40"
                    required
                  />
                  {userError && (
                    <div
                      className="flex items-center px-2 py-1 text-sm text-red-800 rounded-lg bg-red-50"
                      role="alert"
                    >
                      <svg
                        className="shrink-0 inline w-4 h-4 me-3 mr-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <div>
                        <span className="text-sm">{userError}</span>
                      </div>
                    </div>
                  )}
                  <button
                    className="button px-2 py-0.5 rounded-lg"
                    type="submit"
                  >
                    Save
                  </button>
                </li>
              </form>
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
            <li className="ml-1 mr-3 mt-2 text-center text-red-400">
              <button onClick={handleDeleteConfirm}>Delete Account</button>
              {deletePopup && (
                <div>
                  <div
                    class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 ml-3 mt-2"
                    role="alert"
                  >
                    <svg
                      class="shrink-0 inline w-4 h-4 me-3 mr-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span class="sr-only">Info</span>
                    <div>
                      <span class="font-medium">Warning!</span> This action
                      cannot be undone.
                    </div>
                  </div>
                  <div className="ml-1 mr-3 mt-2 text-center flex flex-col items-center gap-2">
                    <p className="text-sm italic">
                      Enter password to confirm deletion.
                    </p>
                    <input
                      type="password"
                      placeholder="******"
                      value={deletePassword}
                      onChange={handleDeletePasswordCheck}
                      className="py-0.5 px-2 border rounded-lg border-gray-600 input-settings bg-transparent w-40"
                      required
                    />
                    {passwordError && (
                      <div
                        className="flex items-center px-2 py-1 text-sm text-red-800 rounded-lg bg-red-50"
                        role="alert"
                      >
                        <svg
                          className="shrink-0 inline w-4 h-4 me-3 mr-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <div>
                          <span className="text-sm">{passwordError}</span>
                        </div>
                      </div>
                    )}
                    <button
                      type="button"
                      class="text-white bg-red-700 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2"
                      onClick={handleDeleteUser}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Settings;

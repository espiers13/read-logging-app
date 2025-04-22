import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createNewUser } from "../api/api";
import LoadingButton from "../components/LoadingButton";

function SignUp({ setCurrentUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newUser = {
      name: name,
      username: username,
      email: email,
      password: password,
    };
    createNewUser(newUser)
      .then((newUser) => {
        setCurrentUser(newUser);
        navigate(`/${newUser.id}/profile`);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMsg(err.response.data.msg);
        setIsLoading(false);
      });
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <main className="flex flex-col min-h-screen">
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

      <div className="flex-grow flex items-center justify-start">
        <div className="card w-full px-6 py-12 rounded-xl">
          <div className="text-center">
            <h3 className="text-center text-5xl tracking-tight font-serif">
              Create new Account
            </h3>
            <button
              className="mt-1 text-center text-sm tracking-tight font-roboto text-black hover:underline"
              onClick={() => {
                navigate("/login");
              }}
            >
              Already registered? Log in here.
            </button>
          </div>

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  className="input text-sm rounded-lg block w-full p-2.5"
                  placeholder="name"
                  onChange={handleName}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  className="input text-sm rounded-lg block w-full p-2.5"
                  placeholder="email"
                  onChange={handleEmail}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  USERNAME
                </label>
                <input
                  type="text"
                  id="username"
                  className="input text-sm rounded-lg block w-full p-2.5"
                  placeholder="username"
                  onChange={handleUsername}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  PASSWORD
                </label>
                <input
                  type="password"
                  id="password"
                  className="input text-sm rounded-lg block w-full p-2.5"
                  placeholder="********"
                  onChange={handlePassword}
                  required
                />
              </div>
              {errorMsg ? (
                <div
                  className="p-2 mb-1 text-sm text-red-800 text-center rounded-lg bg-red-50 "
                  role="alert"
                >
                  {errorMsg}
                </div>
              ) : (
                <></>
              )}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md p-2 text-sm/6 text-white shadow-xs signupbutton text-white focus:bg-gray-500"
                  disabled={isLoading}
                >
                  {isLoading ? <LoadingButton /> : <>Sign Up</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignUp;

import { useState } from "react";
import { loginUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../components/LoadingButton";
import Logo from "../components/Logo";

function Login({ setCurrentUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const user = { username: username, password: password };
    loginUser(user)
      .then((userData) => {
        setIsLoading(false);
        setCurrentUser(userData);
        navigate(`/${userData.id}/profile`);
      })
      .catch((err) => {
        setErrorMsg("Username and password don't match");
        setIsLoading(false);
      });
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <main>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
          <Logo />
          <h2 className="text-center text-5xl tracking-tight font-serif">
            Login
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-roboto font-roboto"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base font-roboto text-black"
                  onChange={handleUsername}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-roboto font-roboto"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base font-serif text-black"
                  onChange={handlePassword}
                />
              </div>
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
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 text-white shadow-xs button"
              >
                {isLoading ? <LoadingButton /> : <>Sign In</>}
              </button>
            </div>
          </form>

          <div className="text-sm space-x-3 flex justify-center mt-3">
            <a href="#" className="text-white">
              Forgot password?
            </a>
          </div>

          <div className="text-sm space-x-3 flex justify-center mt-1">
            <a href="/signup" className="text-white">
              Create an account
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;

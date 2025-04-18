import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";

function BookNotFound() {
  const navigate = useNavigate();

  return (
    <main className="flex items-center justify-center flex-col mt-10">
      <div className="text-center">
        <DotLottieReact
          src="https://lottie.host/5ddd9b8e-357b-4067-a44c-39f9ebe5b16f/beTdJmfex1.lottie"
          background="transparent"
          loop
          autoplay
        />
        <p>page not found</p>
        <div className="p-6">
          <button
            onClick={() => {
              navigate("/search");
            }}
            className="button mt-4 p-2 text-white rounded-lg shadow-lg "
          >
            Click here to search for books
          </button>
        </div>
      </div>
    </main>
  );
}

export default BookNotFound;

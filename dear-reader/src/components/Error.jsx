import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Error() {
  return (
    <main className="flex items-center justify-center flex-col mt-10">
      <div className="text-center">
        <DotLottieReact
          src="https://lottie.host/3889a2e9-5afe-4909-85f9-b1d5c7d847b1/KyvvOO2Qma.lottie"
          background="transparent"
          loop
          autoplay
        />
        <p>No books found</p>
      </div>
    </main>
  );
}

export default Error;

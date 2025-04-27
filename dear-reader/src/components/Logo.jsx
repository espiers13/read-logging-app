import React, { useEffect, useState } from "react";
import { logoRef } from "../api/firebase"; // Correct import from firebaseConfig
import { getDownloadURL } from "firebase/storage";

const Logo = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDownloadURL(logoRef)
      .then((url) => {
        setImageUrl(url);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error getting the download URL", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div></div>;
  }

  return (
    <div>
      <img src={imageUrl} className="h-32 mb-3 mx-auto" />
    </div>
  );
};

export default Logo;

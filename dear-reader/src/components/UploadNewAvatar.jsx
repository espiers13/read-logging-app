import { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import CircularProgress from "@mui/material/CircularProgress";

function UploadNewAvatar({ currentUser, setAvatarUpdate }) {
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleImgSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };

    imageCompression(file, options)
      .then((compressedFile) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onloadend = () => {
          img.src = reader.result;
        };
        reader.readAsDataURL(compressedFile);

        return new Promise((resolve, reject) => {
          img.onload = () => {
            const size = Math.min(img.width, img.height);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = size;
            canvas.height = size;

            ctx.drawImage(
              img,
              (img.width - size) / 2,
              (img.height - size) / 2,
              size,
              size,
              0,
              0,
              size,
              size
            );
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  resolve(blob);
                } else {
                  reject("Failed to crop the image.");
                }
              },
              "image/jpeg",
              0.8
            );
          };

          img.onerror = (error) => reject(error);
        });
      })
      .then((croppedBlob) => {
        const previewUrl = URL.createObjectURL(croppedBlob);
        setAvatar(previewUrl);
        setAvatarUpdate(croppedBlob);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error during image compression and cropping:", error);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <label htmlFor="imageUpload" className="flex flex-col items-center">
        {isLoading ? (
          <CircularProgress variant="determinate" value={progress} />
        ) : (
          <img
            src={avatar}
            className="rounded-full h-12 cursor-pointer"
            alt="upload image"
          />
        )}

        <p>Upload New Avatar</p>
      </label>
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        onChange={handleImgSelect}
        className="hidden"
      />
    </div>
  );
}

export default UploadNewAvatar;

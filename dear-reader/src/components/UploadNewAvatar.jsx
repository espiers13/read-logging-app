function UploadNewAvatar({ currentUser }) {
  const uploadNewAvatar = () => {
    console.log("uploadNewAvatar");
  };

  return (
    <div className="flex flex-col items-center">
      <button onClick={uploadNewAvatar}>
        <img src={currentUser.avatar} className="rounded-full h-12" />
      </button>

      <p>Upload new avatar</p>
    </div>
  );
}

export default UploadNewAvatar;

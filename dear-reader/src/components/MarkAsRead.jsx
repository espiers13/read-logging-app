function MarkAsRead({ book, setReadPopup, handleMarkAsRead }) {
  const { thumbnail, title, isbn, authors, description } = book;
  return (
    <div className="fixed inset-0 w-screen flex justify-center items-center">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="transform overflow-hidden rounded-lg bg-white text-left shadow-xl">
          <div className="bg-white p-4">
            <div className="flex items-start justify-center">
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  className="absolute top-4 right-4 text-green-700"
                  onClick={() => setReadPopup(false)}
                >
                  <svg
                    className="h-8 w-8 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />{" "}
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                <div className="h-60 w-80 flex justify-center items-center mt-2">
                  {" "}
                  <h2
                    className="font-serif font-bold text-gray-900 mt-5"
                    id="modal-title"
                  >
                    {book.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1 italic">
                    by {authors}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center space-y-5 mb-5">
            <div className="flex justify-between items-center space-x-4 ml-2 mr-2">
              <button
                className="text-blue-600 text-sm p-1 rounded-lg"
                onClick={handleMarkAsRead}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarkAsRead;

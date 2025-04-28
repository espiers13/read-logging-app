function DeletePopup({ setPopup, handleDelete }) {
  return (
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div className="flex min-h-full items-center place-content-center p-4 text-center">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ">
          <div className="bg-white px-4 pt-5 pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center">
                <h3
                  className="text-base font-semibold text-gray-900"
                  id="modal-title"
                >
                  Delete Book from Journal
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this book from your read
                    journal? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-5 mb-5">
            <button
              type="button"
              className="text-red-500"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              type="button"
              className="text-green-700"
              onClick={() => setPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletePopup;

function BookMenu({ currentBook, setPopup }) {
  return (
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-brightness-50 ">
      <div className="flex min-h-full items-center place-content-center p-4 text-center">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ">
          <div className="bg-slate-300 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <button onClick={() => setPopup(false)}>
              <h3>Close</h3>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookMenu;

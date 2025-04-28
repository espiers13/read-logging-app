import { useState } from "react";

function SearchFilters({ setParams }) {
  const [authorSelected, setAuthorSelected] = useState(false);
  const [titleSelected, setTitleSelected] = useState(false);
  const [subjectSelected, setSubjectSelected] = useState(false);

  const handleAuthor = (e) => {
    setAuthorSelected(!authorSelected);
    setSubjectSelected(false);
    setTitleSelected(false);
    setParams("inauthor:");
  };

  const handleTitle = (e) => {
    setTitleSelected(!titleSelected);
    setSubjectSelected(false);
    setAuthorSelected(false);
    setParams("intitle:");
  };

  const handleSubject = (e) => {
    setSubjectSelected(!subjectSelected);
    setTitleSelected(false);
    setAuthorSelected(false);
    setParams("subject:");
  };

  return (
    <main className="flex items-center justify-center mt-3 w-full">
      <div className="inline-flex w-full rounded-md shadow-xs" role="group">
        <button
          type="button"
          className={`w-full px-4 py-2 text-sm font-medium text-gray-900 border rounded-l-lg ${
            authorSelected ? "active-button" : "button"
          }`}
          onClick={handleAuthor}
        >
          Author
        </button>
        <button
          type="button"
          className={`w-full px-4 py-2 text-sm font-medium text-gray-900 border-t border-b ${
            titleSelected ? "active-button" : "button"
          }`}
          onClick={handleTitle}
        >
          Title
        </button>
        <button
          type="button"
          className={`w-full px-4 py-2 text-sm font-medium text-gray-900 border rounded-r-lg ${
            subjectSelected ? "active-button" : "button"
          }`}
          onClick={handleSubject}
        >
          Subject
        </button>
      </div>
    </main>
  );
}

export default SearchFilters;

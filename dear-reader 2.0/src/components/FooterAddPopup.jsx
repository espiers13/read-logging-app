import { useState, useEffect } from "react";
import FooterSearch from "./FooterSearch";
import FooterSearchCard from "./FooterSearchCard";

function FooterAddPopup({ currentUser, setPopup }) {
  const [closing, setClosing] = useState(false);
  const [results, setResults] = useState([]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setPopup(false);
      setClosing(false);
    }, 900);
  };
  return (
    <div
      className={`footer-modal-overlay animate__animated ${
        closing ? "animate__fadeOut" : "animate__fadeIn"
      }`}
    >
      <div
        className={`footer-modal-content animate__animated ${
          closing ? "animate__slideOutDown" : "animate__slideInUp"
        }`}
      >
        {/* Header (sticky) */}
        <div className="flex justify-between items-center space-x-4 ml-2 mr-2">
          <button onClick={handleClose}>Cancel</button>
          <p className="font-serif">Add a Book</p>
          <img src={currentUser.avatar} className="w-8 rounded-full" />
        </div>
        <FooterSearch setResults={setResults} />

        {/* Scrollable body */}
        <div className="modal-scroll-area">
          <ul className="">
            {results.map((book, index) => {
              return (
                <li key={index}>
                  <FooterSearchCard book={book} currentUser={currentUser} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FooterAddPopup;

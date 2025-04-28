import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar({ value, onChange }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        rel="stylesheet"
      />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="search-container">
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search..."
                value={value}
                onChange={onChange}
              />
              <i className="fas fa-search search-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;

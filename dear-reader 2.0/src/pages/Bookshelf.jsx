import ProfileTabs from "../components/ProfileTabs";
import { getBookshelf, getBookByIsbn } from "../api/api";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import BookshelfCard from "../components/BookshelfCard";

function Bookshelf({ currentUser }) {
  const { username } = currentUser;
  const [isLoading, setIsLoading] = useState(false);
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    setBookshelf([]);
    setIsLoading(true);
    getBookshelf(username).then((bookshelfData) => {
      const promises = bookshelfData.map((book) => {
        return getBookByIsbn(book.isbn).then(({ items }) => {
          const currentBook = items[0].volumeInfo;
          const newBook = {
            thumbnail:
              currentBook.imageLinks?.thumbnail ||
              "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930",
            title: currentBook.title,
            isbn: currentBook.industryIdentifiers[0].identifier,
            published: currentBook.publishedDate,
            authors: currentBook.authors,
            description: currentBook.description,
          };
          return newBook;
        });
      });
      Promise.all(promises).then((newBooks) => {
        setBookshelf((prevBookshelf) => [...prevBookshelf, ...newBooks]);
        setIsLoading(false);
      });
    });
  }, [currentUser.id]);

  return (
    <main className="w-full mb-10">
      <ProfileTabs page="bookshelf" currentUser={currentUser} />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-4 gap-2 mt-3 ml-2 mr-2">
          {bookshelf.map((book) => {
            return (
              <div key={book.isbn}>
                <BookshelfCard book={book} currentUser={currentUser} />
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default Bookshelf;

import ProfileTabs from "../components/ProfileTabs";
import { getReadJournal, getBookByIsbn } from "../api/api";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import JournalCard from "../components/JournalCard";

function Journal({ currentUser }) {
  const [journal, setJournal] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dates, setDates] = useState([]);
  const [journalUpdated, setJournalUpdated] = useState(false);

  useEffect(() => {
    setJournal([]);
    setDates([]);
    setIsLoading(true);
    getReadJournal(currentUser.username).then((journalData) => {
      const promises = journalData.map((book) => {
        return getBookByIsbn(book.isbn).then(({ items }) => {
          const currentBook = items[0].volumeInfo;
          const newBook = {
            thumbnail:
              currentBook.imageLinks?.thumbnail ||
              "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930",
            title: currentBook.title,
            rating: book.rating,
            date_read: book.date_read,
            review: book.review,
            published: currentBook.publishedDate,
            authors: currentBook.authors,
            isbn: book.isbn,
          };
          return newBook;
        });
      });
      Promise.all(promises).then((newBooks) => {
        setJournal((prevActivity) => [...prevActivity, ...newBooks]);

        const dates = newBooks.map((book) => {
          const date = new Date(book.date_read);
          return date;
        });

        setDates((prevDates) => [...prevDates, ...dates]);

        setIsLoading(false);
      });
    });
  }, [currentUser.id, journalUpdated]);

  const groupedBooks = journal
    .sort((a, b) => new Date(b.date_read) - new Date(a.date_read))
    .reduce((acc, book) => {
      const monthYear = new Date(book.date_read).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }

      acc[monthYear].push(book);
      return acc;
    }, {});

  return (
    <main className="w-full mb-10">
      <div className="mb-4">
        <ProfileTabs page="journal" currentUser={currentUser} />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <ul>
          {Object.keys(groupedBooks).map((monthYear) => (
            <li key={monthYear}>
              <div className="bar w-screen p-1 mb-4">
                <p className="ml-2 font-semibold text-lg">{monthYear}</p>
              </div>

              <ul className="mb-5">
                {groupedBooks[monthYear].map((book, bookIndex) => {
                  const isLastBook =
                    bookIndex === groupedBooks[monthYear].length - 1;
                  return (
                    <li key={book.id || `${book.isbn}-${bookIndex}`}>
                      <JournalCard
                        book={book}
                        currentUser={currentUser}
                        setJournalUpdated={setJournalUpdated}
                      />
                      {!isLastBook && (
                        <hr className="bar border-0 clear-both w-full h-0.5 mt-2 mb-2" />
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default Journal;

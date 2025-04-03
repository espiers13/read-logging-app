import ProfileTabs from "../components/ProfileTabs";
import { getReadJournal, getBookByIsbn } from "../api/api";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import JournalCard from "../components/JournalCard";

function Journal({ currentUser }) {
  const [journal, setJournal] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    setJournal([]);
    setDates([]);
    setIsLoading(true);
    getReadJournal(currentUser.username).then((journalData) => {
      const recentBooks = journalData.slice(0, 3);
      const promises = recentBooks.map((book) => {
        return getBookByIsbn(book.isbn).then(({ items }) => {
          const newBook = {
            thumbnail: items[0].volumeInfo.imageLinks.thumbnail,
            title: book.title,
            rating: book.rating,
            date_read: book.date_read,
            review: book.review,
            published: items[0].volumeInfo.publishedDate,
            authors: items[0].volumeInfo.authors,
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
  }, [currentUser.id]);

  const groupedBooks = journal.reduce((acc, book) => {
    const month = new Date(book.date_read).toLocaleString("default", {
      month: "long",
    });
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(book);
    return acc;
  }, {});

  return (
    <main className="mb-10">
      <div className="mb-4">
        <ProfileTabs page="journal" currentUser={currentUser} />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <ul>
          {Object.keys(groupedBooks).map((month, index) => {
            return (
              <li key={index}>
                <div className="bar w-screen p-1 mb-4">
                  <p className="ml-2">{month}</p>
                </div>

                <ul className="mb-5">
                  {groupedBooks[month].map((book, bookIndex) => {
                    const isLastBook =
                      bookIndex === groupedBooks[month].length - 1;
                    return (
                      <li key={bookIndex}>
                        <JournalCard book={book} />
                        {!isLastBook && (
                          <hr className="bar border-0 clear-both w-full h-0.5 mt-2 mb-2" />
                        )}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}

export default Journal;

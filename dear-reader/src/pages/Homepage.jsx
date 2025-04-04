import { useState, useEffect } from "react";
import { getBestSellers, getRandomQuote } from "../api/api";
import BestSellers from "../components/BestSellersCard";
import Loading from "../components/Loading";
import RandomQuote from "../components/RandomQuote";

function Homepage() {
  const [isLoading, setIsLoading] = useState(false);
  const [trendingList, setTrendingList] = useState([]);
  const [isExiting, setIsExiting] = useState(false);
  const [bookQuote, setBookQuote] = useState({});

  useEffect(() => {
    setIsLoading(true);
    getBestSellers().then((data) => {
      setTrendingList(data.results.books);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getRandomQuote().then((data) => {
      setBookQuote(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  console.log(bookQuote);

  return (
    <main>
      {Object.keys(bookQuote).length === 0 ? null : (
        <div className="mb-8">
          <RandomQuote bookQuote={bookQuote} />
        </div>
      )}
      <p className="font-roboto tracking-widest mt-8">Trending this week</p>

      <div className="flex overflow-x-scroll hide-scroll-bar mt-5 shadow-2xl">
        <div className="flex flex-nowrap ">
          {trendingList.map((book) => {
            return (
              <BestSellers
                book={book}
                key={book.rank}
                setIsExiting={setIsExiting}
              />
            );
          })}
        </div>
      </div>
      <p className="font-roboto tracking-widest mt-8">New from friends</p>
      <div className="flex overflow-x-scroll hide-scroll-bar mt-5 shadow-2xl">
        <div className="flex flex-nowrap ">
          {trendingList.map((book) => {
            return (
              <BestSellers
                book={book}
                key={book.rank}
                setIsExiting={setIsExiting}
              />
            );
          })}
        </div>
      </div>
      <p className="font-roboto tracking-widest mt-8">On your bookshelf</p>
      <div className="flex overflow-x-scroll hide-scroll-bar mt-5 shadow-2xl">
        <div className="flex flex-nowrap ">
          {trendingList.map((book) => {
            return (
              <BestSellers
                book={book}
                key={book.rank}
                setIsExiting={setIsExiting}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Homepage;

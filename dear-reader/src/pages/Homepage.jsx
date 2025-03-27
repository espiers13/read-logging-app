import { useState, useEffect } from "react";
import { getBestSellers } from "../api/api";
import BestSellers from "../components/BestSellersCard";
import Loading from "../components/Loading";

function Homepage() {
  const [isLoading, setIsLoading] = useState(false);
  const [trendingList, setTrendingList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getBestSellers().then((data) => {
      setTrendingList(data.results.books);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="">
      <p className="font-roboto tracking-widest">Trending this week</p>
      <div className="flex overflow-x-scroll hide-scroll-bar mt-5 shadow-2xl">
        <div className="flex flex-nowrap ">
          {trendingList.map((book) => {
            return <BestSellers book={book} key={book.rank} />;
          })}
        </div>
      </div>
    </main>
  );
}

export default Homepage;

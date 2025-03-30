function RandomQuote({ bookQuote }) {
  const { quote, author, year, book } = bookQuote;

  return (
    <main className="font-serif quote rounded-xl shadow-xl p-3 flex flex-col items-center justify-center h-full text-center">
      <h1 className="italic">{`"${quote}"`}</h1>
      <p className="text-sm mt-1">{author}</p>
      <div className="flex justify-center space-x-2 italic text-xs mt-1">
        <p>{book}</p>
        <p>{year}</p>
      </div>
    </main>
  );
}

export default RandomQuote;

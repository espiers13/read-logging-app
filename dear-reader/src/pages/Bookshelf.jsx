import ProfileTabs from "../components/ProfileTabs";

function Bookshelf({ currentUser }) {
  return (
    <main>
      <ProfileTabs page="bookshelf" currentUser={currentUser} />
      <p>Bookshelf</p>
    </main>
  );
}

export default Bookshelf;

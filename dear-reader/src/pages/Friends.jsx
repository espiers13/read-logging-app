import ProfileTabs from "../components/ProfileTabs";

function Friends({ currentUser }) {
  return (
    <main>
      <ProfileTabs page="friends" currentUser={currentUser} />
      <p>Friends</p>
    </main>
  );
}

export default Friends;

import ProfileTabs from "../components/ProfileTabs";
import { getFriendsByUserId, getFriendRequestsByUserId } from "../api/api";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import FriendsCard from "../components/FriendsCard";
import FriendRequestCard from "../components/FriendRequestCard";
import ProfileSearch from "../components/ProfileSearch";

function Friends({ currentUser }) {
  const [friendsList, setFriendsList] = useState([]);
  const [pendingFriends, setPendingFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getFriendRequestsByUserId(currentUser.id).then((data) => {
      setPendingFriends(data);
      setIsLoading(false);
    });
  }, [currentUser]);

  useEffect(() => {
    setIsLoading(true);
    getFriendsByUserId(currentUser.id).then((data) => {
      setFriendsList(data);
      setIsLoading(false);
    });
  }, [currentUser]);

  return (
    <main className="w-full mb-10">
      <ProfileTabs page="friends" currentUser={currentUser} />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mt-3 ml-2">
          {pendingFriends.length > 0 ? (
            <>
              <h2 className="text-lg font-serif">Friend Requests</h2>

              {pendingFriends.map((friend) => {
                console.log(pendingFriends);
                return (
                  <div key={friend.id}>
                    <FriendRequestCard
                      friend={friend}
                      currentUser={currentUser}
                    />
                  </div>
                );
              })}
            </>
          ) : (
            <></>
          )}

          <div>
            {friendsList.length > 0 ? (
              <>
                <p className="text-lg font-serif">Friends</p>
                {friendsList.map((friend, friendIndex) => {
                  const isLastFriend = friendIndex === friendsList.length - 1;
                  return (
                    <div key={friend.id}>
                      <FriendsCard friend={friend} currentUser={currentUser} />
                      {!isLastFriend && (
                        <hr className="bar border-0 clear-both w-full h-0.5 mt-2 mb-2" />
                      )}
                    </div>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
      <div className="mt-2">
        <hr className="bar border-0 clear-both w-full h-0.5 mt-2 mb-2" />
        <p className="text-lg font-serif">Search for a Profile</p>
        <ProfileSearch currentUser={currentUser} />
      </div>
    </main>
  );
}

export default Friends;

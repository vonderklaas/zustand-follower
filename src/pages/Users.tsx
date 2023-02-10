import { useQuery } from '@tanstack/react-query';
import { User } from '../types/User';
import { USERS_URL } from '../api/baseUrl';

import { Link } from 'react-router-dom';

import { useFollowingsStore } from '../store/store';

export const Users = () => {
  const followings = useFollowingsStore((state) => state.followings);
  const followUser = useFollowingsStore((state) => state.followUser);
  const unfollowUser = useFollowingsStore((state) => state.unfollowUser);
  const unfollowAll = useFollowingsStore((state) => state.unfollowAll);

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      return await fetch(USERS_URL).then((res) => res.json());
    },
  });

  return (
    <>
      {isLoading ? (
        <p></p>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '1000px',
            margin: '0 auto',
            padding: '40px',
          }}
        >
          <div>
            <h2>Users</h2>
            {users
              .filter((user: User) => {
                const found = followings.find(
                  (following) => user.id === following.id
                );
                if (!found) return user;
              })
              .map((person: User) => {
                return (
                  <div
                    key={person.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                    }}
                  >
                    <Link to={`/users/${person.id}`}>
                      <span>{person.name}</span>
                    </Link>
                    <button onClick={() => followUser(person)}>Follow</button>
                  </div>
                );
              })}
          </div>
          <div>
            <h2>Following</h2>
            <p>You follow {followings.length} users</p>
            {followings.map((following: User) => {
              return (
                <div
                  key={following.id}
                  style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
                >
                  <Link to={`/users/${following.id}`}>
                    <span>{following.name}</span>
                  </Link>
                  <button onClick={() => unfollowUser(following.id)}>
                    Unfollow
                  </button>
                </div>
              );
            })}
            {followings.length > 3 ? (
              <div>
                <br />
                <hr />
                <br />
                <button onClick={unfollowAll}>Unfollow all</button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

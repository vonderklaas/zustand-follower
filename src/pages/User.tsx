import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { USERS_URL } from '../api/baseUrl';
import { useFollowingsStore } from '../store/store';

export const User = () => {
  const followings = useFollowingsStore((state) => state.followings);
  const followUser = useFollowingsStore((state) => state.followUser);
  const unfollowUser = useFollowingsStore((state) => state.unfollowUser);

  const { id } = useParams();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      return await fetch(`${USERS_URL}/${id}`).then((res) => res.json());
    },
  });

  const renderFollowButton = () => {
    const found = followings.find(
      (following) => parseInt(id!) === following.id
    );
    return found ? (
      <button onClick={() => unfollowUser(parseInt(id!))}>Unfollow</button>
    ) : (
      <button onClick={() => followUser(user)}>Follow</button>
    );
  };

  return (
    <>
      {isLoading ? (
        <p></p>
      ) : (
        <div>
          <h1>{user.name}</h1>
          <p>Email: {user.email}</p>
          <p>Personal Website: {user.website}</p>
          <p>
            Address: {user.address.city},{user.address.street},{' '}
            {user.address.suite}
          </p>
          <br />
          {user && renderFollowButton()}
        </div>
      )}
    </>
  );
};

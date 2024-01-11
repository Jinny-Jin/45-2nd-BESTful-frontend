import React from 'react';
import styled from 'styled-components';
import UserFollowerList from './UserFollowerList/UserFollowerList';

const UserFollower = ({
  userFollower,
  myId,
  setUserCategory,
  myFollowingUser,
  myFollowingUserFetch,
  followerOrFollowing,
}) => {
  const backToFeed = () => {
    setUserCategory(0);
  };

  return (
    <TopContainer>
      <Back onClick={backToFeed}>&lt; Back</Back>
      <Container>
        <Title>{followerOrFollowing ? '팔로워' : '팔로잉'}</Title>
        {(userFollower === undefined || userFollower.length === 0) && (
          <None>
            {followerOrFollowing ? '팔로워' : '팔로잉 유저'}가 없습니다
          </None>
        )}
        {userFollower !== undefined &&
          userFollower.length > 0 &&
          userFollower.map(follower => (
            <UserFollowerList
              key={follower.id}
              follower={follower}
              myId={myId}
              myFollowingUser={myFollowingUser}
              myFollowingUserFetch={myFollowingUserFetch}
            />
          ))}
      </Container>
    </TopContainer>
  );
};

export default UserFollower;

const TopContainer = styled.div`
  margin-bottom: 50px;
  width: 65%;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 60px 60px 60px;
`;

const Title = styled.div`
  margin-bottom: 30px;
  font-weight: bold;
  font-size: 18px;
`;

const None = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const Back = styled.div`
  padding-bottom: 40px;
  width: 50px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    color: ${props => props.theme.style.orange};
  }
`;

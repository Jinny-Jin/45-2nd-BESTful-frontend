import React from 'react';
import styled from 'styled-components';
import UserFollowerList from './UserFollowerList/UserFollowerList';
import { useDispatch, useSelector } from 'react-redux';

const UserFollower = ({
  userFollower,
  myId,
  myFollowingUser,
  myFollowingUserFetch,
}) => {
  const dispatch = useDispatch();
  const userFollowOrFollowing = useSelector(state => state.followOrFollowing);

  const backToFeed = () => {
    dispatch({ type: 'CHOOSE_USER_CATEGORY', catNumb: 0 });
  };

  return (
    <TopContainer>
      <Back onClick={backToFeed}>&lt; Back</Back>
      <Container>
        <Title>{userFollowOrFollowing}</Title>
        {(userFollower === undefined || userFollower.length === 0) && (
          <None>
            {userFollowOrFollowing === '팔로워'
              ? '회원님을 팔로우하는 사람'
              : '회원님이 팔로우하는사람'}
            이 없습니다
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

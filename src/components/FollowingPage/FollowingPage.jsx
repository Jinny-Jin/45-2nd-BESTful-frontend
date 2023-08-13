import React from 'react';
import styled from 'styled-components';
import FollowingList from './FollowingList/FollowingList';

const FollowingPage = ({ followingData, me, followingFetch }) => {
  return (
    <TopContainer>
      <Container>
        <Title>팔로잉</Title>
        <List>
          {(followingData === undefined || followingData.length === 0) && (
            <None>팔로우 한 유저가 없습니다</None>
          )}
          {followingData !== undefined &&
            followingData.length > 0 &&
            followingData.map(following => (
              <FollowingList
                key={following.id}
                name={following.userName}
                src={following.profileImage}
                id={following.id}
                following={following}
                meId={me.id}
                followingFetch={followingFetch}
              />
            ))}
        </List>
      </Container>
    </TopContainer>
  );
};

export default FollowingPage;

const TopContainer = styled.div`
  width: 100%;
  padding: 60px;
`;

const Container = styled.div``;
const Title = styled.div`
  margin-bottom: 30px;
  font-weight: bold;
  font-size: 18px;
`;

const List = styled.div``;

const None = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

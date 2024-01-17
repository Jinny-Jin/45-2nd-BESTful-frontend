import React from 'react';
import styled from 'styled-components';
import FollowerList from './FollowerList/FollowerList';

const FollowerPage = ({ followerData, usersIFollow, followerOrFollowing }) => {
  return (
    <TopContainer>
      <Title>{followerOrFollowing ? '팔로워' : '팔로잉'}</Title>
      <div>
        {(followerData === undefined || followerData.length === 0) && (
          <None>
            {followerOrFollowing ? '팔로워' : '팔로잉 유저'}가 없습니다
          </None>
        )}
        {followerData !== undefined &&
          followerData.length > 0 &&
          followerData.map(follower => (
            <FollowerList
              key={follower.id}
              follower={follower}
              usersIFollow={usersIFollow}
              followerOrFollowing={followerOrFollowing}
            />
          ))}
      </div>
    </TopContainer>
  );
};

export default FollowerPage;

const TopContainer = styled.div`
  width: 100%;
  padding: 60px;
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

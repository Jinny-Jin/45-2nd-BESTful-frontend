import React from 'react';
import styled from 'styled-components';
import FollowerList from './FollowerList/FollowerList';
import { useSelector } from 'react-redux';

const FollowerPage = ({ followerData, usersIFollow }) => {
  const followOrFollowing = useSelector(state => state.followOrFollowing);

  return (
    <TopContainer>
      <Title>{followOrFollowing}</Title>
      <div>
        {(followerData === undefined || followerData.length === 0) && (
          <None>
            {followOrFollowing === '팔로워'
              ? '회원님을 팔로우하는 사람'
              : '회원님이 팔로우하는사람'}
            가 없습니다
          </None>
        )}
        {followerData !== undefined &&
          followerData.length > 0 &&
          followerData.map(follower => (
            <FollowerList
              key={follower.id}
              follower={follower}
              usersIFollow={usersIFollow}
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

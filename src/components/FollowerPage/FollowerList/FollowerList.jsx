import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProfileImage from '../../ProfileImage/ProfileImage';
import FollowingButton from '../../followingButton/FollowingButton';
import fetchApi from '../../../utils/functions';
import { useSelector } from 'react-redux';

const FollowerList = ({ follower, usersIFollow }) => {
  const [followOrNot, setFollowOrNot] = useState(false);
  const { userName, profileImage, id } = follower;
  const followOrFollowing = useSelector(state => state.followOrFollowing);

  const navigate = useNavigate();

  const moveToUserPage = () => {
    navigate(`/users/${id}`);
  };

  const followUser = () => {
    fetchApi(`/follower`, null, {
      method: `${followOrNot ? 'DELETE' : 'POST'}`,
      body: JSON.stringify({
        followedId: id,
      }),
    });
  };

  useEffect(() => {
    if (followOrFollowing === '팔로워') {
      for (let i = 0; i < usersIFollow.length; i++) {
        if (usersIFollow[i].id === id) {
          setFollowOrNot(true);
        }
      }
    }
    if (followOrFollowing !== '팔로워') {
      return;
    }
  }, [followOrFollowing, usersIFollow]);
  //날 팔로우 한 유저들을 내가 팔로우 했는지 여부 판단

  const handleBtn = () => {
    followUser();
    setFollowOrNot(prev => !prev);
  };

  return (
    <Container>
      <FollowerInfo onClick={moveToUserPage}>
        <ProfileImage src={profileImage} width={40} />
        <FollowerName>{userName}</FollowerName>
      </FollowerInfo>
      <FollowingButton handleBtn={handleBtn} followOrNot={followOrNot} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0px;
`;

const FollowerInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FollowerName = styled.div`
  margin-left: 10px;
  font-weight: bold;
`;

export default FollowerList;

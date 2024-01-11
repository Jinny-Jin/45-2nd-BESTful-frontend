import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProfileImage from '../../ProfileImage/ProfileImage';
import FollowingButton from '../../followingButton/FollowingButton';
import fetchApi from '../../../utils/functions';

const UserFollowerList = ({
  follower,
  myFollowingUser,
  myId,
  myFollowingUserFetch,
}) => {
  const [followOrNot, setFollowOrNot] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const { userName, profileImage, id } = follower;

  const navigate = useNavigate();

  const onClickUserFollower = () => {
    navigate(`/users/${id}`);
  };

  const followUser = async () => {
    await fetchApi(`/follower`, {
      method: `${followOrNot ? 'DELETE' : 'POST'}`,
      body: JSON.stringify({
        followedId: id,
      }),
    });

    myFollowingUserFetch();
  };

  const handleBtn = () => {
    followUser();
    setFollowOrNot(prev => !prev);
  };

  useEffect(() => {
    if (id === myId) {
      setHideButton(true);
    }
  }, []);

  useEffect(() => {
    for (let i = 0; i < myFollowingUser?.length; i++) {
      if (myFollowingUser[i].id === id) {
        setFollowOrNot(true);
      }
    }
  }, [myFollowingUser]);

  return (
    <Container>
      <FollowerInfo
        onClick={() => {
          onClickUserFollower();
        }}
      >
        <ProfileImage src={profileImage} width={40} />
        <FollowerName>{userName}</FollowerName>
      </FollowerInfo>
      {hideButton ? (
        ''
      ) : (
        <FollowingButton handleBtn={handleBtn} followOrNot={followOrNot} />
      )}
    </Container>
  );
};

export default UserFollowerList;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

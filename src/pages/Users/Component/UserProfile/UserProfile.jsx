import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProfileImage from '../../../../components/ProfileImage/ProfileImage';
import FollowingButton from '../../../../components/followingButton/FollowingButton';
import fetchApi from '../../../../utils/functions';

const UserProfile = ({
  user,
  userFollower,
  userFollowing,
  myFollowingUser,
  myFollowingUserFetch,
  setFollowerOrFollowing,
  setUserCategory,
}) => {
  const [followState, setFollowState] = useState(false);
  const { profileImageUrl, id, userName, bio } = user;

  const handleFollowerOrFollowing = x => {
    setUserCategory(1);
    setFollowerOrFollowing(x);
  };

  const followUser = async () => {
    await fetchApi(`/follower`, {
      method: `${followState ? 'DELETE' : 'POST'}`,
      body: JSON.stringify({
        followedId: id,
      }),
    });

    myFollowingUserFetch();
  };

  const handleFollowOrNot = () => {
    followUser();
    setFollowState(prev => !prev);
  };

  useEffect(() => {
    for (let i = 0; i < myFollowingUser.length; i++) {
      if (myFollowingUser[i].id === id) {
        setFollowState(true);
      }
    }
  }, [myFollowingUser]);

  return (
    <Container>
      <ProfileImage src={profileImageUrl} width={100} />
      <ProfileBox>
        <NickName>{userName}</NickName>
        <li>
          <FollowButton
            onClick={() => {
              handleFollowerOrFollowing(true);
            }}
          >
            <FollowNumber>{userFollower.length}</FollowNumber>
            follower
          </FollowButton>
          <FollowButton
            onClick={() => {
              handleFollowerOrFollowing(false);
            }}
          >
            <FollowNumber>{userFollowing.length}</FollowNumber>
            following
          </FollowButton>
        </li>
        <FollowingButton
          handleBtn={handleFollowOrNot}
          followOrNot={followState}
        />
        <Bio>{bio}</Bio>
      </ProfileBox>
    </Container>
  );
};

export default UserProfile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
  border: 1px solid none;
  border-radius: 10px;
  width: 30%;
  height: 50%;
  background-color: #fff9f4;
`;

const ProfileBox = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  list-style-type: none;
`;

const NickName = styled.li`
  font-size: 21px;
  font-weight: bold;
`;

const FollowButton = styled.button`
  margin: 30px 30px;
  border: none;
  background-color: transparent;
  font-size: 15px;
  color: ${props => props.theme.style.orange};

  &:hover {
    cursor: pointer;
  }
`;

const FollowNumber = styled.p`
  color: black;
  font-size: 21px;
`;

const Bio = styled.li`
  padding-top: 10%;
  width: 70%;
  font-size: 14px;
`;

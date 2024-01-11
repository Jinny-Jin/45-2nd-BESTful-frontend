import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserContentFeed from './Component/UserContentFeed/UserContentFeed';
import UserFollower from '../../components/UserFollower/UserFollower';
import UserProfile from './Component/UserProfile/UserProfile';
import fetchApi from '../../utils/functions';

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [userFollower, setUserFollower] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [myData, setMyData] = useState([]);
  const [myFollowingUser, setMyFollowingUser] = useState([]);
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userCategory, setUserCategory] = useState(0);
  const [followerOrFollowing, setFollowerOrFollowing] = useState(undefined);

  const params = useParams();
  const userId = params.id;
  const myId = myData.id;

  const navigate = useNavigate();

  // 유저 데이터 받아오기
  const userDataFetch = async () => {
    try {
      await fetchApi(`/users/${userId}`, setUserData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // 팔로워 데이터 받아오기
  const userFollowerFetch = () =>
    fetchApi(`/follower/following/${userId}`, setUserFollower);

  // 팔로잉 데이터 받아오기
  const userFollowingFetch = () =>
    fetchApi(`/follower/${userId}`, setUserFollowing);

  // 내 정보 가져오기
  const myDataFetch = () => fetchApi(`/users`, setMyData);

  // 내가 팔로우하는 유저들 정보 가져오기
  const myFollowingUserFetch = () =>
    fetchApi(`/follower/${myData.id}`, setMyFollowingUser);

  // 유저 피드 정보 가져오기
  const feedGet = async () => fetchApi(`/feeds/users/${userId}`, setFeed);

  useEffect(() => {
    myDataFetch();
    myFollowingUserFetch();
  }, []);

  useEffect(() => {
    userDataFetch();
    userFollowerFetch();
    userFollowingFetch();
    feedGet();
    setUserCategory(0);
    if (parseInt(userId) === parseInt(myData.id)) {
      navigate('/mypage');
    }
  }, [userId]);

  const categoryList = {
    0: <UserContentFeed feed={feed} />,
    1: (
      <UserFollower
        userFollower={followerOrFollowing ? userFollower : userFollowing}
        myId={myId}
        myFollowingUser={myFollowingUser}
        setUserCategory={setUserCategory}
        myFollowingUserFetch={myFollowingUserFetch}
        followerOrFollowing={followerOrFollowing}
      />
    ),
  };

  if (loading) return <div>로딩중입니다</div>;

  return (
    <Container userCategory={userCategory}>
      <UserProfile
        user={userData}
        userFollower={userFollower}
        userFollowing={userFollowing}
        myFollowingUser={myFollowingUser}
        myFollowingUserFetch={myFollowingUserFetch}
        setFollowerOrFollowing={setFollowerOrFollowing}
        setUserCategory={setUserCategory}
      />
      {categoryList[userCategory]}
    </Container>
  );
};

export default Users;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 70px;
`;

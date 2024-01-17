import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MyPageCategory from './Component/MyPageCategory/MyPageCategory';
import ContentProfile from './Component/ContentProfile/ContentProfile';
import FollowerPage from '../../components/FollowerPage/FollowerPage';
import ContentPosting from './Component/ContentPosting/ContentPosting';
import ProfileModify from './Component/ProfileModify/ProfileModify';
import fetchApi from '../../utils/functions';

const Mypage = () => {
  const [myData, setMyData] = useState([]);
  const [myFollowerData, setMyFollowerData] = useState([]);
  const [myFollowingData, setMyFollowingData] = useState([]);
  const [feed, setFeed] = useState([]);
  const [like, setLike] = useState([]);
  const [myPageCategory, setMyPageCategory] = useState(0);
  const [feedOrLike, setFeedOrLike] = useState(true);
  const [followerOrFollowing, setFollowerOrFollowing] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const myId = myData.id;

  // 내 정보 가져오기
  const myDataFetch = async () => {
    try {
      await fetchApi(`/users`, setMyData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // 내 팔로워 가져오기
  const myFollowerFetch = () => {
    fetchApi(`/follower/following/${myId}`, setMyFollowerData);
  };

  // 내가 팔로우 한 유저 가져오기
  const myFollowingFetch = () => {
    fetchApi(`/follower/${myId}`, setMyFollowingData);
  };

  // 내가 올린 피드 글 가져오기
  const feedGet = () => {
    fetchApi(`/feeds/users/${myId}`, setFeed);
  };

  // 내가 좋아요 누른 글 가져오기
  const likeGet = () => {
    fetchApi(`/feeds/likes/${myId}`, setLike);
  };

  useEffect(() => {
    myDataFetch();
    feedGet();
    likeGet();
  }, []);

  useEffect(() => {
    if (!myId) return;

    myFollowerFetch();
    myFollowingFetch();
  }, [myId]);

  const myPageCategoryList = {
    0: (
      <ContentPosting
        feedOrLike={feedOrLike}
        feed={feedOrLike ? feed : like}
        feedGet={feedGet}
      />
    ),
    1: (
      <ProfileModify
        profile={myData}
        myDataFetch={myDataFetch}
        setMyPageCategory={setMyPageCategory}
        setFeedOrLike={setFeedOrLike}
      />
    ),
    2: (
      <FollowerPage
        followerData={followerOrFollowing ? myFollowerData : myFollowingData}
        usersIFollow={followerOrFollowing ? myFollowingData : null}
        followingFetch={myFollowingFetch}
        followerOrFollowing={followerOrFollowing}
      />
    ),
  };

  if (loading) return <div>로딩중...</div>;

  return (
    <TopContainer>
      <MyPageCategory
        feedOrLike={feedOrLike}
        myPageCategory={myPageCategory}
        setMyPageCategory={setMyPageCategory}
        setFeedOrLike={setFeedOrLike}
      />
      <Container>
        <ContentProfile
          profile={myData}
          followerData={myFollowerData}
          followingData={myFollowingData}
          myDataFetch={myDataFetch}
          setMyPageCategory={setMyPageCategory}
          setFollowerOrFollowing={setFollowerOrFollowing}
        />
        {myPageCategoryList[myPageCategory]}
      </Container>
    </TopContainer>
  );
};

export default Mypage;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

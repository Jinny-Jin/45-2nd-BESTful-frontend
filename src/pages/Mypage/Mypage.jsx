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

  const myId = myData?.id;

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

  const handleCategory = (category = null, feed = null, follower = null) => {
    if (category !== null) {
      setMyPageCategory(category);
    }
    if (feed !== null) {
      setFeedOrLike(feed);
    }
    if (follower !== null) {
      setFollowerOrFollowing(follower);
    }
  };

  useEffect(() => {
    likeGet();
    myFollowerFetch();
  }, []);

  useEffect(() => {
    feedGet();
  }, [feed]);

  useEffect(() => {
    myDataFetch();
    myFollowingFetch();
  }, [myData, myFollowingData]);

  const myPageCategoryList = {
    0: (
      <ContentPosting feedOrLike={feedOrLike} feed={feedOrLike ? feed : like} />
    ),
    1: (
      <ProfileModify
        myData={myData}
        setMyData={setMyData}
        handleCategory={handleCategory}
      />
    ),
    2: (
      <FollowerPage
        followerData={followerOrFollowing ? myFollowerData : myFollowingData}
        usersIFollow={followerOrFollowing ? myFollowingData : null}
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
        handleCategory={handleCategory}
      />
      <Container>
        <ContentProfile
          myData={myData}
          followerNumber={myFollowerData.length}
          followingNumber={myFollowingData.length}
          handleCategory={handleCategory}
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

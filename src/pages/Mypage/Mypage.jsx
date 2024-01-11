import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MyPageCategory from './Component/MyPageCategory/MyPageCategory';
import { API_ADDRESS } from '../../utils/API_ADDRESS';
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
    const url = `${API_ADDRESS}/follower/following/${myData.id}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: localStorage.getItem('resToken'),
      },
    })
      .then(res => res.json())
      .then(res => {
        setMyFollowerData(res);
      });
  };

  // 내가 팔로우 한 유저 가져오기
  const myFollowingFetch = () => {
    const url = `${API_ADDRESS}/follower/${myData.id}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: localStorage.getItem('resToken'),
      },
    })
      .then(res => res.json())
      .then(res => {
        setMyFollowingData(res);
      });
  };

  // 내가 올린 피드 글 가져오기
  const feedGet = () => {
    const url = `${API_ADDRESS}/feeds/users/${myData.id}`;

    fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
      .then(res => res.json())
      .then(feed => {
        setFeed(feed);
      });
  };

  // 내가 좋아요 누른 글 가져오기
  const likeGet = () => {
    const url = `${API_ADDRESS}/feeds/likes/${myData.id}`;

    fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
      .then(res => res.json())
      .then(like => {
        setLike(like);
      });
  };

  useEffect(() => {
    myDataFetch();
    feedGet();
    likeGet();
  }, []);

  useEffect(() => {
    if (!myData.id) return;

    myFollowerFetch();
    myFollowingFetch();
  }, [myData.id]);

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
        followingData={followerOrFollowing ? myFollowingData : null}
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

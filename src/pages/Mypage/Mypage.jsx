import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MyPageCategory from './Component/MyPageCategory/MyPageCategory';
import ContentProfile from './Component/ContentProfile/ContentProfile';
import FollowerPage from '../../components/FollowerPage/FollowerPage';
import ContentPosting from './Component/ContentPosting/ContentPosting';
import ProfileModify from './Component/ProfileModify/ProfileModify';
import fetchApi from '../../utils/functions';
import { useSelector } from 'react-redux';

const Mypage = () => {
  const [myData, setMyData] = useState([]);
  const [myFollowerData, setMyFollowerData] = useState([]);
  const [myFollowingData, setMyFollowingData] = useState([]);
  const [feed, setFeed] = useState([]);
  const [like, setLike] = useState([]);
  const [loading, setLoading] = useState(true);

  const followOrFollowing = useSelector(state => state.followOrFollowing);
  const myPageCategoryNumber = useSelector(state => state.myPageCategoryNumber);
  const feedOrLike = useSelector(state => state.feedOrLike);
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
    0: <ContentPosting feed={feedOrLike === '피드' ? feed : like} />,
    1: <ProfileModify myData={myData} setMyData={setMyData} />,
    2: (
      <FollowerPage
        followerData={
          followOrFollowing === '팔로워' ? myFollowerData : myFollowingData
        }
        usersIFollow={followOrFollowing === '팔로워' ? myFollowingData : null}
      />
    ),
  };

  if (loading) return <div>로딩중...</div>;

  return (
    <TopContainer>
      <MyPageCategory />
      <Container>
        <ContentProfile
          myData={myData}
          followerNumber={myFollowerData.length}
          followingNumber={myFollowingData.length}
        />
        {myPageCategoryList[myPageCategoryNumber]}
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

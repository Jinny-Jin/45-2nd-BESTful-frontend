import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const MyPageCategory = () => {
  const dispatch = useDispatch();
  const myPageCategory = useSelector(state => state.myPageCategoryNumber);
  const feedOrLike = useSelector(state => state.feedOrLike);

  return (
    <Navigation>
      <UL>
        <List>
          <Button
            onClick={() => {
              dispatch({
                type: 'CHOOSE_MYPAGE_CATEGORY',
                myCatNumb: 0,
                feedOrLike: '피드',
              });
            }}
          >
            <PostingButton
              feedOrLike={feedOrLike}
              myPageCategory={myPageCategory}
            >
              게시글
            </PostingButton>
          </Button>
        </List>
        <List>
          <Button
            onClick={() => {
              dispatch({
                type: 'CHOOSE_MYPAGE_CATEGORY',
                myCatNumb: 0,
                feedOrLike: '좋아요',
              });
            }}
          >
            <LikeButton feedOrLike={feedOrLike} myPageCategory={myPageCategory}>
              좋아요
            </LikeButton>
          </Button>
        </List>
      </UL>
    </Navigation>
  );
};

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 15%;
  height: 70px;
`;

const UL = styled.ul`
  display: flex;
`;

const List = styled.li`
  width: 70px;
  margin-right: 10px;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  font-size: 15px;
  font-weight: bold;

  &:hover {
    border: 1px solid beige;
    outline: none;
    background-color: #ff5d2b12;
  }
`;

const PostingButton = styled.div`
  color: ${props =>
    props.myPageCategory === 0 && props.feedOrLike === '피드'
      ? props.theme.style.orange
      : 'black'};
`;

const LikeButton = styled.div`
  color: ${props =>
    props.myPageCategory === 0 && props.feedOrLike === '좋아요'
      ? props.theme.style.orange
      : 'black'};
`;

export default MyPageCategory;

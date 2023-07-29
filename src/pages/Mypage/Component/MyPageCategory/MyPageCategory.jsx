import React from 'react';
import styled from 'styled-components';

const MyPageCategory = ({
  feedOrLike,
  myPageCategory,
  setMyPageCategory,
  setFeedOrLike,
}) => {
  const handleFeedContent = x => {
    setMyPageCategory(0);
    setFeedOrLike(x);
  };

  return (
    <Navigation>
      <UL>
        <List>
          <Button
            onClick={() => {
              handleFeedContent(true);
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
              handleFeedContent(false);
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
    props.myPageCategory === 0 &&
    (props.feedOrLike ? props.theme.style.orange : 'black')};
`;

const LikeButton = styled.div`
  color: ${props =>
    props.myPageCategory === 0 &&
    (props.feedOrLike ? 'black' : props.theme.style.orange)};
`;

export default MyPageCategory;

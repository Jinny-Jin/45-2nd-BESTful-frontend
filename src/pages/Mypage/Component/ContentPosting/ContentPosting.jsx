import React from 'react';
import styled from 'styled-components';
import FeedImage from '../FeedImage/FeedImage';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ContentPosting = ({ feed }) => {
  const navigate = useNavigate();
  const feedOrLike = useSelector(state => state.feedOrLike);

  return (
    <Container>
      <Posting>
        {(feed === undefined || feed.length === 0) && (
          <PostingNone>
            {feedOrLike === '피드' ? (
              <span
                className="firstPost"
                onClick={() => navigate('/post-upload')}
              >
                + 첫 게시물을 올려보세요!
              </span>
            ) : (
              '+ 게시물을 좋아요 해보세요!'
            )}
          </PostingNone>
        )}
        {feed !== undefined &&
          feed.length > 0 &&
          feed.map(posting => {
            // contentsUrl의 min id 값의 index 반환
            let minId = posting.contentUrls[0].id;
            let minIndex = 0;
            for (let i = 0; i < posting.contentUrls.length; i++) {
              if (minId > posting.contentUrls[i].id) {
                minId = posting.contentUrls[i].id;
                minIndex = i;
              }
            }
            return (
              <FeedImage
                key={posting.feedId}
                image={posting.contentUrls[minIndex].contentUrl}
                feedId={posting.feedId}
              />
            );
          })}
      </Posting>
    </Container>
  );
};

export default ContentPosting;

const Container = styled.div`
  width: 65%;
`;

const Posting = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const PostingNone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dotted orange;
  width: 100%;
  height: 200px;
  color: lightgray;
  .firstPost {
    cursor: pointer;
  }
`;

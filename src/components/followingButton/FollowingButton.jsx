import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
// import theme from '../../../styles/theme';

const FollowingButton = ({ handleBtn, followOrNot }) => {
  return (
    <FollowBtn onClick={handleBtn} follow={followOrNot}>
      {followOrNot ? '팔로잉' : '팔로우'}
    </FollowBtn>
  );
};

const FollowBtn = styled.button`
  width: 80px;
  height: 30px;
  border-radius: 5px;
  background-color: ${props => (props.follow ? theme.white : theme.orange)};
  outline: none;
  border: ${props => (props.follow ? '1px solid black' : 'none')};
  font-weight: bold;
  font-size: ${props => props.size};
  color: ${props => (props.follow ? theme.black : theme.white)};
`;

export default FollowingButton;

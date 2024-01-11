import React from 'react';
import styled from 'styled-components';

const ProfileImage = ({ src, width }) => {
  return (
    <div className="profileImage">
      <Image
        alt="프로필 이미지"
        src={src ? src : '/images/logo/noProfile.png'}
        wid={`${width}px`}
      />
    </div>
  );
};

const Image = styled.img`
  width: ${props => props.wid};
  height: ${props => props.wid};
  border-radius: 50%;
  object-fit: cover;
`;

export default ProfileImage;

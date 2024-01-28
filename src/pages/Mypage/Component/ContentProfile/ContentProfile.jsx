import React from 'react';
import { useState, useRef } from 'react';
import styled from 'styled-components';
import { faCamera as camera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileImage from '../../../../components/ProfileImage/ProfileImage';
import fetchApi from '../../../../utils/functions';
import { useDispatch } from 'react-redux';

const ContentProfile = ({ myData, followerNumber, followingNumber }) => {
  const [profileImage, setProfileImage] = useState(myData?.profileImageUrl);
  const { userName, bio } = myData;
  const dispatch = useDispatch();

  const profileImageInput = useRef(null);

  const changeImage = image => {
    let formData = new FormData();
    formData.append('profileImage', image);

    try {
      fetchApi(`/users/image`, null, {
        method: 'POST',
        body: formData,
      });

      alert('프로필 이미지가 수정되었습니다');
    } catch (error) {
      console.log('에러 발생', error);
    }
  };

  const profileChange = e => {
    const { files } = e.target;

    if (files[0]) {
      setProfileImage(files[0]);
      changeImage(files[0]);
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImage(reader.result);
      }
    };
    reader.readAsDataURL(files[0]);
  };

  return (
    <Container>
      <form>
        <CameraBox>
          <ProfileImage
            src={profileImage}
            width={100}
            alt="프로필 이미지"
            onClick={() => {
              profileImageInput.current.click();
            }}
          />
          <ChangeImage>
            <label for="Imaging">
              <ImageUpload>
                <FontAwesomeIcon icon={camera} size="xl" />
              </ImageUpload>
            </label>
            <UploadInput
              type="file"
              accept="image/*"
              formEncType="multipart/form-data"
              onChange={profileChange}
              ref={profileImageInput}
              name="profile_img"
              id="Imaging"
            />
          </ChangeImage>
        </CameraBox>
      </form>
      <ProfileBox>
        <NickName>{userName}</NickName>
        <ButtonBox>
          <FollowButton
            onClick={() => {
              dispatch({
                type: 'CHOOSE_MYPAGE_CATEGORY',
                myCatNumb: 2,
                feedOrLike: null,
              });
              dispatch({ type: 'SWITCH', userFollowOrFollowing: '팔로워' });
            }}
          >
            <FollowNumber>{followerNumber}</FollowNumber>
            follower
          </FollowButton>
          <FollowButton
            onClick={() => {
              dispatch({
                type: 'CHOOSE_MYPAGE_CATEGORY',
                myCatNumb: 2,
                feedOrLike: null,
              });
              dispatch({ type: 'SWITCH', userFollowOrFollowing: '팔로잉' });
            }}
          >
            <FollowNumber>{followingNumber}</FollowNumber>
            following
          </FollowButton>
        </ButtonBox>
        <ChangeProfile
          onClick={() => {
            dispatch({
              type: 'CHOOSE_MYPAGE_CATEGORY',
              myCatNumb: 1,
              feedOrLike: null,
            });
          }}
        >
          프로필 편집
        </ChangeProfile>
        <Bio>{bio}</Bio>
      </ProfileBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 30%;
  height: 600px;
`;

const CameraBox = styled.div`
  position: relative;
`;

const ChangeImage = styled.div`
  position: absolute;
  right: 10px;
  bottom: 0;
`;

const ImageUpload = styled.div`
  color: ${props => props.theme.style.orange};

  &:hover {
    color: white;
    cursor: pointer;
  }
`;

const UploadInput = styled.input`
  display: none;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

const NickName = styled.div`
  font-size: 21px;
  font-weight: bold;
`;

const ButtonBox = styled.div``;

const FollowButton = styled.button`
  padding: 30px 30px;
  border: none;
  background-color: transparent;
  font-size: 15px;
  color: ${props => props.theme.style.orange};

  &:hover {
    cursor: pointer;
  }
`;

const FollowNumber = styled.div`
  color: black;
  font-size: 21px;
`;

const ChangeProfile = styled.button`
  border: none;
  border-radius: 3px;
  padding: 5px 7px;
  background-color: ${props => props.theme.style.orange};
  color: white;
  font-size: 15px;

  &:hover {
    cursor: pointer;
  }
`;

const Bio = styled.div`
  padding-top: 10%;
  width: 70%;
  font-size: 14px;
`;

export default ContentProfile;

import React from 'react';
import { useState, useRef } from 'react';
import styled from 'styled-components';
import { faCamera as camera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileImage from '../../../../components/ProfileImage/ProfileImage';
import { fetchApi } from '../../../../utils/functions';

const ContentProfile = ({
  profile,
  followerData,
  followingData,
  myDataFetch,
  setMyPageCategory,
  setFollowerOrFollowing,
}) => {
  const [profileImage, setProfileImage] = useState(profile?.profileImageUrl);
  const profileImageInput = useRef(null);

  const handleFollowrFollowingComponent = x => {
    setMyPageCategory(2);
    setFollowerOrFollowing(x);
  };

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

    myDataFetch();
  };

  const profileChange = e => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
      changeImage(e.target.files[0]);
    } else {
      setProfileImage(profile?.profileImageUrl);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
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
        <NickName>{profile?.userName}</NickName>
        <ButtonBox>
          <FollowButton
            onClick={() => {
              handleFollowrFollowingComponent(true);
            }}
          >
            <FollowNumber>{followerData.length}</FollowNumber>
            follower
          </FollowButton>
          <FollowButton
            onClick={() => {
              handleFollowrFollowingComponent(false);
            }}
          >
            <FollowNumber>{followingData.length}</FollowNumber>
            following
          </FollowButton>
        </ButtonBox>
        <ChangeProfile onClick={() => {}}>프로필 편집</ChangeProfile>
        <Bio>{profile?.bio}</Bio>
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

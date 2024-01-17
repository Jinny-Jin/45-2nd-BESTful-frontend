import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { fetchApi } from '../../../../utils/functions';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  height: 150,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '5px',
  boxShadow: 24,
  p: 3,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const changeBtn = {
  backgroundColor: '#FE4600',

  '&:hover': {
    backgroundColor: '#222222',
  },
};

const cancelBtn = {
  backgroundColor: '#222222',

  '&:hover': {
    backgroundColor: '#FE4600',
  },
};

const ProfileModify = ({
  profile,
  myDataFetch,
  setMyPageCategory,
  setFeedOrLike,
}) => {
  const [textLength, setTextLength] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [myInfo, setMyInfo] = useState({
    mySex: profile?.sex || 'null',
    myPhoneNumber: profile?.cellphone || 'none',
    nickname: profile?.userName || '닉네임을 입력해주세요',
    myBio: null,
  });
  const { mySex, myPhoneNumber, nickname, myBio } = myInfo;

  const handleModal = e => {
    setIsOpen(e);
  };

  const handleInputChange = (key, e) => {
    const { value } = e.target;

    if (value !== null || value !== '') {
      setMyInfo(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleRadio = e => {
    setMyInfo(prev => ({ ...prev, mySex: e }));
  };

  const handleCancelBtn = () => {
    setMyPageCategory(0);
    setFeedOrLike(true);
  };

  const acceptNumber = e => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  };

  const activateButton = myPhoneNumber !== null && mySex !== '';

  const postProfile = () => {
    fetchApi(`/users/edit`, null, {
      method: 'PATCH',
      body: JSON.stringify({
        userName: nickname,
        cellphone: myPhoneNumber,
        sex: mySex,
        bio: myBio,
      }),
    });
    myDataFetch();
  };

  return (
    <Container>
      <ProfileForm>
        <ModifyBox>
          <div>이메일</div>
          <span>{profile?.email}</span>
        </ModifyBox>
        <ModifyBox>
          <label for="userName">유저 네임</label>
          <ProfileInput
            type="text"
            id="userName"
            placeholder={`${nickname}`}
            onChange={e => handleInputChange('nickname', e)}
          />
        </ModifyBox>
        <ModifyBox>
          <label for="cellphone">휴대폰 번호</label>
          <ProfileInput
            type="text"
            id="cellphone"
            placeholder={myPhoneNumber}
            onChange={e => handleInputChange('myPhoneNumber', e)}
            onInput={acceptNumber}
          />
        </ModifyBox>
        <Alert>- 를 제외하고 입력하시오</Alert>
        <Alert>* 필수 입력</Alert>

        <ModifyBox>
          <span>성별</span>
          <div>
            <input
              type="radio"
              id="male"
              name="gender"
              checked={mySex === '1'}
              onClick={() => handleRadio('1')}
            />
            <label for="male">남성</label>
            <input
              type="radio"
              id="female"
              name="gender"
              checked={mySex === '2'}
              onClick={() => handleRadio('2')}
            />
            <label for="female">여성</label>
            <input
              type="radio"
              id="none"
              name="gender"
              checked={mySex === 'null'}
              onClick={() => handleRadio('null')}
            />
            <label for="none">선택하지 않음</label>
          </div>
        </ModifyBox>
        <Alert>* 필수 선택</Alert>
        <ModifyBox>
          <Biography>
            <label for="bio">바이오그래피</label>
            <TextArea
              id="bio"
              placeholder="상태 메세지를 입력하세요"
              maxLength="300"
              onChange={e => {
                const { value } = e.target;

                setTextLength(value.length);
                setMyInfo(prev => ({ ...prev, myBio: value }));
              }}
            />
            <span>{textLength}/300</span>
          </Biography>
        </ModifyBox>
        <SubmitDiv>
          <SubmitButton
            disabled={!activateButton}
            onClick={() => {
              handleModal(true);
            }}
          >
            변경 확인
          </SubmitButton>
          <Modal open={isOpen}>
            <Box sx={modalStyle}>
              <Typography sx={{ mt: 2 }}>회원 정보를 수정할까요?</Typography>
              <Stack direction="row" spacing={3}>
                <Button
                  variant="contained"
                  sx={changeBtn}
                  onClick={() => {
                    postProfile();
                  }}
                >
                  네
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleModal(false);
                  }}
                  sx={cancelBtn}
                >
                  아니오
                </Button>
              </Stack>
            </Box>
          </Modal>

          <CancelButton onClick={handleCancelBtn}>취소</CancelButton>
        </SubmitDiv>
      </ProfileForm>
    </Container>
  );
};

export default ProfileModify;

const Container = styled.div`
  display: flex;
  width: 65%;
`;

const ProfileForm = styled.div`
  margin: auto;
  width: 100%;
  height: 500px;
`;

const ModifyBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding-bottom: 10px;
  width: 100%;
`;

const ProfileInput = styled.input`
  border: none;
  background-color: transparent;
  width: 300px;
  height: 30px;

  &::placeholder {
    text-align: end;
  }
`;

const Biography = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  span {
    text-align: end;
    font-size: 14px;
    color: ${props => props.theme.style.middleGrey};
  }
`;

const TextArea = styled.textarea`
  border: none;
  background-color: transparent;
  margin: 20px 0;
  padding: 10px;
  height: 150px;
`;

const SubmitDiv = styled.div`
  text-align: center;
`;

const SubmitButton = styled.button`
  margin: 0 20px;
  border: none;
  border-radius: 3px;
  padding: 5px 7px;
  background-color: ${props => {
    if (props.disabled) {
      return 'black';
    }
    return `${props.theme.style.orange}`;
  }};
  color: white;
  font-size: 15px;

  &:hover {
    cursor: pointer;
    background-color: black;
  }
`;

const CancelButton = styled.button`
  margin-left: 10px;
  border: none;
  border-radius: 3px;
  padding: 5px 7px;
  background-color: black;
  color: white;
  font-size: 15px;

  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.style.orange};
  }
`;

const Alert = styled.div`
  padding-bottom: 5px;
  text-align: end;
  font-size: 12px;
  color: ${props => props.theme.style.orange};
`;

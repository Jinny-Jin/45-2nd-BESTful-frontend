import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import fetchApi from '../../../../utils/functions';
import { useDispatch } from 'react-redux';

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

const ProfileModify = ({ myData, setMyData }) => {
  const [textLength, setTextLength] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { sex, cellphone, userName, bio, email } = myData;
  const dispatch = useDispatch();

  const handleModal = e => {
    setIsOpen(e);
  };

  const handleInputChange = (key, e) => {
    const { value } = e.target;

    if (value !== null || value !== '') {
      setMyData(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleRadio = e => {
    setMyData(prev => ({ ...prev, [sex]: e }));
  };

  const acceptNumber = e => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  };

  const activateButton = cellphone !== null && sex !== '';

  const postProfile = () => {
    fetchApi(`/users/edit`, null, {
      method: 'PATCH',
      body: JSON.stringify({
        userName: userName,
        cellphone: cellphone,
        sex: sex,
        bio: bio,
      }),
    });
  };

  return (
    <Container>
      <ProfileForm>
        <ModifyBox>
          <div>이메일</div>
          <span>{email}</span>
        </ModifyBox>
        <ModifyBox>
          <label for="userName">유저 네임</label>
          <ProfileInput
            type="text"
            id="userName"
            placeholder={userName ?? '닉네임을 입력해주세요'}
            onChange={e => handleInputChange('userName', e)}
          />
        </ModifyBox>
        <ModifyBox>
          <label for="cellphone">휴대폰 번호</label>
          <ProfileInput
            type="text"
            id="cellphone"
            placeholder={cellphone ?? 'none'}
            onChange={e => handleInputChange('cellphone', e)}
            onInput={acceptNumber}
          />
        </ModifyBox>
        <Alert>- 를 제외하고 입력하시오</Alert>
        <Alert>* 필수 입력</Alert>

        <ModifyBox>
          <span>성별</span>
          <div>
            {chooseGender.map(item => {
              return (
                <span key={item.id}>
                  <input
                    type="radio"
                    id={item.id}
                    name="gender"
                    checked={sex === item.numb}
                    onClick={() => handleRadio(item.numb)}
                  />
                  <label for={item.id}>{item.gender}</label>
                </span>
              );
            })}
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
                setTextLength(e.target.value.length);
                handleInputChange('bio', e);
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
                  sx={cancelBtn}
                  onClick={() => {
                    handleModal(false);
                  }}
                >
                  아니오
                </Button>
              </Stack>
            </Box>
          </Modal>

          <CancelButton
            onClick={() => {
              dispatch({
                type: 'CHOOSE_MYPAGE_CATEGORY',
                myCatNumb: 0,
                feedOrLike: '피드',
              });
            }}
          >
            취소
          </CancelButton>
        </SubmitDiv>
      </ProfileForm>
    </Container>
  );
};

const chooseGender = [
  { gender: '남성', id: 'male', numb: '1' },
  { gender: '여성', id: 'female', numb: '2' },
  { gender: '선택하지 않음', id: 'none', numb: 'null' },
];

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

export default ProfileModify;

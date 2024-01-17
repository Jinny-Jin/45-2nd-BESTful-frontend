import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash as trash } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import fetchApi from '../../../../utils/functions';

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

const deleteBtn = {
  backgroundColor: '#222222',

  '&:hover': {
    backgroundColor: '#FE4600',
  },
};

const cancelBtn = {
  backgroundColor: '#FE4600',

  '&:hover': {
    backgroundColor: '#222222',
  },
};

const FeedImage = ({ image, feedGet, feedOrLike, feedId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/contents/${feedId}`);
  };

  const handleModal = e => {
    setIsOpen(e);
  };

  const deleteFeed = () => {
    fetchApi(`/feeds/${feedId}`, null, { method: 'DELETE' });
    feedGet();
  };

  return (
    <Container>
      <Image src={`${image}`} alt="feedImage" onClick={handleNavigate} />
      {feedOrLike ? (
        <Trash>
          <Button onClick={() => handleModal(true)}>
            <FontAwesomeIcon icon={trash} size="xl" color="#fe4600" />
          </Button>
        </Trash>
      ) : (
        ''
      )}
      <Modal open={isOpen}>
        <Box sx={modalStyle}>
          <Typography sx={{ mt: 2 }}>징짜?</Typography>
          <Stack direction="row" spacing={3}>
            <Button
              variant="contained"
              sx={deleteBtn}
              onClick={() => {
                deleteFeed();
                handleModal(false);
              }}
            >
              삭제
            </Button>
            <Button
              variant="contained"
              onClick={() => handleModal(false)}
              sx={cancelBtn}
            >
              취소
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
};

export default FeedImage;

const Container = styled.div`
  position: relative;
  margin-right: 20px;
  margin-bottom: 20px;

  &:hover {
    opacity: 50%;
    cursor: pointer;
  }
`;

const Image = styled.img`
  border-radius: 5px;
  width: 200px;
  height: 300px;
  object-fit: cover;

  &:hover {
    transform: scale(1.1);
  }
`;

const Trash = styled.button`
  position: absolute;
  padding: 0;
  border: none;
  right: 0;
  bottom: 10px;
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }
`;

import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';

interface Props {
  onClose?: () => void;
  onConfirm?: () => void;
}

const ModalContainer = styled.div<Props>`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalStyle = styled.div`
  position: absolute;
  background-color: white;
  width: 20%;
  height: 30%;
  border-radius: 0.5rem;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  animation: fadeIn 0.5s ease-in;
`;

const ModalTitle = styled.div`
  width: 100%;
  height: 15%;
  background-color: #292d39;
  border-radius: 0.5rem;
  display: grid;
  grid-template: 1fr / repeat(3, 1fr);
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.5rem;
  color: white;
  grid-column: 2 / 3;
  text-align: center;
`;

const CloseButton = styled.button`
  font-size: 1.5rem;
  color: white;
  grid-column: 3 / 4;
  justify-self: right;
`;

const Content = styled.div`
  width: 100%;
  height: 65%;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonGroup = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: space-between;
`;

const Modal = ({ onClose, onConfirm }: Props) => {
  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget === e.target) {
      onClose?.();
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <ModalContainer onClick={onClick}>
      <ModalStyle>
        <ModalTitle>
          <Title>Title</Title>
          <CloseButton onClick={onClose}>X</CloseButton>
        </ModalTitle>
        <Content>모달 메시지</Content>
        <ButtonGroup>
          <Button onClick={onConfirm} size="small">
            확인
          </Button>
          <Button onClick={onClose} size="small">
            취소
          </Button>
        </ButtonGroup>
      </ModalStyle>
    </ModalContainer>
  );
};

export default Modal;

import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  size: 'small' | 'middle';
}

const SmallButton = styled.button`
  background-color: #00babb;
  border-radius: 0.5rem;
  width: 16vw;
  height: 6vh;
  font-size: 1.5rem;
  color: white;
`;

const MiddleButton = styled.button`
  background-color: #00babb;
  border-radius: 0.5rem;
  width: 27vw;
  height: 6vh;
  font-size: 1.5rem;
  color: white;
`;

const Button = ({ children, onClick, size }: Props) => {
  if (size === 'small')
    return <SmallButton onClick={onClick}>{children}</SmallButton>;
  else return <MiddleButton onClick={onClick}>{children}</MiddleButton>;
};

export default Button;

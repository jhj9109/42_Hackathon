import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  size: 'small' | 'middle' | 'large';
  disabled?: boolean;
}

const SmallButton = styled.button`
  background-color: ${({ disabled }) => disabled ? "#eeeeee" : "#00babb"};
  border-radius: 0.5rem;
  width: 49%;
  height: 6vh;
  font-size: 1.5rem;
  color: white;
`;

const MiddleButton = styled.button`
  background-color: ${({ disabled }) => disabled ? "#eeeeee" : "#00babb"};
  border-radius: 0.5rem;
  width: 75%;
  height: 6vh;
  font-size: 1.5rem;
  color: white;
`;

const LargeButton = styled.button`
  background-color: ${({ disabled }) => disabled ? "#eeeeee" : "#00babb"};
  border-radius: 0.5rem;
  width: 99%;
  height: 6vh;
  font-size: 1.5rem;
  color: white;
`;

const Button = ({ children, onClick, size, disabled }: Props) => {
  if (size === 'small')
    return <SmallButton disabled={disabled} onClick={onClick}>{children}</SmallButton>;
  else if (size === 'middle')
    return <MiddleButton disabled={disabled} onClick={onClick}>{children}</MiddleButton>;
  return <LargeButton disabled={disabled} onClick={onClick}>{children}</LargeButton>;
};

export default Button;

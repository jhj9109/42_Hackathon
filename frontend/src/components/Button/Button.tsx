import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
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

const dummyOnClick = () => console.log("버튼이 클릭되었습니다.");

const Button = ({ children, onClick, size, disabled }: Props) => {
  const fn = onClick ?? dummyOnClick;
  if (size === 'small')
    return <SmallButton disabled={disabled} onClick={() => fn()}>{children}</SmallButton>;
  else if (size === 'middle')
    return <MiddleButton disabled={disabled} onClick={() => fn()}>{children}</MiddleButton>;
  return <LargeButton disabled={disabled} onClick={() => fn()}>{children}</LargeButton>;
};

export default Button;

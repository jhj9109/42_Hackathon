import React from 'react';
import styled from 'styled-components';

interface IStyle {
  flexDirection?: 'row' | 'column';
  width?: string;
  height?: string;
  justifyContent?: string;
  alignItems?: string;
}

interface Props extends IStyle {
  children?: React.ReactNode;
}

const FlexBoxStyle = styled.div<IStyle>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
`;

const FlexBox = ({ children, flexDirection, ...rest }: Props) => {
  return (
    <FlexBoxStyle flexDirection={flexDirection} {...rest}>
      {children}
    </FlexBoxStyle>
  );
};

export default FlexBox;

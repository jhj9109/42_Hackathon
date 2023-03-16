import React from 'react';
import styled from 'styled-components';

interface Props {
  width?: string;
  height?: string;
  children?: React.ReactNode;
}

interface IContainerStyle {
  width?: string;
  height?: string;
}

const ContainerStyle = styled.div<IContainerStyle>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 1rem;
  background-color: #d6d6d6;
`;

const Container = ({ children, ...rest }: Props) => {
  return <ContainerStyle {...rest}>{children}</ContainerStyle>;
};

export default Container;

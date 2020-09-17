import React from 'react';

import { Container } from './styles';

interface ILoadingProps {
  color?: string;
  size?: number;
  stroke?: number;
}

const Loading: React.FC<ILoadingProps> = ({
  color = '#444',
  size = 20,
  stroke = 2,
}) => (
  <Container color={color} size={size - 5}>
    <circle
      className="path"
      cx={(size - 5) / 2}
      cy={(size - 5) / 2}
      r={(size - 5) / 2 - stroke}
      fill="none"
      strokeWidth={stroke}
    />
  </Container>
);

export default Loading;

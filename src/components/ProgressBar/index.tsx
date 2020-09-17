import React from 'react';

import { Colors } from '../../styles/colors';
import { Container, Content } from './styles';

interface IProgressBarProps {
  borderColor?: string;
  color?: string;
  sizeH?: number;
  percentage: number;
}

const ProgressBar: React.FC<IProgressBarProps> = ({
  borderColor,
  color,
  sizeH,
  percentage,
}) => {
  return (
    <Container
      borderColor={borderColor || Colors.default}
      sizeH={sizeH || 10}
      color={color || Colors.success}
    >
      <Content
        color={color || Colors.success}
        style={{ width: `${percentage}%` }}
      />
      <span>{`${percentage}%`}</span>
    </Container>
  );
};

export default ProgressBar;

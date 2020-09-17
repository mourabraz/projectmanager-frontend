import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: 'success' | 'info' | 'warn' | 'error' | 'default';
  title?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  kind = 'info',
  title,
  ...rest
}) => (
  <Container type="button" kind={kind} {...rest}>
    {children}
    {title && <span>{title}</span>}
  </Container>
);

export default Button;

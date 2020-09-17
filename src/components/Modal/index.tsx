import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Container, Content } from './styles';

interface IModalProps {
  visible: boolean;
}

const Modal: React.FC<IModalProps> = ({ children, visible }) => {
  const elRef = useRef<HTMLDivElement>();

  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }

  useEffect(() => {
    const modalRoot = document.getElementById('modal');
    if (!modalRoot || !elRef.current) {
      return;
    }
    modalRoot.appendChild<HTMLDivElement>(elRef.current);

    // eslint-disable-next-line consistent-return
    return (): void => {
      if (elRef.current) {
        modalRoot.removeChild<HTMLDivElement>(elRef.current);
      }
    };
  }, []);

  return createPortal(
    <>
      {visible && (
        <Container>
          <Content>{children}</Content>
        </Container>
      )}
    </>,
    elRef.current,
  );
};

export default Modal;

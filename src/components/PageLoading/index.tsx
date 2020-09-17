import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Container, Content, LoadingContainer } from './styles';

interface IPageLoadingProps {
  visible: boolean;
  color?: string;
  size?: number;
  stroke?: number;
  contentPadding?: number;
}

const PageLoading: React.FC<IPageLoadingProps> = ({
  children,
  visible,
  color = '#444',
  size = 40,
  stroke = 2,
  contentPadding = 40,
}) => {
  const elRef = useRef<HTMLDivElement>();

  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }

  useEffect(() => {
    const pageLoadingRoot = document.getElementById('page-loading');
    if (!pageLoadingRoot || !elRef.current) {
      return;
    }
    pageLoadingRoot.appendChild<HTMLDivElement>(elRef.current);

    // eslint-disable-next-line consistent-return
    return (): void => {
      if (elRef.current) {
        pageLoadingRoot.removeChild<HTMLDivElement>(elRef.current);
      }
    };
  }, []);

  return createPortal(
    <>
      {visible && (
        <Container>
          <Content padding={contentPadding}>
            <LoadingContainer color={color} size={size - 5}>
              <circle
                className="path"
                cx={(size - 5) / 2}
                cy={(size - 5) / 2}
                r={(size - 5) / 2 - stroke}
                fill="none"
                strokeWidth={stroke}
              />
            </LoadingContainer>
            <div>{children}</div>
          </Content>
        </Container>
      )}
    </>,
    elRef.current,
  );
};

export default PageLoading;

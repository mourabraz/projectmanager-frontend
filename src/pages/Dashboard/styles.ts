import styled from 'styled-components';
import { Colors } from '../../styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 1280px;
  padding: 16px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 780px;

  p + p {
    margin-top: 4px;
  }
`;

export const Introduction = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    text-align: center;
    margin: 32px 0;
  }
`;

export const AlertaInfo = styled.div`
  padding: 32px;
  margin: 16px 32px;
  border: 1px solid ${Colors.infoDark};
  border-radius: 8px;

  color: ${Colors.infoDark};

  p + p {
    margin-top: 8px;
  }
`;

export const AlertaDanger = styled.div`
  padding: 32px;
  margin: 16px 32px;
  border: 1px solid ${Colors.errorDark};
  border-radius: 8px;

  color: ${Colors.errorDark};

  p + p {
    margin-top: 8px;
  }
`;

export const Examples = styled.div`
  margin-top: 32px;
  padding: 32px;

  border-radius: 8px;
  border: 1px solid ${Colors.default};
  display: flex;
  flex-direction: column;

  hr {
    margin: 32px 0;
  }
`;
export const ImageGif = styled.div`
  margin-top: 16px;
  width: calc(780px - 64px);
  height: auto;

  img {
    width: 100%;
  }
`;

import styled from 'styled-components';
import { Colors } from '../../styles/colors';

export const Container = styled.div`
  background: ${Colors.primary};
  /* background: red; */
  padding: 0 16px;
  min-width: 1280px;
`;

export const Content = styled.div`
  height: 72px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  nav {
    display: flex;
    align-items: center;

    a {
      font-weight: bold;
      color: ${Colors.textLight};
      text-transform: uppercase;
      display: flex;
      justify-content: center;
      align-items: center;
      & + a {
        padding-left: 20px;
      }

      img {
        height: 64px;
      }

      &.active {
        span {
          border-bottom: 1px solid ${Colors.info};
        }
      }
    }
  }
`;

export const Profile = styled.aside`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid ${Colors.primaryLight};

  align-items: center;

  button {
    padding: 0;
    width: 40px;
    height: 40px;
    flex-grow: 0;
    flex-shrink: 0;
  }
`;

export const ProfileImage = styled.div`
  margin-right: 10px;
  flex-grow: 0;
  flex-shrink: 0;
  img {
    object-fit: cover;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    border: 2px solid ${Colors.primaryDark};
  }
`;

export const ProfileName = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;

  width: 100%;
  margin-right: 10px;

  strong {
    display: block;
    color: ${Colors.textDark};
  }
  a {
    display: block;
    margin-top: 2px;
    font-size: 1.2rem;
    color: ${Colors.textDark};
  }
`;

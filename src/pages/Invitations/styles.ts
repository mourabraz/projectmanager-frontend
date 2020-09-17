import styled from 'styled-components';
import { Colors } from '../../styles/colors';
import ButtonComponent from '../../components/Button';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 1280px;
  padding: 0 16px;
`;

export const ContentTable = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 25px;
  background: ${Colors.primaryLight};
  border-radius: 4px;
  padding: 30px 15px;
  .text-right {
    text-align: right;
  }
  .text-left {
    text-align: left;
  }
  .text-center {
    text-align: center;
  }
  & div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      color: ${Colors.text};
      span {
        + span {
          margin-left: 15px;
        }
      }
    }
  }
  /* .pagination {
    display: flex;
  } */
  table {
    margin-top: 15px;
    width: 100%;
    border-spacing: 0;

    thead tr th:nth-child(2) {
      width: 300px;
    }

    thead tr th:nth-child(3) {
      width: 230px;
    }

    thead tr th:nth-child(4) {
      width: 230px;
    }

    thead tr th:nth-child(5) {
      width: 50px;
    }

    tr {
      line-height: 30px;
    }
    tbody tr {
      &:hover {
        background: ${Colors.defaultLight};
        color: ${Colors.text};
      }
      color: ${Colors.textLight};
    }
    th {
      padding: 5px;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 1.2rem;
      svg {
        padding-top: 6px;
        cursor: pointer;
        + svg {
          margin-right: 6px;
        }
      }
    }
    td {
      padding: 5px 10px;

      &.inviter-profile {
        display: flex;
        justify-content: start;
        align-items: center;

        img {
          object-fit: cover;
          width: 60px;
          height: 60px;
          border-radius: 30px;
          border: 2px solid ${Colors.primaryDark};
        }

        span {
          margin-left: 16px;
        }
      }
    }
  }
`;

export const Button = styled(ButtonComponent)`
  width: 40px;
  height: 40px;
  padding: 5px;
  border: 0;
  border-radius: 20px;
  background: ${Colors.primary};
  color: ${Colors.textLight};

  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;

  &.cancel {
    svg {
      stroke: ${Colors.error};
    }

    &:hover {
      background: ${Colors.error};

      svg {
        stroke: ${Colors.primaryLight};
      }
    }

    &[disabled] {
      &:hover {
        svg {
          stroke: ${Colors.error};
        }
      }
    }
  }

  &.accept {
    svg {
      stroke: ${Colors.info};
    }

    &:hover {
      background: ${Colors.info};

      svg {
        stroke: ${Colors.primaryLight};
      }
    }

    &[disabled] {
      &:hover {
        svg {
          stroke: ${Colors.info};
        }
      }
    }
  }

  &[disabled] {
    background: rgba(0, 0, 0, 0.1);
    cursor: not-allowed;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
`;

import styled from 'styled-components';
import { Colors } from '../../../../styles/colors';
import Button from '../../../../components/Button';

interface IParticipantProps {
  isOwner: boolean;
}

export const Container = styled.div`
  /* margin: 0 -16px 0 0; */
  position: relative;
  padding: 0 16px;
  width: 100%;
  height: 76px;
  background: ${Colors.primaryLight};

  display: flex;
  align-items: center;
  justify-content: start;

  color: ${Colors.text};

  /* > div:first-child {
    margin-right: 48px;
  } */

  /* > button {
    height: 40px;
    width: fit-content;
    margin-left: 16px;
  } */

  /* > button:first-child {
    margin: 0;
  } */
`;

export const AddProjectButton = styled(Button)`
  margin: 0;
  height: 38px;
  width: fit-content;
  border-radius: 0 8px 8px 0;
`;

export const EditProjectButton = styled(Button)`
  position: absolute;
  top: -2px;
  left: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  height: 38px;
  width: 38px;
  border-radius: 19px;
`;

export const RemoveProjectButton = styled(Button)`
  position: absolute;
  top: -4px;
  left: 78px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  height: 30px;
  width: 30px;
  border-radius: 15px;
`;

export const ArchivedProjectButton = styled(Button)`
  position: absolute;
  top: -4px;
  left: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  height: 30px;
  width: 30px;
  border-radius: 15px;
`;

export const InviteButton = styled(Button)`
  margin-left: 8px;
  height: 38px;
  width: fit-content;
`;

export const ParticipantsList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  margin-left: 29px;

  > div:first-child {
    z-index: 2;
  }

  &:hover {
    > div {
      margin-left: 8px;
    }
    > div:first-child {
      margin-left: -21px;
    }
  }
`;

export const Participant = styled.div<IParticipantProps>`
  width: 40px;
  height: 40px;
  margin-left: -21px;
  z-index: 1;

  transition: margin-left ease 0.8s;

  img {
    border-radius: 20px;
    border: 1px solid #444;

    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);

    border-color: ${(props) =>
      props.isOwner ? Colors.warnDark : Colors.infoDark};
  }
`;

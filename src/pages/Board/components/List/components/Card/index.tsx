import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FaHandRock, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { toast } from 'react-toastify';
import { FiTrash2, FiFilePlus, FiPrinter } from 'react-icons/fi';
import { addDays, isBefore, isAfter, parseISO } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

import { ITask } from '../../../../../../interfaces';

import { StepsProvider } from '../../../../../../hooks/steps';
import { useAuth } from '../../../../../../hooks/auth';
import { useTasks } from '../../../../../../hooks/tasks';

import Modal from '../../../../../../components/Modal';
import EditTitle from './components/EditTitle';
import EditDescription from './components/EditDescription';
import EditDeadline from './components/EditDeadline';
import EditStarted from './components/EditStarted';
import UploadFileForm from './components/UploadFileForm';
import StepsPanel from './components/StepsPanel';
import FilesPanel from './components/FilesPanel';

import { Colors } from '../../../../../../styles/colors';
import {
  Container,
  DeadLineBadged,
  Header,
  Handle,
  Title,
  ButtonsOnHead,
  Content,
  TitleOnContent,
  RemoveButton,
  Description,
  CompletedAt,
  StartedAt,
  DeadlineAt,
} from './styles';

interface ICardProps {
  data: ITask;
  index: number;
  onShowRemoveTaskModal: (task: ITask) => void;
}

const Card: React.FC<ICardProps> = ({ data, index, onShowRemoveTaskModal }) => {
  const nodeRefContent = useRef<HTMLDivElement>(null);
  const nodeRefTitleOnHead = useRef(null);
  const nodeRefButtonsOnHead = useRef(null);
  const nodeRefTitleOnContent = useRef(null);

  const [open, setOpen] = useState(false);
  const [visibleEditTitle, setVisibleEditTitle] = useState(false);
  const [visibleEditDescription, setVisibleEditDescription] = useState(false);
  const [visibleEditDeadline, setVisibleEditDeadline] = useState(false);
  const [visibleEditStarted, setVisibleEditStarted] = useState(false);
  const [, updateState] = useState();

  const [showUploadFileModal, setShowUploadFileModal] = useState<boolean>(
    false,
  );

  const { user } = useAuth();
  const { allCardsShouldBeClosed } = useTasks();

  const deadlineBadgedColorNumber = useMemo(() => {
    if (data.deadlineAt) {
      const deadlineAt = parseISO(data.deadlineAt);
      const nowUTC = zonedTimeToUtc(new Date(), 'Europe/Lisbon');
      if (isAfter(deadlineAt, addDays(nowUTC, 2))) {
        return -1;
      }
      if (isBefore(deadlineAt, addDays(nowUTC, 2))) {
        return 1;
      }
      return 0;
    }

    return 0;
  }, [data.deadlineAt]);

  useEffect(() => {
    if (allCardsShouldBeClosed) {
      setOpen(false);
    }
  }, [allCardsShouldBeClosed]);

  const handleDoubleClickTitle = (): void => {
    if (!data.completedAt) {
      setVisibleEditTitle(true);
    } else {
      toast.info(
        'Sorry! To edit a completed task you should change it to another status!',
      );
    }
  };

  const handleDoubleClickDescription = (): void => {
    if (!data.completedAt) {
      setVisibleEditDescription(true);
    } else {
      toast.info(
        'Sorry! To edit a completed task you should change it to another status!',
      );
    }
  };

  const handleDoubleClickDeadline = (): void => {
    if (!data.completedAt) {
      setVisibleEditDeadline(true);
    } else {
      toast.info(
        'Sorry! To edit a deadline task you should change it to another status!',
      );
    }
  };

  const handleDoubleClickStarted = (): void => {
    if (!data.completedAt) {
      setVisibleEditStarted(true);
    } else {
      toast.info(
        'Sorry! To edit a stared task you should change it to another status!',
      );
    }
  };

  const needRerender = useCallback(() => {
    updateState({});
  }, []);

  return (
    <>
      <Modal visible={visibleEditTitle}>
        <EditTitle
          onClose={(): void => setVisibleEditTitle(false)}
          task={data}
        />
      </Modal>
      <Modal visible={visibleEditDescription}>
        <EditDescription
          onClose={(): void => setVisibleEditDescription(false)}
          task={data}
        />
      </Modal>
      <Modal visible={visibleEditDeadline}>
        <EditDeadline
          onClose={(): void => setVisibleEditDeadline(false)}
          task={data}
        />
      </Modal>
      <Modal visible={visibleEditStarted}>
        <EditStarted
          onClose={(): void => setVisibleEditStarted(false)}
          task={data}
        />
      </Modal>
      <Modal visible={showUploadFileModal}>
        <UploadFileForm
          onClose={(): void => setShowUploadFileModal(false)}
          task={data}
        />
      </Modal>
      <Draggable draggableId={data.id} index={index} isDragDisabled={open}>
        {(provided, snapshot): React.ReactElement<HTMLElement> => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            isDragging={snapshot.isDragging}
            dragProps={provided.draggableProps}
            isOpen={open}
            sizeH={nodeRefContent?.current?.clientHeight || 74}
          >
            {data.deadlineAt && (
              <DeadLineBadged colorNumber={deadlineBadgedColorNumber} />
            )}

            <Header>
              <SwitchTransition>
                {!open ? (
                  <CSSTransition
                    nodeRef={nodeRefTitleOnHead}
                    key="title-on-head"
                    timeout={250}
                    classNames="title-on-head"
                    unmountOnExit
                  >
                    <Title
                      ref={nodeRefTitleOnHead}
                      onDoubleClick={handleDoubleClickTitle}
                    >
                      {data.title}
                    </Title>
                  </CSSTransition>
                ) : (
                  <CSSTransition
                    nodeRef={nodeRefButtonsOnHead}
                    key="buttons-on-head"
                    timeout={250}
                    classNames="buttons-on-head"
                    unmountOnExit
                  >
                    <ButtonsOnHead ref={nodeRefButtonsOnHead}>
                      <button
                        type="button"
                        onClick={(): void => setShowUploadFileModal(true)}
                      >
                        <FiFilePlus color={Colors.primary} size={14} />
                      </button>
                      <button type="button" disabled>
                        <FiPrinter color={Colors.primary} size={14} />
                      </button>
                    </ButtonsOnHead>
                  </CSSTransition>
                )}
              </SwitchTransition>
              <Handle
                {...provided.dragHandleProps}
                onClick={(): void => setOpen(!open)}
              >
                {snapshot.isDragging ? (
                  <FaHandRock size={14} color={Colors.primary} />
                ) : open ? (
                  <FaChevronUp size={14} color={Colors.primary} />
                ) : (
                  <FaChevronDown size={14} color={Colors.primary} />
                )}
              </Handle>
            </Header>

            <Content ref={nodeRefContent} isOpen={open}>
              <CSSTransition
                nodeRef={nodeRefTitleOnContent}
                in={open}
                timeout={500}
                classNames="title-on-content"
              >
                <TitleOnContent
                  ref={nodeRefTitleOnContent}
                  onDoubleClick={handleDoubleClickTitle}
                >
                  <p>{data.title}</p>
                  {user.id === data.ownerId && (
                    <RemoveButton
                      type="button"
                      onClick={(): void => onShowRemoveTaskModal(data)}
                    >
                      <FiTrash2 color={Colors.error} size={12} />
                    </RemoveButton>
                  )}
                </TitleOnContent>
              </CSSTransition>
              {data.completedAt && (
                <CompletedAt>{`Completed At: ${data.formatedCompletedAt}`}</CompletedAt>
              )}

              <StartedAt onDoubleClick={handleDoubleClickStarted}>
                {data.startedAt ? (
                  <>
                    <span>You started at:</span>
                    {data.formatedStartedAt}
                  </>
                ) : (
                  <span>You do not start, yet!</span>
                )}
              </StartedAt>

              <DeadlineAt onDoubleClick={handleDoubleClickDeadline}>
                {data.deadlineAt ? (
                  <>
                    <span>You should finish until:</span>
                    {data.formatedDeadlineAt}
                  </>
                ) : (
                  <span>You do not set a deadline!</span>
                )}
              </DeadlineAt>

              <Description
                isCompleted={!!data.completedAt}
                onDoubleClick={handleDoubleClickDescription}
                dangerouslySetInnerHTML={{
                  __html:
                    data.description ||
                    '<span>Without description - double clique to add one</span>',
                }}
              />

              {data.fiiles && data.fiiles.length ? (
                <FilesPanel fiiles={data.fiiles} />
              ) : null}

              <StepsProvider>
                <StepsPanel task={data} onNeedReender={needRerender} />
              </StepsProvider>
            </Content>
          </Container>
        )}
      </Draggable>
    </>
  );
};

export default Card;

import React, { useCallback, useRef, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';

import api from '../../../../../../../../services/api';
import getValidationErrors from '../../../../../../../../utils/getValidationErrors';
import { ITask } from '../../../../../../../../interfaces';
import { useTasks } from '../../../../../../../../hooks/tasks';

import FileInput from '../../../../../../../../components/FileInput';
import Button from '../../../../../../../../components/Button';
import Loading from '../../../../../../../../components/Loading';

import { Colors } from '../../../../../../../../styles/colors';
import { Container, Content, Footer } from './styles';

interface IUploadFileFormProps {
  onClose: () => void;
  task: ITask;
}

interface IUploadFileFormTaskFormData {
  file: File;
}

const FILE_SIZE = 1000 * 1024 * 100; // 2Mb?

const SUPPORTED_FORMATS = [
  'image/jpeg',
  'image/jpg',
  'image/gif',
  'image/png',
  'application/pdf',
  'text/plain',
  'application/vnd.oasis.opendocument.text',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
];

const UploadFileForm: React.FC<IUploadFileFormProps> = ({ onClose, task }) => {
  const fromRef = useRef<FormHandles>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [percentage, setPercentage] = useState<number>(0);

  const { addFileToTask } = useTasks();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const cancelRequest = useRef<() => void>(() => {});

  const handleCloseButton = useCallback(() => {
    onClose();
  }, [onClose]);

  const submitForm = useCallback(
    async (data: IUploadFileFormTaskFormData) => {
      try {
        setUploading(true);
        setPercentage(0);

        fromRef.current?.setErrors({});

        const schema = Yup.object().shape({
          file: Yup.mixed()
            .required('This field is required')
            .test(
              'fileSize',
              'The file size is too big',
              (value) => value && value.size <= FILE_SIZE,
            )
            .test(
              'fileFormat',
              'Unsuported file format',
              (value) => value && SUPPORTED_FORMATS.includes(value.type),
            ),
        });

        await schema.validate(data, { abortEarly: false });

        const formData = new FormData();
        formData.append('file', data.file);

        const response = await api.post(`files/${task.id}/task`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          cancelToken: new axios.CancelToken((canceler) => {
            cancelRequest.current = canceler;
          }),
          onUploadProgress: (pe: ProgressEvent) => {
            setPercentage(Math.round((pe.loaded / pe.total) * 100));
          },
        });

        addFileToTask({ task, fiile: response.data });

        setUploading(false);
      } catch (error) {
        setUploading(false);

        if (axios.isCancel(error)) {
          toast.warn('Upload cancel as you request...');
          return;
        }

        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          fromRef.current?.setErrors(errors);

          return;
        }

        toast.error('Opps! Something goes wrong... It could not upload file.');
      }
    },
    [addFileToTask, task],
  );

  const handleSubmit = useCallback(() => {
    fromRef.current?.submitForm();
  }, []);

  return (
    <Container>
      <header>
        <p>
          Add file to
          {` ${task.title}`}
        </p>
        <button type="button" onClick={handleCloseButton}>
          <FiX size={16} color={Colors.primary} />
        </button>
      </header>

      <Content>
        <Form ref={fromRef} onSubmit={submitForm}>
          <FileInput
            name="file"
            onChange={handleSubmit}
            percentage={percentage}
            onCancel={cancelRequest.current}
          />
        </Form>
      </Content>

      <Footer>
        <hr />

        <Button
          type="submit"
          kind="info"
          disabled={uploading}
          onClick={handleCloseButton}
        >
          I&apos;m done
          {uploading && <Loading color={Colors.primary} />}
        </Button>
      </Footer>
    </Container>
  );
};

export default UploadFileForm;

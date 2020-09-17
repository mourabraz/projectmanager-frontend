import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '../../../../services/api';
import getValidationErrors from '../../../../utils/getValidationErrors';
import { useAuth } from '../../../../hooks/auth';

import ImageInput from '../../../../components/ImageInput';

import { Container } from './styles';

interface IPhotoFormData {
  photo: File;
}

const FILE_SIZE = 1000 * 1024; // 1Mb?

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const PhotoEdit: React.FC = () => {
  const fromRef = useRef<FormHandles>(null);

  const { user, updatePhoto } = useAuth();

  const submitForm = useCallback(
    async (data: IPhotoFormData) => {
      try {
        fromRef.current?.setErrors({});

        const schema = Yup.object().shape({
          photo: Yup.mixed()
            .required('This field is required')
            .test(
              'fileSize',
              'The photo size is too big',
              (value) => value && value.size <= FILE_SIZE,
            )
            .test(
              'fileFormat',
              'Unsuported image format',
              (value) => value && SUPPORTED_FORMATS.includes(value.type),
            ),
        });

        await schema.validate(data, { abortEarly: false });

        const formData = new FormData();
        formData.append('file', data.photo);

        const response = await api.post('users/photo', formData);

        updatePhoto({ ...response.data, userId: user.id });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          fromRef.current?.setErrors(errors);

          return;
        }

        toast.error('Photo update fails. Could not update your photo!');
      }
    },
    [updatePhoto, user.id],
  );

  const handleSubmit = useCallback(() => {
    fromRef.current?.submitForm();
  }, []);

  return (
    <Container>
      <Form
        ref={fromRef}
        initialData={{
          photo:
            user?.photo?.url ||
            `https://api.adorable.io/avatars/285/${user.email}.png`,
        }}
        onSubmit={submitForm}
      >
        <ImageInput name="photo" onChange={handleSubmit} />
      </Form>
    </Container>
  );
};

export default PhotoEdit;

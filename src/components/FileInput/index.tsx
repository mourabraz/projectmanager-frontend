import React, { useRef, useCallback, ChangeEvent, useEffect } from 'react';
import { useField } from '@unform/core';
import { FiAlertCircle, FiUploadCloud, FiX } from 'react-icons/fi';

import ProgressBar from '../ProgressBar';

import { Colors } from '../../styles/colors';
import { Container, Content, Error, ProgressBarCancelButton } from './styles';

interface IFileInputProps {
  name: string;
  percentage: number;
  onChange: () => void;
  onCancel: () => void;
}

const FileInput: React.FC<IFileInputProps> = ({
  name,
  percentage,
  onChange: submitForm,
  onCancel,
  ...rest
}) => {
  const inputRef = useRef(null);

  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue(ref: HTMLInputElement) {
        // eslint-disable-next-line no-param-reassign
        ref.value = '';
      },
    });
  }, [fieldName, registerField]);

  const handleChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
        submitForm();
      }
    },
    [submitForm],
  );

  return (
    <Container>
      <Content>
        <FiUploadCloud color={Colors.info} size={60} />

        <input
          ref={inputRef}
          type="file"
          onChange={handleChangeInput}
          {...rest}
        />
      </Content>
      {error ? (
        <Error>
          <FiAlertCircle color={Colors.error} size={20} />
          <p>{error}</p>
        </Error>
      ) : (
        <ProgressBarCancelButton>
          <ProgressBar
            borderColor={Colors.info}
            color={Colors.info}
            sizeH={10}
            percentage={percentage}
          />
          <button type="button" onClick={onCancel}>
            <FiX color={Colors.primary} size={12} />
          </button>
        </ProgressBarCancelButton>
      )}
    </Container>
  );
};

export default FileInput;

import React, {
  useRef,
  useCallback,
  ChangeEvent,
  useState,
  useEffect,
} from 'react';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';
import { Colors } from '../../styles/colors';

interface IImageInputProps {
  name: string;
  onChange(): void;
}

const ImageInput: React.FC<IImageInputProps> = ({
  name,
  onChange: submitForm,
  ...rest
}) => {
  const inputRef = useRef(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [preview, setPreview] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue(ref: HTMLInputElement) {
        // eslint-disable-next-line no-param-reassign
        ref.value = '';
        setPreview(null);
      },
      setValue(_: HTMLInputElement, value: string) {
        setPreview(value);
      },
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    if (error) {
      setPreview('https://api.adorable.io/avatars/285/.png');
    }
  }, [error]);

  const handleChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) {
        setPreview(null);
      }

      setPreview(URL.createObjectURL(file));

      submitForm();
    },
    [submitForm],
  );

  return (
    <Container>
      {preview && <img src={preview} alt="Preview" width="150px" />}

      <input
        ref={inputRef}
        type="file"
        onChange={handleChangeInput}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color={Colors.error} size={20} />
        </Error>
      )}
    </Container>
  );
};

export default ImageInput;

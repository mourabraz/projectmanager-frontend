import React, { useRef, useState, useEffect, useCallback } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';

import { Container, Content } from './styles';

interface IDatePickerProps extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string;
  label?: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const DatePicker: React.FC<IDatePickerProps> = ({
  name,
  label = '',
  icon: Icon,
  ...rest
}) => {
  const datepickerRef = useRef<any>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [date, setDate] = useState(defaultValue || null);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!datepickerRef.current?.props?.selected);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: 'props.selected',
      clearValue: (ref: any) => {
        ref.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
      {label && <label htmlFor={label}>{label}</label>}
      {Icon && <Icon size={20} />}
      <Content>
        <ReactDatePicker
          id={label || ''}
          ref={datepickerRef}
          selected={date}
          onChange={setDate}
          onFocus={() => setIsFocused(true)}
          onBlur={handleInputBlur}
          {...rest}
        />
      </Content>
    </Container>
  );
};

export default DatePicker;

import styled, { css } from 'styled-components';
import { lighten, darken } from 'polished';
import { Colors, Variables } from '../../styles/colors';

interface IContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<IContainerProps>`
  background: ${Colors.primaryLight};
  border-radius: 10px;
  border: 2px solid ${Colors.primaryDark};
  padding: 16px;
  width: 100%;
  color: ${Colors.textLight};

  display: flex;
  align-items: center;
  justify-content: start;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: ${Colors.error};
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: ${Colors.warnDark};
      border-color: ${Colors.warnDark};
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: ${Colors.warnDark};
    `}


  input {
    flex: 1;
    background: inherit;
    border: 0;
    color: ${Colors.text};

    &::placeholder {
      color: ${Colors.textLight};
    }
  }

  label {
    margin-right: 16px;
  }

  svg {
    margin-right: 16px;
  }
`;

export const Content = styled.div`
  %triangle-arrow {
    margin-left: -${Variables['datepicker__triangle-size']};
    position: absolute;

    &,
    &::before {
      box-sizing: content-box;
      position: absolute;
      border: ${Variables['datepicker__triangle-size']} solid transparent;

      height: 0;
      width: 1px;
    }

    &::before {
      content: '';
      z-index: -1;
      border-width: ${Variables['datepicker__triangle-size']};

      left: -${Variables['datepicker__triangle-size']};
      border-bottom-color: ${Variables['datepicker__border-color']};
    }
  }

  %triangle-arrow-up {
    @extend %triangle-arrow;

    top: 0;
    margin-top: -${Variables['datepicker__triangle-size']};

    &,
    &::before {
      border-top: none;
      border-bottom-color: ${Variables['datepicker__background-color']};
    }

    &::before {
      top: -1px;
      border-bottom-color: ${Variables['datepicker__border-color']};
    }
  }

  %triangle-arrow-down {
    @extend %triangle-arrow;

    bottom: 0;
    margin-bottom: -${Variables['datepicker__triangle-size']};

    &,
    &::before {
      border-bottom: none;
      border-top-color: #fff;
    }

    &::before {
      bottom: -1px;
      border-top-color: ${Variables['datepicker__border-color']};
    }
  }

  .react-datepicker-wrapper {
    display: inline-block;
    padding: 0;
    border: 0;
  }

  .react-datepicker {
    font-family: ${Variables['datepicker__font-family']};
    font-size: ${Variables['datepicker__font-size']};
    background-color: #fff;
    color: ${Variables['datepicker__text-color']};
    border: 1px solid ${Variables['datepicker__border-color']};
    border-radius: ${Variables['datepicker__border-radius']};
    display: inline-block;
    position: relative;
  }

  .react-datepicker--time-only {
    .react-datepicker__triangle {
      left: 35px;
    }

    .react-datepicker__time-container {
      border-left: 0;
    }

    .react-datepicker__time {
      border-radius: 0.3rem;
    }

    .react-datepicker__time-box {
      border-radius: 0.3rem;
    }
  }

  .react-datepicker__triangle {
    position: absolute;
    left: 50px;
  }

  .react-datepicker-popper {
    z-index: 2;

    &[data-placement^='bottom'] {
      margin-top: ${Variables['datepicker__triangle-size']} + 2px;

      .react-datepicker__triangle {
        @extend %triangle-arrow-up;
      }
    }

    &[data-placement='bottom-end'],
    &[data-placement='top-end'] {
      .react-datepicker__triangle {
        left: auto;
        right: 50px;
      }
    }

    &[data-placement^='top'] {
      margin-bottom: ${Variables['datepicker__triangle-size']} + 2px;

      .react-datepicker__triangle {
        @extend %triangle-arrow-down;
      }
    }

    &[data-placement^='right'] {
      margin-left: ${Variables['datepicker__triangle-size']};

      .react-datepicker__triangle {
        left: auto;
        right: 42px;
      }
    }

    &[data-placement^='left'] {
      margin-right: ${Variables['datepicker__triangle-size']};

      .react-datepicker__triangle {
        left: 42px;
        right: auto;
      }
    }
  }

  .react-datepicker__header {
    text-align: center;
    background-color: ${Variables['datepicker__background-color']};
    border-bottom: 1px solid ${Variables['datepicker__border-color']};
    border-top-left-radius: ${Variables['datepicker__border-radius']};
    border-top-right-radius: ${Variables['datepicker__border-radius']};
    padding-top: 8px;
    position: relative;

    &--time {
      padding-bottom: 8px;
      padding-left: 5px;
      padding-right: 5px;
      height: 70.31px;
    }
  }

  .react-datepicker__year-dropdown-container--select,
  .react-datepicker__month-dropdown-container--select,
  .react-datepicker__month-year-dropdown-container--select,
  .react-datepicker__year-dropdown-container--scroll,
  .react-datepicker__month-dropdown-container--scroll,
  .react-datepicker__month-year-dropdown-container--scroll {
    display: inline-block;
    margin: 0 2px;
  }

  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker-year-header {
    margin-top: 0;
    color: ${Variables['datepicker__header-color']};
    font-weight: bold;
    font-size: ${Variables['datepicker__font-size']} * 1.18;
  }

  .react-datepicker-time__header {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .react-datepicker__navigation {
    background: none;
    line-height: ${Variables['datepicker__item-size']};
    text-align: center;
    cursor: pointer;
    position: absolute;
    top: 10px;
    width: 0;
    padding: 0;
    border: ${Variables['datepicker__navigation-size']} solid transparent;
    z-index: 1;
    height: 10px;
    width: 10px;
    text-indent: -999em;
    overflow: hidden;

    &--previous {
      left: 10px;
      border-right-color: ${Variables['datepicker__muted-color']};

      &:hover {
        border-right-color: ${darken(
          0.1,
          Variables['datepicker__muted-color'],
        )};
      }

      &--disabled,
      &--disabled:hover {
        border-right-color: ${Variables[
          'datepicker__navigation-disabled-color'
        ]};
        cursor: default;
      }
    }

    &--next {
      right: 90px;
      border-left-color: ${Variables['datepicker__muted-color']};
      &--with-time:not(&--with-today-button) {
        right: 80px;
      }

      &:hover {
        border-left-color: ${darken(0.1, Variables['datepicker__muted-color'])};
      }

      &--disabled,
      &--disabled:hover {
        border-left-color: ${Variables[
          'datepicker__navigation-disabled-color'
        ]};
        cursor: default;
      }
    }

    &--years {
      position: relative;
      top: 0;
      display: block;
      margin-left: auto;
      margin-right: auto;

      &-previous {
        top: 4px;
        border-top-color: ${Variables['datepicker__muted-color']};

        &:hover {
          border-top-color: ${darken(
            0.1,
            Variables['datepicker__muted-color'],
          )};
        }
      }

      &-upcoming {
        top: -4px;
        border-bottom-color: ${Variables['datepicker__muted-color']};

        &:hover {
          border-bottom-color: ${darken(
            0.1,
            Variables['datepicker__muted-color'],
          )};
        }
      }
    }
  }

  .react-datepicker__month-container {
    float: left;
  }

  .react-datepicker__year {
    &-container {
      margin: ${Variables.datepicker__margin};
      text-align: center;
      display: flex;
      flex-wrap: wrap;
      &-text {
        display: inline-block;
        cursor: pointer;
        flex: 1 0 30%;
        width: 12px;
        padding: 2px;
      }
    }
  }

  .react-datepicker__month {
    margin: ${Variables.datepicker__margin};
    text-align: center;
    .react-datepicker__month-text,
    .react-datepicker__quarter-text {
      display: inline-block;
      width: 4rem;
      margin: 2px;
    }
  }

  .react-datepicker__input-time-container {
    clear: both;
    width: 100%;
    float: left;
    margin: 5px 0 10px 15px;
    text-align: left;
    .react-datepicker-time__caption {
      display: inline-block;
    }
    .react-datepicker-time__input-container {
      display: inline-block;
      .react-datepicker-time__input {
        display: inline-block;
        margin-left: 10px;
        input {
          width: 85px;
        }
        input[type='time']::-webkit-inner-spin-button,
        input[type='time']::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type='time'] {
          -moz-appearance: textfield;
        }
      }
      .react-datepicker-time__delimiter {
        margin-left: 5px;
        display: inline-block;
      }
    }
  }

  .react-datepicker__time-container {
    float: right;
    width: 85px;

    &--with-today-button {
      display: inline;
      border: 1px solid #aeaeae;
      border-radius: 0.3rem;
      position: absolute;
      right: -72px;
      top: 0;
    }

    .react-datepicker__time {
      position: relative;
      background: white;
      border-left: 1px solid ${Variables['datepicker__border-color']};

      .react-datepicker__time-box {
        width: 85px;
        overflow-x: hidden;
        margin: 0 auto;
        text-align: center;
        ul.react-datepicker__time-list {
          list-style: none;
          margin: 0;
          height: calc(195px + (#{${Variables['datepicker__item-size']}} / 2));
          overflow-y: scroll;
          padding-right: 0px;
          padding-left: 0px;
          width: 100%;
          box-sizing: content-box;

          li.react-datepicker__time-list-item {
            height: 30px;
            padding: 5px 10px;
            white-space: nowrap;
            &:hover {
              cursor: pointer;
              background-color: ${Variables['datepicker__background-color']};
            }
            &--selected {
              background-color: ${Variables['datepicker__selected-color']};
              color: white;
              font-weight: bold;
              &:hover {
                background-color: ${Variables['datepicker__selected-color']};
              }
            }
            &--disabled {
              color: ${Variables['datepicker__muted-color']};

              &:hover {
                cursor: default;
                background-color: transparent;
              }
            }
          }
        }
      }
    }
  }

  .react-datepicker__week-number {
    color: ${Variables['datepicker__muted-color']};
    display: inline-block;
    width: ${Variables['datepicker__item-size']};
    line-height: ${Variables['datepicker__item-size']};
    text-align: center;
    margin: ${Variables['datepicker__day-margin']};
    &.react-datepicker__week-number--clickable {
      cursor: pointer;
      &:hover {
        border-radius: ${Variables['datepicker__border-radius']};
        background-color: ${Variables['datepicker__background-color']};
      }
    }
  }

  .react-datepicker__day-names,
  .react-datepicker__week {
    white-space: nowrap;
  }

  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    color: ${Variables['datepicker__text-color']};
    display: inline-block;
    width: ${Variables['datepicker__item-size']};
    line-height: ${Variables['datepicker__item-size']};
    text-align: center;
    margin: ${Variables['datepicker__day-margin']};
  }

  .react-datepicker__month,
  .react-datepicker__quarter,
  .react-datepicker__year-container-text {
    &--selected,
    &--in-selecting-range,
    &--in-range {
      border-radius: ${Variables['datepicker__border-radius']};
      background-color: ${Variables['datepicker__selected-color']};
      color: #fff;

      &:hover {
        background-color: ${darken(
          0.05,
          Variables['datepicker__selected-color'],
        )};
      }
    }
    &--disabled {
      color: ${Variables['datepicker__muted-color']};
      pointer-events: none;
      &:hover {
        cursor: default;
        background-color: transparent;
      }
    }
  }

  .react-datepicker__day,
  .react-datepicker__month-text,
  .react-datepicker__quarter-text {
    cursor: pointer;

    &:hover {
      border-radius: ${Variables['datepicker__border-radius']};
      background-color: ${Variables['datepicker__background-color']};
    }

    &--today {
      font-weight: bold;
    }

    &--highlighted {
      border-radius: ${Variables['datepicker__border-radius']};
      background-color: ${Variables['datepicker__highlighted-color']};
      color: #fff;

      &:hover {
        background-color: ${darken(
          0.05,
          Variables['datepicker__highlighted-color'],
        )};
      }

      &-custom-1 {
        color: magenta;
      }

      &-custom-2 {
        color: green;
      }
    }

    &--selected,
    &--in-selecting-range,
    &--in-range {
      border-radius: ${Variables['datepicker__border-radius']};
      background-color: ${Variables['datepicker__selected-color']};
      color: #fff;

      &:hover {
        background-color: ${darken(
          0.05,
          Variables['datepicker__selected-color'],
        )};
      }
    }

    &--keyboard-selected {
      border-radius: ${Variables['datepicker__border-radius']};
      background-color: ${lighten(
        0.1,
        Variables['datepicker__selected-color'],
      )};
      color: #fff;

      &:hover {
        background-color: ${darken(
          0.05,
          Variables['datepicker__selected-color'],
        )};
      }
    }

    &--in-selecting-range:not(&--in-range) {
      background-color: rgba(${Variables['datepicker__selected-color']}, 0.5);
    }

    &--in-range:not(&--in-selecting-range) {
      .react-datepicker__month--selecting-range & {
        background-color: ${Variables['datepicker__background-color']};
        color: ${Variables['datepicker__text-color']};
      }
    }

    &--disabled {
      cursor: default;
      color: ${Variables['datepicker__muted-color']};

      &:hover {
        background-color: transparent;
      }
    }
  }

  .react-datepicker__month-text,
  .react-datepicker__quarter-text {
    &.react-datepicker__month--selected,
    &.react-datepicker__month--in-range,
    &.react-datepicker__quarter--selected,
    &.react-datepicker__quarter--in-range {
      &:hover {
        background-color: ${Variables['datepicker__selected-color']};
      }
    }
    &:hover {
      background-color: ${Variables['datepicker__background-color']};
    }
  }

  .react-datepicker__input-container {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .react-datepicker__year-read-view,
  .react-datepicker__month-read-view,
  .react-datepicker__month-year-read-view {
    border: 1px solid transparent;
    border-radius: ${Variables['datepicker__border-radius']};

    &:hover {
      cursor: pointer;

      .react-datepicker__year-read-view--down-arrow,
      .react-datepicker__month-read-view--down-arrow {
        border-top-color: ${darken(0.1, Variables['datepicker__muted-color'])};
      }
    }

    &--down-arrow {
      @extend %triangle-arrow-down;
      border-top-color: ${Variables['datepicker__muted-color']};
      float: right;
      margin-left: 20px;
      top: 8px;
      position: relative;
      border-width: ${Variables['datepicker__navigation-size']};
    }
  }

  .react-datepicker__year-dropdown,
  .react-datepicker__month-dropdown,
  .react-datepicker__month-year-dropdown {
    background-color: ${Variables['datepicker__background-color']};
    position: absolute;
    width: 50%;
    left: 25%;
    top: 30px;
    z-index: 1;
    text-align: center;
    border-radius: ${Variables['datepicker__border-radius']};
    border: 1px solid ${Variables['datepicker__border-color']};

    &:hover {
      cursor: pointer;
    }

    &--scrollable {
      height: 150px;
      overflow-y: scroll;
    }
  }

  .react-datepicker__year-option,
  .react-datepicker__month-option,
  .react-datepicker__month-year-option {
    line-height: 20px;
    width: 100%;
    display: block;
    margin-left: auto;
    margin-right: auto;

    &:first-of-type {
      border-top-left-radius: ${Variables['datepicker__border-radius']};
      border-top-right-radius: ${Variables['datepicker__border-radius']};
    }

    &:last-of-type {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      border-bottom-left-radius: ${Variables['datepicker__border-radius']};
      border-bottom-right-radius: ${Variables['datepicker__border-radius']};
    }

    &:hover {
      background-color: ${Variables['datepicker__muted-color']};

      .react-datepicker__navigation--years-upcoming {
        border-bottom-color: ${darken(
          0.1,
          Variables['datepicker__muted-color'],
        )};
      }

      .react-datepicker__navigation--years-previous {
        border-top-color: ${darken(0.1, Variables['datepicker__muted-color'])};
      }
    }

    &--selected {
      position: absolute;
      left: 15px;
    }
  }

  .react-datepicker__close-icon {
    cursor: pointer;
    background-color: transparent;
    border: 0;
    outline: 0;
    padding: 0px 6px 0px 0px;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    display: table-cell;
    vertical-align: middle;

    &::after {
      cursor: pointer;
      background-color: ${Variables['datepicker__selected-color']};
      color: #fff;
      border-radius: 50%;
      height: 16px;
      width: 16px;
      padding: 2px;
      font-size: 12px;
      line-height: 1;
      text-align: center;
      display: table-cell;
      vertical-align: middle;
      content: '\00d7';
    }
  }

  .react-datepicker__today-button {
    background: ${Variables['datepicker__background-color']};
    border-top: 1px solid ${Variables['datepicker__border-color']};
    cursor: pointer;
    text-align: center;
    font-weight: bold;
    padding: 5px 0;
    clear: left;
  }

  .react-datepicker__portal {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    left: 0;
    top: 0;
    justify-content: center;
    align-items: center;
    display: flex;
    z-index: 2147483647;

    .react-datepicker__day-name,
    .react-datepicker__day,
    .react-datepicker__time-name {
      width: 3rem;
      line-height: 3rem;
    }

    /* Resize for small screens */
    @media (max-width: 400px), (max-height: 550px) {
      .react-datepicker__day-name,
      .react-datepicker__day,
      .react-datepicker__time-name {
        width: 2rem;
        line-height: 2rem;
      }
    }

    .react-datepicker__current-month,
    .react-datepicker-time__header {
      font-size: ${Variables['datepicker__font-size']} * 1.8;
    }

    .react-datepicker__navigation {
      border: 1.8 * ${Variables['datepicker__navigation-size']} solid
        transparent;
    }

    .react-datepicker__navigation--previous {
      border-right-color: ${Variables['datepicker__muted-color']};

      &:hover {
        border-right-color: ${darken(
          0.1,
          Variables['datepicker__muted-color'],
        )};
      }

      &--disabled,
      &--disabled:hover {
        border-right-color: ${Variables[
          'datepicker__navigation-disabled-color'
        ]};
        cursor: default;
      }
    }

    .react-datepicker__navigation--next {
      border-left-color: ${Variables['datepicker__muted-color']};
      right: 90px;

      &:hover {
        border-left-color: ${darken(0.1, Variables['datepicker__muted-color'])};
      }

      &--disabled,
      &--disabled:hover {
        border-left-color: ${Variables[
          'datepicker__navigation-disabled-color'
        ]};
        cursor: default;
      }
    }
  }
`;
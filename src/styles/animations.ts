import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  .title-on-head-enter {
    opacity: 0;
    transform: scaleX(0);
    visibility: visible;
  }
  .title-on-head-enter-active {
    opacity: 1;
    transform: scaleX(1);
    transition: all 250ms;
  }
  .title-on-head-exit {
    opacity: 1;
    transform: scaleX(1);
    visibility: visible;
  }
  .title-on-head-exit-active {
    opacity: 0;
    transform: scaleX(0);
    transition: all 250ms;
    visibility: hidden;

  }


  .title-on-content-enter {
    opacity: 0;
    transform: scaleX(0);
    visibility: visible;
  }
  .title-on-content-enter-active {
    opacity: 1;
    transform: scaleX(1);
    transition: all 500ms;
  }
  .title-on-content-exit {
    opacity: 1;
    transform: scaleX(1);
    visibility: visible;
  }
  .title-on-content-exit-active {
    opacity: 0;
    transform: scaleX(0);
    transition: all 500ms;
    visibility: hidden;
  }

  .buttons-on-head-enter {
    opacity: 0;
    transform: scaleX(0);
    visibility: visible;
  }
  .buttons-on-head-enter-active {
    opacity: 1;
    transform: scaleX(1);
    transition: all 250ms;
  }
  .buttons-on-head-exit {
    opacity: 1;
    transform: scaleX(1);
    visibility: visible;
  }
  .buttons-on-head-exit-active {
    opacity: 0;
    transform: scaleX(0);
    transition: all 250ms;
    visibility: hidden;
  }
`;

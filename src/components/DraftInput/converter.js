import React from 'react';
import { convertToHTML } from 'draft-convert';

const styleToHTML = (style) => {
  switch (style) {
    case 'STRIKETHROUGH':
      return <s />;
    default:
      return null;
  }
};

const blockToHTML = (block) => {
  const blockType = block.type;

  switch (blockType) {
    case 'BREAK':
      return <hr className="break" />;
    default:
      return null;
  }
};

const entityToHTML = (entity, text) => {
  return text;
};

const options = {
  styleToHTML,
  blockToHTML,
  entityToHTML,
};

const converterFunction = convertToHTML(options);

export default (contentState) => converterFunction(contentState);

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  ContentState,
  convertFromHTML,
} from 'draft-js';
import converter from './converter.js';
import 'draft-js/dist/Draft.css';

import RichEditorDraftCSS from '../../styles/rich-editor-draft';

import { Container } from './styles';

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'BREAK', style: 'break' },
];

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Strike Through', style: 'STRIKETHROUGH' },
  { label: 'Monospace', style: 'CODE' },
];

function getBlockStyle(block: any): any {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

interface IDraftInputProps {
  name: string;
}

const DraftInput: React.FC<IDraftInputProps> = ({ name }) => {
  const editorRef = useRef<Editor | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { defaultValue, fieldName, registerField } = useField(name);

  const [editorState, setEditorState] = useState<EditorState>(() =>
    EditorState.createEmpty(),
  );

  useEffect(() => {
    const blockFromHTML = convertFromHTML(defaultValue);
    const content = ContentState.createFromBlockArray(
      blockFromHTML.contentBlocks,
      blockFromHTML.entityMap,
    );

    setEditorState(EditorState.createWithContent(content));
  }, [defaultValue]);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.value = converter(editorState.getCurrentContent());
    }
  }, [editorState]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleKeyCommand = useCallback(
    (command: any, _editorState: any): any => {
      const newState = RichUtils.handleKeyCommand(_editorState, command);
      if (newState) {
        setEditorState(newState);
        return true;
      }
      return false;
    },
    [],
  );

  const mapKeyToEditorCommand = useCallback(
    (e: any): any => {
      if (e.keyCode === 9 /* TAB */) {
        const newEditorState = RichUtils.onTab(
          e,
          editorState,
          4 /* maxDepth */,
        );
        if (newEditorState !== editorState) {
          setEditorState(newEditorState);
        }
        return;
      }
      // eslint-disable-next-line consistent-return
      return getDefaultKeyBinding(e);
    },
    [editorState],
  );

  const toggleBlockType = useCallback(
    (blockType: any): void => {
      setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    },
    [editorState],
  );

  const toggleInlineStyle = useCallback(
    (inlineStyle: any): void => {
      setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    },
    [editorState],
  );

  const focus = useCallback(() => {
    if (editorRef && editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  const handleKeyDown = useCallback(
    (ev) => {
      if (ev.keyCode === 13) {
        focus();
      }
    },
    [focus],
  );

  // useMemo
  let className = 'RichEditor-editor';
  const contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== 'unstyled') {
      className += ' RichEditor-hidePlaceholder';
    }
  }

  return (
    <Container>
      <input type="text" ref={inputRef} hidden />

      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={toggleInlineStyle}
        />
        <div
          className={className}
          onClick={focus}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
        >
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={mapKeyToEditorCommand}
            onChange={setEditorState}
            placeholder="Add description..."
            ref={editorRef}
            spellCheck
          />
        </div>
      </div>
      <RichEditorDraftCSS />
    </Container>
  );
};
interface IBlockStyleControls {
  onToggle(style: string): void;
  editorState: any;
}
const BlockStyleControls: React.FC<IBlockStyleControls> = ({
  editorState,
  onToggle,
}) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

interface IInLineStyleControls {
  onToggle(style: string): void;
  editorState: any;
}
const InlineStyleControls: React.FC<IInLineStyleControls> = ({
  onToggle,
  editorState,
}) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

interface IStyleButton {
  style: string;
  onToggle(style: string): void;
  label: string;
  active: boolean;
}
const StyleButton: React.FC<IStyleButton> = ({
  style,
  onToggle,
  label,
  active,
}) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <span
      className={`RichEditor-styleButton ${
        active ? 'RichEditor-activeButton' : ''
      }`}
      onMouseDown={() => onToggle(style)}
    >
      {label}
    </span>
  );
};

export default DraftInput;

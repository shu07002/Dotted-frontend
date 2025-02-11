import React from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import styled from 'styled-components';
import { ImageResize } from 'quill-image-resize-module-ts';

Quill.register('modules/ImageResize', ImageResize);

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image'],
    ['clean']
  ],
  ImageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize']
  }
};

const formats = [
  'font',
  'size',
  'header',
  'color',
  'background',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',

  'indent',
  'link',
  'image'
];

interface EditorProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

export default function Editor({ content, setContent }: EditorProps) {
  return (
    <EditorWrapper>
      <StyledReactQuill
        placeholder="Please write content"
        theme="snow"
        modules={modules}
        formats={formats}
        value={content}
        onChange={setContent}
      />
    </EditorWrapper>
  );
}

const EditorWrapper = styled.div`
  width: 100%;
  margin-bottom: 4.2rem;
`;

const StyledReactQuill = styled(ReactQuill)`
  width: 100%;

  box-sizing: border-box;

  .ql-editor,
  .ql-blank {
    height: 42.6rem;
  }

  .ql-size-small {
    font-size: 1.5rem;
  }

  p {
    font-size: 2rem;
  }

  .ql-size-large {
    font-size: 3rem;
  }
`;

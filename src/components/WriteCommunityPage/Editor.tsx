import React, { useEffect, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import styled from 'styled-components';
import { ImageResize } from 'quill-image-resize-module-ts';
import { UseFormSetValue, UseFormTrigger, UseFormWatch } from 'react-hook-form';
import { Communitydata } from '@/pages/community/WriteCommunityPage';
import ErrorMsg from '../SignUpPage/ErrorMsg';

Quill.register('modules/ImageResize', ImageResize);

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
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
  setValue: UseFormSetValue<Communitydata>;
  watch: UseFormWatch<Communitydata>;
  trigger: UseFormTrigger<Communitydata>;
}

export default function Editor({ setValue, watch, trigger }: EditorProps) {
  const quillRef = useRef<ReactQuill>(null);

  // 폼 데이터와 동기화
  const content = watch('content');

  useEffect(() => {
    if (quillRef.current) {
      setValue('content', content);
    }
  }, [content, setValue]);

  const handleChange = (value: string) => {
    setValue('content', value);
    trigger('content'); // 변경될 때마다 검증 실행
  };

  return (
    <EditorWrapper>
      <StyledReactQuill
        ref={quillRef}
        placeholder="Please write content"
        theme="snow"
        modules={modules}
        formats={formats}
        value={content || ''}
        onChange={handleChange}
      />
      {!content?.trim() && <ErrorMsg msg="Content is required." />}
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

const ErrorText = styled.p`
  color: red;
  font-size: 1.4rem;
  margin-top: 0.5rem;
`;

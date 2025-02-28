import { EditorContent, useEditor } from '@tiptap/react';
import ResizableImage from './ResizableImage';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import styled from 'styled-components';

export const TiptapViewOnly = ({ content }: { content: string }) => {
  const editor = useEditor({
    content,
    editable: false, // 🚨 읽기 전용 모드 적용
    extensions: [
      ResizableImage,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight,
      StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false }
      })
    ]
  });

  if (!editor) return null;

  return (
    <EditorContainer>
      <StyledEditorContent editor={editor} />
    </EditorContainer>
  );
};

const EditorContainer = styled.div`
  margin-bottom: 4.2rem;
  border-radius: 4px;
  overflow: hidden;
`;

const StyledEditorContent = styled(EditorContent)`
  padding: 16px;
  min-height: 300px;

  .ProseMirror {
    outline: none;

    p {
      margin: 0.5em 0;
    }

    &:focus {
      outline: none;
    }
  }
`;

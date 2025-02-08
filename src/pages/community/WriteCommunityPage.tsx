import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import TagBox from '@/components/WriteCommunityPage/TagBox';
import Editor from '@/components/WriteCommunityPage/Editor';

export default function WriteCommunityPage() {
  const [selectedTag, setSelectedTag] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <WriteCommunityPageContainer>
      <Wrapper>
        <Title>Community</Title>

        <TagBox selectedTag={selectedTag} setSelectedTag={setSelectedTag} />

        <TitleWrapper>
          <label htmlFor="title"></label>
          <input
            type="text"
            name="title"
            placeholder="Please write title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </TitleWrapper>

        <Editor content={content} setContent={setContent} />

        <SubmitButton>Submit</SubmitButton>
      </Wrapper>
    </WriteCommunityPageContainer>
  );
}

const WriteCommunityPageContainer = styled.div`
  margin-top: 2.5rem;
  width: 100%;
  padding: 0 24.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1024px) {
    padding: 0 10rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
`;

const Title = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.gray700};
  font-family: Pretendard;
  font-size: 3.6rem;
  font-style: normal;
  font-weight: 700;
  line-height: 3.6rem; /* 100% */
  letter-spacing: -0.18rem;

  margin-bottom: 1.5rem;
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 5.4rem;

  > input {
    border: none;
    width: 100%;
    height: 100%;
    padding: 2rem 2.6rem;
    outline: none;
    border-top: 1px solid ${({ theme }) => theme.colors.gray400};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray400};
    background: ${({ theme }) => theme.colors.backgroundLayer2};

    font-family: Pretendard;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 500;
    line-height: 2.4rem; /* 150% */
    letter-spacing: -0.032rem;
  }
`;

const SubmitButton = styled.button`
  cursor: pointer;
  width: 100%;
  height: 4.2rem;
  flex-shrink: 0;
  width: 100%;
  border: none;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.purple600};
  color: ${({ theme }) => theme.colors.gray50};
  text-align: center;
  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 13.9rem;
`;

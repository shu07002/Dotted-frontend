import styled from 'styled-components';
import { Comment } from '@/pages/community/DetailCommunityPage';
import AReply from './AReply';

interface ReplySectionProps {
  replies: Comment[];
}

export default function ReplySection({ replies }: ReplySectionProps) {
  return (
    <CommentInputWrapper>
      {replies.map((reply, idx) => (
        <AReply reply={reply} key={idx} />
      ))}
    </CommentInputWrapper>
  );
}

const CommentInputWrapper = styled.div`
  width: 100%;
`;

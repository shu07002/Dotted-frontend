import styled from 'styled-components';

interface NiceMsgProps {
  msg: string;
}

export default function NiceMsg({ msg }: NiceMsgProps) {
  return (
    <div
      style={{
        marginLeft: '0.7rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}
    >
      <NiceText>{msg}</NiceText>
    </div>
  );
}

const NiceText = styled.span`
  color: ${({ theme }) => theme.colors.purple600};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 36px; /* 225% */
  letter-spacing: -0.48px;
`;

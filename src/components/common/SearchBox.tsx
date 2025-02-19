import styled from 'styled-components';

// html 참고
// <div>
//     <select name="searchType" id="searchType">
//         <option value="all">All</option>
//         <option value="title">Title</option>
//         <option value="content">Content</option>
//     </select>
//     <input type="text" placeholder="Search" />
//     <SearchIcon/>
// </div>

export const HeaderInputBox = styled.div<{ $width: string }>`
  width: ${({ $width }) => $width};
  height: 4rem;
  display: flex;
  background-color: ${({ theme }) => theme.colors.backgroundLayer1};
  border-radius: 5px;
  position: relative;
  padding: 0.9rem 0;

  select {
    width: 7.5rem;
    height: 100%;
    padding: 0 1.2rem;
    border: none;
    border-right: 1px solid ${({ theme }) => theme.colors.gray600};
    background-color: ${({ theme }) => theme.colors.backgroundLayer1};
    color: ${({ theme }) => theme.colors.gray600};
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 4rem;
    letter-spacing: -0.48px;

    &:focus {
      outline: none;
    }
  }

  input {
    width: 100%;
    height: 100%;
    padding: 0 1.2rem;
    border: none;
    background-color: ${({ theme }) => theme.colors.backgroundLayer1};
    color: ${({ theme }) => theme.colors.gray700};
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 4rem;

    &:focus {
      outline: none;
    }
  }

  svg {
    position: absolute;
    right: 1.6rem;
    top: 50%;
    transform: translateY(-50%);
  }
`;

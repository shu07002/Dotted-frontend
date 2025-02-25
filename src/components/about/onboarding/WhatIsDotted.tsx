import styled from 'styled-components';

export default function WhatIsDotted() {
  return (
    <Section>
      <p>What is Dotted</p>
      <h1>
        Conecting Lives, <br /> Strengthening Knowledge
      </h1>
      <div data-aos="fade-up">
        <span>
          <img
            src="https://i.pinimg.com/736x/02/25/07/0225070cf8ec553ded8a37e5cba74a23.jpg"
            alt="community"
          />
        </span>
        <span>
          <img
            src="https://i.pinimg.com/736x/02/25/07/0225070cf8ec553ded8a37e5cba74a23.jpg"
            alt="main"
          />
        </span>
        <span>
          <img
            src="https://i.pinimg.com/736x/02/25/07/0225070cf8ec553ded8a37e5cba74a23.jpg"
            alt="culture"
          />
        </span>
      </div>
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 9.6rem 0;
  overflow-x: hidden;

  > p {
    color: ${({ theme }) => theme.colors.purple600};
    font-size: 2rem;
    font-weight: 600;
    line-height: 3.6rem; /* 150% */
    letter-spacing: -0.72px;
  }

  > h1 {
    color: ${({ theme }) => theme.colors.gray700};
    text-align: center;
    font-size: 4.8rem;
    font-weight: 700;
    line-height: 6.3rem; /* 131.25% */
    letter-spacing: -2.4px;
  }

  > div {
    margin-top: 6.7rem;
    width: 100vw;
    display: flex;
    align-items: center;
    /* gap: 1.5rem; */

    > span {
      width: 40vw;
      height: 40rem;
      border-radius: 10px;
      transition: all 0.3s;
      /* overflow: hidden; */
      &:first-child {
        scale: 0.9;
        background-color: aliceblue;
      }
      &:nth-child(2) {
        background-color: antiquewhite;
        box-shadow: 0px 4px 20.6px -1px rgba(0, 0, 0, 0.19);
      }
      &:last-child {
        scale: 0.9;
        background-color: azure;
      }

      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
      }
    }
  }
`;

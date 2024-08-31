import styled from "styled-components";

export const breakpoints = {
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px",
};

const AppWrapper = styled.section`
  display: grid;
  width: calc(100vw - 10rem);
  height: 100%;
  grid-template-rows: 0.25fr 6fr;
  gap: 2rem;
  box-shadow: 0 0 16px 1px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  margin: 5rem 0 0 2rem;
  border: 1px solid white;
  box-shadow: 0px 3px 13px 0px rgba(255, 255, 255, 1);
  justify-items: center;

  @media (max-width: ${breakpoints.mobile}) {
    width: calc(100vw - 2rem);
    margin: 5rem 0 0 1rem;
  }

  @media (min-width: 480px) and (max-width: 600px) {
    width: calc(100vw - 4rem);
    margin: 5rem 0 0 2rem;
  }

  @media (min-width: ${breakpoints.tablet}) {
    width: calc(100vw - 9rem);
  }

  @media (min-width: ${breakpoints.desktop}) {
    width: calc(100vw - 9rem);
  }
`;

const SkillBlockWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 0.5fr 0.5fr 2fr;
  margin: 0;
`;

const SkillsListWrapper = styled.div`
  width: 100%;
  height: 100%;
  // padding: 1rem;
  box-shadow: 0px 0px 13px 0px rgba(102, 179, 255, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export { AppWrapper, SkillBlockWrapper, SkillsListWrapper };

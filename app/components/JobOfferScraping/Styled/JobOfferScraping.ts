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
  // border: 1px solid white;
  box-shadow: 0px 3px 13px 0px rgba(255, 255, 255, 1);
  // align-items: center;
  // justify-content: center;
  justify-items: center;

  @media (max-width: ${breakpoints.mobile}) {
    // background-color: lightcoral;
    width: calc(100vw - 4rem);
  }

  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    // background-color: lightgreen;
  }

  @media (min-width: ${breakpoints.tablet}) {
    // background-color: lightblue;
  }
`;

const SkillBlockWrapper = styled.div`
  width: 100%;
  height: 100%;
  // background-color: grey;
  // border: 1px solid yellow;
  display: grid;
  grid-template-rows: 0.5fr 0.5fr 2fr;
  // gap: 2rem;
  margin: 0;
`;

const SkillsListWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  // background-color: green;
  // border: 1px solid blue;
  box-shadow: 0px 0px 13px 0px rgba(102, 179, 255, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export { AppWrapper, SkillBlockWrapper, SkillsListWrapper };

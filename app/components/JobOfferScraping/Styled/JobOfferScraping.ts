import styled from "styled-components";

export const breakpoints = {
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px",
};

const AppWrapper = styled.section`
  display: grid;
  width: calc(100vw - 10rem);
  grid-template-rows: 0.5fr 5fr 0.5fr;
  gap: 2rem;
  box-shadow: 0 0 16px 1px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  margin: 5rem 2rem;
  border: 1px solid white;

  @media (max-width: ${breakpoints.mobile}) {
    background-color: lightcoral;
  }

  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    background-color: lightgreen;
  }

  @media (min-width: ${breakpoints.tablet}) {
    background-color: lightblue;
  }
`;

const SkillBlockWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: grey;
  border: 1px solid yellow;
  display: grid;
  grid-template-rows: 0.5fr 0.5fr 3fr;
  // gap: 2rem;
  margin: 0;
`;

const SkillsListWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: green;
  border: 1px solid blue;
`;

export { AppWrapper, SkillBlockWrapper, SkillsListWrapper };

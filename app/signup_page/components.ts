import styled from "styled-components";

export const LoginWrapper = styled.section`
  background-color: grey;
  display: grid;
  grid-template-areas: "imageBackGround loginPanel";
  border-box: box-sizing;
  grid-template-columns: 1fr 1fr;

  @media only screen and (max-width: 1200px) {
    grid-template-columns: 1fr;
    grid-template-areas: "loginPanel";
  }

  @media only screen and (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-areas: "loginPanel";
  }

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-areas: "loginPanel";
  }
`;

export const LeftColumn = styled.div`
  grid-area: ${(props) =>
    props.isloginpage === "true" ? "imageBackGround" : "loginPanel"};
  background-color: yellow;
  flex: 1;
  position: relative;
  overflow: "hidden";
`;

export const RightColumn = styled.div`
  height: calc(100vh);
  background-color: rgb(30, 90, 160);
  flex: 1;
  position: relative;
`;

export const LoginPanel = styled.div`
  grid-area: ${(props) =>
    props.isloginpage === "true" ? "loginPanel" : "imageBackGround"};
  position: absolute;
  box-sizing: border-box;
  padding: 5rem 2rem;
  top: 50%;
  left: 50%;
  height: 40rem;
  width: 35rem;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: rgba(188, 180, 180, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.28);

  @media only screen and (max-width: 1200px) {
    height: 95vh;
    width: 95vw;
    padding: 5rem 1rem;
    align-items: stretch;

    background: transparent;
    box-shadow: unset;
    backdrop-filter: unset;
    -webkit-backdrop-filter: unset;
    border-radius: unset;
    border: unset;
  }

  @media only screen and (max-width: 900px) {
    height: 95vh;
    width: 95vw;
    padding: 2rem 1rem;
    background: transparent;
    box-shadow: unset;
    backdrop-filter: unset;
    -webkit-backdrop-filter: unset;
    border-radius: unset;
    border: unset;
    align-items: stretch;
  }

  @media only screen and (max-width: 600px) {
    height: 95vh;
    width: 95vw;
    padding: 5rem 1rem;
    background: transparent;
    box-shadow: unset;
    backdrop-filter: unset;
    -webkit-backdrop-filter: unset;
    border-radius: unset;
    border: unset;
  }
`;

"use client";

import { Avatar, Button, Typography } from "@mui/material";
import Image from "next/image";
import styled from "styled-components";
import TextField from "@mui/material/TextField";

const LoginWrapper = styled.section`
  //   height: calc(100vh);
  background-color: grey;
  display: flex;
`;

const LeftColumn = styled.div`
  height: calc(100vh);
  background-color: yellow;
  flex: 1;
  position: relative;
  width: "100%";
  overflow: "hidden";
`;

const RightColumn = styled.div`
  height: calc(100vh);
  background-color: rgb(30, 90, 160);
  flex: 1;
  position: relative;
`;

const LoginPanel = styled.div`
  position: absolute;
  box-sizing: border-box;
  padding: 5rem 2rem;
  top: 50%;
  left: 50%;
  height: 60vh;
  width: 25vw;
  //   background-color: green;
  transform: translate(-50%, -50%);

  background: rgba(188, 180, 180, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Login() {
  return (
    <LoginWrapper>
      <LeftColumn>
        <Image
          src="/leaves.jpg"
          alt="leaves"
          layout="fill" // Fill the parent container
          objectFit="cover" // Maintain aspect ratio and cover the entire area
          quality={100} // Optional: Set image quality (0 to 100)
        />
      </LeftColumn>
      <RightColumn>
        <LoginPanel>
          <Avatar src="" sx={{ width: 66, height: 66 }} />
          <br />
          <TextField
            required
            id="filled-required"
            label="Login"
            // defaultValue="user"
            variant="standard"
          />
          <br />
          <TextField
            required
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
          />
          <br />
          <Button variant="contained">Log in</Button>
          <br />
          <Typography> Dont have account? </Typography>
          {/* <br /> */}
          <Button variant="contained">Sign up</Button>
        </LoginPanel>
      </RightColumn>
    </LoginWrapper>
  );
}

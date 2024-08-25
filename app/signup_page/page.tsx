"use client";

import { Avatar, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import {
  LoginWrapper,
  LeftColumn,
  RightColumn,
  LoginPanel,
} from "./components";
import { useState } from "react";

export default function SignUp() {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const router = useRouter();
  const moveToOtherPage = function (btnId) {
    if (isLoginPage && btnId === "loginBtn") {
      router.push("/");
    }

    if (!isLoginPage && btnId === "signupBtn") {
      router.push("/");
    }

    if (isLoginPage && btnId === "signupBtn") {
      router.push("/signup_page");
    }

    if (!isLoginPage && btnId === "loginBtn") {
      router.push("/login_page");
    }
  };

  return (
    <LoginWrapper>
      <LeftColumn isloginpage={isLoginPage.toString()}>
        <Image
          src="/leaves.jpg"
          alt="leaves"
          layout="fill"
          objectFit="cover"
          quality={10}
        />
      </LeftColumn>
      <RightColumn>
        <Image
          src="/stars.jpg"
          alt="leaves"
          layout="fill"
          objectFit="cover"
          quality={10}
        />
        <LoginPanel isloginpage={isLoginPage.toString()}>
          <Avatar src="" sx={{ width: 86, height: 86, margin: "0 auto" }} />
          <br />
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "clamp(min(2vw, 2rem), 15vw, max(2vw, 2rem))",
              color: "white",
            }}
          >
            Career Builder{" "}
          </Typography>
          <Typography sx={{ textAlign: "center", color: "white" }}>
            Boost your career for free!{" "}
          </Typography>

          <TextField
            required
            id="filled-required"
            label="Login"
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
          {!isLoginPage ? (
            <TextField
              required
              id="standard-password-input"
              label="Confirm password"
              type="password"
              autoComplete="current-password"
              variant="standard"
            />
          ) : null}
          <br />
          <br />
          {isLoginPage ? (
            <Button
              variant="contained"
              id="loginBtn"
              onClick={(e) => moveToOtherPage(e.target.id)}
            >
              Log in
            </Button>
          ) : (
            <Button
              variant="contained"
              id="signupBtn"
              onClick={(e) => moveToOtherPage(e.target.id)}
            >
              Sign up
            </Button>
          )}
          <br />
          <Typography sx={{ margin: "0 auto", color: "white" }}>
            {isLoginPage ? "Don't have account?" : "Have already account?"}
          </Typography>
          {isLoginPage ? (
            <Button
              variant="contained"
              id="signupBtn"
              onClick={(e) => moveToOtherPage(e.target.id)}
            >
              Sign up
            </Button>
          ) : (
            <Button
              variant="contained"
              id="loginBtn"
              onClick={(e) => moveToOtherPage(e.target.id)}
            >
              Log in
            </Button>
          )}
        </LoginPanel>
      </RightColumn>
    </LoginWrapper>
  );
}

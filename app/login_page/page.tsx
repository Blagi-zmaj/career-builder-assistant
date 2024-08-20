"use client";

import { Avatar, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  NavAndDrawerContext,
  // ,
} from "../util/context";
import TextField from "@mui/material/TextField";
import {
  LoginWrapper,
  LeftColumn,
  RightColumn,
  LoginPanel,
} from "./components";
import { useContext, useRef, useState } from "react";

export default function Login() {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const loginRef = useRef();
  const signupRef = useRef();

  const { userLoggingData, updateUserLoggingData } =
    useContext(NavAndDrawerContext);
  console.log(userLoggingData, updateUserLoggingData);
  const router = useRouter();
  const moveToOtherPage = function (btnId) {
    console.log(btnId);
    if (isLoginPage && btnId === "loginBtn") {
      window.localStorage.setItem("isLogged", "true");
      window.localStorage.setItem(
        "login",
        loginRef?.current.querySelector("#filled-required").value || "Anonymous"
      );
      // console.log(loginRef?.current.querySelector("#filled-required").value);
      // console.log(loginRef?.current?.children[1]?.children[0].value);
      updateUserLoggingData({
        login:
          loginRef?.current.querySelector("#filled-required").value ||
          "Anonymous",
        password: signupRef?.current.querySelector("#standard-password-input")
          .value,
      });
      router.push("/");
    }

    if (!isLoginPage && btnId === "signupBtn") {
      router.push("/");
    }

    // changing pages - login or signup
    if (isLoginPage && btnId === "signupBtn") {
      router.push("/signup_page");
    }

    if (!isLoginPage && btnId === "loginBtn") {
      router.push("/login_page");
    }
  };

  return (
    <LoginWrapper>
      {/* lOGIN */}
      <LeftColumn isloginpage={isLoginPage.toString()}>
        <Image
          src="/leaves.jpg"
          alt="leaves"
          layout="fill" // Fill the parent container
          objectFit="cover" // Maintain aspect ratio and cover the entire area
          quality={10} // Optional: Set image quality (0 to 100)
        />
      </LeftColumn>
      <RightColumn>
        <Image
          src="/stars.jpg"
          alt="leaves"
          layout="fill" // Fill the parent container
          objectFit="cover" // Maintain aspect ratio and cover the entire area
          quality={10} // Optional: Set image quality (0 to 100)
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
            ref={loginRef}
          />
          <br />
          <TextField
            required
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            ref={signupRef}
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

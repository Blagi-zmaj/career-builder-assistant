import SelectAllTransferList from "./TransferList";
import {
  AppWrapper,
  SkillBlockWrapper,
  SkillsListWrapper,
} from "./Styled/JobOfferScraping";
import ChipsArray from "../ChipsArray";
import { useEffect, useReducer, useState } from "react";
import Link from "next/link";
import { Button, Divider } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const reducer = function (state, action) {
  if (action.type === "update") {
    console.log({ ...state, ...action.data });
    console.log(action.newOwned);

    window.localStorage.setItem(
      "skills",
      JSON.stringify([...state.owned, ...action.newOwned])
    );

    return {
      ...state,
      ...action.data,
      compatible: [...state.compatible, ...action.newOwned],
    };
  }

  if (action.type === "fetchFromLocalStorage") {
    return {
      ...state,
      owned: action.ownedFromStorage,
    };
  }

  if (action.type === "compute") {
    return {
      ...state,
      compatible: getCompatible(state.required, state.owned),
      missing: getMissing(state.required, state.owned),
    };
  }
};

const getDataFromWebsite = function () {};

const getCompatible = function (required, owned) {
  return required.filter((el) => {
    return owned.indexOf(el) !== -1;
  });
};

const getMissing = function (required, owned) {
  return required.filter((el) => {
    return owned.indexOf(el) === -1;
  });
};

export default function JobOfferScraping() {
  // useEffect(() => {
  //   const technologies = ["Python", "Google analytics", "HTML", "CSS"];
  //   window.localStorage.setItem("skills", JSON.stringify(technologies));
  // }, []);

  //get data from website
  const [dataFromWeb, setDataFromWeb] = useState([
    "React",
    "Polish",
    "AI",
    "Azure",
    "Google analytics",
    "Vue.js",
    "Python",
  ]);

  useEffect(() => {
    const getDataFromLocalStorage = (key) => {
      if (typeof window !== "undefined") {
        const jsonArray = localStorage.getItem(key);
        console.log(jsonArray);
        if (jsonArray) {
          try {
            return JSON.parse(jsonArray);
          } catch (e) {
            console.error("Error parsing JSON from Local Storage:", e);
            return null;
          }
        }
        return jsonArray;
      }
      return null;
    };

    if (!getDataFromLocalStorage("skills")) {
      window.localStorage.setItem("skills", "[]");
    }

    const skills = getDataFromLocalStorage("skills");
    dispatch({ type: "fetchFromLocalStorage", ownedFromStorage: skills });
  }, []);

  const [offerData, dispatch] = useReducer(reducer, {
    required: dataFromWeb, // add here from website in future
    compatible: [],
    missing: [],
    owned: [],
  });

  useEffect(() => {
    dispatch({ type: "compute" });
  }, []);

  const updateOwnedSkills = function (updatedSkills, missingChecked) {
    dispatch({ type: "update", data: updatedSkills, newOwned: missingChecked });
  };

  const addOnlyRequiredSkillsToCV = function (requiredSkills) {
    console.log("addOnlyRequiredSkillsToCV", requiredSkills);
    window.localStorage.setItem("skills", JSON.stringify(requiredSkills));
  };

  const deleteOwnedSkill = function (deletedSkill) {
    console.log(`deletedSkill: ${deletedSkill}`);
    dispatch({ type: "delete" });
  };

  return (
    <AppWrapper>
      <h1 style={{ textAlign: "center" }}>
        Check how your CV match offer you are interested in!
      </h1>
      <SkillBlockWrapper>
        <SkillsListWrapper>
          <h1>Wymagane</h1>
          <ChipsArray data={offerData.required} type="required" />
          <Divider />
          <Link
            key="requiredToCV"
            href="/cv_creator"
            style={{ textDecoration: "none" }}
          >
            {/* <button
              onClick={() => addOnlyRequiredSkillsToCV(offerData.required)}
              style={{
                width: "100%",
                height: "2.5rem",
                margin: "1rem 0",
                fontSize: "1rem",
              }}
            >
              Do you wanna see ONLY required skills on YOUR cv? Click HERE!
            </button> */}
            <Button
              variant="contained"
              color="info"
              size="medium"
              onClick={() => addOnlyRequiredSkillsToCV(offerData.required)}
              endIcon={<SendIcon />}
              style={{ marginTop: "1.5rem" }}
            >
              Do you wanna see ONLY required skills on YOUR cv? Click HERE!
            </Button>
          </Link>
        </SkillsListWrapper>
        <SkillsListWrapper>
          <h1>Zgodne</h1>
          <ChipsArray data={offerData.compatible} type="compatible" />
        </SkillsListWrapper>

        <SelectAllTransferList
          data={offerData}
          updateOwnedSkills={updateOwnedSkills}
          // deleteOwnedSkill={deleteOwnedSkill}
        />
      </SkillBlockWrapper>
    </AppWrapper>
  );
}

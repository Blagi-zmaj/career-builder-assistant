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

  if (action.type === "updateRequired") {
    return {
      ...state,
      required: action.data,
    };
  }
};

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
  const [skillsFromOffer, setSkillsFromOffer] = useState([]);

  const getUrlFromUser = function (userUrl) {
    scrapeOfferSkills(userUrl);
  };

  const scrapeOfferSkills = async function (url: string) {
    const response = await fetch("pages/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    setSkillsFromOffer(data);
  };

  useEffect(() => {
    const getDataFromLocalStorage = (key) => {
      if (typeof window !== "undefined") {
        const jsonArray = localStorage.getItem(key);
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
    required: skillsFromOffer,
    compatible: [],
    missing: [],
    owned: [],
  });

  useEffect(() => {
    dispatch({ type: "updateRequired", data: skillsFromOffer });
    dispatch({ type: "compute" });
  }, [skillsFromOffer]);

  const updateOwnedSkills = function (updatedSkills, missingChecked) {
    dispatch({ type: "update", data: updatedSkills, newOwned: missingChecked });
  };

  const addOnlyRequiredSkillsToCV = function (requiredSkills) {
    window.localStorage.setItem("skills", JSON.stringify(requiredSkills));
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
          {offerData.required.length > 0 ? (
            <Link
              key="requiredToCV"
              href="/cv_creator"
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                color="info"
                size="medium"
                onClick={() => addOnlyRequiredSkillsToCV(offerData.required)}
                endIcon={<SendIcon />}
              >
                Do you wanna see ONLY required skills on YOUR cv? Click HERE!
              </Button>
            </Link>
          ) : (
            <p
              style={{
                color: "white",
                textShadow: "1px 1px 2px grey, 0 0 1em grey, 0 0 0.2em grey",
              }}
            >
              Write url below to check skills comparison with your cv!
            </p>
          )}
        </SkillsListWrapper>
        <SkillsListWrapper>
          <h1>Zgodne</h1>
          <ChipsArray data={offerData.compatible} type="compatible" />
        </SkillsListWrapper>

        <SelectAllTransferList
          getUrlFromUser={getUrlFromUser}
          data={offerData}
          updateOwnedSkills={updateOwnedSkills}
        />
      </SkillBlockWrapper>
    </AppWrapper>
  );
}

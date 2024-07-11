import { ChangeEvent, MouseEvent, useContext, useState } from "react";
import UserDetailsList from "../UserDetailsList";
import styles from "./SkillsAndLanguages.module.css";
import { NavAndDrawerContext } from "@/app/util/context";
import { userProfileData } from "../CVCreatorUtils/helpers";

export default function SkillsAndLanguagesSection() {
  const { showButtons } = useContext(NavAndDrawerContext);

  console.log(`Render SkillsAndLanuageSection`);

  return (
    <>
      {["skills", "languages"].map((categoryList, indexCategory) => {
        return (
          <div key={categoryList} className={styles.asideDataRowBox}>
            <h3>{`${categoryList.slice(0, 1).toUpperCase()}${categoryList.slice(
              1
            )}`}</h3>
            <UserDetailsList
              categoryList={categoryList}
              // userData={userContact}
              // handleBlur={handleBlur}
              // handleUserDetailsKeyDown={handleUserDetailsKeyDown}
              // handleChangeUserActualInput={handleChangeUserActualInput}
              // replaceTextWithInput={replaceTextWithInput}
              // handleDeleteListItem={handleDeleteListItem}
              // handleChangeRatingExistingListItem={
              //   handleChangeRatingExistingListItem
              // }
              // handleChangeAddNewListItem={handleChangeAddNewListItem}
              // handleChangeRatingNewListItem={handleChangeRatingNewListItem}
              // handleAddNewItemList={handleAddNewItemList}
              hideAllButtons={showButtons}
              // isDisabledAddBtn={isDisabledAddBtn}
              // showTooltip={showTooltip}
            />
          </div>
        );
      })}
    </>
  );
}

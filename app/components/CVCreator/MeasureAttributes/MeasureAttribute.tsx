import { useContext } from "react";
import UserDetailsList from "../UserDetailsList";
import styles from "./MeasureAttribute.module.css";
import { NavAndDrawerContext } from "@/app/util/context";

export default function MeasureAttribute() {
  const { showButtons } = useContext(NavAndDrawerContext);

  return (
    <>
      {["skills", "languages", "hobbies"].map((categoryList) => {
        return (
          <div key={categoryList} className={styles.asideDataRowBox}>
            <h3>{`${categoryList.slice(0, 1).toUpperCase()}${categoryList.slice(
              1
            )}`}</h3>
            <UserDetailsList
              categoryList={categoryList}
              hideAllButtons={showButtons}
            />
          </div>
        );
      })}
    </>
  );
}

import styles from "./Section.module.css";
import InputForm from "../InputForm/InputForm";

export default function Section({ content }) {
  console.log(content);
  return (
    <div className={styles.section}>
      {content.map((el, index) => {
        return <span key={index}>{el}</span>;
        // {el[el.length-1] ? (
        //   <InputForm
        //     key={listItem.name}
        //     type="text"
        //     name={listItem.name}
        //     value={listItem.name}
        //     className={styles.control}
        //     autoFocus
        //     onBlur={() => handleBlur(categoryList, listIndex)}
        //     onKeyDown={(event) =>
        //       handleUserDetailsKeyDown(event, categoryList, listIndex)
        //     }
        //     onChange={(event) =>
        //       handleChangeUserActualInput(event, categoryList, listIndex)
        //     }
        //   />
        // ) : (
        //   <span
        //     onClick={() => replaceTextWithInput(categoryList, listIndex)}
        //     key={listItem.name + 5}
        //   >
        //     {listItem.name}
        //   </span>
        // )}
      })}
    </div>
  );
}

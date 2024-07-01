import styles from "./Section.module.css";
import InputForm from "../InputForm/InputForm";

export default function Section({ content }) {
  console.log(content);
  return (
    <div className={styles.section}>
      {content.map((el, index) => {
        return <span key={index}>{el}</span>;
      })}
    </div>
  );
}

import { useState, useRef, useContext } from "react";
import Image from "next/image";
import frog from "../../../../public/cv_creator.jpg";
import styles from "./PhotoUpload.module.css";
import { NavAndDrawerContext } from "@/app/util/context";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PhotoUpload() {
  const [showFileInput, setShowFileInput] = useState(false);
  const [imageSrc, setImageSrc] = useState(frog);
  const [imageFile, setImageFile] = useState(null);
  const profilePicture = useRef();

  const { toggleShowPhoto } = useContext(NavAndDrawerContext);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };

      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleButtonClick = function () {
    profilePicture.current.click();
  };

  return showFileInput ? (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={() => {
        setShowFileInput(true);
      }}
      onMouseLeave={() => setShowFileInput(false)}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ position: "absolute", display: "none" }}
        ref={profilePicture}
      />
      <button
        type="button"
        onClick={handleButtonClick}
        className={styles.changeImageBtn}
      >
        Choose File
      </button>
      {/* <button onClick={toggleShowPhoto}>Delete Image</button> */}
      <button
        type="button"
        onClick={toggleShowPhoto}
        className={styles.addImageBtn}
      >
        <DeleteIcon />
      </button>

      <div>
        <Image
          alt="visible"
          src={imageSrc}
          width={500}
          height={300}
          style={{
            width: "100%",
            height: "auto",
            marginBottom: "1rem",
            opacity: 0.2,
          }}
        />
      </div>
    </div>
  ) : (
    <Image
      key="image_2"
      alt="person_2"
      src={imageSrc}
      width={500}
      height={300}
      style={{
        width: "100%",
        height: "auto",
        marginBottom: "1rem",
      }}
      onMouseEnter={() => {
        setShowFileInput(true);
      }}
      onMouseLeave={() => setShowFileInput(false)}
    />
  );
}

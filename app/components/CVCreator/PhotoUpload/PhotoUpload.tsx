import { useState, useRef } from "react";
import Image from "next/image";
import frog from "../../../../public/cv_creator.jpg";
import styles from "./PhotoUpload.module.css";

export default function PhotoUpload() {
  const [showFileInput, setShowFileInput] = useState(false);
  const [imageSrc, setImageSrc] = useState(frog);
  const [imageFile, setImageFile] = useState(null);
  const profilePicture = useRef();

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

  // console.log(profilePicture.current);

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
        //add function to show
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
        // style={{ position: "absolute" }}
        className={styles.changeImageBtn}
      >
        Choose File
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

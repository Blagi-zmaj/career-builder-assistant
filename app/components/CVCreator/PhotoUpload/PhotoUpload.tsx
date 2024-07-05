import { useState } from "react";
import Image from "next/image";
import frog from "../../../../public/cv_creator.jpg";

export default function PhotoUpload() {
  const [showFileInput, setShowFileInput] = useState(false);
  const [imageSrc, setImageSrc] = useState(frog);
  const [imageFile, setImageFile] = useState(null);

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
        style={{ position: "absolute" }}
      />

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

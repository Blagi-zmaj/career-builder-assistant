// components/ImageUpload.js
import { useState } from "react";
import { useContext } from "react";
// import { ThemeContext } from "../util/context";
import { NavAndDrawerContext } from "../util/context";

const ImageUpload = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // const { theme, toggleTheme } = useContext(ThemeContext);
  const { showNavAndDrawer, toggleShowNavAndDrawer } =
    useContext(NavAndDrawerContext);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {true && (
        <div>
          <h3>Uploaded Image: {showNavAndDrawer.toString()}</h3>
          <img
            src={imageSrc}
            alt="Uploaded"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <button type="button" onClick={toggleShowNavAndDrawer}>
            SHOW/HIDE DRAWER
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

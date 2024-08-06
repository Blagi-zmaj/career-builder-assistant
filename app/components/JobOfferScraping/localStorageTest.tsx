// import React from "react";

// const Home = () => {
//   const [local] = React.useState((): string => {
//     if (typeof window !== "undefined") {
//       const from_localStorage = window.localStorage.getItem(
//         "user_selected_colour"
//       );
//       if (from_localStorage === null || from_localStorage === undefined) {
//         return "red";
//       }

//       return `${from_localStorage}` ? from_localStorage : "red";
//     }
//     return "";
//   });
//   const [selected, setSelected] = React.useState<string>(local);
//   const [selectedOption, setSelectedOption] = React.useState<string>();
//   const [selectedState, setSelectedState] = React.useState(false);

//   React.useEffect(() => {
//     window.localStorage.setItem("user_selected_colour", `${selected}`);

//     setSelectedOption(`${selected}`);
//   }, [local, selected]);

//   return (
//     <main style={{ margin: "100px 100px" }}>
//       <button
//         onClick={() => setSelectedState((prev) => !prev)}
//         className="relative px-4 py-4 rounded-md text-black font-semibold bg-gray-400"
//       >
//         Select Your Code
//         {selectedState && (
//           <ul className="bg-[#3d3d3d] text-[1rem] text-white w-[10rem] z-[1] drop-shadow-lg absolute top-12 left-0 px-2 flex flex-col items-center py-2 rounded-md divide-y divide-white/20">
//             <li onClick={() => setSelected("red")} className="w-full py-2">
//               Red
//             </li>
//             <li onClick={() => setSelected("blue")} className="w-full py-2">
//               Blue
//             </li>
//             <li onClick={() => setSelected("yellow")} className="w-full py-2">
//               Yellow
//             </li>
//             <li onClick={() => setSelected("gray")} className="w-full py-2">
//               Gray
//             </li>
//             <li onClick={() => setSelected("green")} className="w-full py-2">
//               Green
//             </li>
//           </ul>
//         )}
//       </button>

//       <p>This is the color you picked: {selectedOption}</p>
//       <div
//         className={`w-64 h-32 rounded-md`}
//         style={{ backgroundColor: `${selectedOption}` }}
//       ></div>
//     </main>
//   );
// };

// export default Home;

///////////////////////////////////////////////

import { useEffect, useState } from "react";

const MyComponent = () => {
  const [mockData, setMockData] = useState({
    required: [],
    compatible: [],
    missing: [],
    owned: [],
  });

  const technologies = [
    "React",
    "Polish",
    "AI",
    "Azure",
    "Google analytics",
    "Vue.js",
    "Python",
    "Angular",
    "jQuery",
    "Polymer",
  ];

  // Convert the array to a JSON string
  const technologiesString = JSON.stringify(technologies);

  // Save the JSON string to local storage
  localStorage.setItem("techArray", technologiesString);

  useEffect(() => {
    const getDataFromLocalStorage = (key) => {
      if (typeof window !== "undefined") {
        // Ensure localStorage is only accessed in the client-side
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

    const skills = getDataFromLocalStorage("techArray") || [];
    setMockData((prevState) => ({
      ...prevState,
      owned: skills,
    }));
  }, []); // Empty dependency array to run once after the component mounts

  return (
    <div style={{ margin: "100px" }}>
      <h1>Mock Data</h1>
      {/* <pre>{JSON.stringify(mockData, null, 2)}</pre> */}
      {/* {mockData.owned.map((el) => {
        <pre>{el}</pre>;
      })} */}
      {/* <pre>{mockData.owned[0]}</pre> */}
    </div>
  );
};

export default MyComponent;

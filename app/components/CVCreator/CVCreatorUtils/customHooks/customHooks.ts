import { useEffect, useState } from "react";

export function useAddNewItemListFromModal(data) {
  const [state, setState] = useState(data);
  useEffect(() => {
    setState(data);
  }, [data]);

  const updateState = function (data) {
    const objWithIsEditing = {
      institution: { value: data.institution, isEditing: false },
      position: { value: data.position, isEditing: false },
      startDate: { value: data.startDate, isEditing: false },
      endDate: { value: data.endDate, isEditing: false },
      description: {
        value: data.description,
        isEditing: false,
      },
    };

    if (data.type === "work") {
      setState((prevValues) => {
        return {
          ...prevValues,
          experience: [...prevValues.experience, objWithIsEditing],
        };
      });
    } else {
      setState((prevValues) => {
        return {
          ...prevValues,
          education: [...prevValues.education, objWithIsEditing],
        };
      });
    }
  };

  const synchronizeState = function (newState) {
    console.log(`Synchronize state`, newState);
    setState(newState);
  };

  return [state, updateState, synchronizeState];
}

// Consider adding below functions:
// handleUpdateDate => useUpdateDate
// handleBlurUser => useUpdateOnBlur

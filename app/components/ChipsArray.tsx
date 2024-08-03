import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { ChipData } from "../util/types";

// interface ChipData {
//   key: number;
//   label: string;
// }

interface ChipsArrayProps {
  data: readonly ChipData[];
  type: string;
}

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ChipsArray: React.FC<ChipsArrayProps> = ({ data, type }) => {
  const [chipData, setChipData] = React.useState<readonly ChipData[]>(data);

  //   const [chipData, setChipData] = React.useState<readonly ChipData[]>([
  //     { key: 0, label: "Angular" },
  //     { key: 1, label: "jQuery" },
  //     { key: 2, label: "Polymer" },
  //     { key: 3, label: "React" },
  //     { key: 4, label: "Vue.js" },
  //   ]);

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {chipData.map((data) => {
        let icon;

        // if (data.label === "React") {
        //   icon = <TagFacesIcon />;
        // }

        if (type === "info") {
          // icon = < />
        }

        return (
          <ListItem key={data.key ?? data}>
            <Chip
              icon={icon}
              label={data.label ?? data}
              // onDelete={data.label === "React" ? undefined : handleDelete(data)}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
};

export default ChipsArray;

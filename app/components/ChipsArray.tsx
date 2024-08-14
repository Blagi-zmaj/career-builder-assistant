import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { ChipData } from "../util/types";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CheckIcon from "@mui/icons-material/Check";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { Button, ButtonBase } from "@mui/material";
import { createContext } from "vm";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

interface ChipsArrayProps {
  data: readonly ChipData[];
  type: string;
}

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ChipsArray: React.FC<ChipsArrayProps> = ({ data, type }) => {
  // console.log(data);

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
      {data.map((data) => {
        let chip;

        if (type === "owned") {
          chip = (
            <Chip
              color="info"
              label={data.label ?? data}
              icon={<AssignmentTurnedInIcon />}
              style={{ fontSize: "1.5rem", padding: "1.25rem" }}
            />
          );
        }

        if (type === "required") {
          chip = (
            <Chip
              color="warning"
              label={data.label ?? data}
              icon={<PriorityHighIcon />}
              style={{ fontSize: "1.5rem", padding: "1.25rem" }}
            />
          );
        }

        if (type === "compatible") {
          chip = (
            <Chip
              color="success"
              label={data.label ?? data}
              icon={<CheckIcon />}
              style={{ fontSize: "1.5rem", padding: "1.25rem" }}
            />
          );
        }

        return <ListItem key={data.key ?? data}>{chip}</ListItem>;
      })}
    </Paper>
  );
};

export default ChipsArray;

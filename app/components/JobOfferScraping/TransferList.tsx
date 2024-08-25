import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import ChipsArray from "../ChipsArray";
import styled from "styled-components";
import { ButtonProps } from "@mui/joy";

function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: readonly number[], b: readonly number[]) {
  return [...a, ...not(b, a)];
}

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: "rgba(102, 179, 255, 1)",
  "&:hover": {
    backgroundColor: "rgba(102, 179, 255, 1)",
  },
}));

export default function SelectAllTransferList({
  data,
  updateOwnedSkills,
  getUrlFromUser,
}) {
  const [checked, setChecked] = React.useState<readonly number[]>(["Python"]);
  const [missing, setMissing] = React.useState<readonly number[]>(data.missing);
  const [owned, setOwned] = React.useState<readonly number[]>(data.owned);

  const urlInputRef = React.useRef("");

  React.useEffect(() => {
    setMissing(data.missing);
    setOwned(data.owned);
  }, [data]);

  const missingChecked = intersection(checked, missing);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: readonly number[]) =>
    intersection(checked, items).length;

  const handleToggleAll = (items: readonly number[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedMissing = () => {
    const newOwned = owned.concat(missingChecked);
    const newMissing = not(missing, missingChecked);
    updateOwnedSkills({ missing: newMissing, owned: newOwned }, missingChecked);
    setOwned(newOwned);
    setMissing(newMissing);
    setChecked(not(checked, missingChecked));
  };

  const customList = (title: React.ReactNode, items: readonly number[]) => (
    <Card sx={{ backgroundColor: "blue", margin: "0 auto" }}>
      {items.length > 0 ? (
        <CardHeader
          sx={{
            px: 2,
            py: 1,
            display: "flex",
            justifyItems: "center",
            width: "15rem",
            margin: "0 auto",
            fontSize: "3rem",
          }}
          avatar={
            <Checkbox
              sx={{ marginRight: "0rem" }}
              onClick={handleToggleAll(items)}
              checked={
                numberOfChecked(items) === items.length && items.length !== 0
              }
              indeterminate={
                numberOfChecked(items) !== items.length &&
                numberOfChecked(items) !== 0
              }
              disabled={items.length === 0}
              inputProps={{
                "aria-label": "all items selected",
              }}
            />
          }
          subheader={`${numberOfChecked(items)}/${items.length} selected`}
        />
      ) : (
        <p>Great! You have all required skills!</p>
      )}
      <Divider />
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          overflow: "auto",
          display: "flex",
          flexWrap: "wrap",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value: number) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItemButton
              key={value}
              role="listitem"
              onClick={handleToggle(value)}
              sx={{
                flex: "1 1 12rem",
                height: "4rem",
                backgroundColor: "purple",
                alignItems: "center",
              }}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid
      container
      justifyContent="start"
      alignItems="center"
      direction="column"
      sx={{
        width: "100%",
        height: "100%",
        boxShadow: "0px 0px 13px 0px rgba(102, 179, 255, 1)",
      }}
    >
      {missing.length > 0 ? (
        <>
          <h1>Brakujące</h1>
          <Grid sx={{ width: "100%", margin: "0", padding: "0" }} item>
            {customList("Brakujące", missing)}
          </Grid>
          <Grid item>
            <Grid container direction="row" alignItems="center">
              <Button
                sx={{ my: 1.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedMissing}
                disabled={missingChecked.length === 0}
                aria-label="move selected owned"
              >
                <KeyboardDoubleArrowDownIcon />
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <p>Great JOB! No missing skills!</p>
      )}
      <h1>Posiadane</h1>
      <Grid
        sx={{
          width: "100%",

          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
        }}
        item
      >
        <ChipsArray data={owned} type="owned" />
        <h1 style={{ textAlign: "center" }}>
          Write url for job offer you wanna check:
        </h1>
        <input
          ref={urlInputRef}
          style={{
            margin: "0 auto",
            fontSize: "clamp(0.5rem, 1rem, 1.5rem)",
            width: "60%",
            textAlign: "center",
            height: "2rem",
          }}
          type="url"
          name="url"
          id="url"
          list="url-examples"
          placeholder="https://example.com"
          pattern="https://.*"
          required
        />
        <datalist id="url-examples">
          <option
            style={{ width: "20rem" }}
            value="https://nofluffjobs.com/pl/job/frontend-developer-react-travelplanet-pl-invia-group-wroclaw-2"
          >
            Frontend Developer React
          </option>
          <option value="https://nofluffjobs.com/pl/job/senior-fullstack-developer-react-node-js-xebia-remote-1">
            Senior Fullstack Developer (React/Node.js)
          </option>
          <option value="https://nofluffjobs.com/pl/job/lead-software-engineer-react-node-js-7n-warszawa">
            Lead Software Engineer (React + Node.js)
          </option>
          <option value="https://nofluffjobs.com/pl/job/front-end-developer-with-react-cognitran-remote">
            Front-end developer with React
          </option>
          <option value="https://nofluffjobs.com/pl/job/full-stack-developer-node-js-react-azure-publicis-groupe-warszawa">
            Full Stack Developer (Node.js, React, Azure)
          </option>
        </datalist>

        <ColorButton
          variant="contained"
          color="warning"
          size="medium"
          endIcon={<DownloadForOfflineIcon />}
          style={{ width: "80%", marginTop: "1.5rem" }}
          onClick={() => {
            const url = urlInputRef.current.value;
            getUrlFromUser(url);
            urlInputRef.current.value = "";
          }}
        >
          Get data from website
        </ColorButton>
      </Grid>
    </Grid>
  );
}

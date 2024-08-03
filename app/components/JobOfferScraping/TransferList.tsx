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
// import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import ChipsArray from "../ChipsArray";
import { ChipsArrayProps } from "@/app/util/types";

function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: readonly number[], b: readonly number[]) {
  return [...a, ...not(b, a)];
}

export default function SelectAllTransferList({ data }) {
  const [checked, setChecked] = React.useState<readonly number[]>([1, 2]);
  const [missing, setMissing] = React.useState<readonly number[]>([0, 1, 2, 3]);
  const [owned, setOwned] = React.useState<readonly number[]>([
    8, 9, 10, 11, 12,
  ]);

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

  const handleCheckedRight = () => {
    setOwned(owned.concat(missingChecked));
    setMissing(not(missing, missingChecked));
    setChecked(not(checked, missingChecked));
  };

  const customList = (title: React.ReactNode, items: readonly number[]) => (
    <Card sx={{ backgroundColor: "blue", margin: "0 auto" }}>
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
              <ListItemText id={labelId} primary={`List item ${value + 1}`} />
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      sx={{ width: "100%", backgroundColor: "yellow" }}
    >
      <h1>Brakujące</h1>
      <Grid sx={{ width: "100%" }} item>
        {customList("Brakujące", missing)}
      </Grid>
      <Grid item>
        <Grid container direction="row" alignItems="center">
          <Button
            sx={{ my: 1.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={missingChecked.length === 0}
            aria-label="move selected owned"
          >
            <KeyboardDoubleArrowDownIcon />
          </Button>
        </Grid>
      </Grid>
      <h1>Posiadane</h1>
      <Grid sx={{ width: "100%" }} item>
        {/* {customList("Owned", owned)} */}
        <ChipsArray data={owned} />
      </Grid>
    </Grid>
  );
}

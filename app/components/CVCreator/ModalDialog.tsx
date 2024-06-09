import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DatePicker from "../DatePickerMaterialUI";
import styles from "./ModalDialog.module.css";

import { Box } from "@mui/material";

export default function FormDialog({ type, handleAddNewItemListFromModal }) {
  const [open, setOpen] = React.useState(false);
  const [dates, setDates] = React.useState([
    new Date().toJSON().slice(0, 10),
    new Date().toJSON().slice(0, 10),
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        +
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            // console.log(formData.getAll())
            const formJson = Object.fromEntries((formData as any).entries());

            //////////////////
            formJson.type = type;
            // formJson.isEditing = false;
            /////////////////
            console.log(formJson);
            handleAddNewItemListFromModal(formJson);
            console.log("Add new item list");
            handleClose();
          },
        }}
      >
        <DialogTitle>
          {type === "work"
            ? "Write your work details"
            : "Write your education details"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Fill all inputs to add details.</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="institution"
            name="institution"
            label="Institution"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            // id={type === "work" ? "position" : "subject"}
            // name={type === "work" ? "position" : "subject"}
            // label={type === "work" ? "Job position" : "Study subject"}
            id="position"
            name="position"
            label={type === "work" ? "Job position" : "Study subject"}
            type="text"
            fullWidth
            variant="standard"
          />

          <div className={styles.datePickerContainer}>
            <label htmlFor="startDate">Start date:</label>
            <label htmlFor="endDate">End date:</label>

            <input
              className={styles.datePicker}
              type="date"
              id="startDate"
              name="startDate"
              value={dates[0]}
              onChange={() => {
                setDates((prevValues) => {
                  return [event?.target.value, prevValues[1]];
                });
              }}
            />

            <input
              type="date"
              id="endDate"
              name="endDate"
              value={dates[1]}
              onChange={() => {
                setDates((prevValues) => {
                  return [prevValues[0], event?.target.value];
                });
              }}
            />
          </div>
          <TextField
            autoFocus
            required
            margin="dense"
            // id={type === "work" ? "description" : "subjectDescription"}
            // name={type === "work" ? "description" : "subjectDescription"}
            // label={type === "work" ? "Job description" : "Subject description"}
            id={"description"}
            name={"description"}
            label={type === "work" ? "Job description" : "Subject description"}
            type="text"
            fullWidth
            variant="standard"
            multiline
          />
          {/* <Checkbox />{" "}
          </Box> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

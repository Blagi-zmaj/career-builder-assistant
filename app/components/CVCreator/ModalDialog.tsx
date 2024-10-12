import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "./ModalDialog.module.css";
import AddIcon from "@mui/icons-material/Add";
import { updateDataRecordInDatabase } from "./CVCreatorUtils/helpers";

export default function FormDialog({
  type,
  handleAddNewItemListFromModal,
  hideAllButtons,
}) {
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
      <Button
        variant="contained"
        onClick={handleClickOpen}
        className={
          hideAllButtons ? styles.modalHiddenButton : styles.addNewRecordModal
        }
      >
        <AddIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            formJson.type = type;

            const tableName = type === "work" ? "experience" : "education";
            updateDataRecordInDatabase("create", tableName, formJson);
            handleAddNewItemListFromModal(formJson);

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
                  return [event?.target?.value, prevValues[1]];
                });
              }}
            />

            <input
              className={styles.datePicker}
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
            id={"description"}
            name={"description"}
            label={type === "work" ? "Job description" : "Subject description"}
            type="text"
            fullWidth
            variant="standard"
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

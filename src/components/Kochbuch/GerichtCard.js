import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
// FIREBASE
import { db } from "../../firebase";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
// MUI
import { CalendarTodayRounded, DeleteRounded } from "@mui/icons-material";
import {
    Card,
    CardHeader,
    Avatar,
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    IconButton,
    TextField,
    Stack,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";

export default function GerichtCard({ props }) {
    const [dialog, setDialog] = useState(false);
    const [value, setValue] = useState(new Date());
    const history = useHistory();

    const handleOpen = () => {
        setDialog(true);
    };

    const handleClose = () => {
        setDialog(false);
    };

    const handleCreate = async () => {
        setDialog(false);
        await addDoc(collection(db, "essensplan"), {
            date: format(value, "dd.M.yyyy"),
            gerichtID: props.id,
            gerichtName: props.gerichtName,
        });
    };

    const handleDelete = async () => {
        await deleteDoc(doc(db, "gerichte", props.id));
    };

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{}} variant="square">
                        {props.gerichtName?.substring(0, 2)}
                    </Avatar>
                }
                action={
                    <>
                        {" "}
                        <IconButton onClick={handleOpen}>
                            <CalendarTodayRounded />
                        </IconButton>
                        <IconButton onClick={handleDelete}>
                            <DeleteRounded />
                        </IconButton>
                    </>
                }
                title={
                    <>
                        <Button
                            onClick={() => {
                                history.push("/kochbuch/" + props.id);
                            }}
                        >
                            {props.gerichtName}
                        </Button>
                        <Dialog
                            open={dialog}
                            onClose={handleClose}
                            maxWidth="md"
                            fullWidth
                        >
                            <DialogTitle>Gericht planen</DialogTitle>
                            <DialogContent>
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
                                    <Stack marginTop={1}>
                                        <MobileDatePicker
                                            label="Tag auswählen"
                                            value={value}
                                            onChange={(newValue) => {
                                                setValue(newValue);
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} />
                                            )}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={handleClose}
                                    color="secondary"
                                    variant="contained"
                                >
                                    Abbrechen
                                </Button>
                                <Button
                                    onClick={handleCreate}
                                    color="secondary"
                                    variant="contained"
                                >
                                    Speichern
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                }
            />
        </Card>
    );
}

import React, { useState, useRef, useEffect } from "react";
import Aufgabe from "./Aufgabe";
// FIREBASE
import { db } from "../../firebase";
import {
    onSnapshot,
    collection,
    query,
    orderBy,
    addDoc,
    Timestamp,
} from "firebase/firestore";
// MUI
import {
    Stack,
    Select,
    MenuItem,
    Fab,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
} from "@mui/material";
import { AddRounded } from "@mui/icons-material";

export default function Aufgaben() {
    const [select, setSelect] = useState("newest"); // select state für sortierung
    const [prio, setPrio] = useState(2); // priorität fürs erstellen einer aufgabe
    const [dialog, setDialog] = useState(false); // dialog zum erstellen einer aufgabe
    const [aufgaben, setAufgaben] = useState(); // liste der aufgaben
    const aufgabeRef = useRef();

    const aufgabenRef = collection(db, "/aufgaben");

    const getAufgaben = () => {
        let q = "";
        if (select == "newest") {
            q = query(aufgabenRef, orderBy("date", "desc"));
        } else if (select == "oldest") {
            q = query(aufgabenRef, orderBy("date", "asc"));
        } else if (select == "highest") {
            q = query(aufgabenRef, orderBy("prio", "desc"));
        } else if (select == "lowest") {
            q = query(aufgabenRef, orderBy("prio", "asc"));
        }

        onSnapshot(q, (snapshot) =>
            setAufgaben(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            )
        );
    };

    const handleSelect = (event) => {
        setSelect(event.target.value);
    };

    const handleOpen = () => {
        setDialog(true);
    };

    const handleClose = () => {
        setDialog(false);
    };

    const prioToText = (prio) => {
        return prio == 3
            ? "hoch"
            : prio == 2
            ? "normal"
            : prio == 1
            ? "niedrig"
            : "normal";
    };

    const handleCreate = async () => {
        setDialog(false);
        await addDoc(aufgabenRef, {
            aufgabe: String(aufgabeRef.current.value),
            date: Timestamp.now(),
            prio: prio,
            prioText: prioToText(prio),
        });
    };

    useEffect(() => {
        const unsubscribe = getAufgaben();
        return unsubscribe;
    }, []);

    useEffect(() => {
        const unsubscribe = getAufgaben();
        return unsubscribe;
    }, [select]);

    const fabStyle = {
        position: "fixed",
        bottom: "2%",
        right: "2%",
    };

    const marginStyle = {
        marginTop: 1,
    };

    const centerStyle = {
        maxWidth: 400,
        marginTop: 2,
    };

    return (
        <Stack alignItems="center" spacing={1}>
            <Select
                id="select"
                value={select}
                label="Priorität"
                fullWidth
                onChange={handleSelect}
                sx={centerStyle}
            >
                <MenuItem value={"newest"}>neueste Aufgaben</MenuItem>
                <MenuItem value={"oldest"}>älteste Aufgaben</MenuItem>
                <MenuItem value={"highest"}>
                    Aufgaben mit der höchsten Priorität
                </MenuItem>
                <MenuItem value={"lowest"}>
                    Aufgaben mit der niedrigsten Priorität
                </MenuItem>
            </Select>

            {aufgaben?.map((aufgabe) => (
                <Aufgabe key={aufgabe.id} props={aufgabe} />
            ))}
            <Fab
                sx={fabStyle}
                color="primary"
                onClick={() => {
                    handleOpen();
                }}
            >
                <AddRounded fontSize="large" />
            </Fab>
            <Dialog open={dialog} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Neue Aufgabe erstellen</DialogTitle>
                <DialogContent>
                    <TextField
                        sx={marginStyle}
                        autoFocus
                        id="eintrag"
                        label="Aufgabe"
                        type="text"
                        fullWidth
                        multiline
                        maxRows="5"
                        variant="outlined"
                        inputRef={aufgabeRef}
                    />
                    <Select
                        id="prio-select"
                        value={prio}
                        label="Priorität"
                        fullWidth
                        onChange={(event) => {
                            setPrio(event.target.value);
                        }}
                        sx={marginStyle}
                    >
                        <MenuItem value={1}>1 - niedrig</MenuItem>
                        <MenuItem value={2}>2 - normal</MenuItem>
                        <MenuItem value={3}>3 - hoch</MenuItem>
                    </Select>
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
        </Stack>
    );
}

import React, { useState, useEffect, useRef } from "react";
import Eintrag from "./Eintrag";
// FIREBASE
import { db } from "../../firebase";
import {
    onSnapshot,
    collection,
    query,
    orderBy,
    limit,
    addDoc,
    Timestamp,
} from "firebase/firestore";
//mui
import {
    Fab,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    TextField,
    Button,
    Stack,
} from "@mui/material";
import { AddRounded } from "@mui/icons-material";

export default function Einkaufsliste() {
    const [items, setItems] = useState();
    const [dialog, setDialog] = useState(false);
    const eintragRef = useRef();

    const eklisteRef = collection(db, "einkaufsliste");
    const q = query(eklisteRef, orderBy("date", "desc"), limit(500));

    const getItems = () => {
        onSnapshot(q, (snapshot) =>
            setItems(
                snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            )
        );
    };

    const handleCreate = async () => {
        setDialog(false);
        await addDoc(eklisteRef, {
            eintrag: String(eintragRef.current.value),
            date: Timestamp.now(),
        });
    };

    const handleOpen = () => {
        setDialog(true);
    };

    const handleClose = () => {
        setDialog(false);
    };

    const fabStyle = {
        position: "fixed",
        bottom: "2%",
        right: "2%",
    };

    useEffect(() => {
        const unsubscribe = getItems();
        return unsubscribe;
    }, []);

    return (
        <Stack alignItems="center">
            {items?.map((item) => (
                <Eintrag key={item.id} props={item} />
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
                <DialogTitle>Neuen Eintrag anlegen</DialogTitle>
                <DialogContent>
                    <TextField
                        sx={{ marginTop: 1 }}
                        autoFocus
                        id="eintrag"
                        label="Eintrag"
                        type="text"
                        fullWidth
                        multiline
                        maxRows="5"
                        variant="outlined"
                        inputRef={eintragRef}
                    />
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
                        Anlegen
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
}

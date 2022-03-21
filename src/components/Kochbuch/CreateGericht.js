import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
// FIREBASE
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
// MUI
import { Container, Grid, TextField, Button, Alert } from "@mui/material";

export default function CreateGericht() {
    const history = useHistory();
    const gerichtNameRef = useRef();
    const gerichtRezeptRef = useRef();
    const gerichtZutatenRef = useRef();

    const gerichteRef = collection(db, "gerichte");

    const handleCreate = async () => {
        history.push("/");
        await addDoc(gerichteRef, {
            gerichtName: gerichtNameRef.current.value,
            gerichtRezept: gerichtRezeptRef.current.value,
            gerichtZutaten: gerichtZutatenRef.current.value,
            date: Timestamp.now(),
        });
    };

    return (
        <>
            <Container maxWidth="xs" sx={{ marginTop: 5 }}>
                <form onSubmit={handleCreate}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                type="text"
                                id="gerichtName"
                                label="Gericht Name"
                                inputRef={gerichtNameRef}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                multiline
                                maxRows="50"
                                minRows="5"
                                type="text"
                                id="zutaten"
                                label="Zutaten"
                                inputRef={gerichtZutatenRef}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                multiline
                                maxRows="50"
                                minRows="10"
                                type="text"
                                id="rezept"
                                label="Rezept"
                                inputRef={gerichtRezeptRef}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                color="secondary"
                                variant="contained"
                                fullWidth
                            >
                                Speichern
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </>
    );
}

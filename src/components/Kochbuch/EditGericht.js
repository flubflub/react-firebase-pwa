import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
// FIREBASE
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
// MUI
import { Container, Grid, TextField, Button, Alert } from "@mui/material";

export default function EditGericht() {
    const [error, setError] = useState("");
    const [editingGericht, setEditingGericht] = useState(false);
    const history = useHistory();
    const { gerichtID } = useParams();
    const gerichtNameRef = useRef();
    const gerichtRezeptRef = useRef();
    const gerichtZutatenRef = useRef();
    const location = useLocation();

    const docRef = doc(db, "gerichte", gerichtID);

    const handleUpdate = async () => {
        setEditingGericht(true);
        try {
            setError("");
            history.push("/kochbuch/" + location.state.gericht.id);
            const changes = {
                gerichtName: gerichtNameRef.current.value,
                gerichtZutaten: gerichtZutatenRef.current.value,
                gerichtRezept: gerichtRezeptRef.current.value,
            };
            await updateDoc(docRef, changes);
        } catch (err) {
            setError("Probelm beim Ändern des Gerichts!");
        }
    };

    return (
        <>
            <Container maxWidth="xs" sx={{ marginTop: 5 }}>
                {error && (
                    <Alert variant="filled" severity="error">
                        {error}
                    </Alert>
                )}
                <form onSubmit={handleUpdate}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                type="text"
                                id="gerichtName"
                                defaultValue={
                                    location?.state.gericht.gerichtName
                                }
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
                                defaultValue={
                                    location?.state.gericht.gerichtZutaten
                                }
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
                                defaultValue={
                                    location?.state.gericht.gerichtRezept
                                }
                                inputRef={gerichtRezeptRef}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                color="secondary"
                                variant="contained"
                                fullWidth
                                disabled={editingGericht}
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

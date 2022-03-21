import React, { useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

// MUI
import { Container, Alert, Button, TextField, Grid, Box } from "@mui/material";

export default function ResetPassword() {
    const emailRef = useRef();
    const { passwordReset } = useAuth();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function submit(event) {
        event.preventDefault();

        try {
            setMessage("");
            setError("");
            setLoading(true);
            await passwordReset(emailRef.current.value);
            setMessage(
                "Aktion erfolgreich! Überprüfe dein Postfach für weitere Informationen."
            );
        } catch (e) {
            setError("Failed to reset password");
        }

        setLoading(false);
    }

    return (
        <>
            <Container maxWidth="xs">
                <Box component="h2" textAlign="center">
                    Passwort Zurücksetzen
                </Box>
                <Box component="div" margin="20px">
                    {error && (
                        <Alert variant="filled" severity="error">
                            {error}
                        </Alert>
                    )}
                    {message && (
                        <Alert variant="filled" severity="success">
                            {message}
                        </Alert>
                    )}
                </Box>

                <form onSubmit={submit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                type="email"
                                id="email"
                                label="Email Address"
                                name="email"
                                inputRef={emailRef}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                color="secondary"
                                disabled={loading}
                            >
                                Zurücksetzen
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Box marginTop="20px">
                    Stattdessen <Link to="/signin">Einloggen </Link>
                </Box>
            </Container>
        </>
    );
}

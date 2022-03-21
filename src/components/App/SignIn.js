import React, { useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import useMounted from "../../hooks/useMounted";
// MUI
import { Container, Alert, Button, TextField, Grid, Box } from "@mui/material";
import { Link, useHistory } from "react-router-dom";

export default function SignIn() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { signIn } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const mounted = useMounted();

    async function submit(event) {
        event.preventDefault();
        try {
            setError("");
            setLoading(true);
            await signIn(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch (e) {
            setError("Anmeldung fehlgeschlagen!");
            console.log(e);
        }
        if (mounted.current) {
            setLoading(false);
        }
    }

    return (
        <Container maxWidth="xs">
            <Box component="h2" textAlign="center" margin="20">
                Einloggen
            </Box>
            {error && (
                <Alert
                    variant="filled"
                    severity="error"
                    sx={{ marginBottom: 20 }}
                >
                    {error}
                </Alert>
            )}
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
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            type="password"
                            id="password"
                            label="Password"
                            name="password"
                            inputRef={passwordRef}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={loading}
                            color="secondary"
                        >
                            Einloggen
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Box component="div" textAlign="center">
                <h3>ODER</h3>
            </Box>
            <div>
                <Button color="secondary" fullWidth variant="contained">
                    <Link to="/reset"> Password Zurücksetzen</Link>
                </Button>
            </div>
        </Container>
    );
}

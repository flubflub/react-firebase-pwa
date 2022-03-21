import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import GerichtCard from "./GerichtCard";
// Firebase
import { db } from "../../firebase";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
// MUI
import { Stack, Fab } from "@mui/material";
import { AddRounded } from "@mui/icons-material/";

export default function Kochbuch() {
    const [gericht, setGericht] = useState([]);
    const history = useHistory();

    const gerichteRef = collection(db, "gerichte");
    const q = query(gerichteRef, orderBy("gerichtName"));

    const getGerichte = () => {
        onSnapshot(q, (snapshot) =>
            setGericht(
                snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            )
        );
    };

    useEffect(() => {
        const unsubscribe = getGerichte();
        return unsubscribe;
    }, []);

    const fabStyle = {
        position: "fixed",
        bottom: "2%",
        right: "2%",
    };

    return (
        <Stack>
            {gericht.map((gericht) => (
                <GerichtCard key={gericht.id} props={gericht} />
            ))}
            <Fab
                sx={fabStyle}
                color="primary"
                onClick={() => {
                    history.push("/kochbuch/create");
                }}
            >
                <AddRounded fontSize="large" />
            </Fab>
        </Stack>
    );
}

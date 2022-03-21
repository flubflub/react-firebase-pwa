import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
// FIREBASE
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
// MUI
import {
    Card,
    CardHeader,
    CardContent,
    Divider,
    IconButton,
    Typography,
    Stack,
} from "@mui/material";
import { EditRounded } from "@mui/icons-material";

export default function Gericht() {
    const [gericht, SetGericht] = useState();
    const history = useHistory();
    const { gerichtID } = useParams(); // returns object { {"gerichtID":"params"}} /kochbuch/<params> gerichtID = params

    const docRef = doc(db, "gerichte", gerichtID);

    const getGericht = async () => {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            SetGericht({ id: docSnap.id, ...docSnap.data() });
        } else {
            return;
        }
    };

    const dividerStyle = {
        marginTop: 2,
        marginBottom: 2,
    };

    useEffect(() => getGericht(), []);

    return (
        <Stack textAlign="center" alignItems="center">
            <Card sx={{ maxWidth: 600 }}>
                <CardHeader
                    title={gericht?.gerichtName}
                    action={
                        <IconButton
                            onClick={() =>
                                history.push({
                                    pathname: "/kochbuch/edit/" + gericht.id,
                                    state: { gericht },
                                })
                            }
                        >
                            <EditRounded />
                        </IconButton>
                    }
                    subheader={
                        "Erstellt am: " +
                        gericht?.date.toDate().toLocaleString()
                    }
                />
                <CardContent>
                    <Divider textAlign="left" sx={dividerStyle}>
                        Zutaten
                    </Divider>
                    <Typography
                        variant="h6"
                        component="div"
                        color="text.secondary"
                    >
                        {gericht?.gerichtZutaten}
                    </Typography>
                    <Divider textAlign="left" sx={dividerStyle}>
                        Rezept
                    </Divider>
                    <Typography
                        variant="body1"
                        component="div"
                        color="text.secondary"
                    >
                        {gericht?.gerichtRezept}
                    </Typography>
                </CardContent>
            </Card>
        </Stack>
    );
}

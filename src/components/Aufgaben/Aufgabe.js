import React from "react";
// FIREBASE
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
// MUI
import { Card, CardHeader, IconButton } from "@mui/material";
import { CircleOutlined } from "@mui/icons-material";

export default function Aufgabe({ props }) {
    const docRef = doc(db, "/aufgaben/", props.id);

    const handleDelete = async () => {
        await deleteDoc(docRef);
    };

    const cardStyle = {
        backgroundColor: "#d3d3d3",
        minWidth: 400,
    };

    return (
        <Card sx={cardStyle}>
            <CardHeader
                avatar={
                    <IconButton onClick={handleDelete}>
                        <CircleOutlined />
                    </IconButton>
                }
                title={props.aufgabe}
                subheader={
                    "Priorität: " +
                    props.prioText +
                    ", " +
                    "Erstellt am: " +
                    props.date.toDate().toLocaleString()
                }
            />
        </Card>
    );
}

import React from "react";
// FIREBASE
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
//mui
import { Card, CardHeader, IconButton } from "@mui/material";
import { CancelRounded } from "@mui/icons-material";

export default function Eintrag({ props }) {
    const handleDelete = async () => {
        await deleteDoc(doc(db, "einkaufsliste", props.id));
    };

    const cardStyle = {
        margin: 1,
        bgcolor: "#33bfff",
    };
    return (
        <Card sx={cardStyle}>
            <CardHeader
                avatar={
                    <IconButton onClick={handleDelete}>
                        <CancelRounded />
                    </IconButton>
                }
                title={props.eintrag}
            />
        </Card>
    );
}

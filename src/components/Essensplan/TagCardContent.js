import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
// FIREBASE
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
// MUI
import { Button, IconButton, Box } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";

export default function TagCardContent(props) {
    const history = useHistory();
    props = props.props;
    const handleDelete = async () => {
        await deleteDoc(doc(db, "essensplan", props.docID));
    };

    return (
        <Box>
            <Button
                variant="contained"
                onClick={() => {
                    history.push("/kochbuch/" + props.gerichtID);
                }}
            >
                {props.gerichtName}
            </Button>
            <IconButton onClick={handleDelete}>
                <DeleteRounded />
            </IconButton>
        </Box>
    );
}

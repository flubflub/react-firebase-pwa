import React, { useState, useEffect } from "react";
import TagCardContent from "./TagCardContent";
import { format } from "date-fns";
// FIREBASE
import { db } from "../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
// MUI
import { Card, CardHeader, CardContent, Stack } from "@mui/material";

export default function TagCard(tag) {
    const [gericht, setGericht] = useState();
    tag = tag.tag;

    const essensplanRef = collection(db, "essensplan");
    const q = query(
        essensplanRef,
        where("date", "==", format(tag.date, "dd.M.yyyy"))
    );

    const getData = async () => {
        try {
            onSnapshot(q, (snapshot) =>
                setGericht(
                    snapshot.docs.map((doc) => ({
                        docID: doc.id,
                        ...doc.data(),
                    }))
                )
            );
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const unsubscribe = getData();
        return unsubscribe;
    }, []);

    return (
        <>
            <Card sx={{ margin: 1, backgroundColor: "#f2f2f2" }}>
                <CardHeader
                    title={tag.tagName + ", " + format(tag.date, "dd.M.yyyy")}
                    sx={{ backgroundColor: "#b9c6cf" }}
                />
                <CardContent>
                    <Stack>
                        {" "}
                        {gericht &&
                            gericht.map((gericht) => (
                                <TagCardContent
                                    key={gericht.docID}
                                    props={gericht}
                                />
                            ))}
                    </Stack>
                </CardContent>
            </Card>
        </>
    );
}

import React, { useState, useEffect } from "react";
import TagCard from "./TagCard";
import { getDay, addDays } from "date-fns";
// MUI
import { Stack } from "@mui/material/";

export default function Essensplan() {
    const [value, setValue] = useState(new Date());
    const [essensplan, setEssensplan] = useState([]);

    const numberToDay = (number) => {
        switch (number) {
            case 0:
                return "Sonntag";
            case 1:
                return "Montag";
            case 2:
                return "Dienstag";
            case 3:
                return "Mittwoch";
            case 4:
                return "Donnerstag";
            case 5:
                return "Freitag";
            case 6:
                return "Samstag";
        }
    };

    const makeListe = () => {
        let heute = value;
        let tage = [];
        for (let i = 0; i <= 13; i++) {
            tage.push({ date: heute, tagName: numberToDay(getDay(heute)) });
            heute = addDays(heute, 1);
        }
        setEssensplan(tage);
    };

    useEffect(() => makeListe(), []);

    return (
        <Stack marginTop={2}>
            {essensplan.map((tag) => (
                <TagCard key={tag.date} tag={tag} />
            ))}
        </Stack>
    );
}

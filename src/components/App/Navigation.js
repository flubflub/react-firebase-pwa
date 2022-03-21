import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// MUI
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import {
    FoodBankRounded,
    LogoutRounded,
    CalendarTodayRounded,
    CheckRounded,
    LocalGroceryStoreRounded,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navigation({ children }) {
    const [drawer, setDrawer] = useState(false);
    const [title, setTitle] = useState("Haushaltsplaner");
    const history = useHistory();
    const { signOut, currentUser } = useAuth();

    const handleSignOut = async () => {
        await signOut();
        history.push("/signin");
    };

    const menu = [
        {
            title: "Kochbuch",
            icon: <FoodBankRounded />,
            path: "/kochbuch",
        },
        {
            title: "Essensplan",
            icon: <CalendarTodayRounded />,
            path: "/essensplan",
        },
        {
            title: "Aufgaben",
            icon: <CheckRounded />,
            path: "/aufgaben",
        },
        {
            title: "Einkaufsliste",
            icon: <LocalGroceryStoreRounded />,
            path: "/einkaufsliste",
        },
    ];

    const setTitleOnChange = (item) => {
        setTitle(item.title);
        history.push(item.path);
    };

    const styleList = {
        width: "100%",
        minWidth: 500,
    };

    return (
        <div>
            <AppBar color="primary" position="sticky">
                <Toolbar>
                    <IconButton onClick={() => setDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ ml: 5, flexGrow: 1 }}
                    >
                        {title}
                    </Typography>
                    {currentUser && (
                        <IconButton
                            size="large"
                            onClick={handleSignOut}
                            edge="end"
                        >
                            <LogoutRounded />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={drawer}
                onClose={() => setDrawer(false)}
            >
                <List component="nav" sx={styleList}>
                    <ListItem
                        key="Menü"
                        divider
                        button
                        onClick={() => setDrawer(false)}
                    >
                        <ListItemIcon>
                            <MenuIcon />
                        </ListItemIcon>
                        <ListItemText>{"Menü schließen"}</ListItemText>
                    </ListItem>
                    {menu.map((item) => (
                        <ListItem
                            key={item.title}
                            button
                            divider
                            onClick={() => setTitleOnChange(item)}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText>{item.title}</ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <div>{children}</div>
        </div>
    );
}

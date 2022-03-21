import React from "react";
import { theme } from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//components
import AuthRoute from "./AuthRoute";
import Navigation from "./Navigation";
import SignIn from "./SignIn";
import PasswordReset from "./PasswordReset";
import Aufgaben from "../Aufgaben";
import Einkaufsliste from "../Einkaufsliste";
import Essensplan from "../Essensplan";
import Kochbuch from "../Kochbuch";
import CreateGericht from "../Kochbuch/CreateGericht";
import EditGericht from "../Kochbuch/EditGericht";
import Gericht from "../Kochbuch/Gericht";

//hooks
import { AuthProvider } from "../../hooks/useAuth";

export default function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <AuthProvider>
                        <Navigation />
                        <Switch>
                            <AuthRoute exact path="/" component={Kochbuch} />
                            <AuthRoute path="/aufgaben" component={Aufgaben} />
                            <AuthRoute
                                path="/einkaufsliste"
                                component={Einkaufsliste}
                            />
                            <AuthRoute
                                path="/essensplan"
                                component={Essensplan}
                            />
                            <AuthRoute
                                exact
                                path="/kochbuch"
                                component={Kochbuch}
                            />
                            <AuthRoute
                                exact
                                path="/kochbuch/create"
                                component={CreateGericht}
                            />
                            <AuthRoute
                                exact
                                path={"/kochbuch/:gerichtID"}
                                component={Gericht}
                            />
                            <AuthRoute
                                exact
                                path={"/kochbuch/edit/:gerichtID"}
                                component={EditGericht}
                            />
                            <Route path="/signin" component={SignIn} />
                            <Route path="/reset" component={PasswordReset} />
                        </Switch>
                    </AuthProvider>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
}

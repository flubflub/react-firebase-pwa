import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function AuthRoute({ component: Component, ...otherProps }) {
    const { currentUser } = useAuth();

    return (
        <>
            <Route
                {...otherProps}
                render={(props) => {
                    return currentUser ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to="/signin" />
                    );
                }}
            ></Route>
        </>
    );
}

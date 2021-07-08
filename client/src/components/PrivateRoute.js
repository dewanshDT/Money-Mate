import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { GlobalContext } from './context/GlobalContext';

const PrivateRoute = ({component: Component, ...rest}) => {
    const {user} = React.useContext(GlobalContext);
    return (
        <Route
        {...rest}
        render={(props) => {
            return user
            ? <Component {...props} /> 
            : <Redirect to="/login" />
        }}
        />
    )
}

export default PrivateRoute

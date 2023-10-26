import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRouter(props) {
    if (localStorage.getItem("userToken")) {
        return props.children
    }
    else {
        return <Navigate to={"/login"} />
    }
}
import React from 'react';
import Flex from "./Flex";
import {NavLink} from "react-router-dom"

const Link = ({to,children}) => {
    return (
        <NavLink to={to}>
            <Flex>
                {children}
            </Flex>
        </NavLink>

    );
};

export default Link;
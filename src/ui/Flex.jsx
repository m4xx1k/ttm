import React from 'react';
import {Box} from "@mui/material";

const Flex = (props) => {
    return (
        <Box  display="flex" {...props}>
            {props.children}
        </Box>
    );
};

export default Flex;
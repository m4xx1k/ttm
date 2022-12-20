import React from 'react';
import {Box, Typography} from "@mui/material";

const Hashtag = ({children, color, onClick}) => {
    return (
        <Box onClick={onClick} sx={{cursor:"pointer"}} padding="2px 10px" borderRadius="12px" bgcolor={color} >
            <Typography fontSize="14px" color="text">
                {children}
            </Typography>
        </Box>
    );
};

export default Hashtag;
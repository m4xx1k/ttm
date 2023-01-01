import React from 'react';
import {Box, Typography} from "@mui/material";

const Hashtag = ({children, color, onClick}) => {
    return (
        <Box onClick={onClick} sx={{cursor:"pointer"}} padding="0 8px" bgcolor="bg.main" borderRadius="16px" border={`3px solid ${color}`} >
            <Typography fontSize="14px" color="text">
                {children}
            </Typography>
        </Box>
    );
};

export default Hashtag;
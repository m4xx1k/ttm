import React, {useState} from 'react';
import Flex from "../ui/Flex";
import {Checkbox, Typography} from "@mui/material";

const MicroTask = ({status:initialStatus, children}) => {
    const [status, setStatus] = useState(initialStatus)
    const handleChange = () => setStatus(prev=>!prev)
    return (
        <Flex alignItems="center">
            <Checkbox sx={{borderRadius:"50%"}} checked={status} onChange={handleChange}/>
            <Typography component={status ? "s" : "span"}>{children}</Typography>
        </Flex>
    );
};

export default MicroTask;
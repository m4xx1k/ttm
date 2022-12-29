import React, {useState} from 'react';
import Flex from "../ui/Flex";
import {Checkbox, Typography} from "@mui/material";

const MicroTask = ({status:initialStatus, children, m=1}) => {

    const [status, setStatus] = useState(initialStatus)
    const handleChange = () => setStatus(prev=>!prev)
    return (
        <Flex alignItems="center" marginY={m}>
            <Checkbox sx={{borderRadius:"50%", padding:0}} checked={status} onChange={handleChange}/>
            <Typography component={status ? "s" : "span"}>{children}</Typography>
        </Flex>
    );
};

export default MicroTask;
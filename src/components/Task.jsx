import React, {useState} from 'react';
import {Card, Popover, Typography} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AlarmIcon from "@mui/icons-material/Alarm";
import Flex from "../ui/Flex";
import dayjs from "dayjs";
import Hashtag from "../ui/Hashtag";
import MicroTask from "./MicroTask";
import DeleteIcon from '@mui/icons-material/Delete';
import {taskApi} from "../api/TaskApi";

const Task = ({task}) => {
    const [deleteTask] = taskApi.useDeleteTaskMutation()
    const handleDeleteTask = async (id) => await deleteTask(id)
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);




    return (
        <Card  className="task"

              sx={{cursor:"initial",padding: 2, margin: "8px 0", maxWidth: 380, borderRadius: 3}}
        >
            <Flex justifyContent="space-between">
                <Typography fontWeight="700" fontSize="20px" width="90%">
                    {task.title}
                </Typography>
                <MoreHorizIcon onClick={handleClick} cursor="pointer" width="10%"/>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <Typography sx={{p: 2}}>The content of the Popover.</Typography>
                </Popover>
            </Flex>
            <Flex flexWrap="wrap" gap={1}>
                {
                    task.hashtags?.map(hashtag =>
                        <Hashtag key={hashtag.text} color={hashtag.color}>
                            {hashtag.text}
                        </Hashtag>
                    )
                }
            </Flex>
            <Typography color="grey" width="100%">
                {task.desc}
            </Typography>

            <Flex flexDirection="column">
                {
                    task.microtasks?.map(mt => (
                        <MicroTask status={mt.status} key={mt.text}>{mt.text}</MicroTask>
                    ))
                }
            </Flex>

            <Flex justifyContent="space-between" margin="12px 0 0">
                <Flex alignItems="center" color="grey">
                    <AlarmIcon/>
                    <Typography>
                        {dayjs(task.ddl).format("DD MMM YYYY HH:mm")}
                    </Typography>

                </Flex>
                <DeleteIcon color="primary"
                    onClick={() => handleDeleteTask(task.id)}/>
            </Flex>
        </Card>
    );


};

export default Task;
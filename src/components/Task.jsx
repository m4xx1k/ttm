import React, {useEffect, useState} from 'react';
import {
    Card,
    Collapse,
    Dialog,
    Divider,
    List,
    ListItem,
    Popover,
    Typography
} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AlarmIcon from "@mui/icons-material/Alarm";
import Flex from "../ui/Flex";
import dayjs from "dayjs";
import Hashtag from "../ui/Hashtag";
import MicroTask from "./MicroTask";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {taskApi} from "../api/TaskApi";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import TaskForm from "./TaskForm";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import StopCircleIcon from '@mui/icons-material/StopCircle';

const statuses = ["todo", "inprogress", "complete"]
const secToTime = (ms) => {
    let date = new Date(ms * 1000);
    let hh = date.getUTCHours();
    let mm = date.getUTCMinutes();
    let ss = date.getSeconds();

    if (hh < 10) {
        hh = "0" + hh;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    if (ss < 10) {
        ss = "0" + ss;
    }

    if (hh === "00") return mm + ":" + ss

    return hh + ":" + mm + ":" + ss;
}
const Task = ({task, maxW = 380}) => {
    //SW --- stopwatch
    const [timeSW, setTimeSW] = useState(task.spentTime * 1000)
    const [startSW, setStartSW] = useState(false)
    useEffect(() => {
        let interval = null
        if (startSW) {
            interval = setInterval(() => {
                setTimeSW(prevTime => prevTime + 1000)

            }, 1000)
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval)
    }, [startSW])

    const [anchorEl, setAnchorEl] = useState(null);
    const openPopover = Boolean(anchorEl);
    const [openCollapse, setOpenCollapse] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)

    const [deleteTask] = taskApi.useDeleteTaskMutation()
    const handleDeleteTask = async (id) => await deleteTask(id)
    const [changeTask] = taskApi.useChangeTaskMutation()
    const handleChangeTask = async (body) => await changeTask({id: task.id, body})


    const clockColor = (() => {
        const now = dayjs()
        const ddl = dayjs(task.ddl)
        const sec = ddl.diff(now, "hours")
        if (sec > 12) return "success"
        if (sec > 6) return "warning"
        return "error"
    })()


    const handleStopWorking = async () => {
        const started = new Date(task.started)
        const newSpentTime = Math.abs((Date.now() - started.getTime()) / 1000)
        setStartSW(false)
        await handleChangeTask({...task, isWorkingNow: false, spentTime: task.spentTime + newSpentTime})
    }

    const handleStartWorking = async () => {
        setStartSW(true)
        await handleChangeTask({
            ...task,
            isWorkingNow: true,
            started: Date.now()
        })
    }


    return (
        <Card className="task"
              sx={{cursor: "initial", padding: 2, margin: "8px 0", minWidth: 240, maxWidth: maxW, borderRadius: 3}}
        >
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(prev => !prev)}
            >
                <TaskForm handleCloseDialog={() => setOpenDialog(false)} handleSubmit={handleChangeTask}
                          values={{...task, newht: {text: "", color: "#00ffff"}}}
                />
            </Dialog>

            <Flex justifyContent="space-between">

                <Typography fontWeight="700" fontSize="20px" width="90%">
                    {task.title + task.id.toString()}
                </Typography>

                <MoreHorizIcon onClick={(e) => setAnchorEl(e.currentTarget)} cursor="pointer" width="10%"/>


                <Popover
                    open={openPopover}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >

                    <List sx={{minWidth: 152}}>

                        <ListItem sx={{cursor: 'pointer'}} onClick={() => setOpenDialog(true)}>
                            <EditIcon color="primary"/>
                            <Typography>Edit</Typography>
                        </ListItem>

                        <ListItem sx={{cursor: 'pointer'}}>
                            {

                                task.isWorkingNow ?
                                    <Flex onClick={() => handleStopWorking()}>
                                        <StopCircleIcon color="error"/>
                                        <Typography>Stop</Typography>
                                    </Flex>
                                    :
                                    <Flex onClick={() => handleStartWorking()}>
                                        <PlayCircleFilledWhiteIcon color="success"/>
                                        <Typography>Start</Typography>
                                    </Flex>
                            }
                        </ListItem>

                        <ListItem sx={{cursor: 'pointer'}} onClick={() => setOpenCollapse(prev => !prev)}>
                            <Flex alignItems="center" justifyContent="space-between">
                                <MonitorHeartIcon color="primary"/>
                                <Typography>{task.status.toUpperCase()}</Typography>
                                {openCollapse ? <ExpandLess/> : <ExpandMore/>}
                            </Flex>
                        </ListItem>

                        <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                            <List component="div">
                                {statuses.filter(st => st !== task.status).map(st =>
                                    <ListItem sx={{cursor: 'pointer'}} key={st}
                                              onClick={() => handleChangeTask({...task, status: st})}>
                                        <Typography> - {st.toUpperCase()}</Typography>
                                    </ListItem>
                                )}
                            </List>
                        </Collapse>

                        <Divider/>

                        <ListItem sx={{cursor: 'pointer'}} onClick={() => handleDeleteTask(task.id)}>
                            <DeleteIcon color="error"/>
                            <Typography>Delete</Typography>
                        </ListItem>

                        <ListItem sx={{cursor: 'pointer'}}>
                            <ArchiveIcon/>
                            <Typography>Archive</Typography>
                        </ListItem>

                    </List>

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

            <Flex alignItems="center" justifyContent="space-between" color="grey" marginTop={1}>
                <Flex alignItems="center">
                    <AlarmIcon color={clockColor} fontSize="small"/>
                    <Typography color="text.main" fontSize="0.875em">
                        {dayjs(task.ddl).format("DD MMM YYYY HH:mm")}
                    </Typography>
                </Flex>

                <Flex alignItems="center">
                    <HourglassTopIcon fontSize="small" color="primary" sx={
                        task.isWorkingNow
                            ?
                            {
                                animation: "spin 2s linear infinite",
                                "@keyframes spin": {
                                    "0%": {
                                        transform: "rotate(360deg)",
                                    },
                                    "100%": {
                                        transform: "rotate(0deg)",
                                    },
                                }
                            }
                            :
                            null
                    }/>
                    <Typography fontSize="14px">
                        {secToTime(timeSW/1000)}
                    </Typography>

                </Flex>

            </Flex>
        </Card>
    );


};

export default Task;
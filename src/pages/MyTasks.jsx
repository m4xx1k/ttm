import React, {useEffect, useState} from 'react';
import {Dialog, Stack, Typography} from "@mui/material";
import NewTaskForm from "../components/NewTaskForm";
import {taskApi} from "../api/TaskApi";
import Flex from "../ui/Flex";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Task from "../components/Task";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";


const MyTasks = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [createTask] = taskApi.useCreateTaskMutation()
    const [changeStatus] = taskApi.useChangeStatusTaskMutation()

    const handleAddNewTask = async (task) => {
        await createTask(task)
        setOpen(false)
    }

    const [columns, setColumns] = useState([])

    const {data: completeTasks, isLoading: isLoadingCompleteTasks} = taskApi.useFetchTasksByStatusQuery("complete")
    const {data: todoTasks, isLoading: isLoadingToDoTasks} = taskApi.useFetchTasksByStatusQuery("todo")
    const {
        data: inprogressTasks,
        isLoading: isLoadingInprogressTasks
    } = taskApi.useFetchTasksByStatusQuery("inprogress")

    useEffect(() => {
        setColumns([
            {status: "todo", tasks: todoTasks},
            {status: "inprogress", tasks: inprogressTasks},
            {status: "complete", tasks: completeTasks}
        ])
    }, [isLoadingInprogressTasks, isLoadingToDoTasks, isLoadingCompleteTasks, todoTasks, inprogressTasks, completeTasks])

    const getTaskById = (id, status) => {
        let res
        columns.forEach(column => {
            if (column.status === status) {
                column.tasks.forEach(task => {
                    if (task.id === id) res = task
                })
            }
        })
        return res

    }

    const onDragEnd = async (res) => {
        console.log(res)
        const taskId = res.source.index
        const task = getTaskById(taskId, res.source.droppableId)
        if (!!res.destination)
            await changeStatus({
                id: taskId,
                body: {...task, status: res.destination.droppableId}
            })
    }



    return (
        <>

            <AddCircleIcon sx={{marginRight:1}} cursor="pointer" color="primary" fontSize="large" onClick={handleClickOpen}/>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <NewTaskForm handleSubmit={handleAddNewTask}/>
            </Dialog>

            <DragDropContext onDragEnd={onDragEnd}>
                <Flex gap={1}>
                    {columns.map((column) => {
                        return (
                            <Droppable key={column.status} droppableId={column.status}>

                                {(provided) => (
                                    <Stack
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <Typography>{column.status}</Typography>
                                        {column.tasks?.map((task) => (
                                            <Draggable
                                                key={task.id}
                                                draggableId={task.id.toString()}
                                                index={task.id}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <Task task={task}/>
                                                    </div>
                                                )}
                                            </Draggable>

                                        ))}

                                    </Stack>
                                )}
                            </Droppable>
                        );
                    })}
                </Flex>
            </DragDropContext>
        </>
    );
};

export default MyTasks;
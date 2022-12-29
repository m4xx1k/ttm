import React, {useEffect, useState} from 'react';
import {Box, Dialog, Stack, Typography} from "@mui/material";
import TaskForm from "../components/TaskForm";
import {taskApi} from "../api/TaskApi";
import Flex from "../ui/Flex";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Task from "../components/Task";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import Search from "../components/Search";

const MyTasks = () => {
    const [openNewTaskForm, setOpenNewTaskForm] = useState(false);
    const [openSearch, setOpenSearch] = useState(false)


    const [createTask] = taskApi.useCreateTaskMutation()
    const [changeTask] = taskApi.useChangeTaskMutation()

    const handleAddNewTask = async (task) => {
        await createTask(task)
        setOpenNewTaskForm(false)
    }


    const [columns, setColumns] = useState([])
    const {data: completeTasks, isSuccess: isSuccessCompleteTasks} = taskApi.useFetchTasksByStatusQuery("complete")
    const {data: todoTasks, isSuccess: isSuccessToDoTasks} = taskApi.useFetchTasksByStatusQuery("todo")
    const {
        data: inprogressTasks,
        isSuccess: isSuccessInprogressTasks
    } = taskApi.useFetchTasksByStatusQuery("inprogress")

    useEffect(() => {

        setColumns([
            {status: "todo", tasks: todoTasks},
            {status: "inprogress", tasks: inprogressTasks},
            {status: "complete", tasks: completeTasks}
        ])

    }, [isSuccessInprogressTasks, isSuccessToDoTasks, isSuccessCompleteTasks, todoTasks, inprogressTasks, completeTasks])

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
        const taskId = res.source.index
        const task = getTaskById(taskId, res.source.droppableId)
        if (!!res.destination) {

            await changeTask({
                id: taskId,
                body: {...task, status: res.destination.droppableId}
            })
        }
    }


    return (
        <Box>
            <Flex justifyContent="space-between" marginX={2}>
                <AddCircleIcon  cursor="pointer" color="primary" fontSize="large"
                               onClick={() => setOpenNewTaskForm(true)}/>
                <Search openSearch={openSearch} setOpenSearch={setOpenSearch}/>
            </Flex>

            <Dialog
                open={openNewTaskForm}
                onClose={() => setOpenNewTaskForm(false)}
            >
                <TaskForm handleSubmit={handleAddNewTask}/>
            </Dialog>

            <DragDropContext onDragEnd={onDragEnd}>
                <Flex justifyContent="space-between" gap={1}
                      sx={{minHeight: "80vh", maxWidth: "100vw", overflowX: "scroll"}}>
                    {columns.map((column) => {
                        return (
                            <Droppable key={column.status} droppableId={column.status}>

                                {(provided) => (
                                    <Stack
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <Flex alignItems="center">
                                            <Typography marginX={1} fontSize={19}
                                                        fontWeight="700">{column.status.toUpperCase()}</Typography>
                                            <Typography
                                                color="text.secondary">{`(${column.tasks?.length})`}</Typography>
                                        </Flex>

                                        {column.tasks?.map((task) => (
                                            <Draggable
                                                key={task.id}
                                                draggableId={task.id.toString()}
                                                index={task.order || task.id}
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
        </Box>
    );
};

export default MyTasks;
import React, {useState} from 'react';
import {Button, Dialog, Stack, TextField, Typography} from "@mui/material";
import Flex from "../ui/Flex";
import {taskApi} from "../api/TaskApi";
import Task from "./Task";
import SearchIcon from '@mui/icons-material/Search';

const Search = ({openSearch, setOpenSearch}) => {

    const [search, setSearch] = useState("")
    const [trigger, result] = taskApi.useLazySearchTasksQuery()
    const [searchError, setSearchError] = useState("")

    const handleSearch = async (e) => {
        e.preventDefault()
        if( search.length > 2  ) {
            await trigger(search)
            setSearchError("")
        }else{
            setSearchError("Too short request!")
        }
    }

    return (
        <>
            <Button sx={{borderRadius: "10px", cursor: "pointer"}}
                    variant="contained"
                    onClick={() => setOpenSearch(true)}>
                Search
            </Button>
            <Dialog fullWidth open={openSearch} onClose={() => setOpenSearch(false)}>
                <Stack width="100%" height="90vh" padding={2}>
                    <Flex component="form" onSubmit={handleSearch} alignItems="center" gap={2}>

                            <TextField
                                fullWidth
                                id="search"
                                name="search"
                                label="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                error={!!searchError.length}
                                helperText={searchError}
                            />
                            <SearchIcon cursor="pointer" type="submit" color="primary" fontSize="large"/>


                    </Flex>
                    <Stack overflowy="scroll">
                        {

                            result.data?.map(task => <Task key={task.id} task={task} maxW="100%"/>)

                        }
                    </Stack>
                    {
                        result.isSuccess && !result.data.length ?
                        <Typography mt={2} textAlign="center" color="text.secondary" >There are no tasks((</Typography>
                        :
                        <></>
                    }

                </Stack>
            </Dialog>
        </>
    );
};

export default Search;
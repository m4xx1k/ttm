import React, {useState} from 'react';
import {AppBar, List, ListItem, Popover, Toolbar, Typography} from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Flex from "../ui/Flex";
import LoginIcon from '@mui/icons-material/Login';
import Face6Icon from '@mui/icons-material/Face6';
import MenuIcon from '@mui/icons-material/Menu';
import Link from "../ui/Link"


const isLogin = true

const Header = ({h}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);


    return (
        <AppBar position="fixed" sx={{bgcolor: "bg.secondary", color: "text.main", height:h, boxShadow: 'none'}}>
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>

                <Flex alignItems="center" display={{xs: "none", md: "flex"}}>
                    <TaskAltIcon color="primary"/>
                    <Typography fontSize="24px">
                        T&T Management
                    </Typography>
                </Flex>
                <Flex cursor="pointer" onClick={handleClick} display={{xs: "flex", md: "none"}}><MenuIcon/></Flex>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <List>
                        <ListItem>
                            <Link to="/dashboard">
                                <Typography>
                                    Dashboard
                                </Typography>
                            </Link>

                        </ListItem>
                        <ListItem>
                            <Link to="/">
                                <Typography>
                                    My Task
                                </Typography>
                            </Link>

                        </ListItem>
                        <ListItem>
                            <Link to="/projects">
                                <Typography>
                                    Projects
                                </Typography>
                            </Link>

                        </ListItem>
                        <ListItem>
                            <Link to="/analytics">
                                <Typography>
                                    Analytics
                                </Typography>
                            </Link>

                        </ListItem>
                    </List>
                </Popover>

                {
                    isLogin ? <Face6Icon color="primary.main" cursor="pointer"/> :
                        <LoginIcon color="primary.main" cursor="pointer"/>
                }
            </Toolbar>
        </AppBar>
    );
};

export default Header;
import React from 'react';
import {List, ListItem, Typography} from "@mui/material";
import Flex from "../ui/Flex";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Link from "../ui/Link";

const SideNavigation = ({minW}) => {
    return (

        <Flex display={{xs: "none", md: "flex"}} id="sidenavigation" color="text.main" flexDirection="column"
              minWidth={minW}>
            <List>
                <ListItem>
                    <Link to="/dashboard">
                        <DashboardIcon color="primary"/>
                        <Typography>
                            Dashboard
                        </Typography>
                    </Link>
                </ListItem>

                <ListItem>
                    <Link to="/">
                        <FormatListBulletedIcon color="primary"/>
                        <Typography>
                            My Task
                        </Typography>
                    </Link>
                </ListItem>

                <ListItem>
                    <Link to="/projects">
                        <AssignmentIcon color="primary"/>
                        <Typography>
                            Projects
                        </Typography>
                    </Link>
                </ListItem>

                <ListItem>
                    <Link to="/analytics">
                        <BarChartIcon color="primary"/>
                        <Typography>
                            Analytics
                        </Typography>
                    </Link>
                </ListItem>
            </List>
        </Flex>
    );
};

export default SideNavigation;
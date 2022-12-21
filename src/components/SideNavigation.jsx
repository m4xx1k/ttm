import React from 'react';
import {List, ListItem, Typography} from "@mui/material";
import Flex from "../ui/Flex";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const SideNavigation = ({minW}) => {
    return (

            <Flex display={{xs: "none", md: "flex"}} id="sidenavigation" color="text.main" flexDirection="column"
                  minWidth={minW}>
                <List>
                    <ListItem>
                        <DashboardIcon color="primary"/>
                        <Typography>
                            Dashboard
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <FormatListBulletedIcon color="primary"/>
                        <Typography>
                            My Task
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <AssignmentIcon color="primary"/>
                        <Typography>
                            Projects
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <BarChartIcon color="primary"/>
                        <Typography>
                            Analytics
                        </Typography>
                    </ListItem>
                </List>
            </Flex>
    );
};

export default SideNavigation;
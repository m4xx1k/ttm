import React from 'react';
import {Outlet} from "react-router";
import Header from "./components/Header";
import Flex from "./ui/Flex";
import SideNavigation from "./components/SideNavigation";
import {Box, Stack} from "@mui/material";

const Layout = () => {
    return (
        <Box sx={{overflowX:"hidden"}} className="App">
            <Header/>
            <Flex minHeight="90vh">
                <SideNavigation minW="10vw"/>
                <Stack p={1} bgcolor="bg.main" width="100%">
                    <Outlet/>
                </Stack>
            </Flex>

        </Box>
    );
};

export default Layout;
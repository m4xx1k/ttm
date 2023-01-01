import React from 'react';
import {Outlet} from "react-router";
import Header from "./components/Header";
import Flex from "./ui/Flex";
import SideNavigation from "./components/SideNavigation";
import {Box, Stack} from "@mui/material";

const Layout = () => {
    return (
        <Box sx={{overflowX:"hidden"}} className="App">
            <Header h="50px"/>
            <Flex marginTop="50px" minHeight="90vh">
                <SideNavigation w="140px"/>
                <Stack marginLeft={{xs: 0, md: "140px"}} p={1} bgcolor="bg.main" width="100%" height="calc(100vh - 50px)">
                    <Outlet/>
                </Stack>
            </Flex>

        </Box>
    );
};

export default Layout;
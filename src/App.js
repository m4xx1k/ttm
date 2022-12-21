import {Box, Stack} from "@mui/material";
import Header from "./components/Header";
import Flex from "./ui/Flex";
import SideNavigation from "./components/SideNavigation";
import MyTasks from "./pages/MyTasks";



function App() {
    return (
        <Box sx={{overflowX:"hidden"}} className="App">
            <Header/>
            <Flex minHeight="90vh">
                <SideNavigation minW="10vw"/>
                <Stack p={1} bgcolor="bg.main" width="100%">
                    <MyTasks/>
                </Stack>
            </Flex>

        </Box>
    );
}

export default App;

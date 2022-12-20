import {Stack} from "@mui/material";
import Header from "./components/Header";
import Flex from "./ui/Flex";
import SideNavigation from "./components/SideNavigation";
import MyTasks from "./pages/MyTasks";



function App() {
    return (
        <div className="App">
            <Header/>
            <Flex minHeight="90vh">
                <SideNavigation minW="10vw"/>
                <Stack p={2} bgcolor="bg.main"  h="100%" width="100%" direction={{md:"row"}} justifyContent="space-evenly">
                    <MyTasks/>
                </Stack>
            </Flex>

        </div>
    );
}

export default App;

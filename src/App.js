import MyTasks from "./pages/MyTasks";
import {Route, Routes} from "react-router";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Analytics from "./pages/Analytics";



function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<MyTasks/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/projects" element={<Projects/>}/>
                <Route path="/analytics" element={<Analytics/>}/>

            </Route>
        </Routes>
    );
}

export default App;

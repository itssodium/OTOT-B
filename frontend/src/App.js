import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {Box} from "@mui/material";
import SelectApiPage from "./components/SelectApiPage"
import GetPage from "./components/GetPage"
import PostPage from "./components/PostPage"
import PutPage from "./components/PutPage"
import DeletePage from "./components/DeletePage"

function App() {
  return (
    <div className="App">
      <Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
        <Router>
          <Routes>
            <Route exact path="/*" element={<Navigate replace to={'/api'} />}></Route>
            <Route path={'/api'} element={<SelectApiPage/>}/>
            <Route path={'/get'} element={<GetPage/>}/>
            <Route path={'/post'} element={<PostPage/>}/>
            <Route path={'/put'} element={<PutPage/>}/>
            <Route path={'/delete'} element={<DeletePage/>}/>
          </Routes>
        </Router>
      </Box>
    </div>
  );
}

export default App;

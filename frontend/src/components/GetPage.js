import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import {useState} from "react";

function GetPage() {
    const [output, setOutput] = useState("")

    const getFunction = async () => {
        //const res = axios.get('https://safe-tundra-60057.herokuapp.com/get')
        const res = await axios.get('https://task-b3-366508.as.r.appspot.com/get')
        //const res = await axios.get('https://task-b3-366508.as.r.appspot.com/get', {name:'user1'})
        setOutput(res.data);
    }
    return (
        <Box>
            <h1>Get Page</h1>
            <Button onClick={getFunction}>Click here</Button>
            <Typography>{output}</Typography>
        </Box>
    )
}

export default GetPage;

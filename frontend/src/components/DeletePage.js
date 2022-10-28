import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import {useState} from "react";

function DeletePage() {
    const [name, setName] = useState("")
    const [output, setOutput] = useState("")

    const getFunction = async () => {
        //const res = axios.get('https://safe-tundra-60057.herokuapp.com/get')
        console.log(name);
        const res = await axios.delete('https://task-b3-366508.as.r.appspot.com/delete').catch((err) => {
            setOutput(err.response.data)
        })
        //const res = await axios.get('https://task-b3-366508.as.r.appspot.com/get')
        setOutput(res.data);
    }

    return (
        <Box>
            <h1>Delete Page</h1>
            <Button onClick={getFunction}>Delete all users</Button>
            <Typography>{output}</Typography>
        </Box>
    )
}

export default DeletePage;

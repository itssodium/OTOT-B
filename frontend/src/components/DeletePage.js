import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import {useState} from "react";

function DeletePage() {
    const [output, setOutput] = useState("")

    const getFunction = async () => {
        const res = await axios.delete('https://task-b3-366508.as.r.appspot.com/delete').catch((err) => {
            if (err.response.status === 404) {
                setOutput('There are no users to delete')
            }
        })
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

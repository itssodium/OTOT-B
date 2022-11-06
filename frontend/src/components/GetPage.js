import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import {useState} from "react";

function GetPage() {
    const [output, setOutput] = useState("")

    const getFunction = async () => {
        const res = await axios.get('https://task-b3-366508.as.r.appspot.com/get').catch((err) => {
            if (err.response.status === 404) {
                setOutput('There are no users to show')
            }
        })
        
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

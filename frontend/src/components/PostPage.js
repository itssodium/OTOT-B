import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import {useState, useEffect} from "react";

function PostPage() {
    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const [output, setOutput] = useState("")

    const getFunction = async () => {
        const res = await axios.post('https://task-b3-366508.as.r.appspot.com/post', {
                "name": name,
                "role": role
        }).catch((err) => {
            if (err.response.status === 400) {
                setOutput('Please fill up name and/or role')
            }
        })
        console.log(res);
        setOutput(res.data);
        
    }

    return (
        <Box>
            <h1>Post Page</h1>
            <TextField
                label="Name"
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{marginBottom: "1rem"}}
                autoFocus
            />
            <TextField
                label="Role"
                variant="standard"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                sx={{marginBottom: "1rem"}}
                autoFocus
            />
            <Button onClick={getFunction}>Post</Button>
            <Typography>{output}</Typography>
        </Box>
    )
}

export default PostPage;

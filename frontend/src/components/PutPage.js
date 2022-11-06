import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import {useState} from "react";

function PutPage() {
    const [name, setName] = useState(null)
    const [role, setRole] = useState(null)
    const [output, setOutput] = useState("")

    const getFunction = async () => {
        const res = await axios.put('https://task-b3-366508.as.r.appspot.com/put', {
                "name": name,
                "role": role
        }).catch((err) => {
            if (err.response.status === 400) {
                setOutput('Please fill up name and/or role')
            } else {
                setOutput(`${name} is not present, use POST to add user`)
            }
        })
        setOutput(res.data);
    }

    return (
        <Box>
            <h1>Put Page</h1>
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
            <Button onClick={getFunction}>Click here</Button>
            <Typography>{output}</Typography>
        </Box>
    )
}

export default PutPage;

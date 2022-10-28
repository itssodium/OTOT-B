import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function SelectApiPage() {
    return (
        <Box display={"flex"} flexDirection={"row"}>
            <Button component={Link} to="/get">GET</Button>
            <Button component={Link} to="/post">POST</Button>
            <Button component={Link} to="/put">PUT</Button>
            <Button component={Link} to="/delete">DELETE</Button>
        </Box>
    )
}

export default SelectApiPage;
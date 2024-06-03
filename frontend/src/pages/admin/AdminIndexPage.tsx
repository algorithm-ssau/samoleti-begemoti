import { Button, Paper } from "@mui/material";
import { useNavigate } from "react-router";

export function AdminIndexPage() {
    const navigate = useNavigate();

    return (
        <Paper>
            <Button onClick={() => navigate("./add-hotel")}>+ hotel</Button>
            <Button onClick={() => navigate("./users")}>users</Button>
        </Paper>
    );
}

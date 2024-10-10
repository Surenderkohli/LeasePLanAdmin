import React from "react";
import { adminLogout } from "../../api/adminlogout";
import { Box, Anchor, Button } from "../elements";

export default function Logout({ onclick,...rest }) {
    return (
        <Box className="mc-sidebar-logout text-center">
           
            <Button onClick={()=>onclick()} className={`mc-btn primary sm`} type="button">Logout</Button>
        </Box>
    )
}
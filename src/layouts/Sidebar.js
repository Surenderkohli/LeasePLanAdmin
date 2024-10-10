import React, { useContext } from "react";
import { MultipleMenu, Logout } from "../components/sidebar";
import { DrawerContext } from "../context/Drawer";
import Section from "../components/elements/Section";
import data from "../data/master/sidebar.json";
import { Box } from "../components/elements";
import { adminLogout } from "../api/adminlogout";

export default function Sidebar() {
    
    const { drawer } = useContext(DrawerContext);
    
    return (
        <Section as="aside" className={`mc-sidebar thin-scrolling ${ drawer ? "active" : "" } d-flex justify-content-between flex-column`}>
            <MultipleMenu data={ data?.navs }  /> 
            <Box className="">
            <Logout onclick={adminLogout}/>
            </Box>
        </Section>
    )
}
import React, { useEffect } from "react";
import MenuItem from "./MenuItem";
import { List, Menu, Heading } from "../elements";
import { useState } from "react";

export default function MultipleMenu({ data }) {
    const [currentRole, setCurrentRole] = useState(null)
    
    useEffect(() => {
        setCurrentRole(localStorage.getItem("admin_role_validation"))
    }, [currentRole])

    return (
        <>
            {data?.map((item, index) => (

                <Menu key={index} className="mc-sidebar-menu">

                    <Heading as="h5" className="mc-sidebar-menu-title">{item.title}</Heading>
                    <List className="mc-sidebar-menu-list">
                        {item.menu.map((item, index) => (
                            <>
                                    <MenuItem
                                        key={index}
                                        item={item}
                                    />
                            </>

                        ))}
                    </List>
                </Menu>
            ))}
        </>
    );
}
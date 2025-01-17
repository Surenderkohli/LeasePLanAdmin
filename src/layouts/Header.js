import React, { useContext, useState, useRef, useEffect } from 'react';
import { LanguageDropdown, WidgetDropdown, ProfileDropdown } from '../components/header';
import { Button, Section, Box, Input } from "../components/elements";
import { DrawerContext } from '../context/Drawer';
import { ThemeContext } from '../context/Themes';
import { Logo } from '../components';
import data from "../data/master/header.json";
// import { onValue, ref } from 'firebase/database';
// import { db } from '../firebase';

export default function Header() {
    const [notificationLength, setNotificationLength] = useState([])

    // useEffect(() => {
    //     const query = ref(db, "users");
    
    //     let d = onValue(query, (snapshot) => {
    //       const data1 = snapshot.val();
    //       if (snapshot.exists()) {
    //       setNotificationLength([]);
    
    //         Object.values(data1).map((user) => {
    //           setNotificationLength((pre) => [...pre, user]);
    //         });
    //       }
    //     });
    //     return () => d;
    //   }, []);

    const { drawer, toggleDrawer } = useContext(DrawerContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const searchRef = useRef();
    const [scroll, setScroll] = useState("fixed");
    const [search, setSearch] = useState("");

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 0) setScroll("sticky");
        else setScroll("fixed");
    });

    document.addEventListener('mousedown', (event) => {
        if (!searchRef.current?.contains(event.target)) {
            setSearch("");
        }
    })

    return (
        <Section as="header" className={`mc-header ${ scroll }`}>
            <Logo 
                src = { data?.logo.src }
                alt = { data?.logo.alt }
                name = { data?.logo.name }
                href = { data?.logo.path } 
              
            />
            <Box className="mc-header-group">
                <Box className="mc-header-left">
                    {/* <Button 
                        icon={ data?.search.icon } 
                        className="mc-header-icon search" 
                        onClick={()=> setSearch("show")}
                    /> */}
                    <Button 
                        icon={ drawer ? "menu_open" : "menu" } 
                        className="mc-header-icon toggle mx-5" 
                        onClick={ toggleDrawer } 
                    />
                    <Box className={`mc-header-search-group ${ search }`}>
                        {/* <form className="mc-header-search" ref={ searchRef }>
                            <Button className="material-icons">{ data?.search.icon }</Button>
                            <Input type="search" placeholder={ data?.search.placeholder } />
                        </form> */}
                    </Box>
                </Box>
                <Box className="mc-header-right">
                    <Button 
                        icon={ theme }
                        title={ data.theme.title }
                        onClick={ toggleTheme }
                        className={`mc-header-icon ${ data.theme.addClass }`}
                    />
             
                     <ProfileDropdown /> 
                </Box>
            </Box>
        </Section>
    );
}


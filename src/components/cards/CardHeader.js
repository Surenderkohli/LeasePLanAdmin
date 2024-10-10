import React from "react";
import DotsMenu from "../DotsMenu";
import { Box, Heading, Anchor } from "../elements";

export default function CardHeader({ title, dotsMenu, button, href, onClick }) {
    return (
        <Box className="mc-card-header">
            { title && <Heading as="h4" className="mc-card-title">{ title }</Heading> }
            { dotsMenu && <DotsMenu dots={ dotsMenu.dots } dropdown={ dotsMenu.dropdown } /> }
            { button && <Anchor className="mc-btn primary" href={ href} icon={ button.icon } text={ button.text } onClick={onClick}/> }
        </Box>
    )
}



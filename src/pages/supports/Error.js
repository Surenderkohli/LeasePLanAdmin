import React from "react";
import { Box, Heading, Text, Image, Anchor } from "../../components/elements";

export default function Error() {
    return (
        <Box className="mc-error">
            <Image src="images/404.webp" alt="404" />
            <Heading>ooops! this page can't be found.</Heading>
            <Text>It's looks like nothing was found at this location.</Text>
            <Anchor href="/leads-section" className="mc-btn primary mt-3" icon="home" text="back to home" />
        </Box>
    )
}
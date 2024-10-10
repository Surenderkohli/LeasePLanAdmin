import React from "react";
import { Box, Text, Icon, Heading } from "../elements";

export default function FloatCard({ variant, digit, title,color, icon ,...rest}) {
    return (
        <Box className={`mc-float-card ${ variant }`} {...rest}>
            <Heading>{ digit }</Heading>
            <Text>{ title }</Text>
            <Icon style={{color:color}}>{ icon }</Icon>
        </Box>
    )
}
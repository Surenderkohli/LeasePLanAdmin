import React from "react";
import { Box, Input, Label, Icon, Text } from "./elements";

export default function FileUpload({ icon,text,...rest }) {
    return (
        <>
            {text ?
                <Box className={`mc-file-upload ${ text ? "button" : "icon" }`}>
                    <Input multiple type="file"  id="avatar" {...rest} />
                    <Label htmlFor="avatar">
                        <Icon>{ icon || "cloud_upload" }</Icon>
                        <Text as="span">{ text || "upload" }</Text>
                    </Label>
                </Box>
            :
                <Box className={`mc-file-upload ${ text ? "button" : "icon" }`}>
                    <Input  multipl type="file"  id="avatar" />
                    <Label htmlFor="avatar" className="material-icons">{ icon || "cloud_upload" }</Label>
                </Box>
            }
        </>
    )
}

export const FileUploadDetails = ({icon, text, ...rest}) => {
    return (
        <>
             {text ?
                <Box className={`mc-file-upload ${ text ? "button" : "icon" }`}>
                    <Input multiple accept="image/*" type="file" id="avatar" {...rest} />
                    <Label htmlFor="avatar">
                        <Icon>{ icon || "cloud_upload" }</Icon>
                        <Text as="span">{ text || "upload" }</Text>
                    </Label>
                </Box>
            :
                <Box className={`mc-file-upload ${ text ? "button" : "icon" }`}>
                    <Input  multipl accept="image/*" type="file" id="avatar" />
                    <Label htmlFor="avatar" className="material-icons">{ icon || "cloud_upload" }</Label>
                </Box>
            }
        </>
    )
}

const FileUploadOffer = ({icon, text, ...rest}) => {
    return (
        <>
             {text ?
                <Box className={`mc-file-upload ${ text ? "button" : "icon" }`}>
                    <Input multiple type="file" id="avatar" {...rest} />
                    <Label htmlFor="avatar">
                        <Icon>{ icon || "cloud_upload" }</Icon>
                        <Text as="span">{ text || "upload" }</Text>
                    </Label>
                </Box>
            :
                <Box className={`mc-file-upload ${ text ? "button" : "icon" }`}>
                    <Input  multipl type="file" id="avatar" />
                    <Label htmlFor="avatar" className="material-icons">{ icon || "cloud_upload" }</Label>
                </Box>
            }
        </>
    )
}


FileUpload.FileUploadDetails = FileUploadDetails;
FileUpload.FileUploadOffer = FileUploadOffer;
import React from "react";
import { Box, Input, Select, Option, Icon, Button } from "../elements";

export default function IconField({ classes,onChange,name, icon, option, activeOption, type, placeholder, passwordVisible, ...rest }) {
    const [visible, setVisible] = React.useState(false);
    
    return (
        <Box className={`mc-icon-field ${ classes || "w-md h-sm white" }`}>
            <Icon type={ icon || "account_circle" } />
            {type ?
                <>
                    <Input 
                        type={ visible ? "text" : type || "text" }  
                        placeholder={ type ? placeholder || "Type here..." : "" } 
                        { ...rest }
                        onChange={onChange}
                        name={name}
                    />
                    {passwordVisible && 
                        <Button 
                            type = "button"
                            className = "material-icons"
                            onClick = {()=> setVisible(!visible)}
                        >
                            { visible ? "visibility_off" : "visibility" }
                        </Button>
                    }
                </>
                :
                <Select { ...rest }>
                    <Option>{ activeOption || "Select Option" }</Option>
                    {option.map((item, index) => (
                        <Option key={ index } value={ item }>{ item}</Option>
                    ))}
                </Select>
            }
       </Box>
    )
}
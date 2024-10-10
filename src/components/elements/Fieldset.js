import React from "react";

export default function Fieldset({ children, className,...rest }) {
    return <fieldset className={ className }   { ...rest }>{ children }</fieldset>
}
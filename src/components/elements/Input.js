import React from "react";

export default function Input({ type, placeholder, className,name,value, ...rest }) {
    return <input type={ type || "text" } placeholder={ placeholder } name={name} value={value} className={ className } { ...rest } />
}
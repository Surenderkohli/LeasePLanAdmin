import React from "react";

export default function Image({ src, alt, className ,...rest}) {
    return <img className={ className } src={ src } alt={ alt } {...rest} />
}
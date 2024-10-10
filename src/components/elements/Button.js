import React from "react";

export default function Button({ type, onClick,href, className, icon, iconClass, text, badge, arrow, children,...rest }) {
    return (
        
        <button type={ type || "button" } href={href}  onClick={ onClick } className={ className } {...rest}>
            { icon || iconClass ? <i className={ iconClass || "material-icons" }>{ icon }</i> : <></> }
            { text && <span>{ text }</span> }
            { badge && <sup className={ badge.variant }>{ badge.text }</sup> }
            { arrow && <small className="material-icons">{ arrow }</small>}
            { children }
        </button>
    );
}
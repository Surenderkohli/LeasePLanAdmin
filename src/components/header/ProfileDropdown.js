import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { DuelText,DivideTitle, RoundAvatar } from "..";
import { Anchor, Button } from "../elements";
import { adminLogout } from "../../api/adminlogout";

export default function ProfileDropdown({ name, username, image, dropdown }) {
  
  return (
    <Dropdown className="mc-header-user">
     <div style={{fontstyle:"Italic", color:"#e2450b", fontFamily: 'Droid Sans'}}>Signed in as</div>
       <Dropdown.Toggle className="mc-dropdown-toggle">

        <DuelText title={`${localStorage.getItem("admin_name_validation")}`}  />
       </Dropdown.Toggle>
       <Dropdown.Menu align="end" className="mc-dropdown-paper">
        <Anchor
          href={'/my-account'}
          icon={"person"}
          text={`${localStorage.getItem("admin_email_validation")}...`}
          className="mc-dropdown-menu"
        />
       
        <Button
          icon={"lock"}
          text={"logout"}
          className="mc-dropdown-menu"
          onClick={adminLogout}
        />
      </Dropdown.Menu> 
   
   
    </Dropdown>
//     <Dropdown className="mc-header-user">
//     <Dropdown.Toggle className="mc-dropdown-toggle">
//         <RoundAvatar src={ image } alt="avatar" size="xs" />
//         <DuelText title={ name } descrip={ username } size="xs" />
//     </Dropdown.Toggle>
//     <Dropdown.Menu align="end" className="mc-dropdown-paper">
//         {dropdown.map((item, index) => (
//             <Anchor
//                 key={index}
//                 href={item.path}
//                 icon={item.icon}
//                 text={item.text}
//                 className="mc-dropdown-menu"
//             />
//         ))}
//     </Dropdown.Menu>
// </Dropdown>
  );
}

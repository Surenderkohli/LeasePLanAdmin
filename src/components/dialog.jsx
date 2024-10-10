import Modal from 'react-bootstrap/Modal';


import { useState } from "react";
import { Box, Text,Anchor, Heading, Input, Image, Icon, Button } from "../components/elements";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import {  FileUpload } from "../components";

export const DialogPage = ({
    children,
    open,
    label = 'DIALOG',
    close,
    width = 'max-w-3xl',
    type,
    text
  }) => {
    
    const [bannerdata, setBannerData] = useState({
      image:null,
      title:"",
      description:""
  })

  const handleImageUpload = (e) => {
    setBannerData({...bannerdata, image:e.target.files[0]})
}

  const editBanner = () => {
    console.log("addBanner")
  }



    return (   
    <Modal show={open} onHide={close}>
    <Box className="mc-alert-modal">
        <Icon type={type} />
        {/* <Heading as="h3">are your sure!</Heading> */}
        <Text as="p">{text}</Text> 
        {children}
    </Box>
    

</Modal>)
    
  };
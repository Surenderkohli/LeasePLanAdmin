
// import React, { useEffect, useState } from "react";
// import { Row, Col, Tab, Tabs, Form } from "react-bootstrap";
// import { Box, Button, Image } from "../../../components/elements";
// import { CardLayout, TabCard } from "../../../components/cards";
// import { Breadcrumb, FileUpload } from "../../../components";
// import PageLayout from "../../../layouts/PageLayout";


import { useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import HostedApi from "../../api/axios";
import { Breadcrumb } from "../../components";
import { CardLayout, TabCard } from "../../components/cards";
import { Box, Button } from "../../components/elements";
import PageLayout from "../../layouts/PageLayout";
import { uploadImage } from "../../api/ImageUploader";
import {  FileUpload } from "../../components";
import {  CardHeader } from '../../components/cards';


export const AddBanner = () => {

    const [bannerdata, setBannerData] = useState({
        image:null,
        title:"",
        description:""
    })
    const addBanner = async (e) => {
        e.preventDefault();
        console.log(bannerdata, "iiiiiiiii")
        
        try {
            await HostedApi({
                url: "/banner/upload-banner",
                method: "POST",
                data: bannerdata,
                headers: { 'Content-Type': 'multipart/form-data' }
            },).then((res) => {
                toast.success('Banner Upload successfully', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                // setTimeout(() => {
                //     window.location.assign("/banner")

                // }, 1000);
            });
            console.log(bannerdata, "value------------------")
        } catch (e) {
            console.log(e)
        }
    }

    
    const handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
     
       
    

        setBannerData((prevalue) => {
            return {
                ...prevalue, // Spread Operator              
                [name]: value,
                
            }
        })
    }

    const handleImageUpload = (e) => {
        setBannerData({...bannerdata, image:e.target.files[0]})
    }


    return (
        <PageLayout>
         <CardHeader title={"Add Banner"}  />
            <Row>
                <form className="row g-3 needs-validation">


                    <div className="col-md-4">
                        <label className="form-label">Title</label>
                        <input type="text" className="form-control" name="title" onChange={handleChange} value={bannerdata.title} required />

                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Description</label>
                        <textarea type="text" className="form-control" name="description" onChange={handleChange} value={bannerdata.description} required />

                    </div>

                    <Col xl={4}>
                      <Box className="mc-user-avatar-upload ">
                      <label className="form-label">Image Upload</label>
                        <FileUpload onChange={handleImageUpload} icon="cloud_upload" text="upload" />
                        {bannerdata.image &&
                
                        <div style={{marginTop:"20px"}}> 
                     
                        <img width={100}  src={URL.createObjectURL(bannerdata.image)}/>
                       </div>  
                          } 
                      </Box>
                    </Col>



                    <div className="col-12">
                        <button className="btn btn-primary" type="submit" onClick={addBanner}>Submit form</button>
                    </div>
                </form>
            </Row>
            <ToastContainer />
        </PageLayout>
    )
}




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


export const Leasedetails = () => {

    const [bannerdata, setBannerData] = useState({
        title:"",
        description:""
    })


    const addBanner = async (e) => {
        e.preventDefault();
        console.log(bannerdata, "iiiiiiiii")
        
        try {
            await HostedApi({
                url: "/query-details/add-query",
                method: "POST",
                data: bannerdata,
                headers: { 'Content-Type': 'multipart/form-data' }
            },).then((res) => {
                toast.success('Uploaded successfully', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    window.location.assign("/home")

                }, 1000);
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

    return (
        <PageLayout>
         <CardHeader title={"Lease details"}  />
            <Row>
                <form className="row g-3 p-3 needs-validation">


                    <div className="col-md-6">
                        <label className="form-label">Long-Term</label>
                        <textarea type="text" className="form-control" name="title" onChange={handleChange} value={bannerdata.title} required />

                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Flexi</label>
                        <textarea type="text" className="form-control" name="description" onChange={handleChange} value={bannerdata.description} required />

                    </div>



                    <div className="col-12">
                        <button className="btn btn-primary mt-3" type="submit" onClick={addBanner}>Submit form</button>
                    </div>
                </form>
            </Row>
            <ToastContainer />
        </PageLayout>
    )
}



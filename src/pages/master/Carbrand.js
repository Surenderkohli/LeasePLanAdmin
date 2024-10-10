/* eslint-disable no-mixed-operators */
import React, { useCallback, useEffect, useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import HostedApi from "../../api/axios";
import { Breadcrumb } from "../../components";
import { CardLayout, TabCard } from "../../components/cards";
import { Box,Anchor, Button } from "../../components/elements";
import PageLayout from "../../layouts/PageLayout";
import { uploadImage } from "../../api/ImageUploader";
import {  FileUpload } from "../../components";
import {  CardHeader } from '../../components/cards';
import {AddInventory} from "./addInventory";


const Carbrand = () => {
  
  const [carbrand, setCarbrand] = useState({
      companyName:"",
      makeCode:""
  })
  

  const handleChange = (e) => {
    const {name, value} = e.target
    setCarbrand({...carbrand, [name]:value})
  }


  const addCarBrand = async(e) => {
    e.preventDefault()
    console.log(carbrand, "form submitted")
    if(carbrand.companyName === "" && carbrand.makeCode === "" || carbrand.makeCode === '' || carbrand.companyName === ""){
      toast.error("Please enter a details")
    }
     try{
       if(carbrand.companyName !== "" && carbrand.makeCode !== ""){
        await HostedApi({
          url:"/carbrand/add-carbrand",
          method:"POST",
          data:carbrand,
          headers: { 'Content-Type': 'multipart/form-data' }
         }).then((response) => {
               if(response.status === 200){
                toast.success('Updated Successfully', {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                })
               setTimeout(() => {
                   window.location.assign("/add-carseries")
               },1000)
               }
              })
       }  
     }
     catch(error){
      console.log(error, "error ")
      toast.error(error.response.data.msg)
     }
  }


  return (
    <PageLayout>   
        <div>
        <CardHeader title={"Add Car Brand"}  />
            <Row className="">
                <form className="row g-3 mt-0 p-2 mb-5  needs-validation">
                  
                   <div className="col-md-4">
                        <label className="form-label">Car Brand Name</label>
                        <input type="text" placeholder="Enter Car Brand Name" className="form-control" name="companyName" onChange={handleChange} value={carbrand.companyName} required />

                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Make Code</label>
                        <input type="text" placeholder="Enter Make Code" className="form-control" name="makeCode" onChange={handleChange} value={carbrand.makeCode} required />

                    </div>

                    <div className="col-4 mt-5">
                        <button className="btn btn-primary" type="submit" onClick={addCarBrand}>Add Car Brand</button>
                    </div>
                </form>
            </Row>
            <ToastContainer />
         </div>
    </PageLayout>

  )
}

export default Carbrand

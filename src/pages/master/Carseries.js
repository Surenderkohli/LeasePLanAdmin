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


const Carseries = () => {

  const [carbrand, setCarbrand] = useState()
  
  const [carseries, setCarseries] = useState({
     carBrand_id:"",
      seriesName:"",
      modelCode:""
  })


  const allcarbrand = useCallback(async() => {
      try{
          await HostedApi({
            url: "/carbrand",

            method: "GET",
          
          }).then((res) => {
            setCarbrand(res.data)
            console.log(res.data, "dattt")
          })
      }catch(err){
        console.log(err)
      }
  })

  useEffect(() => {
    allcarbrand()
  }, [])
  

  const handleChange = (e) => {
    const {name, value} = e.target
    setCarseries({...carseries, [name]:value})
  }


  const addCarSereies = async(e) => {
    e.preventDefault()
    // if(carseries.carBrand_id === '' || carseries.seriesName === '' || carseries.modelCode === '' ){
    //     toast.error('Please Complete Series/Modal ')
    // }
    // console.log(carseries)

    try{
       await HostedApi({
         url:"/carseries/add-carseries",
         method:"POST",
         data:carseries,
         headers: {'Content-type': 'application/json'},
       }).then(response => {
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
            setCarseries({
              carBrand_id:"",
              seriesName:"",
              modelCode:""
            })

          //   setTimeout(() => {
          //     window.location.assign("/add-car")
          // },1000)

            // setTimeout(() => {
            //     window.location.assign('/home')
            // })
           }

           else{
            toast.fail('Failed to Update', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
           }

       })
    }
    catch(err){
      toast.error(err.response.data.msg)
    }

  }

  return (
    <PageLayout>   
        <div>
        <CardHeader title={"Add Car Series"}  />
            <Row className="">
                <form className="row g-3 mt-0 p-2 mb-5  needs-validation">

                    <div className="col-md-4">
                        <label className="form-label">Choose Car Brand</label>
                        <select className="form-select"  name="carBrand_id" onChange={handleChange} value={carseries.carBrand_id} required>
                  
                             <option  name='choose' >Choose Car Brand</option>
                              {carbrand?.map((item) => (
                                <>
                                <option key={item?._id} name={item?.companyName}  value={item?._id}>{item?.companyName}</option>
                                </>
                              ))}

                        </select>

                    </div>
                  
                   <div className="col-md-4">
                        <label className="form-label">Car Series Name</label>
                        <input type="text" placeholder="Enter Car Series" className="form-control" name="seriesName" onChange={handleChange} value={carseries.seriesName} required />

                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Model Code</label>
                        <input type="text" placeholder="Enter Model Code" className="form-control" name="modelCode" onChange={handleChange} value={carseries.modelCode} required />

                    </div>

                    <div className="col-4 mt-5">
                        <button className="btn btn-primary" type="submit" onClick={addCarSereies}>Add Car Series</button>
                    </div>
                </form>
            </Row>
            <ToastContainer />
         </div>
    </PageLayout>

  )
}

export default Carseries

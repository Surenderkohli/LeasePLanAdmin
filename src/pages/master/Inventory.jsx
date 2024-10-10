import React from 'react'
import { Inventorytable } from '../../components/tables/Bin/Inventorytable';
import PageLayout from '../../layouts/PageLayout';
import { Row, Col, Breadcrumb } from "react-bootstrap";
import { CardLayout, CardHeader, FloatCard } from '../../components/cards';
import { useState } from 'react';
import { useCallback } from 'react';
import HostedApi from '../../api/axios';
import Button from "../../components/elements/Button";
import ProductsTable from "../../components/tables/ProductsTable";
import { toast, ToastContainer } from "react-toastify";
import { DialogPage } from "../../components/dialog";
import LabelField from "../../components/fields/LabelField";
import Totalinventry from '../../data/svgicons/Totalinventry'
import Query from '../../data/svgicons/Query'
import Bannericon from '../../data/svgicons/Bannericon'
import Spinner from '../../components/spinner/Spinner'

import Uploadsvg from '../../components/icons/Uploadsvg'




import { FileUpload } from "../../components";
import { useEffect } from 'react';
import { Anchor, Box, Text, Input } from '../../components/elements';

import data from "../../data/master/productList.json";
import { Table, Tbody, Td, Th, Thead, Tr } from '../../components/elements/Table';



const Csvmodal = ({ open, onClose, loading, detailsUpload, offersUpload, featuresUpload }) => {

  const [carDetailsUploaded, setCarDetailsUploaded] = useState(false);
  const [carOffersUploaded, setCarOffersUploaded] = useState(false);
  const [carFeatures, setCarFeatures] = useState(false);
  const [loadingnew, setLoadingnew] = useState(loading)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isButtonDisabledoffer, setIsButtonDisabledoffer] = useState(false);
  const [isButtonDisabledfeature, setIsButtonDisabledfeature] = useState(false);
  const [detailstrue, setDetailstrue] = useState(detailsUpload);
  const [offerTrue, setOfferTrue] = useState(offersUpload);
  const [featuretrue, setFeaturetrue] = useState(featuresUpload);



  const [csv, setCsv] = useState({
    details: null,
    offers: null,
    features: null,
  })


  const handleDetailschange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/csv") {
      setCarDetailsUploaded(true)
      setCsv({ ...csv, details: e.target.files[0] })
    } else {
      alert("Please upload carDetails first.");
      setCsv({ ...csv, details: null })
    }

  }

  const handleOfferChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/csv") {
      setCarOffersUploaded(true)
      setCsv({ ...csv, offers: e.target.files[0] })
    } else {
      setCsv({ ...csv, offers: null })
    }
  }


  const handleFeaturesChange = (e) => {

    const file = e.target.files[0];
    if (file && file.type === "text/csv") {
      setCarFeatures(true)
      setCsv({ ...csv, features: e.target.files[0] })
    } else {
      setCsv({ ...csv, features: null })
    }
  }



  const addcsv = async (e) => {

    e.preventDefault();


    setIsButtonDisabled(true);

    // Perform your desired action here

    // Re-enable the button after a certain time (e.g., 1 second)
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 3000);

    // setTimeout(() => {
    //   setLoadingnew(!loading);
    // }, 2000);


    var formData1 = new FormData();


    formData1.append('file', csv.details)


    // console.log(formData1.get('file'), formData2.get('file'), formData3.get('file'), "formdata1")

    try {
      if (carDetailsUploaded) {
        const res = await Promise.all([
          HostedApi({
            url: "/cardetails/car-details",
            method: "POST",
            data: formData1,
          }),

        ])
        const data = res.map((res) => res.data);

        if (data) {
          console.log(data, "this is a success")
          setDetailstrue(true)
          toast.success('Uploaded Sucessfully', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

        }


      } else if (!carDetailsUploaded) {
        toast.error('Please select a car details')
      }

    } catch (err) {

      toast.error(err.response.data.message)

      const errorCsvUrl = 'https://api.leaseplan.dev.client.kloudlite.io/static/error_list_cardetails.csv';
      const link = document.createElement('a');
      link.href = errorCsvUrl;
      link.setAttribute('download', 'error_list_cardetails.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // window.location.assign("/inventory")
    }

    //  if(carDetailsUploaded && csv.offers && csv.features){

    //  if(result1.status && result2.status && result3 === 201){

    //     toast.success('successfully', {
    //     position: "top-right",
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //    });
    //   }

    //  }
    // else{
    //   alert('Please select Car details first')
    //  }
  }

  const addcsvoffer = async (e) => {

    e.preventDefault();

    setIsButtonDisabledoffer(true);

    // Perform your desired action here

    // Re-enable the button after a certain time (e.g., 1 second)
    setTimeout(() => {
      setIsButtonDisabledoffer(false);
    }, 3000);

    // setTimeout(() => {
    //   setLoadingnew(!loading);
    // }, 2000);

    var formData2 = new FormData();



    formData2.append('file', csv.offers)



    // console.log(formData1.get('file'), formData2.get('file'), formData3.get('file'), "formdata1")

    try {
      if (carOffersUploaded) {
        const res = await Promise.all([
          HostedApi.post(`/carOffer/car-offers`, formData2),
        ])
        const data = res.map((res) => res.data);

        if (data) {
          console.log(data, "this is a success")
          setOfferTrue(true)
          toast.success('Uploaded Sucessfully', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

        }


      } else if (!carOffersUploaded) {

        toast.error("Please Upload Car Offer")
        console.log("error uploading")
      }

    } catch (err) {
      console.log(err, "error")
      toast.error(err.response.data.message)

      const errorCsvUrl = 'https://api.leaseplan.dev.client.kloudlite.io/static/error_list_caroffers.csv';
      const link = document.createElement('a');
      link.href = errorCsvUrl;
      link.setAttribute('download', 'error_list_caroffers.csv');
      document.body.append(link);
      link.click();
      document.body.removeChild(link);
      // window.location.assign("/inventory")
    }

    //  if(carDetailsUploaded && csv.offers && csv.features){

    //  if(result1.status && result2.status && result3 === 201){

    //     toast.success('successfully', {
    //     position: "top-right",
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //    });
    //   }

    //  }
    // else{
    //   alert('Please select Car details first')
    //  }
  }

  const addcsvfeature = async (e) => {

    e.preventDefault();

    setIsButtonDisabledfeature(true);

    // Perform your desired action here

    // Re-enable the button after a certain time (e.g., 1 second)
    setTimeout(() => {
      setIsButtonDisabledfeature(false);
    }, 3000);

    // setTimeout(() => {
    //   setLoadingnew(!loading);
    // }, 2000);


    var formData3 = new FormData();


    formData3.append('file', csv.features)



    // console.log(formData1.get('file'), formData2.get('file'), formData3.get('file'), "formdata1")

    try {
      if (carFeatures) {
        const res = await Promise.all([
          HostedApi.post(`/carFeature/feature-description`, formData3),
        ])
        const data = res.map((res) => res.data);

        if (data) {
          console.log(data, "this is a success")
          setFeaturetrue(true)
          toast.success('Uploaded Sucessfully', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }

      } else if (!carFeatures) {
        toast.error('Please select car features')
      }

    } catch (err) {
      toast.error(err.response.data.message)
      const errorCsvUrl = 'https://api.leaseplan.dev.client.kloudlite.io/static/error_list_carfeatures.csv';
      const link = document.createElement('a');
      link.href = errorCsvUrl;
      link.setAttribute('download', 'error_list_carfeatures.csv');
      document.body.append(link);
      link.click();
      document.body.removeChild(link);
      // window.location.assign("/inventory")
    }

    //  if(carDetailsUploaded && csv.offers && csv.features){

    //  if(result1.status && result2.status && result3 === 201){

    //     toast.success('successfully', {
    //     position: "top-right",
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //    });
    //   }

    //  }
    // else{
    //   alert('Please select Car details first')
    //  }
  }


  return (
    <>
      <DialogPage open={open} close={onClose} loading={loading} type="verified" text="Add CSV INVENTORY">
        <Row>
          <form className="row g-3 mt-5 mb-5 p-2 needs-validation">

            <Col xl={12}>

              <div>
                <label style={{ width: "240px" }} className="form-label">Step One Upload Car Details</label>
                <Box className="mc-user-avatar-upload">
                  {/* <FileUpload onChange={handleDetailschange} icon="cloud_upload"  text="upload Car details" /> */}

                  <input style={{ background: " rgb(255, 87, 34)", borderRadius: "5px", color: "white", marginBottom: "10px", width: "auto", height: "auto", border: "1px solid #FF5722", padding: "6px", borderStyle: "dashed", marginLeft: " 10px" }} icon="cloud_upload" onChange={handleDetailschange} type="file" accept=".csv, text/csv" />

                  <button icon="add_to_photos" className="btn btn-primary ms-2" disabled={isButtonDisabled} onClick={addcsv}>Add Details</button>

                  {/* {detailstrue ? <Uploadsvg/> :null} */}
                </Box>

                {/* {csv.details &&

                            <div style={{marginTop:"20px"}}> 
                                  {csv.details.name}
                            </div>  
                        }  */}
              </div>

              <div>
                <label style={{ width: "240px" }} className="form-label">Step Two Upload Car Offers </label>
                {/* <FileUpload onChange={handleOfferChange} icon="cloud_upload"   text="upload Car offers" /> */}
                {/* <FileUpload.FileUploadDetails onChange={handleOfferChange} icon="cloud_upload"   text="upload Car offers"/> */}
                <Box className="mc-user-avatar-upload">
                  <input style={{ background: " rgb(255, 87, 34)", borderRadius: "5px", color: "white", marginBottom: "10px", width: "auto", height: "auto", border: "1px solid #FF5722", padding: "6px", borderStyle: "dashed", marginLeft: " 10px" }} icon="cloud_upload" onChange={handleOfferChange} type="file" accept=".csv, text/csv" />
                  {/* {csv.offers &&
                          <div style={{marginTop:"20px"}}> 
                           {csv.offers.name}
                          </div>  
                        } */}
                  <button className="btn btn-primary ms-2" disabled={isButtonDisabledoffer} type="submit" onClick={addcsvoffer}>Add Offers</button>
                  {/* {offerTrue ? <Uploadsvg/> : null} */}
                </Box>
              </div>


              <div>
                <label style={{ width: "240px" }} className="form-label">Step three Features Upload</label>
                <Box className="mc-user-avatar-upload ">
                  {/* <FileUpload onChange={handleFeaturesChange} icon="cloud_upload"   text="upload car features" />  */}
                  {/* <FileUpload.FileUploadOffer onChange={handleFeaturesChange} icon="cloud_upload"   text="upload car features"/> */}
                  <input style={{ background: " rgb(255, 87, 34)", borderRadius: "5px", color: "white", marginBottom: "10px", width: "auto", height: "auto", border: "1px solid #FF5722", padding: "6px", borderStyle: "dashed", marginLeft: " 10px" }} icon="cloud_upload" onChange={handleFeaturesChange} type="file" accept=".csv, text/csv" />
                  {/* {csv.features &&
                          <div style={{marginTop:"20px"}}> 
                           {csv.features.name}
                          </div>  
                        } */}
                  <button className="btn btn-primary ms-2" disabled={isButtonDisabledfeature} onClick={addcsvfeature}>Add Feature</button>
                  {/* {featuretrue ? <Uploadsvg/> : null} */}
                </Box>
              </div>


            </Col>

          </form>

          <div className="col-6">
            <button className="btn btn-primary" onClick={onClose} >Cancel</button>
          </div>

          <div className="col-6">
            <button className="btn btn-primary" onClick={onClose} type="submit">ok</button>
          </div>

        </Row>
      </DialogPage>
    </>
  )
}


const Carview = ({ open, onClose }) => {
  <DialogPage open={open} close={onClose} type="verified" text="All CSV INVENTORY details">
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title={data?.pageTitle}>
              {data?.breadcrumb.map((item, index) => (
                <li key={index} className="mc-breadcrumb-item">
                  {item.path ? <Anchor className="mc-breadcrumb-link" href={item.path}>{item.text}</Anchor> : item.text}
                </li>
              ))}
            </Breadcrumb>
          </CardLayout>
        </Col>
        {data?.float.map((item, index) => (
          <Col key={index} sm={6} lg={4}>
            <FloatCard
              variant={item.variant}
              digit={item.digit}
              title={item.title}
              icon={item.icon}
            />
          </Col>
        ))}
        <Col xl={12}>
          <CardLayout>
            <Row>
              {data?.product.filter.map((item, index) => (
                <Col xs={12} sm={6} md={4} lg={3} key={index}>
                  <LabelField
                    type={item.type}
                    label={item.label}
                    option={item.option}
                    placeholder={item.placeholder}
                    labelDir="label-col"
                    fieldSize="w-100 h-md"
                  />
                </Col>
              ))}
              <Col xl={12}>
                <ProductsTable
                  thead={data?.product.thead}
                  tbody={data?.product.tbody}
                />
                {/* <Pagination /> */}
              </Col>
            </Row>
          </CardLayout>
        </Col>
        <div className="col-6">
          <button className="btn btn-primary" onClick={onClose} >Cancel</button>
        </div>
        {/* 
     <div className="col-6">
     <button className="btn btn-primary" type="submit" >Add Inventory CSV</button>
     </div> */}
      </Row>
    </PageLayout>
  </DialogPage>
}

const Inventory = () => {
  const button = {
    "text": "AddInventory",
    "path": "/add"
  }
  const [viewinventory, setViewInventory] = useState()
  const [addinventory, setAddInventory] = useState()
  const [alertModal, setAlertModal] = useState(false);
  const [alertCarModal, setAlertcarModal] = useState(false);
  const [query, setQuery] = useState("");

  const [inventorydata, setInventoryData] = useState([])
  const [openPopup, setOpenPopup] = useState(false)
  const [loading, setLoading] = useState(false);

  const [detailsUpload, setDetailsUpload] = useState(false);
  const [offersUpload, setOffersUpload] = useState(false);
  const [featuresUpload, setFeaturesUpload] = useState(false);


  // useEffect(() => {
  //   if (loading) {
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 2000);
  //   }
  // }, [loading]);

  const ViewInventorydetails = () => {
    setViewInventory(false);
    setAddInventory(true)

  }

  const AddInventory = () => {
    setViewInventory(true)
    setAddInventory(false)
  }


  const getInventoryData = useCallback(async () => {
    try {
      await HostedApi({
        url: "/carOffer/dashboard/all-cars",
        method: "GET",
      }).then((res) => {
        setInventoryData(res.data.data)

      });
    } catch (e) {
      console.error(e);
    }
  }, []);


  useEffect(() => {
    getInventoryData();
    return () => { };
  }, []);


  console.log(inventorydata, "cardetails")

  const moveon = () => {
    setOpenPopup(true)
  }

  const addcsv = () => {

    //seteditData(data)
    setAlertModal(true)
    setDetailsUpload(false)
    setOffersUpload(false)
    setFeaturesUpload(false)
    // console.log('addcsv')
  }

  const Carcsv = () => {
    setAlertcarModal(true)
  }

  const Onclose = () => {
    setAlertModal(!alertModal)
    setDetailsUpload(false)
    setOffersUpload(false)


    setFeaturesUpload(false)
  }

  // map and show values of array first index of object

  return (
    <PageLayout>

      {loading && <Spinner />}

      <Box style={{ textAlign: "right", justifyContent: "space-between" }} >

        {/* <button={{ text: "Upload CV", onClick: {addcsv} }} /> */}
        {/* <CardHeader   button={{ text:"Add CSV", onClick: {addcsv} }} /> */}
        <div className='d-flex justify-content-between'>
          {/* <Button  onClick={moveon} text="ADD INVENTORY" href={"/add-car"} style={{width:"fit-content",height:"40px",backGroundColor:"#ff5722", border: "1px solid",color: "white",background: "#ff5722", borderRadius: "8px",margin: "10px", fontWeight:"600", padding:"14px 22px", fontSize:"13px"}}/> */}
          <CardHeader href={"/add-car"} button={{ text: "Add Inventory", onClick: { moveon } }} />
          <Button onClick={addcsv} text="ADD CSV" style={{ width: "fit-content", height: "45px", backGroundColor: "#ff5722", border: "1px solid", color: "white", background: "#ff5722", borderRadius: "8px", fontWeight: "600", padding: "14px 22px", fontSize: "13px" }} />
        </div>

        <CardLayout>
          <div
            className="col"
            style={{ display: "flex", justifyContent: "end" }}
          >
            <div className="mc-label-field-group label-col">
              <label className="mc-label-field-title">search by</label>
              <div className="input-search-field ">
                <Input
                  type="search"
                  placeholder="Car Name"
                  onChange={(e) => setQuery(e.target.value)}
                  className="border p-2 mb-2 rounded"
                />
              </div>
            </div>
          </div>

          <Inventorytable tbody={inventorydata} query={query} addcsv={addcsv} Carcsv={Carcsv} />


          <Csvmodal detailsUpload={detailsUpload} offersUpload={offersUpload} featuresUpload={featuresUpload} open={alertModal} loading={loading} onClose={Onclose} />
          <Carview open={alertCarModal} onClose={() => setAlertcarModal(!alertCarModal)} />
        </CardLayout>
      </Box>
      {/*       
          <Row>
                <Box className="mc-card">
                 <CardHeader title={ "Inventory Information" }  />
                     <Row>
                     <Col xl={4}>
                    <FloatCard
                       style={{ backgroundColor: "#e66339" }}
                       color={"#fff"}
                       variant="lg"
                      //  digit={carOffer?.privateLeaseCount + carOffer?.flexiPlanCount + carOffer?.businessLeaseCount}
                       digit={"78"}
                       title={"Total Inventory Car"}
                      icon=<Totalinventry/>
                      />
                    </Col>
                    
                    <Col xl={4}>
                      <FloatCard
                       style={{ backgroundColor: "#e66339" }}
                       color={"#fff"}
                       variant="lg"
                       digit="8"
                       title="Query Details"
                       icon=<Query/>
                      />
                    </Col>
                    <Col xl={4}>
                    <FloatCard
                       style={{ backgroundColor: "#e66339" }}
                       color={"#fff"}
                       variant="lg"
                       digit="6"
                       title="Total Banner"
                       icon=<Bannericon/>
                      />
                    </Col>
                     </Row>   
                  </Box>
                </Row> */}
      <ToastContainer />
    </PageLayout>
  )
}

export default Inventory;
import React from 'react'
import { Inventorytable } from '../../components/tables/Bin/Inventorytable';
import { Offertable } from '../../components/tables/Bin/Offertable';
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

import { FileUpload } from "../../components";
import { useEffect } from 'react';
import { Anchor, Box, Text, Input } from '../../components/elements';

import data from "../../data/master/productList.json";
import { Table, Tbody, Td, Th, Thead, Tr } from '../../components/elements/Table';



const Csvmodal = ({ open, onClose }) => {

  const [carDetailsUploaded, setCarDetailsUploaded] = useState(false);

  const [csv, setCsv] = useState({

    offers: null,

  })



  const handleOfferChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/csv") {
      setCsv({ ...csv, offers: e.target.files[0] })
    } else {
      setCsv({ ...csv, offers: null })
    }
  }




  const addcsv = async (e) => {

    e.preventDefault();
    var formData1 = new FormData();

    formData1.append('file', csv.offers)
    // console.log(csv.offers.name, "this is csv offers")

    try {
      if (csv.offers) {
        const res = await Promise.all([
          HostedApi({
            url: "/carOffer/car-offers",
            method: "POST",
            data: formData1,
          }),
        ])
        const data = res.map((res) => res.data);
        if (data) {
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
          window.location.assign("/offers")
        }
        console.log(data.flat(), "data added successfully");
      } else {
        console.log("error uploading")

      }

    } catch (err) {
      console.log(err)
      toast.error(err.response.data.message)
    }

    //    if(carDetailsUploaded && csv.offers && csv.features){

    //    if(result1.status && result2.status && result3 === 201){

    //       toast.success('successfully', {
    //       position: "top-right",
    //       autoClose: 2000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //      });
    //     }

    //    }
    //   else{
    //     alert('Please select Car details first')
    //    }
  }



  return (
    <>
      <DialogPage open={open} close={onClose} type="verified" text="Add CSV INVENTORY">
        <Row>
          <form className="row g-3 mt-5 mb-5 p-2 needs-validation">

            <Col xl={12}>

              <Box className="mc-user-avatar-upload ">
                <label className="form-label">Upload Car Offers </label>
                <FileUpload onChange={handleOfferChange} icon="cloud_upload" text="upload Car offers" />
                {/* <input icon="cloud_upload" onChange={handleOfferChange} type="file" accept=".csv, text/csv" /> */}
                {csv.offers &&
                  <div style={{ marginTop: "20px" }}>
                    {csv.offers.name}
                  </div>
                }
              </Box>

            </Col>
          </form>

          <div className="col-6">
            <button className="btn btn-primary" onClick={onClose} >Cancel</button>
          </div>

          <div className="col-6">
            <button className="btn btn-primary" type="submit" onClick={addcsv}>Add Inventory CSV</button>
          </div>

        </Row>
      </DialogPage>
      <ToastContainer />
    </>
  )

}


const DeleteOffer = ({ open, onClose, deleteOffer }) => {

  const id = deleteOffer

  const softdelete = async () => {
    try {
      await HostedApi({
        url: `/carOffer/delete-offer/${id}`,
        method: `DELETE`,
        headers: {},
      }).then((res) => {
        if (res.status === 200) {
          toast.success(' Deleted successfully', {
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
            window.location.assign("/offers")
          })

        }

      })

    } catch (err) {
      toast.error(err)
    }
  }

  return (
    <DialogPage open={open} close={onClose} type="verified" text="Are You Sure You want to delete the offer ?">
      <Row className='mx-auto pt-5'>

        <div className="col-6">
          <button className="btn btn-secondry  w-50" style={{ color: 'orangered', border: '1px solid orangered', fontWeight: 500 }} onClick={onClose} >Cancel</button>
        </div>

        <div className="col-6">
          <button className="btn btn-danger w-50 " onClick={softdelete}>Delete</button>
        </div>

      </Row>
    </DialogPage>
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
                {/* <Pagination /> */}                            </Col>
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
      <ToastContainer />
    </PageLayout>
  </DialogPage>
}

const Offers = () => {
  const button = {
    "text": "AddInventory",
    "path": "/add"
  }
  const [viewinventory, setViewInventory] = useState()
  const [addinventory, setAddInventory] = useState()
  const [alertModal, setAlertModal] = useState(false);
  const [alertCarModal, setAlertcarModal] = useState(false);

  const [alertDelete, setAlertDelete] = useState(false);
  const [query, setQuery] = useState("");

  const [inventorydata, setInventoryData] = useState([])
  const [extractedData, setExtractedData] = useState([])
  const [openPopup, setOpenPopup] = useState(false)

  const [deleteOffer, setDeleteoffer] = useState()



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
        url: "/carOffer",
        method: "GET",
      }).then((res) => {
        setInventoryData(res?.data?.filteredResult)
        setExtractedData(Updated)
      });
    } catch (e) {
      console.error(e);
    }
  }, []);


  useEffect(() => {
    getInventoryData();
    return () => { };
  }, []);


  // inventorydata?    .offers?.forEach((offer) => {
  //         // offer.leaseType = inventorydata.leaseType;
  //         // offer.term = inventorydata.term;
  //         console.log(offer, "checking offer");
  //       });

  //  inventorydata.map((offer) => (
  //      offer?.offers?.forEach((value) => {
  //       value.leaseType = offer.leaseType;
  //       value.term = offer.term;
  //       setExtractedData(value)
  //      })
  //  ))

  // const Updated = inventorydata.map((item) => (
  //    item.offers.map((offer)=> {
  //     return {
  //       ...offer,
  //       leaseType:item.leaseType,
  //       term:item.term,
  //     }

  //   })
  // ))


  const Updated = inventorydata?.reduce((accumulator, item) => {
    item.offers.forEach((offer) => {
      const updatedOffer = {
        ...offer,
        leaseType: item.leaseType,
        term: item.term,
        makeCode: item.makeCode,
        modelCode: item.modelCode
      };
      accumulator.push(updatedOffer);
    });
    return accumulator;
  }, []);

  // setExtractedData(Updated)


  // setInventoryData(inventorydata.offers)


  console.log(Updated, "caroffers")

  const moveon = () => {
    setOpenPopup(true)

  }

  const addcsv = () => {

    //seteditData(data)
    setAlertModal(true)
    // console.log('addcsv')
  }

  const Carcsv = () => {


    setAlertcarModal(true)

  }

  const verifiDelete = async (data) => {
    const id = data
    setDeleteoffer(id)
    setAlertDelete(true)

  }



  // map and show values of array first index of object

  return (
    <PageLayout>

      <Box style={{ textAlign: "right", justifyContent: "space-between" }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <CardHeader title={"Inventory Offers"} href={"/add-car"} />
          {/* <button={{ text: "Upload CV", onClick: {addcsv} }} /> */}
          {/* <CardHeader   button={{ text:"Add CSV", onClick: {addcsv} }} /> */}
          <Button onClick={addcsv} text="Add Offers CSV" style={{ width: "200px", height: "40px", backGroundColor: "#ff5722", border: "1px solid", color: "white", background: "#ff5722", borderRadius: "5px", margin: "10px" }} />

        </div>
        <CardLayout>
          {/* <div
                className="col"
                style={{ display: "flex", justifyContent: "end" }}
              >
                <div className="mc-label-field-group label-col">
                  <label className="mc-label-field-title">search by</label>
                  <div className="input-search-field">
                    <Input
                      type="search"
                      placeholder="Car Name / ID"
                      onChange={(e) => setQuery(e.target.value)}
                      className="border p-2 mb-2"
                    />
                  </div>
                </div>
              </div> */}

          <Offertable tbody={Updated} query={query} addcsv={addcsv} Carcsv={Carcsv} verifiDelete={verifiDelete} />

          <Csvmodal open={alertModal} onClose={() => setAlertModal(!alertModal)} />
          <Carview open={alertCarModal} onClose={() => setAlertcarModal(!alertCarModal)} />
          <DeleteOffer open={alertDelete} onClose={() => setAlertDelete(!alertDelete)} deleteOffer={deleteOffer} />
        </CardLayout>
      </Box>
      <ToastContainer />
    </PageLayout>

  )
}

export default Offers;
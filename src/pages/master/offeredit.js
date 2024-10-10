import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Box, Anchor, Button, Image, Input, Label, Icon, Text } from "../../components/elements";
import { LabelField, LabelTextarea } from "../../components/fields";
import { CardLayout, CardHeader } from "../../components/cards";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/productUpload.json";
import { useQuery } from "../../api/query";
import HostedApi from "../../api/axios";
import Offersingletable from '../../components/tables/Bin/Offersingletable';
import { toast, ToastContainer } from 'react-toastify'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateTime } from "luxon";
import moment from 'moment';
import Deletesvg from "../../data/svgicons/Deletesvg";


export default function Offeredit() {
    const query = useQuery();
    const id = query.get("query_id");


    const [cardetails, setCardetails] = useState({
        annualMileage: "",
        duration: "",
        monthlyCost: "",
        validFrom: "",
        validTo: "",
        calculationNo: "",
        expired: "",
    })

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState();
    // const extFeatures = singleproduct.data.features.exteriorFeatures

    // console.log(extFeatures, "huhjijkkoko")


    useEffect(() => {
        getProductById();
    }, [])


    const getProductById = async () => {
        try {
            await HostedApi({
                url: `/carOffer/single-offer/${query.get("query_id")}`,
                method: "GET",
            }).then((response) => {

                // setSingleproduct(response?.data?.data)
                console.log(response?.data?.getOfferById, "this is response")

                setCardetails({
                    annualMileage: response?.data?.getOfferById?.annualMileage,
                    duration: response?.data?.getOfferById?.duration,
                    monthlyCost: response?.data?.getOfferById?.monthlyCost,
                    validFrom: response?.data?.getOfferById?.validFrom,

                    validTo: response?.data?.getOfferById?.validTo,
                    calculationNo: response?.data?.getOfferById?.calculationNo,
                    expired: response?.data?.getOfferById?.expired,

                })


                const startDate = response?.data?.getOfferById?.validFrom
                const endDate = response?.data?.getOfferById?.validTo

                //   const finalDate = DateTime.fromISO(datadate).toISO() for POsting to API_DATA
                setStartDate(new Date(startDate))
                setEndDate(new Date(endDate))



            })
        } catch (err) {
            console.error(err)
        }
        console.log(query.get("query_id"), "Product page");
    }




    //    console.log(cardetails.annualMileage, "this is cardetails")

    // FormData appending to APi.
    //   const formData = new FormData();


    //   formData.append('annualMileage', cardetails?.annualMileage);
    //   formData.append('duration', cardetails?.duration);
    //   formData.append('monthlyCost', cardetails?.monthlyCost);
    //   formData.append('validFrom', cardetails?.validFrom);
    // //   formData.append('co2', cardetails?.cogas);
    // //   formData.append('fuelType', cardetails?.fuelType);
    //   formData.append('validTo', cardetails?.validTo);
    //   formData.append('calculationNo', cardetails?.calculationNo);
    //   formData.append('expired', cardetails?.expired)

    //   formData.append('image', cardetails?.inventoryimg)



    //   handlechange for car details
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCardetails({ ...cardetails, [name]: value });
    }


    // Function to format date using Luxon
    const formatDate = (date, format) => {
        return date ? DateTime.fromJSDate(date).toFormat(format) : null;
    };


    // handleOfferFormSubmit



    const finaldataSubmit = async (e) => {
        e.preventDefault()

        console.log(cardetails, "this is car")
        try {
            await HostedApi({
                url: `/carOffer/edit-offer/${id}`,
                method: "PUT",
                data: cardetails,

            }).then((response) => {
                if (response.status === 200) {
                    toast.success("Updated Successfully!")
                }
            })
        }
        catch (err) {
            console.log(err)
            toast.error("Oops Somthing went wrong!")
        }
    }



    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <CardHeader title="Inventory Offer Details" dotsMenu={data?.dotsMenu} />
                    </CardLayout>
                </Col>
                <Col>
                    <CardLayout>
                        <CardHeader title="Car Offers" />
                        <Row>
                            <form className="row mt-0 p-2 g-3 p-3 needs-validation" >


                                <div className="col-md-4" >
                                    <label for="validationCustom01" className="form-label">Annual Mileage</label>
                                    <input style={{ background: "white" }} type="text" className="form-control" name="annualMileage" placeholder='Enter Annual Mileage' value={cardetails.annualMileage} onChange={handleInputChange} required />

                                </div>

                                <div className="col-md-4">
                                    <label for="validationCustom01" className="form-label">Duration</label>
                                    <input style={{ background: "white" }} type="text" className="form-control" name="duration" placeholder='Enter Durations' value={cardetails.duration} onChange={handleInputChange} required />
                                </div>


                                <div className="col-md-4">
                                    <label for="validationCustom01" className="form-label">Monthly Cost</label>
                                    <input style={{ background: "white" }} type="text" className="form-control" name="monthlyCost" placeholder='Enter Monthly cost' value={cardetails.monthlyCost} onChange={handleInputChange} required />
                                </div>

                                {/* <div className="col-md-4">
                  <label for="validationCustom01" className="form-label">Start Date</label>
                  <input style={{background:"white"}} type="text" className="form-control" name="validFrom" placeholder='Enter start date' value={cardetails.validFrom} onChange={handleInputChange} required />
                 </div>  */}


                                <div className="col-md-4">
                                    <label for="validationCustom01" className="form-label">Valid From</label>
                                    <DatePicker
                                        selected={startDate}
                                        minDate={new Date()}
                                        dateFormat="dd/MM/yyyy"
                                        onChange={(date) => {
                                            setStartDate(date);
                                            // Update validFrom and validTo with the formatted date string
                                            const formattedValidFrom = formatDate(date, 'dd/MM/yy');
                                            const formattedValidTo = formatDate(endDate, 'dd/MM/yy');
                                            setCardetails({
                                                ...cardetails,
                                                validFrom: formattedValidFrom,
                                                validTo: formattedValidTo
                                            });
                                        }}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label for="validationCustom01" className="form-label">Valid To</label>
                                    <DatePicker
                                        selected={endDate}
                                        startDate={startDate}
                                        dateFormat="dd/MM/yyyy"
                                        minDate={startDate}
                                        onChange={(date) => {
                                            setEndDate(date);
                                            // Update validTo and validFrom with the formatted date string
                                            const formattedValidTo = formatDate(date, 'dd/MM/yy');
                                            const formattedValidFrom = formatDate(startDate, 'dd/MM/yy');
                                            setCardetails({
                                                ...cardetails,
                                                validTo: formattedValidTo,
                                                validFrom: formattedValidFrom
                                            });
                                        }}
                                    />
                                </div>


                                <div className="col-md-4">
                                    <label for="validationCustom01" className="form-label">Calculation No.</label>
                                    <input disabled type="number" className="form-control" name="calculation" placeholder='Enter Calculations number' value={cardetails.calculationNo} onChange={handleInputChange} required />
                                </div>

                            </form>

                        </Row>
                    </CardLayout>
                </Col>


                {/* <Col xl={12}>
                   
                       <Row>
                         
                        <div className="col-md-10 d-flex justify-content-between">
                        <label className="form-label" >Exterior features</label>
                        <input type="text" placeholder='Add Exterior Features' className="form-control w-25" name="exteriorFeatures" onChange={(e) =>setInputexterior(e.target.value) } value={inputexterior} required />
                        </div>

                       <div className="col-2 ">
                          <Anchor 
                            className="mc-btn w-100 btn btn-primary" 
                            // text="publish &amp; view" 
                            text="Add features"
                            icon="add_circle" 
                            onClick={handleSubmitexterior}
                           />
                        </div>
                    
                        <div>
                         <ul className='row d-flex'>
                            {exteriorFeatures?.map((item, index) => (
                               <li className='col-2 featurecss' key={index}>
                                {item} 
                                <button className='remove' onClick={() => handleRemoveInputexterior(index)}>x</button>
                                </li>
                             ))}
                         </ul>
                          </div>
                        
                      </Row>
                  
                </Col>
                


                  
                <Col xl={12}>
                    
                       <Row>
                         
                       <div className="col-md-10 d-flex justify-content-between">
                        <label className="form-label">Safety security features</label>
                        <input type="text" placeholder='Add Safety security Features' className="form-control w-25" name="safetySecurityFeatures" onChange={(e) => setInputSafety(e.target.value)} value={inputsafety} required />
                       </div>

                    <div className="col-2 ">
                        <Anchor 
                            className="mc-btn w-100 btn btn-primary" 
                            // text="publish &amp; view" 
                            text="Add features"
                            icon="add_circle" 
                            onClick={handleSubmitsafety}
                        />
                    </div>

                  <div>
                  <ul className='row d-flex '>
                      {safetySecurityFeatures?.map((item, index) => (
                               <li className='col-2 featurecss' key={index}>
                                {item} 
                                <button className='remove' onClick={() => handleRemoveinputsafety(index)}>x</button>
                                </li>
                             ))}
                    </ul>
                  </div>
                        
                      </Row>
                   
                </Col> */}

                {/* Features categories */}



                <Col xl={12}>
                    <CardLayout>

                        <Anchor
                            className="mc-btn w-100 primary mt-5"
                            text="publish &amp; view"
                            icon="cloud_upload"
                            href="#"
                            onClick={finaldataSubmit}
                        />
                    </CardLayout>
                </Col>
            </Row>
            <ToastContainer />
        </PageLayout>

    )
}
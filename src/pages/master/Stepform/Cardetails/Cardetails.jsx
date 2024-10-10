import React, { useState, useCallback, useEffect } from 'react'
import './Cardetails.css'
import PageLayout from '../../../../layouts/PageLayout'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import { toast, ToastContainer } from "react-toastify";
import HostedApi from '../../../../api/axios';
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { Box, Icon, Anchor, Button } from "../../../../components/elements";
import { FileUploadDetails } from '../../../../components/FileUpload.js';

const Cardetails = ({ onButtonClick, allData }) => {

    const [carbrand, setCarbrand] = useState()
    const [carseriesall, setCarseriesall] = useState()



    const [inventorydata, setInventoryData] = useState({
        door: allData?.inventorydata?.door,
        bodytype: allData?.inventorydata?.bodytype,
        seat: allData?.inventorydata?.seat,
        gears: allData?.inventorydata?.gears,
        fuelType: allData?.inventorydata?.fuelType,
        transmission: allData?.inventorydata?.transmission,
        tankCapacity: allData?.inventorydata?.tankCapacity,
        yearModel: allData?.inventorydata?.yearModel,
        cogas: allData?.inventorydata?.cogas,
        description: allData?.inventorydata?.description,
        carnameinventory: allData?.inventorydata?.carnameinventory,
        carseriesinventory: allData?.inventorydata?.carseriesinventory,
        acceleration: allData?.inventorydata?.acceleration,
        inventoryimg: [allData?.inventorydata?.inventoryimg]
    })

    const carbrandname = inventorydata?.carnameinventory;

    useEffect(() => {
        getCarbrand();
    }, [])


    useEffect(() => {
        getCarSeries();
    }, [carbrandname])




    const getCarbrand = async () => {
        try {
            await HostedApi({
                url: "/carbrand",
                method: "GET",
            }).then((res) => {
                setCarbrand(res?.data)
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    const getCarSeries = useCallback(async () => {
        try {
            await HostedApi({
                url: `/carseries/carbrand/${carbrandname}`,
                method: "GET",
            }).then((res) => {
                console.log(res.data, "data----")
                setCarseriesall(res?.data?.data)
            })
        }
        catch (err) {
            console.log(err)
        }
    })

    const Inventoryimage = (e) => {

        let allimages = []

        // for(let i = 0; i < 6; i++){
        //     console.log(e.target.files[i], "ths is image")
        //     if(e.target.files[i] === undefined){
        //         const newselectImages = window.URL.createObjectURL(e.target.files[i])

        //         allimages.push(newselectImages) 
        //     }



        //      console.log(e.target.files[i], "ths is image")


        //         setInventoryData({
        //             ...inventorydata,
        //             inventoryimg:allimages
        //         })    
        // }

        const files = Array.from(e.target.files)
        setInventoryData({
            ...inventorydata,
            inventoryimg: files
        })
    }


    console.log(inventorydata.inventoryimg, "img-------------")


    const removeSelectedImg = (index) => {

        const remainImages = [...inventorydata.inventoryimg];
        remainImages.splice(index, 1);
        setInventoryData({
            inventoryimg: remainImages
        })
        console.log(index)
    }

    // console.log(carbrandname, "carbrandnjnjnjn")

    const handleInventoryChange = (e) => {

        let value = e.target.value;
        let name = e.target.name;
        setInventoryData((prevalue) => {
            return {
                inventoryimg: Inventoryimage,
                ...prevalue,   // Spread Operator               
                [name]: value
            }
        })

        console.log(inventorydata, "checking data")
    }

    const validateStep1 = () => {
        if (
            inventorydata.carnameinventory === undefined ||
            inventorydata.carseriesinventory === undefined ||
            inventorydata.door === undefined ||
            inventorydata.bodytype === undefined ||
            inventorydata.seat === undefined ||
            inventorydata.gears === undefined ||
            inventorydata.fuelType === undefined ||
            inventorydata.transmission === undefined ||
            inventorydata.yearModel === undefined ||
            inventorydata.cogas === undefined ||
            inventorydata.description === undefined ||
            inventorydata.acceleration === undefined

        ) {
            // alert('Please fill in all required fields.');
            // toast.error('Please Enter All Fields');
            return false;
        }

        return true;
    }


    const handleNext = () => {

        if (validateStep1()) {
            onButtonClick({ inventorydata });
        }
    };


    return (
        <>

            <CardHeader title={"Add Inventory"} />
            <Row>
                <form className="row mt-0 p-2 g-3 p-3 needs-validation" onSubmit={() => handleNext(2)} >

                    <div className="col-md-4">
                        <label for="validationCustom01" className="form-label">Car Brand Name</label>
                        <select className="form-select" id="validationCustom01" name="carnameinventory" onChange={handleInventoryChange} value={inventorydata.carnameinventory} required >
                            <option selected disabled value="">Choose...</option>
                            {
                                carbrand?.map((item) => (
                                    <>
                                        <option key={item?._id} name={item?.companyName} value={item?._id}> {item?.companyName}</option>
                                    </>
                                ))
                            }
                        </select>

                    </div>
                    <div className="col-md-4">
                        <label for="validationCustom02" className="form-label">Car Series Name</label>
                        <select className="form-select" id="validationCustom02" name="carseriesinventory" onChange={handleInventoryChange} value={inventorydata.carseriesinventory} required >
                            <option selected disabled value="">Choose...</option>
                            {
                                carseriesall?.map((item) => (
                                    <>
                                        <option key={item?._id} name={item?.seriesName} value={item?._id}>{item?.seriesName}</option>
                                    </>
                                ))
                            }
                        </select>

                    </div>

                    <div className="col-md-4">
                        <label for="validationCustom04" className="form-label" >Body Type</label>
                        <select className="form-select" id="validationCustom04" name='bodytype' onChange={handleInventoryChange} value={inventorydata.bodytype} required>
                            <option selected disabled value="">Choose...</option>
                            <option name="city-car" value="city-car">City-car</option>
                            <option name="coupe" value="coupe">Coupe</option>
                            <option name="estate" value="estate">estate</option>
                            <option name="sedan" value="sedan">sedan</option>
                            <option name="hatchback" value="hatchback">hatchback</option>
                            <option name="mpv" value="mpv">mpv</option>
                            <option name="saloon" value="saloon">saloon</option>
                            <option name="sports" value="sports">sports</option>
                        </select>
                    </div>

                    <div className="col-md-4">
                        <label for="validationCustom05" className="form-label">Fuel Type</label>
                        <select className="form-select" id="validationCustom05" onChange={handleInventoryChange} name='fuelType' value={inventorydata.fuelType} required>
                            <option selected disabled value="">Choose...</option>
                            <option name="petrol" value="petrol">Petrol</option>
                            <option name="electric" value="electric">Electric</option>
                            <option name="hybrid" value="hybrid">Hybrid</option>
                            <option name="diesel" value="diesel">Diesel</option>
                        </select>

                    </div>

                    <div className="col-md-4">
                        <label for="validationCustom06" className="form-label">Seat No</label>
                        <input type="number" id="validationCustom06" className="form-control" placeholder='Enter Seat No' name="seat" onChange={handleInventoryChange} value={inventorydata.seat}
                            onKeyDown={(e) => {
                                if (e.key === '-' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                                    e.preventDefault();
                                }
                            }}
                            pattern="[0-9]+" min="0" required />

                    </div>

                    <div className="col-md-4">
                        <label for="validationCustom07" className="form-label">Co2</label>
                        <input type="text" id="validationCustom07" className="form-control" placeholder='Enter Co2' name="cogas" onChange={handleInventoryChange} value={inventorydata.cogas} required />

                    </div>

                    <div className="col-md-4">
                        <label for="validationCustom01" className="form-label">Door</label>
                        <input type="number" className="form-control" name="door" placeholder='Enter Door' onChange={handleInventoryChange}
                            onKeyDown={(e) => {
                                if (e.key === '-' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                                    e.preventDefault();
                                }
                            }}
                            value={inventorydata.door} required />

                    </div>

                    <div className="col-md-4">
                        <label for="validationCustom01" className="form-label">Acceleration</label>
                        <input type="text" className="form-control" name="acceleration" placeholder='Enter Accelerations' onChange={handleInventoryChange} value={inventorydata.acceleration || ''} required />
                    </div>

                    <div className="col-md-4">
                        <label for="validationCustom01" className="form-label">Tank Capacity</label>
                        <input type="text" className="form-control" name="tankCapacity" placeholder='Enter Tank Capacity' onChange={handleInventoryChange} value={inventorydata.tankCapacity || ''} required />

                    </div>


                    <div className="col-md-4">
                        <label for="validationCustom01" className="form-label">Gears</label>
                        <input type="text" className="form-control" name="gears" placeholder='Enter Gears' onChange={handleInventoryChange}

                            value={inventorydata.gears || ''} required />

                    </div>

                    <div className="col-md-4">
                        <label for="validationCustom01" className="form-label">Year Model</label>
                        <input type="number" className="form-control" name="yearModel" placeholder='Enter Year Model' onChange={handleInventoryChange}
                            onKeyDown={(e) => {
                                if (e.key === '-' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                                    e.preventDefault();
                                }
                            }}
                            value={inventorydata.yearModel || ''} required />

                    </div>


                    {/* <div className="col-md-6">
                        <label for="validationCustom02" className="form-label">Mileage</label>
                        <input type="number" className="form-control" name="mileage" onChange={handleInventoryChange} value={inventorydata.mileage} required />

                    </div> */}

                    <div className="col-md-4">
                        <label for="validationCustom04" className="form-label" >Transmission</label>
                        <select className="form-select" name='transmission' onChange={handleInventoryChange} value={inventorydata.transmission || ''} required>
                            <option selected disabled value="">Choose...</option>
                            <option name="automatic" value="automatic">automatic</option>
                            <option name="manual" value="manual">manual</option>
                        </select>

                    </div>

                    <div className="col-md-4">
                        <label for="validationCustom02" className="form-label">Description</label>
                        <textarea type="text" placeholder='Enter Description' className="form-control" name="description" onChange={handleInventoryChange} value={inventorydata.description || ''} required />
                    </div>

                    <Col xl={12} >
                        <Box className="mc-user-avatar-upload mb-2 ">
                            <label className="form-label">Image Upload</label>
                            <div className="mb-2">
                                {/* <FileUploadDetails onChange={Inventoryimage}  icon="cloud_upload" text="upload" /> */}

                                <input icon="cloud_upload" className='file:text-neutral-100 file:bg-sky-500/100 ' onChange={Inventoryimage} type='file' multiple="multiple" accept="image/*" />

                            </div>



                            {/* {bannerdata.image &&
                        <div style={{marginTop:"20px"}}> 
                        <img width={100}  src={URL.createObjectURL(bannerdata.image)}/>
                       </div>  
                          }  */}
                        </Box>
                    </Col>

                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 d-flex p-2">


                        {/* {inventorydata?.inventoryimg?.map((file, index) => {
                            return (
                                <div key={index} className="p-2 ">
                                    {file === undefined ? '' : <button onClick={() => removeSelectedImg(index)} className=" btn-close mc-btn.red  " type="button" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>}
                                      
                                    <span className="Filename">
                                      <img width={100} src={file}  alt={file?.name} />
                                      {file?.name}
                                    </span>
                                </div>
                            )
                         })} */}

                    </div>

                    <div className="col-2 rightside">
                        {/* <button className="btn btn-primary" type="submit">Publish Now</button> */}
                        <button
                            className="mc-btn w-100 btn btn-primary "
                            icon="navigate_next"
                            onClick={() => handleNext(2)}
                        > Next </button>
                    </div>
                </form>
            </Row>
            <ToastContainer />

        </>
    )
}

export default Cardetails

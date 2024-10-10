
// import React, { useEffect, useState } from "react";
// import { Row, Col, Tab, Tabs, Form } from "react-bootstrap";
 //import { Box, Button, Image, Anchor } from "../../../components/elements";
// import { CardLayout, TabCard } from "../../../components/cards";
// import { Breadcrumb, FileUpload } from "../../../components";
// import PageLayout from "../../../layouts/PageLayout";


import { useCallback, useEffect, useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import HostedApi from "../../api/axios";
import { Breadcrumb, DivideTitle } from "../../components";
import { CardLayout, TabCard } from "../../components/cards";
import { Box,Anchor, Button } from "../../components/elements";
import PageLayout from "../../layouts/PageLayout";
import { uploadImage } from "../../api/ImageUploader";
import {  FileUpload } from "../../components";
import {  CardHeader } from '../../components/cards';
import {AddInventory} from "./addInventory";
import Multistepprogress from "./Stepform/MultistepProgressBar/Multistepprogress";
import Cardetails from "./Stepform/Cardetails/Cardetails";
import Carfeatures from "./Stepform/Carfeatures/Carfeatures";
import Carfeaturesnew from "./Stepform/Carfeaturesnew/Carfeaturesnew";
import Caroffer from "./Stepform/Caroffers/Caroffers";
import { Divider } from "@mui/material";



export const Addcarbrand = () => {

    const [leaseData, setLeaseData] = useState(null)
    const [carbrand, setCarbrand] = useState(null)
    const [carseriesall, setCarseriesall] = useState(null)
    const [showCarform, setShowCarform] = useState(false)
    const [images, setImages] = useState([]);
    const [selectModel, setSelectedModel] = useState("")
    const [selectseries, setSelectedseries] = useState("")

    const [allData, setAllData] = useState({});

   
    const [bannerdata, setBannerData] = useState({
        leasetype:"",
        carbrand:""
    })

    const [cardetail, setCarDetail] = useState({
        carname:"",
        carseries:""

    })
    
    const [page, setPage] = useState(1);

    const [inventorydata, setInventoryData] = useState({
        door: "",
        bodytype: "",
        seat: "",
        mileage: "",
        gears:"",
        fuelType: "",
        price: "",
        transmission: "",
        description: "",
        category: "",
        carnameinventory: "",
        carseriesinventory:"",
        cogas:"",
        miliesgallen:"",
        acceleration:"",
        inventoryimg:[]
        
    })

    const carOffersData = [];
    const carFeaturesData = [];


    const formData = new FormData();


    // calling multiple api in getserversideprops in next js

        formData.append('carSeries_id', allData?.inventorydata?.carseriesinventory);
        formData.append('carBrand_id', allData?.inventorydata?.carnameinventory);
        formData.append('description', allData?.inventorydata?.description);
        formData.append('bodyType', allData?.inventorydata?.bodytype);
        formData.append('yearModel', allData?.inventorydata?.yearModel);
        formData.append('door', allData?.inventorydata?.door);
        formData.append('seat', allData?.inventorydata?.seat);
        formData.append('co2', allData?.inventorydata?.cogas);
        formData.append('fuelType', allData?.inventorydata?.fuelType);
        formData.append('acceleration', allData?.inventorydata?.acceleration);
        formData.append('tankCapacity', allData?.inventorydata?.tankCapacity);
        formData.append('gears', allData?.inventorydata?.gears);
        formData.append('transmission', allData?.inventorydata?.transmission)
      
        
        const image = [];

        for (let i = 0; i < allData?.inventorydata?.inventoryimg.length; i++) {
          image.push({
          imageUrl: allData?.inventorydata?.inventoryimg[i],
         });
        }

        for (let i = 0; i < image.length; i++) {
            formData.append('image', image[i].imageUrl);
        }
     
        
        // formData.append('image', allData?.inventorydata?.inventoryimg)

    //    console.log(allData?.categories, "check check chek")

// Iterate over the categories array and append values dynamically
    allData?.categories?.forEach((category, index) => {
        
        formData.append(`categories[${index}][categoryCode]`, category?.code);
        formData.append(
      `categories[${index}][categoryDescription]`,
      category?.description
    );
  
    allData.categories[index].features.forEach((features, featureIndex) => {
        formData.append(
        `categories[${index}][features][${featureIndex}]`,
        features
      );
    
    });

    carFeaturesData.push({
        
        // carSeries_id: carSeriesId,
        // carBrand_id: carBrandId,
        categories:category,
    })

  });

//   Appending the offer data

allData?.car_offers?.carOffers?.forEach((carOffer, index) => {
    
    formData.append(`carOffersData[${index}][leaseType]`, carOffer.leaseType);
    formData.append(`carOffersData[${index}][term]`, carOffer.termtype);
  
    carOffer.offers.forEach((offer, offerIndex) => {
        formData.append(
        `carOffersData[${index}][offers][${offerIndex}][duration]`,
        offer.duration
      );
      formData.append(
        `carOffersData[${index}][offers][${offerIndex}][annualMileage]`,
        offer.annualMileage
      );
      formData.append(
        `carOffersData[${index}][offers][${offerIndex}][monthlyCost]`,
        offer.monthlyCost
      );
      formData.append(
        `carOffersData[${index}][offers][${offerIndex}][calculationNo]`,
        offer.calculationNo
      );
      formData.append(
        `carOffersData[${index}][offers][${offerIndex}][validFrom]`,
        offer.validFrom
      );
      formData.append(
        `carOffersData[${index}][offers][${offerIndex}][validTo]`,
        offer.validTo
      );

    });

    carOffersData.push({
        // carBrand_id: carBrandId,
        // carSeries_id: carSeriesId,
        leaseType: carOffer.leaseType,
        term: carOffer.termtype,
        offers: carOffer.offers,
      });
  });

  console.log(carOffersData, "check   ---------------------")
  console.log(carFeaturesData, "jjjjjjjjjjjj-----------")

   

     // Assign carBrand_id and carSeries_id from the car details section
  
      

// Getting the leasetype data val

 

  const getleaseData = useCallback( async() => {
    try{
        await HostedApi({
              url: "/leasetype",
              method: "GET",
          },).then((res) => {
            setLeaseData(res.data)
       })
     }catch(err){
      console.log(err)
     }
  })

//   Getting the carbrand

  const getCarbrand = useCallback( async() => {
    try{
        await HostedApi({
            url:"/carbrand",
            method:"GET",
        }).then((res) => {
           setCarbrand(res.data)
        })
    }
    catch(err){
        console.log(err)
    }
  })


  const getCarSeries = useCallback( async() => {
    try{
        await HostedApi({
            url:"/carseries",
            method:"GET",
        }).then((res) => {
            setCarseriesall(res.data)
        })
    }
    catch(err){
        console.log(err)
    }
  })

  console.log(carseriesall, "this is car series")

   useEffect( () => {
    getleaseData();
    getCarbrand();
    getCarSeries();
   }, [])

   console.log(carbrand, "carbrand---")

   const finalData = {
    leaseType_id:bannerdata.leasetype,
    companyName:bannerdata.carbrand
   }


   const carSeriesData = {
    carBrand_id:cardetail.carname,
    seriesName:cardetail.carseries
   }




// Showing the form for adding the car brand & leasetype

const Showform = () =>{
     setShowCarform(true)
}


// Handling images in array
 
const Inventoryimg = (e) => {
    console.log(e.target.files, "this is an image folder")

    let allimages = []

    for(let i = 0; i < 6; i++){
        const newselectImages = URL.createObjectURL(e.target.files[i])
        allimages.push(newselectImages)
    }

  

    if(allimages.length > 0){
        setInventoryData({
            ...inventorydata,
            inventoryimg:allimages
        })
    }
}

console.log(inventorydata.inventoryimg , "inventory")

const removeSelectedImg = (index) => {

 const remainImages = [...inventorydata.inventoryimg];
 remainImages.splice(index, 1);
 setInventoryData({
    inventoryimg:remainImages
 })

console.log(index)

} 






//  const addCarBrand = async (e) => {
//         e.preventDefault();
//         console.log(bannerdata, "iiiiiiiii")
        
//         try {
//             await HostedApi({
//                 url: "/carbrand/add-carbrand",
//                 method: "POST",
//                 data: finalData,
//                 headers: { 'Content-Type': 'multipart/form-data' }
//             },).then((res) => {
//                 toast.success('Banner Upload successfully', {
//                     position: "top-right",
//                     autoClose: 2000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "light",
//                 });
//                 setTimeout(() => {
//                     window.location.assign("/banner")

//                 }, 1000);
//             });
//             console.log(bannerdata, "value------------------")
//         } catch (e) {
//             console.log(e)
//         }
//     }


//   const Inventrydata = async(e) => {
//        e.preventDefault()
//       try{
//           await HostedApi({
//             url: "/cardetails/add",
//             method: "POST",
//             data: formData,
//             headers: { 'Content-Type': 'multipart/form-data' }
//           }).then((response) => {
//             toast.success('Inventory Uploaded successfully', {
//                 position: "top-right",
//                 autoClose: 2000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
//             });
//             setTimeout(() => {
//                 window.location.assign("/inventory")

//             }, 1000);
//           })
//        }catch(err){
//            console.error(err);
//        }
//   }

  console.log(allData, "iiiiiiiii")

//Define an array state to store the uploaded images
const [uploadedImages, setUploadedImages] = useState([]);


//Function to upload multiple images
// const uploadMultipleImages = (files) => {
//     //Loop through the files and push them into the uploadedImages array state 
//     files.forEach(file => {
//         setUploadedImages([...uploadedImages, file]); 
//     }); 

//     //Return the uploaded images array state 
//     return uploadedImages; 
// }


// Adding series
//  const addSeries = async(e) => {
//         e.preventDefault();
//         // try{
//         //   await HostedApi({
//         //     url:"/carseries/add-carseries"
//         //   })
//         // } catch(err){
//         //     console.log(err)
//         // }

//         try{
//           await HostedApi({
//             url:"/carseries/add-carseries",
//             method:"POST",
//             data:carSeriesData,
//             headers:{"Content-Type": "application/json"}
//           }).then((res) => {
//             toast.success('Car Series Updated', {
//                 position: "top-right",
//                 autoClose: 2000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
//             })
//           })
          
//         }
//         catch(err){
//            console.log(err)
//         }
//        console.log(cardetail)
// }


//  const handleChange = (e) => {

//         const { name, value } = e.target;

//         // setBannerData((prevalue) => {
//         //     return {
//         //         ...prevalue, // Spread Operator              
//         //         [name]: value,
//         //         //leasetype:bannerdata.leasetype
//         //     }
//         // })

//         setBannerData({...bannerdata, [name]: value })
//     }

// const handleChangeforseries = (e) => {
//         const {name, value} = e.target;
//         setCarDetail({...cardetail, [name]: value})
//     }

// Handlechangefor Inventory
// const handleInventoryChange = (e) => {
//         let value = e.target.value;
//         let name = e.target.name;

//         setInventoryData((prevalue) => {
//             return {
             
//                 ...Inventoryimg,
//                 ...prevalue,   // Spread Operator               
//                 [name]: value
//             }
//         })

//     }



    console.log(bannerdata, "jijijijjkkf")

    console.log(leaseData, "leaseData")



    const nextPage = (data) => {
        setAllData((prevData) => ({
            ...prevData,
            ...data
          }));

      
      setPage((prevPage) => prevPage + 1);
     
    };

    const lastPage = (data) => {
        setAllData((prevData) => ({
            ...prevData,
            ...data
          }));
    }


    const handleBack = (data) => {
        setAllData((prevData) => ({
            ...prevData,
            ...data
          }));

       setPage((prevPage) => prevPage - 1);
    }
  
    const nextPageNumber = (pageNumber) => {
      switch (pageNumber) {
        case "1":
          setPage(1);
          break;
        case "2":
          setPage(2);   
          break;
        case "3":
          setPage(3);
          break;
        case "4":
          alert("Ooops! Seems like you did not fill the form.");
          break;
        default:
          setPage(1);
      }
    };

    console.log(allData, "This is a outside Data form");

    const handleSubmit = async(e) => {
        // Handle form submission with all the data in formData object
        console.log(allData, "This is a form Data");
       
     
        try{
           await HostedApi({
              url: "/cardetails/add",
              method: "POST",
              data: formData,
              headers:{'Content-Type': 'multipart/form-data'}
           }).then((response) => {
                if(response.status === 200){
                        toast.success('Car Inventory Added Successfully')
                }
           })
        }catch(err){
           console.log(err)
           toast.error(err.response.data.msg)
        }
      
      };
    

    return (
        <PageLayout>

           <div className='d-flex justify-content-between'>
                       {/* <Button  onClick={moveon} text="ADD INVENTORY" href={"/add-car"} style={{width:"fit-content",height:"40px",backGroundColor:"#ff5722", border: "1px solid",color: "white",background: "#ff5722", borderRadius: "8px",margin: "10px", fontWeight:"600", padding:"14px 22px", fontSize:"13px"}}/> */}
                       <CardHeader  title={"Add Inventory"} />
                       <CardHeader href={"/inventory"} button={{ text: "Add by CSV"}} style={{width:"fit-content",height:"45px",backGroundColor:"#ff5722", border: "1px solid",color: "white",background: "#ff5722", borderRadius: "8px", fontWeight:"600", padding:"14px 22px", fontSize:"13px"}}/>
             </div>


            <Multistepprogress page={page} onPageNumberClick={"nextPageNumber"} />
  
  {
        {
          1: <Cardetails onButtonClick={nextPage}  allData={allData}/>,
          2: <Carfeaturesnew onButtonClick={nextPage} handleBack={handleBack}  allData={allData} setAllData={setAllData}/>,
          3: <Caroffer onSubmit={handleSubmit} onLastpage={lastPage} handleBack={handleBack} allData={allData}/>,
        
        }[page]
      }
            {/* {
                showCarform && (
                    <>
                 
                    <Row className="">
                <form className="row g-3 mt-0 p-2 mb-5  needs-validation">
                    <div className="col-md-4">
                        <label className="form-label">Choose Lease Type</label>
                        <select className="form-select"  name="leasetype" onChange={handleChange} value={bannerdata.leasetype} required>
                       {
                        leaseData?.map((item) => (
                              <>
                              <option key={item?._id} name={item?.leaseType}  value={item?._id}>{item?.leaseType}</option>
                              </>
                            ))
                        }

                        </select>

                    </div>

                    <div className="col-md-4">
                        <label className="form-label">car brand</label>
                        <input type="text" className="form-control" name="carbrand" onChange={handleChange} value={bannerdata.carbrand} required />

                    </div>

                    <div className="col-4 mt-5">
                        <button className="btn btn-primary" type="submit" onClick={addCarBrand}>Add Car Brand</button>
                    </div>
                </form>
            </Row>
                    </>
                )
            } */}
         {/* <CardHeader title={"Add Car Series"}  />
            <Row > 
                <form className="row g-3 mt-0 mb-5 p-2 needs-validation">
                    <div className="col-md-4">
                        <label className="form-label">Choose Car Brand</label>
                        <select className="form-select"  name="carname" onChange={handleChangeforseries} value={cardetail.carname} required>
                       {
                        carbrand?.map((item) => (
                              <>
                              <option key={item?._id} name={item?.companyName}  value={item?._id}>{item?.companyName}</option>
                              </>
                            ))
                        }

                        </select>

                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Car series</label>
                        <input type="text" className="form-control" name="carseries" onChange={handleChangeforseries} value={cardetail.carseries} required />

                    </div>

                    <div className="col-4 mt-5">
                        <button className="btn btn-primary" type="submit" onClick={addSeries}>Add Car Series</button>
                    </div>
                </form>
            </Row> */}

            {/* <CardHeader title={"Add Inventory"}  />
            <Row>
                <form className="row mt-0 p-2 g-3 p-3 needs-validation" >
                    <div className="col-md-4">
                        <label for="validationCustom04" className="form-label">Lease Type</label>
                        <select className="form-select" name='category' onChange={handleInventoryChange} value={inventorydata.category} required>
                        {
                        leaseData?.map((item) => (
                              <>
                              <option key={item?._id} name={item?.leaseType}  value={item?._id}>{item?.leaseType}</option>
                              </>
                            ))
                        }
                        </select>

                    </div>

                    <div className="col-md-4">
                        <label for="validationCustom01" className="form-label">Car Brand Name</label>
                        <select className="form-select" name="carnameinventory" onChange={handleInventoryChange} value={inventorydata.carnameinventory} required >
                        {
                            carbrand?.map((item) => (
                              <>
                              <option key={item?._id} name={item?.companyName}  value={item?._id}>{item?.companyName}</option>
                              </>
                            ))
                        }

                        </select>
                      

                    </div>
                    <div className="col-md-4">
                        <label for="validationCustom02" className="form-label">Car Series Name</label>
                        <select className="form-select" name="carseriesinventory" onChange={handleInventoryChange} value={inventorydata.carseriesinventory} required >
                           {
                            carseriesall?.map((item) => (
                              <>
                              <option key={item?._id} name={item?.seriesName}  value={item?._id}>{item?.seriesName}</option>
                              </>
                            ))
                           }
                        </select>
                       
                    </div>

                    <div className="col-md-4">
                        <label for="validationCustom01" className="form-label">Car Price</label>
                        <input type="text" className="form-control" name="price" onChange={handleInventoryChange} value={inventorydata.price} required />

                    </div>

                    <div className="col-md-4">
                        <label for="validationCustom04" className="form-label" >Body Type</label>
                        <select className="form-select" name='bodytype' onChange={handleInventoryChange} value={inventorydata.bodytype} required>
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
                        <label for="validationCustom04" className="form-label">Fuel Type</label>
                        <select className="form-select" onChange={handleInventoryChange} name='fuelType' value={inventorydata.fuelType} required>
                            <option selected disabled value="">Choose...</option>
                            <option name="petrol" value="petrol">Petrol</option>
                            <option name="electric" value="electric">Electric</option>
                            <option name="hybrid" value="hybrid">Hybrid</option>
                            <option name="diesel" value="diesel">Diesel</option>
                        </select>

                    </div>

                    <div className="col-md-4">
                        <label for="validationCustom02" className="form-label">Seat No.</label>
                        <input type="number" className="form-control" name="seat" onChange={handleInventoryChange} value={inventorydata.seat} required />

                    </div>

                    <div className="col-md-4">
                        <label for="validationCustom01" className="form-label">Co2</label>
                        <input type="text" className="form-control" name="cogas" onChange={handleInventoryChange} value={inventorydata.cogas} required />

                    </div>

                    <div className="col-md-4">
                        <label for="validationCustom01" className="form-label">Miles/Gallon</label>
                        <input type="text" className="form-control" name="miliesgallen" onChange={handleInventoryChange} value={inventorydata.miliesgallen} required />

                    </div>
                    <div className="col-md-4">
                        <label for="validationCustom01" className="form-label">Door</label>
                        <input type="number" className="form-control" name="door" onChange={handleInventoryChange} value={inventorydata.door} required />

                    </div>

                 

                    <div className="col-md-4">
                        <label for="validationCustom01" className="form-label">Acceleration</label>
                        <input type="text" className="form-control" name="acceleration" onChange={handleInventoryChange} value={inventorydata.acceleration} required />

                    </div>

                    <div className="col-md-4">
                        <label for="validationCustom01" className="form-label">Gears</label>
                        <input type="text" className="form-control" name="gears" onChange={handleInventoryChange} value={inventorydata.gears} required />

                    </div>

             
                    <div className="col-md-6">
                        <label for="validationCustom02" className="form-label">Mileage</label>
                        <input type="number" className="form-control" name="mileage" onChange={handleInventoryChange} value={inventorydata.mileage} required />

                    </div>

                    <div className="col-md-6">
                        <label for="validationCustom04" className="form-label" >Transmission</label>
                        <select className="form-select" name='transmission' onChange={handleInventoryChange} value={inventorydata.transmission} required>
                            <option selected disabled value="">Choose...</option>
                            <option name="automatic" value="automatic">automatic</option>
                            <option name="manual" value="manual">manual</option>
                        </select>

                    </div>

                    <div className="col-md-6">
                        <label for="validationCustom02" className="form-label">Description</label>
                        <textarea type="text" className="form-control" name="description" onChange={handleInventoryChange} value={inventorydata.description} required />
                    </div>

                    <Col xl={12} >
                      <Box className="mc-user-avatar-upload mb-2 ">
                      <label className="form-label">Image Upload</label>
                       <div className="mb-2">
                       <FileUpload onChange={Inventoryimg}  icon="cloud_upload" text="upload" />
                       </div>
                        {bannerdata.image &&
                
                        <div style={{marginTop:"20px"}}> 
                     
                        <img width={100}  src={URL.createObjectURL(bannerdata.image)}/>
                       </div>  
                          } 
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 d-flex p-2">
                          {inventorydata.inventoryimg.map((file, index) => {
                            return (
                          
                                <div key={index} className="p-2">
                                      <button onClick={() => removeSelectedImg(index)} className=" btn-close mc-btn.red  " type="button" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    <span className="Filename">
                                      <img width={100} src={file?.name}  alt={file?.name} />
                                      {file?.name}
                                    
                                    </span>
                                   
                                </div>
                            )
                        })}
                        </div>
                      </Box>
                    </Col>

                    <div className="col-12">
                        <button className="btn btn-primary" type="submit">Publish Now</button>
                        <Anchor 
                            className="mc-btn w-100 btn btn-primary mt-5" 
                            text="publish &amp; view" 
                            icon="cloud_upload" 
                            onClick={Inventrydata}
                        />
                    </div>
                </form>
            </Row> */}

            {/* <AddInventory/> */}
            <ToastContainer />
        </PageLayout>
    )
}
                    

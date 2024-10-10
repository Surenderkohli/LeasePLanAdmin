import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Box, Anchor, Button, Image, Input, Label, Icon, Text, Item } from "../../components/elements";
import { LabelField, LabelTextarea } from "../../components/fields";
import { CardLayout, CardHeader } from "../../components/cards";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/productUpload.json";
import { useQuery } from "../../api/query";
import HostedApi from "../../api/axios";
import Offersingletable from '../../components/tables/Bin/Offersingletable';
import { toast, ToastContainer } from 'react-toastify'
import Deletesvg from "../../data/svgicons/Deletesvg";
import DatePicker from "react-datepicker";
import { DateTime } from "luxon";




export default function ProductUpload() {
    const query = useQuery();
    const id = query.get("query_id");


    const [singleproduct, setSingleproduct] = useState([]);
    const [exteriorFeatures, setExteriorFeatures] = useState([])
    const [interiorFeatures, setInteriorFeatures] = useState([])
    const [safetySecurityFeatures, setSafetySecurityFeatures] = useState([])
    const [comfortConvenienceFeatures, setComfortConvenienceFeatures] = useState([])
    const [audioEntertainmentFeatures, setAudioEntertainmentFeatures] = useState([])

    const [inventorydata, setInventorydata] = useState([])
    const [offerData, setOfferData] = useState("" || null)

    // features
    const [categories, setCategories] = useState([]);
    const [categoryCode, setCategoryCode] = useState();
    const [categoryDescription, setCategoryDescription] = useState();
    const [featureDescription, setFeatureDescription] = useState();
    const [tempFeatures, setTempFeatures] = useState([]);


    const [updatecategoryCode, setUpdateCategoryCode] = useState();
    const [updatecategoryDescription, setUpdateCategoryDescription] = useState();
    const [updatefeatureDescription, setUpdateFeatureDescription] = useState();



    const [inputexterior, setInputexterior] = useState("");
    const [inputinterior, setInputinterior] = useState("");
    const [inputsafety, setInputSafety] = useState("");
    const [inputcomfort, setInputcomfort] = useState("");
    const [inputaudio, setInputaudio] = useState("");

    const [uploadFile, setUploadFile] = useState([]);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState();
    const [cardetails, setCardetails] = useState({
        acceleration: "",
        bodyType: "",
        carBrand_id: "",
        carSeries_id: "",
        co2: "",
        door: "",
        seat: "",
        fuelType: "",
        gears: "",
        tankCapacity: "",
        transmission: "",
        yearModel: "",
        description: "",
        makeCode: "",
        modalCode: ""
    })
    // const extFeatures = singleproduct.data.features.exteriorFeatures

    // console.log(extFeatures, "huhjijkkoko")


    useEffect(() => {
        getProductById();
    }, [])


    const getProductById = async () => {
        try {
            await HostedApi({
                url: `/carOffer/dashboard/fetch-single/${query.get("query_id")}`,
                method: "GET",
            }).then((response) => {

                setSingleproduct(response?.data?.data)


                setCardetails({
                    acceleration: response.data?.data?.carDetails?.acceleration,
                    bodyType: response.data?.data?.carDetails?.bodyType,
                    carBrand_id: response.data?.data?.carOffer?.carBrand_id.companyName,
                    carSeries_id: response.data?.data?.carOffer?.carSeries_id.seriesName,

                    door: response.data?.data?.carDetails?.door,
                    seat: response.data?.data?.carDetails?.seat,
                    fuelType: response.data?.data?.carDetails?.fuelType,
                    gears: response.data?.data?.carDetails?.gears,

                    tankCapacity: response.data?.data?.carDetails?.tankCapacity,
                    transmission: response.data?.data?.carDetails?.transmission,
                    yearModel: response.data?.data?.carDetails?.yearModel,
                    description: response.data?.data?.carDetails?.description,
                    makeCode: response.data?.data?.carOffer?.carBrand_id?.makeCode,
                    modalCode: response.data?.data?.carOffer?.carSeries_id?.modelCode

                })

                // setOfferData({
                //     leasetype:response.data.data.carOffer.leaseType,
                //     term:response.data.data.carOffer.term,
                //     offer:response.data?.data?.carOffer.offers
                // })

                function processOfferData(response) {
                    const leasetype = response?.data?.data?.carOffer?.leaseType;
                    const term = response?.data?.data?.carOffer?.term;
                    const offers = response?.data?.data?.carOffer?.offers;

                    const processedOffers = offers?.map((offer) => {
                        return {
                            leasetype: leasetype,
                            termtype: term,
                            durations: offer?.duration,
                            annualMileage: offer?.annualMileage,
                            monthlycost: offer?.monthlyCost,
                            calculation: offer?.calculationNo,
                            validFrom: offer?.validFrom,
                            validTo: offer?.validTo,
                        };
                    });

                    return processedOffers;
                }

                const storeoffer = processOfferData(response)

                if (storeoffer.length > 0) {
                    setInventorydata(storeoffer)
                }

                setCategories(response.data?.data?.features?.categories)
                setExteriorFeatures(response.data?.data?.features?.exteriorFeatures)
                setInteriorFeatures(response.data?.data?.features?.interiorFeatures)
                setSafetySecurityFeatures(response.data?.data?.features?.safetySecurityFeatures)
                setComfortConvenienceFeatures(response.data?.data?.features?.comfortConvenienceFeatures)
                setAudioEntertainmentFeatures(response.data?.data?.features?.audioEntertainmentFeatures)
            })
        } catch (err) {
            console.error(err)
        }
        console.log(query.get("query_id"), "Product page");
    }

    const fetchImage = () => {
        setUploadFile(singleproduct?.carDetails?.image)
    }

    useEffect(() => {
        if (singleproduct?.carDetails?.image) {
            setUploadFile(singleproduct?.carDetails?.image);
        }
    }, [singleproduct]);



    console.log(singleproduct, "this is direct image file ")

    // console.log(uploadFile, "this is upload file single")

    // console.log(singleproduct, "singleProduct")

    // console.log(cardetails.makeCode, "mkae codde", "modalcode", cardetails.modalCode)


    // console.log(inventorydata, "check single product")


    const carOffersData = [];
    const carFeaturesData = [];

    // FormData appending to APi.
    const formData = new FormData();

    formData.append('description', cardetails?.description);
    formData.append('yearModel', cardetails?.yearModel);
    formData.append('door', cardetails?.door);
    formData.append('seat', cardetails?.seat);
    //   formData.append('co2', cardetails?.cogas);
    //   formData.append('fuelType', cardetails?.fuelType);
    formData.append('acceleration', cardetails?.acceleration);
    formData.append('gears', cardetails?.gears);
    formData.append('transmission', cardetails?.transmission)
    formData.append('tankCapacity', cardetails?.tankCapacity);
    //   formData.append('image', cardetails?.inventoryimg)



    // Iterate over the categories array and append values dynamically
    categories?.forEach((category, index) => {

        formData.append(`categories[${index}][categoryCode]`, category?.categoryCode);
        formData.append(
            `categories[${index}][categoryDescription]`,
            category?.categoryDescription
        );

        categories[index].features.forEach((features, featureIndex) => {
            formData.append(
                `categories[${index}][features][${featureIndex}]`,
                features
            );

        });

        carFeaturesData.push({

            // carSeries_id: carSeriesId,
            // carBrand_id: carBrandId,
            categories: category,
        })

    });




    // offers:-

    const handleInventoryUpdate = (updatedData) => {
        setInventorydata(updatedData);
    };

    const car_offers = {
        carOffers: []
    };

    console.log(inventorydata, "testestets-----------")

    const data = inventorydata.map(({ leasetype, termtype, durations, annualMileage, monthlycost, calculation, validFrom, validTo }) => ({
        durations,
        annualMileage,
        monthlycost,
        calculation,
        leasetype,
        termtype,
        validFrom,
        validTo
    }));

    console.log(data, "test---------------")


    data.forEach((offer, index) => {
        formData.append(`offers[${index}][duration]`, offer?.durations);
        formData.append(`offers[${index}][annualMileage]`, offer?.annualMileage);
        formData.append(`offers[${index}][monthlyCost]`, offer?.monthlycost);
        formData.append(`offers[${index}][calculationNo]`, offer?.calculation);
        formData.append(`offers[${index}][leaseType]`, offer?.leasetype);
        formData.append(`offers[${index}][term]`, offer?.termtype);
        const validFromISO = DateTime.fromISO(offer?.validFrom).toISO();
        const validToISO = DateTime.fromISO(offer?.validTo).toISO();
        formData.append(`offers[${index}][validFrom]`, validFromISO);
        formData.append(`offers[${index}][validTo]`, validToISO);


        // new Date(Date.UTC(year, month, day, 0, 0, 0)); 

        // formData.append(`offers[${index}][bestDeals]`,
        //   offer.bestDeals ? offer.bestDeals : 'No'
        // );
    });



    //   inventorydata.forEach((offer) => {
    //     console.log(offer, "offerthis is")


    //   });

    //    car_offers?.carOffers?.forEach((carOffer, index) => {

    //     carOffer.offers.forEach((offer, offerIndex) => {
    //         formData.append(
    //         `[offers][${offerIndex}][duration]`,
    //         offer.duration
    //       );
    //       formData.append(
    //         `[offers][${offerIndex}][annualMileage]`,
    //         offer.annualMileage
    //       );
    //       formData.append(
    //         `[offers][${offerIndex}][monthlyCost]`,
    //         offer.monthlyCost
    //       );
    //       formData.append(
    //         `[offers][${offerIndex}][calculationNo]`,
    //         offer.calculationNo
    //       );

    //     });
    //   });






    //   handlechange for car details
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCardetails({ ...cardetails, [name]: value });
    }


    // handle submit for features

    // Exterior features
    const handleSubmitexterior = (e) => {
        e.preventDefault();
        console.log("inputexterior")
        setExteriorFeatures([...exteriorFeatures, inputexterior])
        setInputexterior("")
        console.log(inputexterior, "inputexteriordaata")
    }

    // InteriorFeatures 

    const handleSubmitinterior = (e) => {
        e.preventDefault();
        setInteriorFeatures([...interiorFeatures, inputinterior])
        setInputinterior("")
    }

    // Safety features

    const handleSubmitsafety = (e) => {
        e.preventDefault();
        setSafetySecurityFeatures([...safetySecurityFeatures, inputsafety])
        setInputSafety("")
    }

    // ComfortFeatures

    const handleSubmitcomfort = (e) => {
        e.preventDefault();
        setComfortConvenienceFeatures([...comfortConvenienceFeatures, inputcomfort])
        setInputcomfort("")
    }

    // audioEntertainmentFeatures

    const handleAudioEntertainment = (e) => {
        e.preventDefault();
        setAudioEntertainmentFeatures([...audioEntertainmentFeatures, inputaudio])
        setInputaudio("")
    }


    //  handleRemoveInputexterior

    const handleRemoveInputexterior = (index) => {

        const filter = [...exteriorFeatures];
        filter.splice(index, 1)
        setExteriorFeatures(filter)
        console.log(index, "index clicked")
    }

    // handleRemoveInputinterior

    const handleRemoveInputinterior = (index) => {
        const filter = [...categories];
        filter.splice(index, 1);
        setCategories(filter)
        console.log(index, "indexitmeclienkd")
    }

    // handleremovesafety

    const handleRemoveinputsafety = (index) => {
        const filter = [...safetySecurityFeatures];
        filter.splice(index, 1);
        setSafetySecurityFeatures(filter)
    }

    // handleremovecomfort

    const handleRemovecomfort = (index) => {
        const filter = [...comfortConvenienceFeatures];
        filter.splice(index, 1)
        setComfortConvenienceFeatures(filter)
    }

    // handleremoveaudio

    const handleRemoveaudio = (index) => {
        const filter = [...audioEntertainmentFeatures];
        filter.splice(index, 1)
        setAudioEntertainmentFeatures(filter)

    }

    //    Features Category
    const addCategory = (e) => {
        e.preventDefault()
        const newCategory = {
            categoryCode: categoryCode,
            categoryDescription: categoryDescription,
            features: [...tempFeatures]
        };

        setCategories(prevCategories => [...prevCategories, newCategory,]);
        setCategoryCode('');
        setCategoryDescription('');
        setTempFeatures([]);
        toast.success("New features added")
        console.log(categories, "this is a new category")
    };

    const addFeature = (e) => {
        e.preventDefault()
        setTempFeatures(prevFeatures => [...prevFeatures, featureDescription]);
        setFeatureDescription('');
    };


    // handleOfferFormSubmit

    const handleOfferFormSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const dataform = {
            leasetype: form.leasetype.value,
            termtype: form.termtype.value,
            // yearModel:form.yearModel.value,
            annualMileage: form.annualMileage.value,
            durations: form.durations.value,
            calculation: form.calculation.value,
            monthlycost: form.monthlycost.value,
            validFrom: DateTime.fromJSDate(startDate).toISO(),
            validTo: DateTime.fromJSDate(endDate).toISO(),
        }

        setInventorydata([...inventorydata, dataform,])
        toast.success("Yeah! Offer Added ")
        form.reset();

        console.log(inventorydata, "data form reset")
    }


    const deleteButton = (index) => {
        inventorydata.splice(index, 1)
        setInventorydata([...inventorydata])
        toast.error("Oops! Deleted Successfully ")
    }


    const finaldataSubmit = async (e) => {
        e.preventDefault()
        try {
            await HostedApi({
                url: `/carOffer/update/${id}`,
                method: "PUT",
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then((response) => {
                if (response.status === 200) {
                    toast.success("Updated Successfully!")
                    window.location.reload()
                }
            })
        }
        catch (err) {
            console.log(err)
            toast.error("Oops Somthing went wrong!")
        }
    }



    const handleImageChange = async (e) => {
        try {
            const fileList = e.target.files;

            // Update the state using the callback version of setUploadFile
            setUploadFile((prevUploadFile) => [...prevUploadFile, ...fileList]);

            // Create FormData and append all files under the key 'image'
            let imageFormData = new FormData();

            // Append the previous files under the key 'image'
            uploadFile.forEach((image, index) => {
                if (typeof image?.imageUrl === 'string') {
                    imageFormData?.append('image', image);
                }
            });

            // Append the new files under the key 'image'
            for (let i = 0; i < fileList.length; i++) {
                imageFormData?.append('image', fileList[i]);
            }

            // Make the API call
            const response = await HostedApi({
                url: `/carOffer/addImage/${id}`,
                method: 'POST',
                data: imageFormData,
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 200) {
                toast.success("Image added successfully");
                setTimeout(() => {
                    window.location.assign(`product-upload?query_id=${id}`);
                }, 500);
            }
        } catch (err) {
            toast.error(err.message || "Error uploading image");
            console.error(err);
        }
    };



    // Removing Images of car by there Car Inventoryid and ImageURL
    const removeImage = async (index) => {
        try {

            await HostedApi({
                url: `/carOffer/deleteImage/${id}?imageUrl=${index?.imageUrl}`,
                method: "DELETE",
            }).then((response) => {
                if (response.status === 200) {
                    toast.success("Image Deleted Successfully!")
                    setTimeout(() => {
                        window.location.assign(`product-upload?query_id=${id}`);
                    }, 500);
                }
            })

        } catch (err) {
            console.log(err)
            toast.error("Oops Somthing went wrong!")
        }
        // let filterImage = [...uploadFile]
        // filterImage?.splice(index, 1)
        // setUploadFile(filterImage)
        console.log(index.imageUrl, id, "Removing image")
    }

    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title={data?.pageTitle}>
                            {data?.breadcrumb?.map((item, index) => (
                                <li key={index} className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={item.path}>{item.text}</Anchor> : item.text}
                                </li>
                            ))}
                        </Breadcrumb>
                    </CardLayout>
                </Col>
                {/* <Col xl={5}>
                    <CardLayout>
                        <CardHeader title="Car information" dotsMenu={ data?.dotsMenu }  />
                        <Row>
                            <Col xl={12}><LabelField type="text" label="Brand" fieldSize="w-100 h-md" /></Col>
                            <Col xl={12}><LabelTextarea label="description" fieldSize="w-100 h-text-md" /></Col>
                            <Col xl={6}><LabelField label="category" option={['mans', 'womans', 'accessory']} fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}><LabelField label="brand" option={['richman', 'lubana', 'ecstasy']} fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}><LabelField type="text" label="regular price" fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}><LabelField type="text" label="discount price" fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}><LabelField type="text" label="shipping fee" fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}><LabelField type="text" label="tax rate" fieldSize="w-100 h-md" /></Col>
                            <Col xl={12}><LabelTextarea label="tags" fieldSize="w-100 h-text-md" /></Col>
                        </Row>
                    </CardLayout>
                </Col> */}
                <Col xl={5}>
                    <CardLayout>
                        <CardHeader title="media &amp; published" dotsMenu={data?.dotsMenu} />
                        <Box className="mc-product-upload-media">

                            {uploadFile?.map((item, key) => (
                                <Box className="mc-product-upload-image">
                                    {
                                        typeof item?.imageUrl === 'string' ? (
                                            <Image src={item?.imageUrl} alt="image" style={{ maxHeight: '250px' }} />
                                        ) : (
                                            <Image src={URL?.createObjectURL?.(item)} alt="image" style={{ maxHeight: '250px' }} />
                                        )
                                    }

                                    <Button style={{ color: 'red' }} onClick={() => { removeImage(item) }} className="material-icons delete position-absolute top-0 end-0 m-2 image-delete-button">cancel</Button>
                                </Box>

                            ))}

                            <Box className="mc-product-upload-file">

                                <Input type="file" id='product' name='image' multiple onChange={handleImageChange} />
                                <Label htmlFor="product"><Icon type="collections" /><Text>Upload File</Text></Label>

                            </Box>

                        </Box>
                    </CardLayout>
                </Col>
                <Col xl={7}>
                    <CardLayout className="mb-4">
                        <CardHeader title="Car Details" dotsMenu={data?.dotsMenu} />
                        <Row>
                            <Col xl={4}>
                                <Box className="mc-product-upload-organize">
                                    <LabelField disabled type="text" label="Brand" fieldSize="w-100 h-sm" onChange={handleInputChange} value={cardetails?.carBrand_id} />
                                </Box>
                            </Col>
                            <Col xl={4}>
                                <Box className="mc-product-upload-organize ">
                                    <LabelField disabled type="text" label="Series" fieldSize="w-100 h-sm" onChange={handleInputChange} value={cardetails?.carSeries_id} />

                                </Box>
                            </Col>

                            <Col xl={4}>
                                <Box className="mc-product-upload-organize ">
                                    <LabelField disabled type="text" label="MakeCode" fieldSize="w-100 h-sm" onChange={handleInputChange} value={cardetails?.makeCode} />

                                </Box>
                            </Col>

                            <Col xl={4}>
                                <Box className="mc-product-upload-organize ">
                                    <LabelField disabled type="text" label="ModelCode" fieldSize="w-100 h-sm" onChange={handleInputChange} value={cardetails?.modalCode} />

                                </Box>
                            </Col>

                            <Col xl={4}>
                                <Box className="mc-product-upload-organize">
                                    <LabelField style={{ background: "white" }} type="text" label="Year" fieldSize="w-100 h-sm" onChange={(e) => setCardetails({ ...cardetails, yearModel: e.target.value })} value={cardetails.yearModel} />

                                </Box>
                            </Col>
                            <Col xl={4}>
                                <Box className="mc-product-upload-organize">
                                    <LabelField disabled type="text" label="Body Type" fieldSize="w-100 h-sm" onChange={(e) => setCardetails({ ...cardetails, bodyType: e.target.value })} value={cardetails.bodyType} />
                                </Box>
                            </Col>
                            <Col xl={4}>
                                <Box className="mc-product-upload-organize">
                                    <LabelField style={{ background: "white" }} type="number" label="Doors" fieldSize="w-100 h-sm" onChange={(e) => setCardetails({ ...cardetails, door: e.target.value })}
                                        onKeyDown={(e) => {
                                            if (e.key === '-' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                                                e.preventDefault();
                                            }
                                        }}
                                        value={cardetails.door} />
                                </Box>
                            </Col>
                            <Col xl={4}>
                                <Box className="mc-product-upload-organize">
                                    <LabelField style={{ background: "white" }} type="number" label="Seat" fieldSize="w-100 h-sm" onChange={(e) => setCardetails({ ...cardetails, seat: e.target.value })}
                                        onKeyDown={(e) => {
                                            if (e.key === '-' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                                                e.preventDefault();
                                            }
                                        }}
                                        value={cardetails.seat} />
                                </Box>
                            </Col>
                            <Col xl={4}>
                                <Box className="mc-product-upload-organize">
                                    <LabelField style={{ background: "white" }} type="text" label="Gears" fieldSize="w-100 h-sm" onChange={(e) => setCardetails({ ...cardetails, gears: e.target.value })} value={cardetails.gears} />
                                </Box>
                            </Col>
                            <Col xl={4}>
                                <Box className="mc-product-upload-organize">
                                    <LabelField style={{ background: "white" }} type="text" label="Acceleration" fieldSize="w-100 h-sm" onChange={(e) => setCardetails({ ...cardetails, acceleration: e.target.value })} value={cardetails.acceleration} />
                                </Box>
                            </Col>
                            <Col xl={4}>
                                <Box className="mc-product-upload-organize">
                                    <LabelField disabled type="text" label="Fuel Type" fieldSize="w-100 h-sm" onChange={(e) => setCardetails({ ...cardetails, fuelType: e.target.value })} value={cardetails.fuelType} />
                                </Box>
                            </Col>
                            <Col xl={4}>
                                <Box className="mc-product-upload-organize">
                                    <LabelField style={{ background: "white" }} type="text" label="Transmission" fieldSize="w-100 h-sm" onChange={(e) => setCardetails({ ...cardetails, transmission: e.target.value })} value={cardetails.transmission} />
                                </Box>
                            </Col>
                            <Col xl={4}>
                                <Box className="mc-product-upload-organize">
                                    <LabelField style={{ background: "white" }} type="text" label="Tank Capacity" fieldSize="w-100 h-sm" onChange={(e) => setCardetails({ ...cardetails, tankCapacity: e.target.value })} value={cardetails.tankCapacity} />
                                </Box>
                            </Col>

                            <Col xl={4}>
                                <Box className="mc-product-upload-organize">
                                    <LabelField style={{ background: "white" }} type="text" label="Description" fieldSize="w-100 h-sm" onChange={(e) => setCardetails({ ...cardetails, description: e.target.value })} value={cardetails.description} />
                                </Box>
                            </Col>



                        </Row>
                    </CardLayout>
                    {/* <CardLayout>
                        <CardHeader title="specification" dotsMenu={ data?.dotsMenu }  />
                        <Row>
                            <Col xl={6}><LabelField label="size" option={['sm', 'md', 'lg', 'xl', 'xxl']} fieldSize="w-100 h-multiple" multiple/></Col>
                            <Col xl={6}><LabelField label="color" option={['red', 'green', 'blue', 'pink', 'black']} fieldSize="w-100 h-multiple" multiple/></Col>
                            <Col xl={6}><LabelField type="text" label="stock" fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}><LabelField type="text" label="weight" fieldSize="w-100 h-md" /></Col>
                        </Row>
                    </CardLayout> */}
                </Col>

                <Col xl={12}>
                    <CardLayout>
                        <CardHeader title="Categories features" />
                        <Row>
                            <div>

                                <div className="col-md-12 d-flex space-between mb-5">
                                    <input type="text" style={{ background: "white" }} placeholder='Category Description' className="form-control w-25 me-5" value={categoryDescription} onChange={(e) => setCategoryDescription(e.target.value)} required />
                                    <input type="number" style={{ background: "white" }} placeholder='Category Code'
                                        onKeyDown={(e) => {
                                            if (e.key === '-' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                                                e.preventDefault();
                                            }
                                        }}
                                        className="form-control w-25 me-5" value={categoryCode} onChange={(e) => setCategoryCode(e.target.value)} required />
                                    <input type="text" style={{ background: "white" }} placeholder='Features Description ' className="form-control w-25 me-5" value={featureDescription} onChange={(e) => setFeatureDescription(e.target.value)} required />

                                    <Anchor
                                        className="mc-btn w-25 btn btn-primary"
                                        // text="publish &amp; view" 
                                        text="Add Description"
                                        icon="add_circle"
                                        onClick={addFeature}
                                    />
                                </div>

                                <div>
                                    {
                                        <div>
                                            <ul className='row d-flex mb-2'>
                                                {tempFeatures?.map((item, index) => (

                                                    <li className='col-2 featurecss' key={index}> {item} </li>

                                                ))}
                                            </ul>
                                        </div>
                                    }
                                </div>


                                <div className="col-2 ">
                                    <Anchor
                                        className="mc-btn w-100 btn btn-primary mb-2"
                                        // text="publish &amp; view" 
                                        text="Add Feature"
                                        icon="add_circle"
                                        onClick={addCategory}
                                    />
                                </div>
                            </div>

                            {
                                categories?.map((category, index) => (

                                    <div key={index}>
                                        <div className='d-flex justify-content-between'>
                                            <h2 className='mc-btn btn btn-primary'>{category?.categoryDescription}</h2>
                                            <div className="d-flex">
                                                <p>Category Code: <span className='mc-btn btn btn-primary '>{category?.categoryCode}</span></p>
                                                <Button title="Delete" className="material-icons delete ms-4" onClick={() => handleRemoveInputinterior(index)}>
                                                    <Deletesvg width={100} />
                                                </Button>
                                            </div>
                                        </div>
                                        <ul className='row d-flex mt-2'>
                                            {category?.features?.map((feature, featureIndex) => (
                                                <li className='col-2 featurecss' key={featureIndex}>
                                                    {feature}

                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))

                            }
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


                <Col>
                    <CardLayout>
                        <CardHeader title="Car Offers" />
                        <Row>
                            <form className="row mt-0 p-2 g-3 p-3 needs-validation" onSubmit={handleOfferFormSubmit} >


                                {/* <div className="col-md-4">
                        <label for="validationCustom04" className="form-label">Lease Type</label>
                        <select className="form-select bg-white" name='leasetype'  required>
                       
                         <>
                            <option selected disabled value="">Choose Lease Type...</option>
                            <option name="Privatelease" value="Private Lease">Private Lease</option>
                            <option name="Businesslease" value="Business Lease">Business Lease</option>
                         </>
                           
                        </select>

                    </div> */}

                                <div className="col-md-4">
                                    <label for="validationCustom04" className="form-label">Lease Type</label>
                                    <input type="text" className="form-control" name="leasetype" disabled value={singleproduct?.carOffer?.leaseType} required />
                                </div>


                                {/* <div className="col-md-4">
                        <label for="validationCustom04" className="form-label">Term Type</label>
                        <select className="form-select bg-white" name='termtype'  required>
                       
                         <>
                            <option selected disabled value="">Choose Term Type...</option>
                            <option name="Short Term" value="Short Term">Short Term</option>
                            <option name="Longterm" value="Long Term">Long Term</option>
                         </>
                           
                        </select>

                    </div> */}

                                <div className="col-md-4">
                                    <label for="validationCustom04" className="form-label">Term Type</label>
                                    <input type="text" className="form-control" name="termtype" disabled value={singleproduct?.carOffer?.term} required />
                                </div>



                                <div className="col-md-4" >
                                    <label for="validationCustom01" className="form-label">Annual Mileage</label>
                                    <input style={{ background: "white" }} type="text" className="form-control" name="annualMileage" placeholder='Enter Annual Mileage' required />

                                </div>

                                <div className="col-md-4">
                                    <label for="validationCustom01" className="form-label">Duration</label>
                                    <input style={{ background: "white" }} type="text" className="form-control" name="durations" placeholder='Enter Durations' required />

                                </div>
                                <div className="col-md-4">
                                    <label for="validationCustom01" className="form-label">Calculation No.</label>
                                    <input style={{ background: "white" }} type="number" className="form-control" name="calculation" placeholder='Enter Calculations number' required />

                                </div>

                                <div className="col-md-4">
                                    <label for="validationCustom01" className="form-label">Monthly Cost</label>
                                    <input style={{ background: "white" }} type="text" className="form-control" name="monthlycost" placeholder='Enter Monthly cost' required />

                                </div>

                                <div className="col-md-4 " >
                                    <label for="validationCustom01" className="form-label">Valid From </label>
                                    <DatePicker selected={startDate} placeholderText='DD/MM/YYYY' dateFormat="dd/MM/yyyy" minDate={new Date()} onChange={(date) => {

                                        setStartDate(date)
                                        // setCardetails({...cardetails, validFrom:DateTime.fromJSDate(date).toUTC()})

                                    }

                                    } />
                                </div>

                                <div className="col-md-4 ">
                                    <label for="validationCustom01" className="form-label">Valid To</label>

                                    <DatePicker selected={endDate} placeholderText='DD/MM/YYYY' dateFormat="dd/MM/yyyy" startDate={startDate} minDate={startDate} onChange={(date) => {

                                        setEndDate(date)
                                        // setCardetails({...cardetails, validTo:DateTime.fromJSDate(date).toUTC()})
                                    }} />


                                </div>


                                {/* 
 <div className="col-1 rightoffer">

    <Anchor 
      className="mc-btn w-80 btn btn-primary mt-5" 
    // text="publish &amp; view" 
      text="Add Offer"
      icon="add_to_photos" 
      type="submit"
      />
 </div> */}

                                <div style={{ textAlign: "end" }} >
                                    <Button className="mc-btn w-80 btn btn-primary mt-5" icon="add_to_photos" type="submit" text="Add Offer" />
                                </div>

                                <Offersingletable tbody={inventorydata} deleteButton={deleteButton} onUpdate={handleInventoryUpdate} deals setDeal />

                            </form>
                        </Row>
                    </CardLayout>
                </Col>


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
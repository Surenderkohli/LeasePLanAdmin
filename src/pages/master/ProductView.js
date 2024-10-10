import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Anchor, Box, Item, Text, Icon, List, Image, Heading, Button } from "../../components/elements";
import { CustomerReview, RatingAnalytics } from "../../components/review";
import { Breadcrumb, DivideTitle } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import LabelTextarea from "../../components/fields/LabelTextarea";
import CardLayout from "../../components/cards/CardLayout";
import data from "../../data/master/productView.json";
import { useQuery } from "../../api/query";
import HostedApi from "../../api/axios";
import '../master/Stepform/Carfeaturesnew/Carfeaturesnew.css'
import Showoffertable from "../../components/tables/Bin/Showoffertable";

export default function ProductView() {
    const query = useQuery();
    const [singleproduct, setSingleproduct] = useState([]);
    const [inventorydata, setInventorydata] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getProductById();
    }, [query.get("query_id")])




    const getProductById = async () => {
        try {
            await HostedApi({
                url: `/carOffer/dashboard/fetch-single/${query.get("query_id")}`,
                method: "GET",
            }).then((response) => {
                setSingleproduct(response.data.data)
            })
        } catch (err) {
            console.error(err)
        }
        console.log(query.get("query_id"), "Product page");
    }

    console.log(singleproduct, "tHis is product page detail")

    return (
        <PageLayout>
            <CardLayout className="mb-4">
                <Breadcrumb title={data?.pageTitle}>
                    {data?.breadcrumb.map((item, index) => (
                        <Item key={index} className="mc-breadcrumb-item">
                            {item.path ? <Anchor className="mc-breadcrumb-link" href={item.path}>{item.text}</Anchor> : item.text}
                        </Item>
                    ))}
                </Breadcrumb>
            </CardLayout>
            <CardLayout className="p-lg-5">
                <Row>
                    <Col xl={5}>
                        <DivideTitle title="Car Inventory gallery" className="mb-4" />
                        <Box className="mc-product-upload-media">
                            {singleproduct?.carDetails?.image?.map((item, index) => (
                                <Box className="mc-product-upload-image">
                                    <Image key={index} src={item?.imageUrl} alt={item.alt} />
                                </Box>
                            ))}
                        </Box>
                    </Col>
                    <Col xl={7}>
                        <DivideTitle title="Car details" className="mb-4" />
                        <Box className="mc-product-view-info-group">
                            <Heading as="h2" className="mc-product-view-info-title">{data?.title}</Heading>

                            <Box className="mc-product-view-meta viewmore-box" >

                                <div className="view-more">
                                    <Icon type="store" />
                                    <Heading as="h5">Brand</Heading>
                                    <Text as="span">:</Text>
                                    {singleproduct?.carOffer?.carBrand_id?.companyName && <Text as="p">{singleproduct?.carOffer?.carBrand_id?.companyName}</Text>}

                                </div>

                                <div className="view-more">
                                    <Icon type="view_day" />
                                    <Heading as="h5">Series</Heading>
                                    <Text as="span">:</Text>
                                    {singleproduct?.carOffer?.carSeries_id?.seriesName && <Text as="p">{singleproduct?.carOffer?.carSeries_id?.seriesName} </Text>}
                                </div>

                                <div className="view-more">
                                    <Icon type="event" />
                                    <Heading as="h5">Year</Heading>
                                    <Text as="span">:</Text>
                                    {singleproduct?.carDetails?.yearModel && <Text as="p">{singleproduct?.carDetails?.yearModel} </Text>}
                                </div>

                                <div className="view-more">
                                    <Icon type="directions_car" />
                                    <Heading as="h5">Body Type</Heading>
                                    <Text as="span">:</Text>
                                    {<Text as="p">{singleproduct?.carDetails?.bodyType} </Text>}
                                </div>

                                <div className="view-more">
                                    <Icon type="arrow_forward" />
                                    <Heading as="h5">Door</Heading>
                                    <Text as="span">:</Text>
                                    {<Text as="p">{singleproduct?.carDetails?.door} </Text>}
                                </div>

                                <div className="view-more">
                                    <Icon type="airline_seat_recline_extra" />
                                    <Heading as="h5">Seat</Heading>
                                    <Text as="span">:</Text>
                                    {<Text as="p">{singleproduct?.carDetails?.seat} </Text>}
                                </div>

                                <div className="view-more">
                                    <Icon type="engineering" />
                                    <Heading as="h5">Gears</Heading>
                                    <Text as="span">:</Text>
                                    {<Text as="p">{singleproduct?.carDetails?.gears} </Text>}
                                </div>

                                <div className="view-more">
                                    <Icon type="engineering" />
                                    <Heading as="h5">Acceleration</Heading>
                                    <Text as="span">:</Text>
                                    {<Text as="p">{singleproduct?.carDetails?.acceleration} </Text>}
                                </div>

                                <div className="view-more">
                                    <Icon type="local_gas_station" />
                                    <Heading as="h5">Fuel Type</Heading>
                                    <Text as="span">:</Text>
                                    {<Text as="p">{singleproduct?.carDetails?.fuelType} </Text>}
                                </div>


                                <div className="view-more">
                                    <Icon type="car_repair" />
                                    <Heading as="h5">Transmission</Heading>
                                    <Text as="span">:</Text>
                                    {<Text as="p">{singleproduct?.carDetails?.transmission} </Text>}
                                </div>

                                <div className="view-more">
                                    <Icon type="arrow_forward" />
                                    <Heading as="h5">TankCapacity</Heading>
                                    <Text as="span">:</Text>
                                    {<Text as="p">{singleproduct?.carDetails?.tankCapacity} </Text>}
                                </div>


                                <div className="view-more">
                                    <Icon type="arrow_forward" />
                                    <Heading as="h5">Make Code</Heading>
                                    <Text as="span">:</Text>

                                    {<Text as="p">{singleproduct?.carOffer?.carBrand_id?.makeCode} </Text>}
                                </div>

                                <div className="view-more">
                                    <Icon type="arrow_forward" />
                                    <Heading as="h5">Modal Code</Heading>
                                    <Text as="span">:</Text>

                                    {<Text as="p">{singleproduct?.carOffer?.carSeries_id?.modelCode} </Text>}
                                </div>

                                <div className="view-more">
                                    <Icon type="arrow_forward" />
                                    <Heading as="h5">Lease Type</Heading>
                                    <Text as="span">:</Text>

                                    {<Text as="p">{singleproduct?.carOffer?.leaseType} </Text>}
                                </div>

                                <div className="view-more">
                                    <Icon type="arrow_forward" />
                                    <Heading as="h5">Term Type</Heading>
                                    <Text as="span">:</Text>

                                    {<Text as="p">{singleproduct?.carOffer?.term} </Text>}
                                </div>

                            </Box>


                            {
                                singleproduct?.data?.car.map((item, index) => (
                                    <Box key={index} className="mc-product-view-meta">

                                    </Box>
                                ))
                            }

                        </Box>
                    </Col>
                    <Col xl={12}>
                        <DivideTitle title="Features" className="mt-5 mb-4" />
                        <Box className="">

                            {singleproduct?.features?.categories?.map((category, index) => (
                                <div key={index} className="mb-4">
                                    <div className='d-flex justify-content-between'>
                                        <h2 className='mc-btn btn btn-primary'>{category.categoryDescription}</h2>
                                        <p>Category Code: <span className='mc-btn btn btn-primary'>{category.categoryCode}</span></p>
                                    </div>
                                    <ul className='row d-flex mt-2'>
                                        {category.features.map((feature, featureIndex) => (
                                            <li className='col-2 featurecss' key={featureIndex}>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}

                        </Box>
                    </Col>

                    <Col xl={12}>
                        <DivideTitle title="Car Offers" className="mt-5 mb-4" />
                        <Box className="">
                            {/* {
                                        <List>
                                         {singleproduct?.data?.features?.interiorFeatures.map((item,index) => (
                                            <Item key={ index }>{ item }</Item>
                                          ))}
                                        </List>
                        } */}
                            <Showoffertable tbody={singleproduct?.carOffer?.offers} />
                        </Box>
                    </Col>




                </Row>
            </CardLayout>
        </PageLayout>
    )
}
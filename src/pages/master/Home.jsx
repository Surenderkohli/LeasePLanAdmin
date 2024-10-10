import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'

import { FloatCard } from '../../components/cards'
import { Breadcrumb } from "../../components";
import { Box, Item, Anchor } from '../../components/elements'
import HomeTable from '../../components/tables/Bin/Hometable'
import PageLayout from '../../layouts/PageLayout'
import { useState } from 'react';
import { useCallback } from 'react';
import HostedApi from '../../api/axios';
import Bestdeals from '../../data/svgicons/Bestdeals.js'
import Carlease from '../../data/svgicons/Carlease'
import Totalinventry from '../../data/svgicons/Totalinventry'
import Query from '../../data/svgicons/Query'
import Bannericon from '../../data/svgicons/Bannericon'
import Inventory from './Inventory';
import {  CardHeader } from '../../components/cards';
import {Homeskeleton} from '../../components/skeleton/Homeskeleton'


export const Home = () => {

  const [inventorydata, setInventoryData] = useState([])
  const [dealscount, setDealscount] = useState()
  const [carOffer, setCaroffer] = useState()
  const [loading, setLoading] = useState(false)

const getInventorycarcount = useCallback(async () => {
  try {
    await HostedApi({
      url: "/carOffer/counts",
      method: "GET",
    }).then((res) => {
      setCaroffer(res.data)
    });
  } catch (e) {
    console.error(e);
  }
}, []);



  const getInventoryData = useCallback(async () => {
    try {
      await HostedApi({
        url: "/carOffer/best-deal",
        method: "GET",
      }).then((res) => {
        setInventoryData(res.data.data.carOffers)
        setDealscount(res.data.data)
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  

  useEffect(() => {
    setLoading(true)
    const wait = setTimeout(() => {
      getInventoryData();
      getInventorycarcount();
      setLoading(false);
    }, 1000)
    return () => clearTimeout(wait);
  }, []);


   console.log(inventorydata.totalBestDeals, "cardetails------------")

    return (
        <PageLayout>
            {loading ? <Homeskeleton/> : 
            <>
            <Row>
                <Row>
                <Col xl={12}>
                    <Box className="mc-card">
                        <Breadcrumb title={"Dashboard"}>
                        </Breadcrumb>
                    </Box>
                </Col>
                
                <Col>
                <Box className="mc-card">
                 <CardHeader title={ "Inventory Information" }  />
                     <Row >
                     <Col xl={4}>
                      <FloatCard
                       style={{ backgroundColor: "#e66339" }}
                       color={"#fff"}
                       variant="lg"
                       digit={carOffer?.privateLeaseCount.shortTerm || 0}
                    
                       title="Short Term"
                       icon=<Carlease/>
                      />
                    </Col>
                    <Col xl={4}>
                    <FloatCard
                       style={{ backgroundColor: "#e66339"}}
                       color={"#fff"}
                       variant="lg"
                       digit={carOffer?.privateLeaseCount.longTerm || 0}
                       title="Long Term"
                      icon=<Carlease/>
                      />
                    </Col>
                    <Col xl={4}>
                    <FloatCard
                       style={{ backgroundColor: "#e66339" }}
                       color={"#fff"}
                       variant="lg"
                      digit={dealscount?.totalBestDeals || 0}
                      // digit={"60"}
                       title="Best Deals"
                       icon=<Bestdeals/>
                      />
                    </Col>
                     </Row>
                     <Row className='mt-4'>
                     <Col xl={4}>
                    <FloatCard
                       style={{ backgroundColor: "#e66339" }}
                       color={"#fff"}
                       variant="lg"
                       digit={carOffer?.totalInventoryCount || 0}
                     
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
               
                </Col>

                </Row>

                {/* second row */}


            </Row>

            <Box className="mc-card mt-4" >
            <CardHeader title={"Best Deals"}  />
            <HomeTable tbody={inventorydata}/>
            </Box>
            </>}

    </PageLayout>
    )
}

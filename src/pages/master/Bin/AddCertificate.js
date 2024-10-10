import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, Tab, Tabs } from "react-bootstrap";
import { List, Item, Icon, Text, Box, Anchor, Image, Button } from "../../../components/elements";
import { Breadcrumb, RoundAvatar, DivideTitle, DuelText, FileUpload } from "../../../components";
import { CardLayout, CardHeader, FloatCard, ActivityCard, TabCard } from "../../../components/cards";
import PageLayout from "../../../layouts/PageLayout";
import data from "../../../data/master/Bin/certificateView.json";
import { getNewClient } from "../../../api/endpoints";
import {useQuery} from "../../../api/query"
import instance from "../../../api/axios";
import { LegendField } from "../../../components/fields";
import { toast,ToastContainer } from "react-toastify";


export default function AddCertificate() {

  const [ShowImage, setShowImage] = useState(null)
  const [postData, setPostData] = useState({
    link:"#",
    img:null
  })
  const imageUpload = (e) =>{
    if(e.target.files && e.target.files[0]){
      setShowImage(URL.createObjectURL(e.target.files[0]))
      setPostData({...postData,img:e.target.files[0]})
    }
  }
  const addAward=async ()=>{

    const formData = new FormData()
    formData.append('link',postData.link)
    formData.append('img',postData.img)

    try {
      await instance({
        url: "/certificate/upload-certificate",
        method: "POST",
        data:formData,
        headers:{'Content-Type': 'multipart/form-data' }
      },).then((res) => {
        toast.success('Added Sucessfully', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          
      });
    } catch (e) {
      toast.error('Something Went Wrong.Fill All Details', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }
   
    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title="Awards & Certificate">
                            {data?.breadcrumb.map((item, index) => (
                                <Item key={ index } className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                                </Item>
                            ))}
                        </Breadcrumb>
                    </CardLayout>
                </Col>
                <Col xl={4}>
</Col>
                <Col xl={5}>
          <CardLayout>
           
            <Tabs defaultActiveKey="english" id="mc" className="mc-tabs">
              <Tab
                eventKey="english"
                // title="english"
                className="mc-tabpane profile"
              >
                <TabCard title="information">
                  <Row>
                    <Col xl={4}>
                      <Box className="mc-user-avatar-upload ">
                        {/* <Box
                          style={{ width: "100%" }}
                          className="mb-2 shadow-sm"
                        >
                           <Image
                           src={ShowImage?ShowImage:data.avatar.src}
                            // alt={data?.avatar.alt}
                            className="rounded-4"
                            style={{ width: "150px", maxHeight: "150px" }}
                          />
                        </Box> */}
                           <Box className="mc-user-avatar">
                          <Image
                            src={ShowImage?ShowImage:data.avatar.src}

                            alt={data?.avatar.alt}
                          />
                        </Box>
                        <FileUpload 
                          onChange={(e)=>imageUpload(e)} 
                          icon="cloud_upload" text="upload" />
                      </Box>
                    </Col>
                    <Col xl={8}>
                    <Col xl={12}>
                          <LegendField
                            title={"Link"}
                            value={postData?.link}
                            // option={ data?.status.option } activeOption={ postData?.en?.status }
                            onChange={(e)=>{
                            
                              setPostData({...postData,link:e.target.value})
                             }} 
                          />
                          </Col>
                      <Col xl={4}></Col>
                    <Col xl={4}>
                      <Button
                        className="mc-btn primary mt-3 mt-3"
                        icon="verified"
                        text="Submit"
                        onClick={()=> addAward()}
                      />
                    </Col>
                    <Col xl={4}></Col>
                        
                    </Col>
                    
                  </Row>
                      
      
                </TabCard>
              </Tab>

              
            </Tabs>
          </CardLayout>
        </Col>
              
            </Row>
            <ToastContainer/>
        </PageLayout>
    )
}
import React, { useEffect, useState } from "react";
import { Row, Col, Tab, Tabs, Form } from "react-bootstrap";
import {
  LegendField,
  LegendTextarea,
  IconField,
} from "../../../components/fields";
import { Item, Anchor, Box, Button, Image } from "../../../components/elements";
import { CardLayout, TabCard } from "../../../components/cards";
import { Breadcrumb, FileUpload } from "../../../components";
import PageLayout from "../../../layouts/PageLayout";
import data from "../../../data/master/Bin/addEvent.json";
import instance from "../../../api/axios";
import { toast,ToastContainer } from "react-toastify";

export default function AddEvent() {
  
  const [ShowImage, setShowImage] = useState(null)
  const [postData, setPostData] = useState({
    en:{
      title:null,
      status:"active",
      desc:null,
      img:null,

    }
  })
  const imageUpload = (e) =>{
    if(e.target.files && e.target.files[0]){
      setShowImage(URL.createObjectURL(e.target.files[0]))
      setPostData({...postData,en:{...postData.en,img:e.target.files[0]}})
    }
  }
  const addEvent=async ()=>{

    const formData = new FormData()
    formData.append('title',postData.en.title)
    formData.append('status',postData.status)
    formData.append('eventOrganizer',postData.en.eventOrganizer)
    formData.append('desc',postData.en.desc)
    formData.append('eventDateAndTime',postData.eventDateAndTime)
    formData.append('img',postData.en.img)

    try {
      await instance({
        url: "/event/upload-event",
        method: "POST",
        data:formData,
        headers:{'Content-Type': 'multipart/form-data' }
      },).then((res) => {
        toast.success('Event Uploaded Sucessfully', {
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
          <Breadcrumb title={data?.pageTitle}>
            {/* {data?.breadcrumb.map((item, index) => (
              <Item key={index} className="mc-breadcrumb-item">
                {item.path ? (
                  <Anchor className="mc-breadcrumb-link" href={item.path}>
                    {item.text}
                  </Anchor>
                ) : (
                  item.text
                )}
              </Item>
            ))} */}
          </Breadcrumb>
        </Col>
        <Col xl={12}>
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
                        <Box
                          style={{ width: "100%" }}
                          className="mb-2 shadow-sm"
                        >
                           <Image
                            src={ShowImage?ShowImage:data.avatar.src}
                            alt={data?.avatar.alt}
                          
                            className="rounded-4"
                            style={{ width: "100%", maxHeight: "250px" }}
                          />
                        </Box>
                        <FileUpload 
                          onChange={(e)=>imageUpload(e)} 
                          icon="cloud_upload" text="upload" />
                      </Box>
                    </Col>
                    <Col xl={8}>
                      <Row>
                        <Col xl={6}>
                          <LegendField
                            title={data?.name.title}
                            value={postData?.en?.title}
                            onChange={(e)=>{
                              setPostData({...postData,en:{...postData.en,title:e.target.value}})
                             }} 
                            placeholder="Type here..."

                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            title={data?.event.title}
                            value={postData?.eventDateAndTime}
                            onChange={(e)=>{
                              setPostData({...postData,eventDateAndTime:e.target.value})
                             }} 
                            placeholder="Type here..."
                            type="datetime-local"

                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            title={data?.organizer.title}
                            value={postData?.en?.eventOrganizer}
                            onChange={(e)=>{
                              setPostData({...postData,en:{...postData.en,eventOrganizer:e.target.value}})
                             }} 
                            placeholder="Type here..."

                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            title={data?.status.title}
                            value={postData?.en?.status}
                            option={ data?.status.option } activeOption={ data?.status.activeOption }
                            onChange={(e)=>{
                            
                              setPostData({...postData,status:e.target.value})
                             }} 
                            placeholder="Type here..."

                          />
                        </Col>
                        <Col xl={12}>
                          <LegendTextarea
                            title={data?.bio.title}
                            value={postData?.en?.desc}
                            onChange={(e)=>{
                              setPostData({...postData,en:{...postData.en,desc:e.target.value}})

                             }} 
                            placeholder="Type here..."
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl={4}></Col>
                    <Col xl={4}>
                      <Button
                        className="mc-btn primary mt-3 mt-3"
                        icon="verified"
                        text="Submit"
                        onClick={()=> addEvent()}
                      />
                    </Col>
                    <Col xl={4}></Col>
                  </Row>
                </TabCard>
              </Tab>

              {/* <Tab
                eventKey="arabic"
                title="عربي"
                className="mc-tabpane profile"
              >
                <TabCard title="information">
                  <Row>
                    <Col xl={4}>
                      <Box className="mc-user-avatar-upload ">
                        <Box
                          style={{ width: "100%" }}
                          className="mb-2 shadow-sm"
                        >
                          <Image
                            src={data?.avatar.src}
                            alt={data?.avatar.alt}
                            className="rounded-4"
                            style={{ width: "100%", maxHeight: "250px" }}
                          />
                        </Box>
                        <FileUpload icon="cloud_upload" text="تحميل" />
                      </Box>
                    </Col>
                    <Col xl={8}>
                      <Row>
                        <Col xl={6}>
                          <LegendField
                            title={data?.ARE.name.title}
                            // value={data?.name.value}
                            placeholder="أكتب هنا ..."
                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            title={data?.ARE.status.title}
                            // value={data?.email.value}
                            placeholder="أكتب هنا ..."
                          />
                        </Col>
                        <Col xl={12}>
                          <LegendTextarea
                            title={data?.ARE.bio.title}
                            longText={data?.ARE.bio.longText}
                            placeholder="أكتب هنا ..."
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl={4}></Col>
                    <Col xl={4}>
                      <Button
                        className="mc-btn primary mt-3"
                        icon="verified"
                        text="إرسال"
                      />
                    </Col>
                    <Col xl={4}></Col>
                  </Row>
                </TabCard>
              </Tab> */}
            </Tabs>
          </CardLayout>
        </Col>
      </Row>
      <ToastContainer/>
    </PageLayout>
  );
}

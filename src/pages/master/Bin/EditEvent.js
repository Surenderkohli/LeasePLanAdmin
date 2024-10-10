import React, { useCallback, useEffect, useState } from "react";
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
import data from "../../../data/master/Bin/editEvent.json";
import instance from "../../../api/axios";
import { useQuery } from "../../../api/query";

import { toast,ToastContainer } from "react-toastify";

export default function EditBlog() {

  const [singleEvent, setSingleEvent] = useState(null);
  const query = useQuery();
  const getEvent = useCallback(async () => {
    try {
      await instance({
        url: `/event/single-event/${query.get("query_id")}`,
        method: "GET",
      }).then((res) => {
        setSingleEvent(res.data);
      });
    } catch (e) {
      console.error(e);
    }
  }, []);


  const updateEvent = async () => {
    try {
      await instance({
        url: `/event/update-event/${query.get("query_id")}`,
        method: "PUT",
        data: singleEvent,
      }).then((res) => {
        toast.success("Event Updated Sucessfully", {
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
      toast.error('Something Went Wrong.', {
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
  };

  useEffect(() => {
    getEvent();
    return () => {};
  }, []);

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
                title="english"
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
                            src={
                              singleEvent
                                ?singleEvent?.en?.img
                                : data?.avatar?.src
                            }
                            alt={data?.avatar.alt}
                            className="rounded-4"
                            style={{ width: "100%", maxHeight: "250px" }}
                          />
                        </Box>
                        <FileUpload icon="cloud_upload" text="upload" />
                      </Box>
                    </Col>
                    <Col xl={8}>
                      <Row>
                        <Col xl={6}>
                          <LegendField
                            title={data?.name.title}
                            value={singleEvent?.en?.title}
                            onChange={(e) => {
                              setSingleEvent({
                                ...singleEvent,
                                en: { ...singleEvent.en, title: e.target.value },
                              });
                            }}
                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            title={data?.event?.title}
                            value={singleEvent?.eventDateAndTime}
                            onChange={(e)=>{
                              setSingleEvent({...singleEvent,eventDateAndTime:e.target.value})
                             }}
                            placeholder="Type here..."
                            type="datetime-local"

                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            title={data?.organizer?.title}
                            value={singleEvent?.en?.eventOrganizer}
                            onChange={(e)=>{
                              setSingleEvent({...singleEvent,en:{...singleEvent.en,eventOrganizer:e.target.value}})
                             }}
                            placeholder="Type here..."
                          />
                        </Col>
                        <Col xl={6}>
                        <LegendField
                            title={data?.status.title}
                            option={ data?.status.option } 
                            activeOption={ singleEvent?.status }
                            onChange={(e)=>{
                              setSingleEvent({...singleEvent,status:e.target.value})
                             }} 
                            placeholder="Type here..."

                          />
                        </Col>
                        <Col xl={12}>
                          <LegendTextarea
                            title={data?.bio.title}
                            value={singleEvent?.en?.desc}
                            onChange={(e)=>{
                              setSingleEvent({...singleEvent,en:{...singleEvent.en,desc:e.target.value}})
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
                        className="mc-btn primary mt-3"
                        icon="verified"
                        text="Update"
                        onClick={()=> updateEvent()}
                      />
                    </Col>
                    <Col xl={4}></Col>
                  </Row>
                </TabCard>
              </Tab>

              <Tab
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
                            src={
                              singleEvent
                                ?singleEvent?.ARE?.img
                                : data?.avatar?.src
                            }
                            alt={data?.avatar.alt}
                            className="rounded-4"
                            style={{ width: "100%", maxHeight: "250px" }}
                          />
                        </Box>
                        <FileUpload icon="cloud_upload" text="upload" />
                      </Box>
                    </Col>
                    <Col xl={8}>
                      <Row>
                        <Col xl={6}>
                          <LegendField
                            title={data?.name.title}
                            value={singleEvent?.ARE?.title}
                            onChange={(e) => {
                              setSingleEvent({
                                ...singleEvent,
                                ARE: { ...singleEvent.ARE, title: e.target.value },
                              });
                            }}
                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            title={data?.event?.title}
                            value={singleEvent?.eventDateAndTime}
                            onChange={(e)=>{
                              setSingleEvent({...singleEvent,eventDateAndTime:e.target.value})
                             }}
                            placeholder="Type here..."
                            type="datetime-local"

                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            title={data?.organizer?.title}
                            value={singleEvent?.ARE?.eventOrganizer}
                            onChange={(e)=>{
                              setSingleEvent({...singleEvent,ARE:{...singleEvent.ARE,eventOrganizer:e.target.value}})
                             }}
                            placeholder="Type here..."
                          />
                        </Col>
                        <Col xl={6}>
                        <LegendField
                            title={data?.status.title}
                            option={ data?.status.option } 
                            activeOption={ singleEvent?.status }
                            onChange={(e)=>{
                              setSingleEvent({...singleEvent,status:e.target.value})
                             }} 
                            placeholder="Type here..."

                          />
                        </Col>
                        <Col xl={12}>
                          <LegendTextarea
                            title={data?.bio.title}
                            value={singleEvent?.ARE?.desc}
                            onChange={(e)=>{
                              setSingleEvent({...singleEvent,ARE:{...singleEvent.ARE,desc:e.target.value}})
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
                        className="mc-btn primary mt-3"
                        icon="verified"
                        text="Update"
                        onClick={()=> updateEvent()}
                      />
                    </Col>
                    <Col xl={4}></Col>
                  </Row>
                </TabCard>
              </Tab>
            </Tabs>
          </CardLayout>
        </Col>
      </Row>
      <ToastContainer/>
    </PageLayout>
  );
}

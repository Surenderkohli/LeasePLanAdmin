import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Row, Col, Tab, Tabs } from "react-bootstrap";
import {
  LegendField,
  LegendTextarea,
  IconField,
} from "../../../../../components/fields";
import {
  Item,
  Anchor,
  Button,
} from "../../../../../components/elements";
import { CardLayout, TabCard } from "../../../../../components/cards";
import { Breadcrumb, FileUpload } from "../../../../../components";
import PageLayout from "../../../../../layouts/PageLayout";
import data from "../../../../../data/master/Bin/CMS/About/editAbout.json";
import {useQuery} from "../../../../../api/query";
import instance from "../../../../../api/axios";
import { Editor } from "@tinymce/tinymce-react";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditAbout() {
  const editorRef = useRef(null);
  const [CMSAboutData, setCMSAboutData] = useState()
  // const [CMSAboutDataEdit, setCMSAboutDataEdit] = useState("k")

  
  let query = useQuery()
let query_id  = query.get("query_id")
  
  const getCMSData = useCallback(async() => {
    try {
      await instance({
        url: "/cmsaboutcontent/get-about-content",
        method: "GET",
      }).then((res) => {
        setCMSAboutData(res.data)
      });
    } catch (e) {
      console.error(e);
    }
  }, [query_id]);
  const updateCSMData = async() => {
    try {
      await instance({
        url: `/cmsaboutcontent/edit-about-content/${query.get("query_id")}`,
        method: "put",
        data:CMSAboutData
      }).then((res) => {
        toast.success('Updated Sucessfully', {
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
      console.error(e);
    }
  };


  useEffect(() => {
    getCMSData()
  
    return () => {
      
    }
  }, [])
  

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
               
                <Row>
                  <Col xl={12}>
                    <TabCard title="introduction">
                      <Row>
                      <Col xl={12}>
                          {/* <LegendTextarea
                            title={data?.intro.name.title}

                            value = {CMSAboutData?.intro?.en?.introduction}
                            onChange={(e)=>
                              setCMSAboutData({...CMSAboutData,intro:{...CMSAboutData.intro,en:{...CMSAboutData.intro.en,introduction:e.target.value}}}
                            )}
                            placeholder="Type here..."
                          /> */}
                           <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            value = {CMSAboutData?.intro?.en?.introduction}
                            init={{
                              height: 250,
                              menubar: false,
                              toolbar: 'numlist bullist',
                              plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen','lists',

                                'insertdatetime media table paste code help wordcount'
                              ],
                              toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                            onEditorChange={(e)=>{
                              
                              setCMSAboutData({...CMSAboutData,intro:{...CMSAboutData.intro,en:{...CMSAboutData.intro.en,introduction:e}}}
                                )

                            }}
                            />
                        </Col>
                      </Row>
                    </TabCard>
                  </Col>
                  
                </Row>
                {/* second */}
                <TabCard title="Core Values">

                <Row>
                  <Col xl={6}>
                    <Row>
                      <Col>
                        <LegendField
                          title={data?.name.title}
                          value = {CMSAboutData?.corevalue?.en?.title?.title1}
                            onChange={(e)=>
                              setCMSAboutData({...CMSAboutData,corevalue:{...CMSAboutData.corevalue,en:{...CMSAboutData.corevalue.en,title:{...CMSAboutData.corevalue.en.title,title1:e.target.value}}}}
                            )}
                        />
                      </Col>

                      <Col xl={12}>
                        <LegendTextarea
                          title={data?.bio.title}
                          longText={data?.bio.longText}
                          placeholder="Type here..."
                          value = {CMSAboutData?.corevalue?.en?.desc?.desc1}
                          onChange={(e)=>
                            setCMSAboutData({...CMSAboutData,corevalue:{...CMSAboutData.corevalue,en:{...CMSAboutData.corevalue.en,desc:{...CMSAboutData.corevalue.en.desc,desc1:e.target.value}}}}
                          )}
                        />
                      </Col>
                    </Row>
                  </Col>

                  <Col xl={6}>
                    <Row>
                      <Col>
                        <LegendField
                          title={data?.name.title}
                          value = {CMSAboutData?.corevalue?.en?.title?.title2}
                          onChange={(e)=>
                            setCMSAboutData({...CMSAboutData,corevalue:{...CMSAboutData.corevalue,en:{...CMSAboutData.corevalue.en,title:{...CMSAboutData.corevalue.en.title,title2:e.target.value}}}}
                          )}
                        />
                      </Col>

                      <Col xl={12}>
                        <LegendTextarea
                          title={data?.bio.title}
                          longText={data?.bio.longText}
                          placeholder="Type here..."
                          value = {CMSAboutData?.corevalue?.en?.desc?.desc2}
                          onChange={(e)=>
                            setCMSAboutData({...CMSAboutData,corevalue:{...CMSAboutData.corevalue,en:{...CMSAboutData.corevalue.en,desc:{...CMSAboutData.corevalue.en.desc,desc2:e.target.value}}}}
                          )}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col xl={6}>
                    <Row>
                      <Col>
                        <LegendField
                          title={data?.name.title}
                          value = {CMSAboutData?.corevalue?.en?.title?.title3}
                          onChange={(e)=>
                            setCMSAboutData({...CMSAboutData,corevalue:{...CMSAboutData.corevalue,en:{...CMSAboutData.corevalue.en,title:{...CMSAboutData.corevalue.en.title,title3:e.target.value}}}}
                          )}
                        />
                      </Col>

                      <Col xl={12}>
                        <LegendTextarea
                          title={data?.bio.title}
                          longText={data?.bio.longText}
                          placeholder="Type here..."
                          value = {CMSAboutData?.corevalue?.en?.desc?.desc3}
                          onChange={(e)=>
                            setCMSAboutData({...CMSAboutData,corevalue:{...CMSAboutData.corevalue,en:{...CMSAboutData.corevalue.en,desc:{...CMSAboutData.corevalue.en.desc,desc3:e.target.value}}}}
                          )}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col xl={6}>
                    <Row>
                      <Col>
                        <LegendField
                          title={data?.name.title}
                          value = {CMSAboutData?.corevalue?.en?.title?.title4}
                          onChange={(e)=>
                            setCMSAboutData({...CMSAboutData,corevalue:{...CMSAboutData.corevalue,en:{...CMSAboutData.corevalue.en,title:{...CMSAboutData.corevalue.en.title,title4:e.target.value}}}}
                          )}
                        />
                      </Col>

                      <Col xl={12}>
                        <LegendTextarea
                          title={data?.bio.title}
                          longText={data?.bio.longText}
                          placeholder="Type here..."
                          value = {CMSAboutData?.corevalue?.en?.desc?.desc4}
                          onChange={(e)=>
                            setCMSAboutData({...CMSAboutData,corevalue:{...CMSAboutData.corevalue,en:{...CMSAboutData.corevalue.en,desc:{...CMSAboutData.corevalue.en.desc,desc4:e.target.value}}}}
                          )}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                </TabCard>

                {/* second end */}

                {/* thired end */}

                <Row>
                
                  <Col xl={6}>
                    <Button
                      className="mc-btn primary mt-3"
                      icon="verified"
                      text="Update"
                      onClick={()=>updateCSMData()}
                    />
                  </Col>
                 
                </Row>
                {/* </TabCard> */}
              </Tab>

              <Tab
                eventKey="arabic"
                title="عربي"
                className="mc-tabpane profile"
              >
               <Row>
                  <Col >
                    <TabCard title="introduction">
                      <Row>
                      <Col xl={12}>
                          {/* <LegendTextarea
                            title={data?.intro.name.title}
                            longText={data?.bio.longText}
                            value = {CMSAboutData?.intro?.ARE?.introduction}
                            onChange={(e)=>
                              setCMSAboutData({...CMSAboutData,intro:{...CMSAboutData.intro,ARE:{...CMSAboutData.intro.ARE,introduction:e.target.value}}}
                            )}
                            placeholder="Type here..."
                            // style={{height:"250px"}}
                          /> */}
                          <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            value = {CMSAboutData?.intro?.ARE?.introduction}
                            init={{
                              height: 250,
                              menubar: false,
                              toolbar: 'numlist bullist',
                              plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen','lists',

                                'insertdatetime media table paste code help wordcount'
                              ],
                              toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                            onEditorChange={(e)=>{
                              
                              setCMSAboutData({...CMSAboutData,intro:{...CMSAboutData.intro,ARE:{...CMSAboutData.intro.ARE,introduction:e}}})

                            }}
                            />
                        </Col>
                      </Row>
                    </TabCard>
                  </Col>
                  
                </Row>
                {/* second */}
                <TabCard title="Core Values">

                <Row>
                  <Col xl={6}>
                    <Row>
                      <Col>
                        <LegendField
                          title={data?.name.title}
                          value = {CMSAboutData?.corevalue?.ARE?.title?.title1}
                            onChange={(e)=>
                              setCMSAboutData({...CMSAboutData,corevalue:{...CMSAboutData.corevalue,ARE:{...CMSAboutData.corevalue.ARE,title:{...CMSAboutData.corevalue.ARE.title,title1:e.target.value}}}}
                            )}
                        />
                      </Col>

                      <Col xl={12}>
                        <LegendTextarea
                          title={data?.bio.title}
                          longText={data?.bio.longText}
                          placeholder="Type here..."
                          value = {CMSAboutData?.corevalue?.ARE?.desc?.desc1}
                          onChange={(e)=>
                            setCMSAboutData({...CMSAboutData,corevalue:{...CMSAboutData.corevalue,ARE:{...CMSAboutData.corevalue.ARE,desc:{...CMSAboutData.corevalue.ARE.desc,desc1:e.target.value}}}}
                          )}
                        />
                      </Col>
                    </Row>
                  </Col>

                  <Col xl={6}>
                    <Row>
                      <Col>
                        <LegendField
                          title={data?.name.title}
                          value = {CMSAboutData?.corevalue?.ARE?.title?.title2}
                          onChange={(e)=>
                            setCMSAboutData({...CMSAboutData,corevalue:{...CMSAboutData.corevalue,ARE:{...CMSAboutData.corevalue.ARE,title:{...CMSAboutData.corevalue.ARE.title,title2:e.target.value}}}}
                          )}
                        />
                      </Col>

                      <Col xl={12}>
                        <LegendTextarea
                          title={data?.bio.title}
                          longText={data?.bio.longText}
                          placeholder="Type here..."
                          value = {CMSAboutData?.corevalue?.ARE?.desc?.desc2}
                          onChange={(e)=>
                            setCMSAboutData({...CMSAboutData,corevalue:{...CMSAboutData.corevalue,ARE:{...CMSAboutData.corevalue.ARE,desc:{...CMSAboutData.corevalue.ARE.desc,desc2:e.target.value}}}}
                          )}
                          
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col xl={6}>
                    <Row>
                      <Col>
                        <LegendField
                          title={data?.name.title}
                          value = {CMSAboutData?.corevalue?.ARE?.title?.title3}
                          onChange={(e)=>
                            setCMSAboutData({...CMSAboutData,corevalue:{...CMSAboutData.corevalue,ARE:{...CMSAboutData.corevalue.ARE,title:{...CMSAboutData.corevalue.ARE.title,title3:e.target.value}}}}
                          )}
                        />
                      </Col>

                      <Col xl={12}>
                        <LegendTextarea
                          title={data?.bio.title}
                          longText={data?.bio.longText}
                          placeholder="Type here..."
                          value = {CMSAboutData?.corevalue?.ARE?.desc?.desc3}
                          onChange={(e)=>
                            setCMSAboutData({...CMSAboutData,corevalue:{...CMSAboutData.corevalue,ARE:{...CMSAboutData.corevalue.ARE,desc:{...CMSAboutData.corevalue.ARE.desc,desc3:e.target.value}}}}
                          )}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col xl={6}>
                    <Row>
                      <Col>
                        <LegendField
                          title={data?.name.title}
                          value = {CMSAboutData?.corevalue?.ARE?.title?.title4}
                          onChange={(e)=>
                            setCMSAboutData({...CMSAboutData,corevalue:{...CMSAboutData.corevalue,ARE:{...CMSAboutData.corevalue.ARE,title:{...CMSAboutData.corevalue.ARE.title,title4:e.target.value}}}}
                          )}
                        />
                      </Col>

                      <Col xl={12}>
                        <LegendTextarea
                          title={data?.bio.title}
                          longText={data?.bio.longText}
                          placeholder="Type here..."
                          value = {CMSAboutData?.corevalue?.ARE?.desc?.desc4}
                          onChange={(e)=>
                            setCMSAboutData({...CMSAboutData,corevalue:{...CMSAboutData.corevalue,ARE:{...CMSAboutData.corevalue.ARE,desc:{...CMSAboutData.corevalue.ARE.desc,desc4:e.target.value}}}}
                          )}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                </TabCard>

                <Row>
                
                  <Col xl={6}>
                    <Button
                      className="mc-btn primary mt-3"
                      icon="verified"
                      text="Update"
                      onClick={()=>updateCSMData()}
                    />
                  </Col>
                 
                </Row>
              </Tab>
            </Tabs>
          </CardLayout>
        </Col>
      </Row>
      <ToastContainer/>
    </PageLayout>
  );
}

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
import data from "../../../data/master/Bin/editPracticeArea.json";
import { useQuery } from "../../../api/query";
import instance from "../../../api/axios";
import { toast , ToastContainer} from "react-toastify";
import { uploadImage } from "../../../api/ImageUploader";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";



export default function EditPracticeArea() {
  const editorRef = useRef(null);

const query = useQuery()
const [singlePractice, setSinglePractice] = useState(null)

const getPractice=useCallback(async ()=>{
  try {
    await instance({
      url: `/practice/single-practice/${query.get("query_id")}`,
      method: "GET", 
    },).then((res) => {
      setSinglePractice(res.data)
    });
  } catch (e) {
    console.error(e);
  }
},[])



const updatePractice=async ()=>{
  try {
    await instance({
      url: `/practice/update-practice/${query.get("query_id")}`,
      method: "PUT",
      data:singlePractice
    }).then((res) => {
      toast.success('Practices Updated Sucessfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        setTimeout(() => {
          window.location.assign("/practicelist")
            
          }, 3000);
    });
  
  } catch (e) {
    console.error(e);
  }
}
useEffect(() => {
  getPractice()
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
                <TabCard title="information">
                  <Row>
                    <Col xl={4}>
                      <Box className="mc-user-avatar-upload ">
                        <Box
                          style={{ width: "100%" }}
                          className="mb-2 shadow-sm"
                        >
                          <Image
                            src={singlePractice?.en?.img}
                            alt={data?.avatar.alt}
                            className="rounded-4"
                            style={{ width: "100%", maxHeight: "250px" }}
                          />
                        </Box>
                        <FileUpload 
                        onChange={async(e) => setSinglePractice({...singlePractice,en:{...singlePractice.en,img:await uploadImage(e.target.files[0])}})}
                        icon="cloud_upload" text="upload" />
                      </Box>
                    </Col>
                    <Col xl={8}>
                      <Row>
                        <Col xl={6}>
                          <LegendField
                            title={data?.name.title}
                            value={singlePractice?.en?.title}
                            onChange={(e)=>setSinglePractice({...singlePractice,en:{...singlePractice.en,title:e.target.value}})}
                          />
                        </Col>
                        
                        <Col xl={6}>
                          <LegendField
                            title={data?.status.title}
                          
                            option={ data?.status.option } activeOption={ singlePractice?.status }
                      
                            onChange={(e)=>setSinglePractice({...singlePractice,status:e.target.value})}


                          />
                        </Col>
                        <Col xl={12}>
                        <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            value={singlePractice?.en?.desc}
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
                              
                              setSinglePractice({...singlePractice,en:{...singlePractice.en,desc:e}})

                            }}
                            />
                          {/* <LegendTextarea
                            title={data?.bio.title}
                            value={singlePractice?.en?.desc}
                            onChange={(e)=>setSinglePractice({...singlePractice,en:{...singlePractice.en,desc:e.target.value}})}
                            
                            placeholder="Type here..."
                          /> */}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl={4}></Col>
                    <Col xl={4}>
                      <Button
                        className="mc-btn primary mt-3 "
                        icon="verified"
                        text="Update"
                        onClick={()=> updatePractice()}
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
                            src={singlePractice?.ARE?.img}

                            alt={data?.avatar.alt}
                            className="rounded-4"
                            style={{ width: "100%", maxHeight: "250px" }}
                          />
                        </Box>
                        <FileUpload 
                        onChange={async(e) => setSinglePractice({...singlePractice,ARE:{...singlePractice.ARE,img:await uploadImage(e.target.files[0])}})}
                        
                        icon="cloud_upload" text="تحميل" />
                      </Box>
                    </Col>
                    <Col xl={8}>
                      <Row>
                        <Col xl={6}>
                          <LegendField
                            title={data?.ARE.name.title}
                            value={singlePractice?.ARE?.title}
                            onChange={(e)=>setSinglePractice({...singlePractice,ARE:{...singlePractice.ARE,title:e.target.value}})}
                            placeholder="أكتب هنا ..."
                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                          
                            title={data?.status.title}
                            activeOption={singlePractice?.status}
                            option={ data?.status.option } 
                            value={singlePractice?.status}
                            onChange={(e)=>setSinglePractice({...singlePractice,status:e.target.value})}
                            placeholder="أكتب هنا ..."
                          />
                        </Col>
                        <Col xl={12}>
                        <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            value={singlePractice?.ARE?.desc}
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
                              
                              setSinglePractice({...singlePractice,ARE:{...singlePractice.ARE,desc:e}})

                            }}
                            />
                          {/* <LegendTextarea
                            title={data?.ARE.bio.title}
                            value={singlePractice?.ARE?.desc}
                            onChange={(e)=>setSinglePractice({...singlePractice,ARE:{...singlePractice.ARE,desc:e.target.value}})}
                            placeholder="أكتب هنا ..."
                          /> */}
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
                        onClick={()=> updatePractice()}

                        text="إرسال"
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

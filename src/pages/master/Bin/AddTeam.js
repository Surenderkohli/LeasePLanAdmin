import React, { useState } from "react";
import { Row, Col, Tab, Tabs, Form } from "react-bootstrap";
import { LegendField, LegendTextarea } from "../../../components/fields";
import { Item, Anchor, Box, Button, Image } from "../../../components/elements";
import { CardLayout, TabCard } from "../../../components/cards";
import { Breadcrumb, FileUpload } from "../../../components";
import PageLayout from "../../../layouts/PageLayout";
import data from "../../../data/master/Bin/addTeam.json";
import instance from "../../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

export default function AddTeam() {
  const editorRef = useRef(null);

  const [ShowImage, setShowImage] = useState(null)
  const [postData, setPostData] = useState({
    en:{
      name:null,
      email:null,
      status:"active",
      desc:null,
      position:null,
    },
    experienceyear:null,
    img:null,

  })


  const imageUpload = (e) =>{
    if(e.target.files && e.target.files[0]){
      setShowImage(URL.createObjectURL(e.target.files[0]))
      setPostData({...postData,img:e.target.files[0]})
    }
  }

  const addTeam=async ()=>{

    const formData = new FormData()
    formData.append('name',postData.en.name)
    formData.append('email',postData.en.email)
    formData.append('desc',postData.en.desc)
    formData.append('position',postData.en.position)

    formData.append('experienceyear',postData.experienceyear)

    formData.append('img',postData.img)
    try {
      await instance({
        url: "/ourteams/add-team",
        method: "POST",
        data:formData,
        headers:{'Content-Type': 'multipart/form-data' }
      },).then((res) => {
        toast.success('New Member added Sucessfully', {
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
            window.location.assign("/ourteams")
              
            }, 3000);
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
         
            <Tabs defaultActiveKey="profile" id="mc" className="mc-tabs">
              <Tab
                eventKey="profile"
                // title="english"
                className="mc-tabpane profile"
              >
                <TabCard title="information">
                  <Row>
                    <Col xl={4}>
                      <Box className="mc-user-avatar-upload">
                        <Box className="mc-user-avatar">
                          <Image
                            src={ShowImage?ShowImage:data.avatar.src}

                            alt={data?.avatar.alt}
                          />
                        </Box>
                        <FileUpload onChange={(e)=>imageUpload(e)}icon="cloud_upload" text="upload" />
                      </Box>
                    </Col>
                    <Col xl={8}>
                      <Row>
                        <Col xl={6}>
                          <LegendField
                            title={data?.name?.title}
                            value={postData?.en?.name}
                            onChange={(e)=>{
                              setPostData({...postData,en:{...postData.en,name:e.target.value}})
                            }}
                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            title={data?.email?.title}
                            value={postData?.en?.email}
                            onChange={(e)=>{
                              setPostData({...postData,en:{...postData.en,email:e.target.value}})
                            }}
                          />
                        </Col>

                        <Col xl={6}>
                          <LegendField
                            title={data?.experience?.title}
                            value={postData?.experienceyear}
                            onChange={(e)=>{
                              setPostData({...postData,experienceyear:e.target.value})
                            }}
                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            title={data?.role.title}
                            option={data?.role.option}
                            activeOption={data?.role.activeOption}
                            value={postData?.en?.position}
                            onChange={(e)=>{
                              setPostData({...postData,en:{...postData.en,position:e.target.value}})
                            }}
                          />
                        </Col>

                        <Col xl={12}>
                        <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            // initialValue={postData?.en?.desc}
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
                              
                              setPostData({...postData,en:{...postData.en,desc:e}})
                            }}
                            />
                          {/* <LegendTextarea
                            title={data?.desc?.title}
                            value={postData?.en?.desc}
                            onChange={(e)=>{
                              setPostData({...postData,en:{...postData.en,desc:e.target.value}})
                            }}
                          /> */}
                        </Col>

                        <Col xl={12}>
                          <Button
                            className="mc-btn primary mt-3"
                            icon="verified"
                            text="Submit"
                            onClick={()=>{addTeam()}}
                          />
                        </Col>
                      </Row>
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
  );
}

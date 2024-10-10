import React, { useEffect ,useState} from "react";
import { Row, Col, Tab, Tabs, Form } from "react-bootstrap";
import {
  LegendField,
  LegendTextarea
} from "../../../components/fields";
import { Item, Anchor, Box, Button, Image } from "../../../components/elements";
import { CardLayout, TabCard } from "../../../components/cards";
import { Breadcrumb, FileUpload } from "../../../components";
import PageLayout from "../../../layouts/PageLayout";
import data from "../../../data/master/Bin/addBlog.json";
import instance from "../../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";


export default function AddBlog() {
  const editorRef = useRef(null);
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
  const addBlog=async ()=>{

    const formData = new FormData()
    formData.append('title',postData.en.title)
    formData.append('status',postData.en.status)
    formData.append('desc',postData.en.desc)
    formData.append('img',postData.en.img)
    try {
      await instance({
        url: "/blog/upload-blog",
        method: "POST",
        data:formData,
        headers:{'Content-Type': 'multipart/form-data' }
      },).then((res) => {
        toast.success('Blog Uploaded Sucessfully', {
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
            window.location.assign("/blogsection")
              
            }, 3000);
      });
    } catch (e) {
      toast.error('Something Went Wrong. Fill All the Details', {
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
                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            title={data?.status.title}
                            // value={postData?.en?.status}
                            option={ data?.status.option } activeOption={ postData?.en?.status }
                            onChange={(e)=>{
                            
                              setPostData({...postData,en:{...postData.en,status:e.target.value}})
                             }} 
                          />
                        </Col>
                        <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                           
                            init={{
                              height: 250,
                              menubar: false,
                                toolbar: 'numlist bullist',
                              plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',"list",
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
                        {/* <Col xl={12}>
                          <LegendTextarea
                            title={data?.bio.title}

                            value={postData?.en?.desc}
                            onChange={(e)=>{
                              setPostData({...postData,en:{...postData.en,desc:e.target.value}})

                             }} 
                            placeholder="Type here..."
                          />
                        </Col> */}
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl={4}></Col>
                    <Col xl={4}>
                      <Button
                        className="mc-btn primary mt-3"
                        icon="verified"
                        text="Submit"
                        onClick={()=>{ addBlog()}}
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

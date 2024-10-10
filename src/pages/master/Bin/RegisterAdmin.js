import React, { useState } from "react";
import { Row, Col, Tab, Tabs, Form } from "react-bootstrap";
import {
  LegendField,
} from "../../../components/fields";
import { Item, Anchor, Box, Button, Image } from "../../../components/elements";
import { CardLayout, TabCard } from "../../../components/cards";
import { Breadcrumb, FileUpload } from "../../../components";
import PageLayout from "../../../layouts/PageLayout";
import data from "../../../data/master/Bin/registerAdmin.json";
import instance from "../../../api/axios";
import { toast, ToastContainer } from "react-toastify";


export default function RegisterAdmin() {

  const [adminData, setAdminData] = useState(null)
  const [ShowImage, setShowImage] = useState(null)
  const imageUpload = (e) =>{
    if(e.target.files && e.target.files[0]){
      setShowImage(URL.createObjectURL(e.target.files[0]))
      setAdminData({...adminData,img:e.target.files[0]})
    }
  }
  const addAdmin=async ()=>{

    const formData = new FormData()
    formData.append('name',adminData.name)
    formData.append('email',adminData.email)
    formData.append('mobileNumber',adminData.mobileNumber)
    formData.append('address',adminData.address)
    formData.append('emirates',adminData.emirates)
    formData.append('role',adminData.role)
    formData.append('practice',adminData.practice)
    formData.append('password',adminData.password)
    formData.append('img',adminData.img)

    try {
      await instance({
        url: "/auth/signup",
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
          setTimeout(() => {
          window.location.assign("/active-admin")
            
          }, 3000);
      });
    } catch (e) {
      
      toast.error('Something Went wrong,Email should be valid ', {
        position: "top-right",
        autoClose: 2000,
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
              <Tab eventKey="profile"
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
                        <FileUpload   onChange={(e)=>imageUpload(e)} icon="cloud_upload" text="upload" />
                      </Box>
                    </Col>
                    <Col xl={8}>
                      <Row>
                        <Col xl={6}>
                          <LegendField
                            title={data?.name?.title}
                            value={adminData?.name}
                            onChange={(e)=> setAdminData({...adminData,name:e.target.value})}
                            placeholder="Enter your full name"
                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                          type="email"
                            title={data?.email?.title}
                            value={adminData?.email}
                            onChange={(e)=> setAdminData({...adminData,email:e.target.value})}
                            placeholder="Enter your email"
                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            title={data?.phone?.title}
                            value={adminData?.mobileNumber}
                            onChange={(e)=> setAdminData({...adminData,mobileNumber:e.target.value})}
                            placeholder="Enter your contact no."
                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            title={data?.address?.title}
                            value={adminData?.address}
                            onChange={(e)=> setAdminData({...adminData,address:e.target.value})}
                            placeholder="Enter your full address"
                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            title={data?.emirates?.title}
                            value={adminData?.emirates}
                            onChange={(e)=> setAdminData({...adminData,emirates:e.target.value})}
                             placeholder="Enter your emirates"
                          />
                        </Col>
                        <Col xl={6}>
                          {/* <LegendField
                            title={data?.role.title}
                            value={adminData?.role}
                            onChange={(e)=> setAdminData({...adminData,role:e.target.value})}
                          /> */}
                           <LegendField
                            title={data?.role.title}
                            option={data?.role.option}
                            activeOption={data?.role.activeOption}
                            value={adminData?.role}
                            onChange={(e)=>{
                              setAdminData({...adminData,role:e.target.value})
                            }}
                            placeholder="Enter your role"
                          />
                        </Col>

                        <Col xl={6}>
                          <LegendField
                            title={data?.practice?.title}
                            value={adminData?.practice}
                            onChange={(e)=> setAdminData({...adminData,practice:e.target.value})}
                            placeholder="Enter your practices"
                          />
                        </Col>

                        <Col xl={6}>
                          <LegendField
                          type="password"
                            title={data?.password?.title}
                            value={adminData?.password}
                            passwordVisible
                            onChange={(e)=> setAdminData({...adminData,password:e.target.value})}
                            placeholder="Enter your password"
                          />
                        </Col>
                        <Col xl={12}>
                          <Button
                            className="mc-btn primary mt-3"
                            icon="verified"
                            text="Submit"
                            onClick={()=> addAdmin()}
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

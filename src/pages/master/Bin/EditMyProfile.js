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
import data from "../../../data/master/Bin/editMyAcount.json";
import { useQuery } from "../../../api/query";
import instance from "../../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import { uploadImage } from "../../../api/ImageUploader"

export default function EditMyProfile() {
  const [singledamin, setSingleAdmin] = useState(null);
  const [passwordChange, setpasswordChange] = useState(null);
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("admin_role_validation"))

  const query = useQuery();
  const getAdmin = useCallback(async () => {
    try {
      await instance({
        url: `/auth/get-single-admin/${query.get("query_id")}`,
        method: "GET",
      }).then((res) => {
        setSingleAdmin(res.data);
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const updateAdmin = async () => {
    try {
      await instance({
        url: `/auth/update-admin/${query.get("query_id")}`,
        method: "PUT",
        data: singledamin,
      }).then((res) => {
        toast.success("Updated Sucessfully", {
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
      toast.error("Something Went Wrong.", {
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

  const updatePassword = async () => {
    try {
      await instance({
        url: `/auth/update-admin/${query.get("query_id")}`,
        method: "PUT",
        data: { ...singledamin, password: passwordChange },
      }).then((res) => {
        toast.success("Password Updated Sucessfully", {
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
      toast.error("Something Went Wrong.", {
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
  // console.log(">>>",passwordChange.password)
  useEffect(() => {
    getAdmin();
    return () => { };
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
            <Tabs defaultActiveKey="profile" id="mc" className="mc-tabs">
              <Tab
                eventKey="profile"
                title="profile"
                className="mc-tabpane profile"
              >
                {/* <TabCard title="information"> */}
                  <Row>
                    <Col xl={4}>
                      <Box className="mc-user-avatar-upload">
                        <Box className="mc-user-avatar">
                          <Image
                            src={singledamin?.img}
                            alt={data?.avatar.alt}
                          />
                        </Box>
                        <FileUpload
                          onChange={async (e) => setSingleAdmin({ ...singledamin, img: await uploadImage(e.target.files[0]) })}
                          icon="cloud_upload"
                          text="upload"
                        />
                      </Box>
                    </Col>
                    <Col xl={8}>
                      <Row>
                        <Col xl={6}>
                          <LegendField
                            title={data?.name.title}
                            value={singledamin?.name}
                            onChange={(e) =>
                              setSingleAdmin({
                                ...singledamin,
                                name: e.target.value,
                              })
                            }
                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            title={data?.email.title}
                            value={singledamin?.email}
                            onChange={(e) =>
                              setSingleAdmin({
                                ...singledamin,
                                email: e.target.value,
                              })
                            }
                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            title={data?.phone.title}
                            value={singledamin?.mobileNumber}
                            onChange={(e) =>
                              setSingleAdmin({
                                ...singledamin,
                                mobileNumber: e.target.value,
                              })
                            }
                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            title={data?.role.title}
                            // option={data?.role.option}
                            activeOption={singledamin?.role}
                            value={singledamin?.role}
                          // onChange={(e) =>
                          //   setSingleAdmin({
                          //     ...singledamin,
                          //     role: e.target.value,
                          //   })
                          // }
                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            title={data?.status.title}
                            option={data?.status.option}
                            activeOption={
                              singledamin?.isActive ? "active" : "inactive"
                            }
                            // value={singledamin?.isActive}
                            onChange={(e) =>
                              setSingleAdmin({
                                ...singledamin,
                                isActive:
                                  e.target.value == "active" ? true : false,
                              })
                            }
                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            title={data?.address.title}
                            value={singledamin?.address}
                            onChange={(e) =>
                              setSingleAdmin({
                                ...singledamin,
                                address: e.target.value,
                              })
                            }
                          />
                        </Col>
                      </Row>
                    
                      {currentUser==="CEO"   && <Button
                        className="mc-btn primary mt-3 mt-3"
                        icon="verified"
                        text="Update"
                        onClick={() => updateAdmin()}
                      />}
                        {currentUser==="Super Admin"  && <Button
                        className="mc-btn primary mt-3 mt-3"
                        icon="verified"
                        text="Update"
                        onClick={() => updateAdmin()}
                      />}
                    </Col>
                  </Row>
                {/* </TabCard> */}
                {/* <TabCard title="About Us"> */}
                <Row>

                </Row>

              </Tab>
              {
                currentUser == "Super Admin" || currentUser === "CEO" ? <Tab
                  eventKey="password"
                  title="Change Password"
                  className="mc-tabpane password"
                >
                  <TabCard title="generate password">
                    <Row>
                      <Col xs={12} md={12}>
                        <IconField
                          icon="add_moderator"
                          type="password"
                          placeholder="new password"
                          classes="w-100 h-lg"
                          passwordVisible
                          value={passwordChange}
                          onChange={(e) => setpasswordChange(e.target.value)}
                        />
                      </Col>
                    </Row>
                  </TabCard>
                  {currentUser==="Super Admin" &&  <Button
                    className="mc-btn primary mt-3"
                    icon="verified"
                    text="Update"
                    onClick={() => updatePassword()}
                  />}
                  {currentUser==="CEO" &&  <Button
                    className="mc-btn primary mt-3"
                    icon="verified"
                    text="Update"
                    onClick={() => updatePassword()}
                  />}
                </Tab> : <></>
              }
            </Tabs>
          </CardLayout>
        </Col>
      </Row>
      <ToastContainer />
    </PageLayout>
  );
}

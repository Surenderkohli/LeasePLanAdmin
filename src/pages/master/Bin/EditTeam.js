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
import data from "../../../data/master/Bin/editTeam.json";
import { useQuery } from "../../../../src/api/query";
import instance from "../../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import { uploadImage } from "../../../api/ImageUploader";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

export default function EditTeam() {
  const editorRef = useRef(null);

  let PF = "https://api.binhaider.dev.client.kloudlite.io/";
  const [ShowImage, setShowImage] = useState(null);

  const query = useQuery();
  const [singleTeamData, setSingleTeamData] = useState(null);
  const imageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setShowImage(URL.createObjectURL(e.target.files[0]));

      setSingleTeamData({ ...singleTeamData, img: e.target.files[0] });
    }
  };
  const getTeam = useCallback(async () => {
    try {
      await instance({
        url: `/ourteams/get-single-team/${query.get("query_id")}`,
        method: "GET",
      }).then((res) => {
        setSingleTeamData(res.data);
        setShowImage(`https://api.binhaider.dev.client.kloudlite.io/${res.data.img}`);
      });
    } catch (e) {
      console.error(e);
    }
  }, [query.get("query_id")]);

  const updateTeam = async () => {
    try {
      await instance({
        url: `/ourteams/update-team/${query.get("query_id")}`,
        method: "put",
        data: singleTeamData,
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
          window.location.assign("/ourteams")
            
          }, 3000);
      });
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getTeam();
    return () => {};
  }, [query.get("query_id")]);

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
                      <Box className="mc-user-avatar-upload">
                        <Box className="mc-user-avatar">
                          <Image src={singleTeamData?.img} alt={data?.avatar.alt} />
                        </Box>
                        <FileUpload
onChange={async(e) => setSingleTeamData({...singleTeamData,img:await uploadImage(e.target.files[0])})}

                          icon="cloud_upload"
                          text="upload"
                        />
                      </Box>
                    </Col>
                    <Col xl={8}>
                      <Row>
                        <Col xl={6}>
                          <LegendField
                            title={data?.name?.title}
                            value={singleTeamData?.en?.name}
                            onChange={(e) => {
                              setSingleTeamData({
                                ...singleTeamData,
                                en: {
                                  ...singleTeamData.en,
                                  name: e.target.value,
                                },
                              });
                            }}
                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            title={data?.email?.title}
                            value={singleTeamData?.en?.email}
                            onChange={(e) => {
                              setSingleTeamData({
                                ...singleTeamData,
                                en: {
                                  ...singleTeamData.en,
                                  email: e.target.value,
                                },
                              });
                            }}
                          />
                        </Col>

                        <Col xl={12}>
                          <LegendField
                            title={data?.experience?.title}
                            value={singleTeamData?.experienceyear}
                            onChange={(e) => {
                              setSingleTeamData({
                                ...singleTeamData,
                                experienceyear: e.target.value,
                              });
                            }}
                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            title={data?.role.title}
                            option={data?.role.option}
                            activeOption={singleTeamData?.en?.position}
                            value={singleTeamData?.en?.position}
                            onChange={(e) => {
                              setSingleTeamData({
                                ...singleTeamData,
                                en: {
                                  ...singleTeamData.en,
                                  position: e.target.value,
                                },
                              });
                            }}
                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            title={data?.status.title}
                            // value={singleBlog?.status}
                            option={data?.status.option}
                            activeOption={singleTeamData?.isActive}
                            onChange={(e) => {
                              setSingleTeamData({
                                ...singleTeamData,
                                isActive: e.target.value,
                              });
                            }}
                          />
                        </Col>
                        {/* <Col xl={6}>
                          <LegendField
                            title={data?.status.title}
                            option={data?.status.option}
                            activeOption={singleTeamData?.isActive}
                            // value={singleTeamData?.isActive}
                            onChange={(e) => {
                              setSingleTeamData({
                                ...singleTeamData,
                                en: {
                                  ...singleTeamData.en,
                                  position: e.target.value,
                                },
                              });
                            }}
                          />
                        </Col> */}
                        {/* <Col xl={6}>
                          <LegendField
                            title={data?.featured.title}
                            option={data?.featured.option}
                            activeOption={singleTeamData?.featured}
                            value={singleTeamData?.featured}
                            onChange={(e) => {
                              setSingleTeamData({
                                ...singleTeamData,
                                en: {
                                  ...singleTeamData.en,
                                  position: e.target.value,
                                },
                              });
                            }}
                          />
                        </Col> */}

                        <Col xl={12}>
                        <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            value={singleTeamData?.en?.desc}
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
                              
                              setSingleTeamData({
                                ...singleTeamData,
                                en: {
                                  ...singleTeamData.en,
                                  desc: e
                                },
                              });
                            }}
                            />
                          {/* <LegendTextarea
                            value={singleTeamData?.en?.desc}
                            onChange={(e) => {
                              setSingleTeamData({
                                ...singleTeamData,
                                en: {
                                  ...singleTeamData.en,
                                  desc: e.target.value,
                                },
                              });
                            }}
                          /> */}
                        </Col>

                        <Col xl={12}>
                          <Button
                            className="mc-btn primary mt-3"
                            icon="verified"
                            text="Update"
                            onClick={() => {
                              updateTeam();
                            }}
                          />
                        </Col>
                      </Row>
                    </Col>
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
                      <Box className="mc-user-avatar-upload">
                      <Box className="mc-user-avatar">
                          <Image src={singleTeamData?.img} alt={data?.avatar.alt} />
                        </Box>
                        <FileUpload
                          onChange={async(e) => setSingleTeamData({...singleTeamData,img:await uploadImage(e.target.files[0])})}
                          icon="cloud_upload"
                          text="upload"
                        />
                      </Box>
                    </Col>
                    <Col xl={8}>
                      <Row>
                        <Col xl={6}>
                          <LegendField
                            title={data?.name?.title}
                            value={singleTeamData?.ARE?.name}
                            onChange={(e) => {
                              setSingleTeamData({
                                ...singleTeamData,
                                ARE: {
                                  ...singleTeamData.ARE,
                                  name: e.target.value,
                                },
                              });
                            }}
                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            title={data?.email?.title}
                            value={singleTeamData?.ARE?.email}
                            onChange={(e) => {
                              setSingleTeamData({
                                ...singleTeamData,
                                ARE: {
                                  ...singleTeamData.ARE,
                                  email: e.target.value,
                                },
                              });
                            }}
                          />
                        </Col>

                        <Col xl={6}>
                          <LegendField
                            title={data?.experience?.title}
                            value={singleTeamData?.experienceyear}
                            onChange={(e) => {
                              setSingleTeamData({
                                ...singleTeamData,
                                experienceyear: e.target.value,
                              });
                            }}
                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            title={data?.role.title}
                            option={data?.role.option}
                            activeOption={singleTeamData?.en?.position}
                            value={singleTeamData?.ARE?.position}
                            onChange={(e) => {
                              setSingleTeamData({
                                ...singleTeamData,
                                ARE: {
                                  ...singleTeamData.ARE,
                                  position: e.target.value,
                                },
                              });
                            }}
                          />
                        </Col>

                        <Col xl={12}>
                        <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            value={singleTeamData?.ARE?.desc}
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
                              
                              setSingleTeamData({
                                ...singleTeamData,
                                ARE: {
                                  ...singleTeamData.ARE,
                                  desc: e
                                },
                              });
                            }}
                            />
                          {/* <LegendTextarea
                            value={singleTeamData?.ARE?.desc}
                            onChange={(e) => {
                              setSingleTeamData({
                                ...singleTeamData,
                                ARE: {
                                  ...singleTeamData.ARE,
                                  desc: e.target.value,
                                },
                              });
                            }}
                          /> */}
                        </Col>

                        <Col xl={12}>
                          <Button
                            className="mc-btn primary mt-3"
                            icon="verified"
                            text="Update"
                            onClick={() => {
                              updateTeam();
                            }}
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
      <ToastContainer />
    </PageLayout>
  );
}

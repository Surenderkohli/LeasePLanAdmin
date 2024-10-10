
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Row, Col, Tab, Tabs } from "react-bootstrap";
import {
  LegendField,
  LegendTextarea,
  IconField,
} from "../../../../components/fields";
import { Item, Anchor, Button, Box, Image } from "../../../../components/elements";
import { CardLayout, TabCard } from "../../../../components/cards";
import { Breadcrumb, FileUpload } from "../../../../components";
import PageLayout from "../../../../layouts/PageLayout";
import data from "../../../../data/master/Bin/CMS/CEO/message.json"

import { useQuery } from "../../../../api/query";
import instance from "../../../../api/axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from "react";
export default function Message() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      // console.log(editorRef.current.getContent());
    }
  };
  const [CMSAboutData, setCMSAboutData] = useState()

  let query = useQuery()
  let query_id = query.get("query_id")

  const getCMSData = useCallback(async () => {
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

  // console.log(CMSAboutData)
  const updateCSMData = async () => {
    try {
      await instance({
        url: `/cmsaboutcontent/edit-about-content/${query.get("query_id")}`,
        method: "put",
        data: CMSAboutData
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
  // const initialText = 'The quick brown fox jumps over the lazy dog';
  const textToHtml = (text) => {
    const elem = document.createElement('div');
    return text?.split(/\n\n+/).map((paragraph) => {
      return '<p>' + paragraph?.split(/\n+/).map((line) => {
        elem.textContent = line;
        return elem.innerHTML;
      }).join('<br/>') + '</p>';
    }).join('');
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

        {/* <button onClick={log}>Log editor content</button> */}
        <Col xl={12}>
          <CardLayout>
            <Tabs defaultActiveKey="english" id="mc" className="mc-tabs">
              <Tab
                eventKey="english"
                title="english"
                className="mc-tabpane profile"
              >
                <TabCard title="CEO's Message">
                  <Row>
                    <Col xl={4}>
                      <Box className="mc-user-avatar-upload ">
                        <Box
                          style={{ width: "100%" }}
                          className="mb-2 shadow-sm"
                        >
                          <Image
                            src={
                              CMSAboutData
                                ?.CEO?.img

                            }
                            alt={data?.avatar.alt}
                            className="rounded-4"
                            style={{ width: "100%", maxHeight: "240px" }}
                          />
                        </Box>
                        <FileUpload icon="cloud_upload" text="upload" />
                      </Box>
                    </Col>
                    <Col xl={8}>
                      <Row>
                        <Col xl={12}>
                          <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            // initialValue={textToHtml(CMSAboutData?.CEO?.en?.message)}
                            value={CMSAboutData?.CEO?.en?.message}

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
                            onEditorChange={(e) => {
                              setCMSAboutData({ ...CMSAboutData, CEO: { ...CMSAboutData.CEO, en: { ...CMSAboutData.CEO.en, message:e} } })

                            }}
                          />
                          {/* <LegendTextarea
                            title={data?.bio.title}
                            fieldSize="h-text-xl w-100"
                            value={CMSAboutData?.CEO?.en?.message}
                            onChange={(e) => {
                              setCMSAboutData({...CMSAboutData,CEO:{...CMSAboutData.CEO,en:{...CMSAboutData.CEO.en,message:e.target.value}}})}
                             
                            }
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
                        className="mc-btn primary mt-3 mt-3"
                        icon="verified"
                        text="Update"
                        onClick={() => updateCSMData()}
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
                <TabCard title="CEO's Message">
                  <Row>
                    <Col xl={4}>
                      <Box className="mc-user-avatar-upload ">
                        <Box
                          style={{ width: "100%" }}
                          className="mb-2 shadow-sm"
                        >
                          <Image
                            src={
                              CMSAboutData
                                ?.CEO?.img

                            }
                            alt={data?.avatar.alt}
                            className="rounded-4"
                            style={{ width: "100%", maxHeight: "240px" }}
                          />
                        </Box>
                        <FileUpload icon="cloud_upload" text="تحميل" />
                      </Box>
                    </Col>
                    <Col xl={8}>
                      <Row>
                        <Col xl={12}>
                          <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue={CMSAboutData?.CEO?.ARE?.message}
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
                              setCMSAboutData({...CMSAboutData,CEO:{...CMSAboutData.CEO,ARE:{...CMSAboutData.CEO.ARE,message:e}}})

                            }}
                          />
                          {/* <LegendTextarea
                            title={data?.bio.title}

                            value={CMSAboutData?.CEO?.ARE?.message}
                            onChange={(e) =>
                              setCMSAboutData({ ...CMSAboutData, CEO: { ...CMSAboutData.CEO, ARE: { ...CMSAboutData.CEO.ARE, message: e.target.value } } })}
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
                        className="mc-btn primary mt-3 mt-3"
                        icon="verified"
                        text="Update"
                        onClick={() => updateCSMData()}
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
      <ToastContainer />
    </PageLayout>
  );
}

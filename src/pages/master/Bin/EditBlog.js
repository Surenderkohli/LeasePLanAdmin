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
import data from "../../../data/master/Bin/editBlog.json";
import { useQuery } from "../../../../src/api/query";
import instance from "../../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import { uploadImage } from "../../../api/ImageUploader";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function EditBlog() {
  const editorRef = useRef(null);
  const [editorValue, setEditorValue] = useState(null)
  const [singleBlog, setSingleBlog] = useState(null);
  const query = useQuery();

  const getBlog = useCallback(async () => {
    try {
      await instance({
        url: `/blog/single-blog/${query.get("query_id")}`,
        method: "GET",
      }).then((res) => {
        setSingleBlog(res.data);
        setEditorValue(res.data.desc)
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const updateBlog = async () => {
    try {
      await instance({
        url: `/blog/update-blog/${query.get("query_id")}`,
        method: "PUT",
        data: singleBlog,
      }).then((res) => {
        toast.success("Blog Updated Sucessfully", {
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
    getBlog();
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
                              singleBlog?.en?.img
                            }
                            alt={data?.avatar.alt}
                            className="rounded-4"
                            style={{ width: "100%", maxHeight: "250px" }}
                          />
                          {/* img:await uploadImage(e.target.files[0]) */}
                        </Box>
                        <FileUpload onChange={async (e) => setSingleBlog({ ...singleBlog, en: { ...singleBlog.en, img: await uploadImage(e.target.files[0]) } })} icon="cloud_upload" text="upload" />
                      </Box>
                    </Col>
                    <Col xl={8}>
                      <Row>
                        <Col xl={6}>
                          <LegendField
                            title={data?.name.title}
                            value={singleBlog?.en?.title}
                            onChange={(e) => {
                              setSingleBlog({
                                ...singleBlog,
                                en: { ...singleBlog.en, title: e.target.value },
                              });
                            }}
                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            title={data?.status.title}
                            // value={singleBlog?.status}
                            option={data?.status.option}
                            activeOption={singleBlog?.status}
                            onChange={(e) => {
                              setSingleBlog({
                                ...singleBlog,
                                status: e.target.value,
                              });
                            }}
                          />
                        </Col>
                        <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            value={singleBlog?.en?.desc}
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
                           
                              setSingleBlog({
                                ...singleBlog,
                                en: { ...singleBlog.en, desc:e },
                              });
                            }}
                            />
                        {/* <Col xl={12}>
                          <LegendTextarea
                            title={data?.bio.title}
                            value={singleBlog?.en?.desc}
                            onChange={(e) => {
                              setSingleBlog({
                                ...singleBlog,
                                en: { ...singleBlog.en, desc: e.target.value },
                              });
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
                        text="Update"
                        onClick={() => updateBlog()}
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
                              singleBlog
                                ? singleBlog?.ARE?.img
                                : data?.avatar.src
                            }
                            alt={data?.avatar.alt}
                            className="rounded-4"
                            style={{ width: "100%", maxHeight: "250px" }}
                          />
                        </Box>
                        <FileUpload
                          onChange={async (e) => setSingleBlog({ ...singleBlog, ARE: { ...singleBlog.ARE, img: await uploadImage(e.target.files[0]) } })}
                          icon="cloud_upload" text="تحميل" />
                      </Box>
                    </Col>
                    <Col xl={8}>
                      <Row>
                        <Col xl={6}>
                          <LegendField
                            title={data?.ARE.name.title}
                            value={singleBlog?.ARE?.title}
                            onChange={(e) => {
                              setSingleBlog({
                                ...singleBlog,
                                ARE: {
                                  ...singleBlog.ARE,
                                  title: e.target.value,
                                },
                              });
                            }}
                            placeholder="أكتب هنا ..."
                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            title={data?.ARE.status.title}
                            // value={singleBlog?.status}
                            option={data?.status.option}
                            activeOption={singleBlog?.status}
                            onChange={(e) => {
                              setSingleBlog({
                                ...singleBlog,
                                status: e.target.value,
                              });
                            }}
                            placeholder="أكتب هنا ..."
                          />
                        </Col>
                        <Editor
                          onInit={(evt, editor) => editorRef.current = editor}
                          value={singleBlog?.ARE?.desc}
                          // initialValue={editorValue}
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
                           
                            setSingleBlog({
                              ...singleBlog,
                              ARE: { ...singleBlog.ARE, desc:e},
                            });
                          
                          }}
                        />
                        {/* <Col xl={12}>
                          <LegendTextarea
                            title={data?.bio.title}
                            value={singleBlog?.ARE?.desc}
                            onChange={(e) => {
                              setSingleBlog({
                                ...singleBlog,
                                ARE: { ...singleBlog.ARE, desc:e.target.value},
                              });
                            
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
                        text="إرسال"
                        onClick={() => updateBlog()}
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

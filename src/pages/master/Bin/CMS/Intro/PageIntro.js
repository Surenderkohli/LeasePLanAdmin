import React, { useCallback, useEffect, useMemo, useState,useRef } from "react";
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
    Box,
    Image,
} from "../../../../../components/elements";
import { CardLayout, TabCard } from "../../../../../components/cards";
import { Breadcrumb, FileUpload } from "../../../../../components";
import PageLayout from "../../../../../layouts/PageLayout";
import data from "../../../../../data/master/Bin/CMS/Intro/intro.json";
import { useQuery } from "../../../../../api/query";
import instance from "../../../../../api/axios";
import { getpageintroapi, updatepageintroapi } from "../../../../../api/endpoints";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Editor } from "@tinymce/tinymce-react";


export default function PageIntro() {
  const editorRef = useRef(null);

    const [introductionData, setIntroductionData] = useState()
    // const [CMSAboutDataEdit, setCMSAboutDataEdit] = useState("k")


    let query = useQuery()
    let query_id = query.get("query_id")

    const introductionDataFunction = useCallback(async () => {
        try {
            await instance({
                url: `${getpageintroapi}/${query.get("query_id")}`,
                method: "GET",
            }).then((res) => {
                setIntroductionData(res.data)
            });
        } catch (e) {
            console.error(e);
        }
    }, [query_id]);
    const updateintroductionDataFunction = async () => {
        try {
            await instance({
                url: `${updatepageintroapi}/${query.get("query_id")}`,
                method: "put",
                data: introductionData
            }).then((res) => {
                // toast.success('Updated Sucessfully', {
                //     position: "top-right",
                //     autoClose: 2000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     theme: "light",
                // });
                window.location.reload()
            });
        } catch (e) {
            console.error(e);
        }
    };


    useEffect(() => {
        introductionDataFunction()

        return () => {

        }
    }, [])


    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <Breadcrumb title={data?.pageTitle}>
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

                                        <Row>
                                            <Col xl={6}>
                                                <TabCard title="Banner">
                                                    <Box className="mc-user-avatar-upload ">
                                                        <Box

                                                            className="mb-2 shadow-sm"
                                                        >
                                                         
                                                        </Box>
                                                        <LegendTextarea
                                                            title={"Banner video link"}
                                                            value={introductionData?.banner}
                                                            onChange={(e) =>
                                                                setIntroductionData({ ...introductionData, banner: e.target.value }
                                                                )}
                                                            placeholder="Type here..."
                                                        />
                                                    </Box>
                                                </TabCard>

                                            </Col>

                                            <Col xl={6}>
                                                <TabCard title="Our Vision">
                                                    <Editor
                                                        onInit={(evt, editor) => editorRef.current = editor}
                                                        value={introductionData?.en?.vision}
                                                        init={{
                                                            height: 185,
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

                                                            setIntroductionData({ ...introductionData, en: { ...introductionData.en, vision: e } })
                                                        }}
                                                    />
                                                   
                                                </TabCard>
                                            </Col>
                                        </Row>
                                    </Col>

                                </Row>
                                {/* second */}


                                <Row>
                                    <Col xl={12}>
                                        <TabCard title="OurTeam Intro">
                                            <Editor
                                                onInit={(evt, editor) => editorRef.current = editor}
                                                value={introductionData?.en?.ourteam}
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

                                                    setIntroductionData({ ...introductionData, en: { ...introductionData.en, ourteam: e } }
                                                    )
                                                }}
                                            />
                                          
                                        </TabCard>
                                    </Col>

                                    <Col xl={12}>
                                        <TabCard title="Practice's Intro">

                                            <Editor
                                                onInit={(evt, editor) => editorRef.current = editor}
                                                value={introductionData?.en?.practice}
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

                                                    setIntroductionData({ ...introductionData, en: { ...introductionData.en, practice: e } }
                                                    )
                                                }}
                                            />

                                            
                                        </TabCard>
                                    </Col>


                                </Row>

                                <Row>

                                    <Col xl={6}>
                                        <Button
                                            className="mc-btn primary mt-3"
                                            icon="verified"
                                            text="Update"
                                            onClick={() => updateintroductionDataFunction()}
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
                                    <Col xl={12}>

                                        <Row>
                                            <Col xl={6}>
                                                <TabCard title="Banner">
                                                    <Box className="mc-user-avatar-upload ">
                                                        <Box
                                                            style={{ width: "100%" }}
                                                            className="mb-2 shadow-sm"
                                                        >
                                                           
                                                        </Box>
                                                       
                                                        <LegendTextarea
                                                            title={"Banner video link"}
                                                            value={introductionData?.banner}
                                                            onChange={(e) =>
                                                                setIntroductionData({ ...introductionData, banner: e.target.value }
                                                                )}
                                                            placeholder="Type here..."
                                                        />
                                                    </Box>
                                                </TabCard>

                                            </Col>

                                            <Col xl={6}>
                                                <TabCard title="Our Vision">
                                                <Editor
                                                        onInit={(evt, editor) => editorRef.current = editor}
                                                        value={introductionData?.ARE?.vision}
                                                        init={{
                                                            height: 185,
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

                                                            setIntroductionData({ ...introductionData, ARE: { ...introductionData.ARE, vision: e } })
                                                        }}
                                                    />
                                                    
                                                </TabCard>
                                            </Col>
                                        </Row>
                                    </Col>

                                </Row>
                                {/* second */}


                                <Row>
                                    <Col xl={12}>
                                        <TabCard title="OurTeam Intro">
                                            <Editor
                                                onInit={(evt, editor) => editorRef.current = editor}
                                                value={introductionData?.ARE?.ourteam}
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

                                                    setIntroductionData({ ...introductionData, ARE: { ...introductionData.ARE, ourteam: e } }
                                                    )
                                                }}
                                            />
                                            
                                        </TabCard>
                                    </Col>

                                    <Col xl={12}>
                                        <TabCard title="Practice's Intro">
                                            <Editor
                                                onInit={(evt, editor) => editorRef.current = editor}
                                                value={introductionData?.ARE?.practice}
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

                                                    setIntroductionData({ ...introductionData, ARE: { ...introductionData.ARE, practice: e } }
                                                    )
                                                }}
                                            />
                                            {/* <LegendTextarea
                                                title={data?.intro.name.title}

                                                value={introductionData?.ARE?.practice}
                                                onChange={(e) =>

                                                    setIntroductionData({ ...introductionData, ARE: { ...introductionData.ARE, practice: e.target.value } }
                                                    )
                                                }
                                                placeholder="Type here..."
                                            /> */}
                                        </TabCard>
                                    </Col>


                                </Row>


                                {/* second end */}

                                {/* thired end */}

                                <Row>

                                    <Col xl={6}>
                                        <Button
                                            className="mc-btn primary mt-3"
                                            icon="verified"
                                            text="Update"
                                            onClick={() => updateintroductionDataFunction()}
                                        />
                                    </Col>

                                </Row>
                            </Tab>
                        </Tabs>
                    </CardLayout>
                </Col>
            </Row>
            <ToastContainer />
        </PageLayout>
    );
}

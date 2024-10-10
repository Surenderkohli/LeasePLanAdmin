import React, { useCallback, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { List, Item, Icon, Text, Box, Anchor, Button } from "../../../components/elements";
import { Breadcrumb, RoundAvatar, DivideTitle, DuelText } from "../../../components";
import { CardLayout, CardHeader, FloatCard, ActivityCard } from "../../../components/cards";
import PageLayout from "../../../layouts/PageLayout";
import data from "../../../data/master/Bin/newClientProfile.json";
import { getNewClient, updateNewClientAPI } from "../../../api/endpoints";
import { useQuery } from "../../../api/query"
import instance from "../../../api/axios";
import Moment from 'react-moment';
import { LegendField, LegendTextarea } from "../../../components/fields";
import { toast, ToastContainer } from "react-toastify";




export default function NewClientProfile() {
    const query = useQuery();
    const [userProfile, setUserProfile] = useState(null)
    const [openMessage, setOpenMessage] = useState(false)
    const [isAdminMessage, setIsAdminMessage] = useState(null)
    const [isConsultantMessage, setIsConsultantMessage] = useState(null)
    const [currentUserRole, setCurrentUserRole] = useState(localStorage.getItem("admin_role_validation"))
    const getNewUser = useCallback(async () => {
        try {
            await instance({
                url: `${getNewClient}/${query.get("query_id")}`,
                method: "GET",
            },).then((res) => {

                setUserProfile(res.data)
                setIsAdminMessage(res.data.adminmessage)
                setIsConsultantMessage(res.data.consultantmessage)
            });
        } catch (e) {
            console.error(e);
        }
    }, [])
    const updateNewUser = async () => {
        try {
            await instance({
                url: `${updateNewClientAPI}/${query.get("query_id")}`,
                method: "PUT",
                data: userProfile,
            }).then((res) => {
                window.location.reload()

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
    const updateConNewUser = async () => {
        try {
            await instance({
                url: `${updateNewClientAPI}/${query.get("query_id")}`,
                method: "PUT",
                data: userProfile,
            }).then((res) => {
                window.location.reload()

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
    useEffect(() => {
        getNewUser()
    }, [])
    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title="Client Query">
                            {/* {data?.breadcrumb.map((item, index) => (
                                <Item key={index} className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={item.path}>{item.text}</Anchor> : item.text}
                                </Item>
                            ))} */}
                        </Breadcrumb>
                    </CardLayout>
                </Col>
                {/* <Col xl={4}></Col> */}
                <Row>
                    <Col xl={12}>
                        <CardLayout>
                            <Box className="mc-user-group">
                                <Row xl={12}>
                                    <Col xl={6}>
                                        <Box className="mc-user-profile">

                                            <DuelText
                                                title={`${userProfile?.name}`}
                                                // descrip={ userProfile?.createdAt } 

                                                size={data?.profile.size}
                                            />
                                        </Box>
                                        <Box className="mb-4">
                                            {/* <DivideTitle title="communication" className="mb-4" /> */}
                                            <List className="mc-user-metalist">

                                                <Item >
                                                    <Icon>{'phone_in_talk'}</Icon>
                                                    <Text as="span">{userProfile?.mobileNumber}</Text>
                                                </Item>
                                                <Item >
                                                    <Icon>{'feed'}</Icon>
                                                    <Text as="span">{userProfile?.email}</Text>
                                                </Item>
                                                <Item >
                                                    <Icon>{'event_note'}</Icon>
                                                    <Text as="span">
                                                       {userProfile?.slotdateAndTime}
                                                    </Text>
                                                </Item>
                                                <Item >
                                                    <Icon>{'layers'}</Icon>
                                                    <Text as="span">{userProfile?.expertise}</Text>
                                                </Item>
                                                <Item >
                                                    <Icon>{'map'}</Icon>
                                                    <Text as="span">{userProfile?.address}</Text>
                                                </Item>
                                            </List>
                                        </Box>
                                        <Box className="mb-4">
                                            <DivideTitle title={data?.bio.title} className="mb-3" />
                                            <Text className="mc-user-bio mb-4">{userProfile?.message}</Text>
                                        </Box>
                                    </Col>

                                    <Col xl={6}>

                                        {/* <DivideTitle title={data?.biorep.title} className="mb-3" /> */}
                                        <LegendField
                                            title={data?.status?.title}
                                            // value={postData?.en?.status}
                                            option={data?.status?.option}
                                            activeOption={userProfile?.updatestatusbyadmin}

                                            onChange={(e) => {
                                                // updatestatusbyadmin
                                                setUserProfile({ ...userProfile, updatestatusbyadmin: e.target.value });

                                            }}
                                        />
                                        <div className="mb-4" />
                                        {
                                            currentUserRole == "Receptionist" || currentUserRole == "HR" || currentUserRole == "PA" ?
                                                <LegendTextarea
                                                    title={data?.biorep.title}
                                                    fieldSize={'h-xl w-100'}
                                                    value={userProfile?.adminmessage}
                                                    onChange={(e) => {
                                                        setUserProfile({ ...userProfile, adminmessage: e.target.value })

                                                    }}
                                                    placeholder="Type here..."
                                                    style={{height:"60px"}}

                                                /> :
                                                <LegendTextarea
                                                    title={data?.biorep.title}
                                                    fieldSize={'h-xl w-100'}
                                                    value={userProfile?.adminmessage}
                                                    placeholder="Type here..."
                                                    style={{height:"60px"}}

                                                />
                                        }

                                        <div className="mb-4" />
                                        {
                                            currentUserRole == "Consultant" || currentUserRole == "CEO"?
                                                <LegendTextarea
                                                    title={data?.biocon.title}
                                                    fieldSize={'h-xl w-100'}
                                                    value={userProfile?.consultantmessage}
                                                    onChange={(e) => {
                                                        setUserProfile({ ...userProfile, consultantmessage: e.target.value })
                                                    }}
                                                    placeholder="Type here..."
                                                    style={{height:"60px"}}
                                                /> :
                                                <LegendTextarea
                                                    title={data?.biocon.title}
                                                    fieldSize={'h-xl w-100'}
                                                    value={userProfile?.consultantmessage}
                                                    placeholder="Type here..."
                                                    style={{height:"60px"}}

                                                />
                                        }
                                        {
                                            isAdminMessage ? <></> :
                                                currentUserRole == "Receptionist" || currentUserRole == "HR" || currentUserRole == "PA" ?
                                                    <Button
                                                        className="mc-btn primary mt-3"
                                                        icon="verified"
                                                        text="Save"
                                                        onClick={() => updateNewUser()}
                                                    /> : <></>
                                        }

                                        {
                                            isConsultantMessage ? <></> :
                                                currentUserRole == "Consultant" || currentUserRole == "CEO" ?
                                                    <Button
                                                        className="mc-btn primary mt-3"
                                                        icon="verified"
                                                        text="Save"
                                                        onClick={() => updateConNewUser()}
                                                    /> : <></>
                                        }
                                    </Col>
                                </Row>
                            </Box>
                        </CardLayout>
                    </Col>

                </Row>
                <ToastContainer />
            </Row>
        </PageLayout>
    )
}
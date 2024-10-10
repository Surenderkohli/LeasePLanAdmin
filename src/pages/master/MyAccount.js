import React,{useState} from "react";
import { Row, Col, Tab, Tabs, Form } from "react-bootstrap";
import { LegendField, LegendTextarea, IconField } from "../../components/fields";
import { Item, Anchor, Box, Button, Image } from "../../components/elements";
import { CardLayout, TabCard } from "../../components/cards";
import { Breadcrumb, FileUpload } from "../../components"; 
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/myAccount.json";
import HostedApi from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";

export default function MyAccount() {
    const [passwordChange, setPasswordChange ] = useState({
        oldPassword:"",
        newPassword:"",
        confirmPassword:"",
    })

    const token = localStorage.getItem("admin_token_validation");
    console.log(token, "this is toke")

    const onpasswordChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target.value, "this is cross check ")
        setPasswordChange({...passwordChange, [name]:value})
    }

    const changePassword = async() => {
         console.log(passwordChange,"this is console password")

         try{
            await HostedApi({
                url:"user/change_password",
                method:"POST",
                data: passwordChange,
                headers: {"Authorization" : `Bearer ${token}`} 
               
            }).then((res) => {
                if(res.status === 200){
                    toast.success('Password Reset successfully ', {
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
                    window.location.assign("/home")
                   }, 2000)
                } 
            })

         }catch(e){
            console.log(e, "error")
            toast.error(e.response.data.msg)
         }
    }

    
    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <Breadcrumb title={ data?.pageTitle }>
                        {data?.breadcrumb.map((item, index) => (
                            <Item key={ index } className="mc-breadcrumb-item">
                                {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                            </Item>
                        ))}
                    </Breadcrumb>
                </Col>
                <Col xl={12}>
                    <CardLayout>
                        <Tabs defaultActiveKey="password" id="mc" className="mc-tabs cursor-auto">
                            <Tab eventKey="password" className="mc-tabpane password cursor-auto" style={{cursor: "auto"}}>
                                <TabCard title="Generate password">
                                    <Row>
                                        <Col xs={12} md={12}><IconField icon="lock" name="oldPassword" onChange={onpasswordChange} type="password" placeholder="Old Password" classes="w-100 h-lg" passwordVisible /></Col>
                                        <Col xs={12} md={6}><IconField icon="lock" name="newPassword" onChange={onpasswordChange} type="password" placeholder="New Password" classes="w-100 h-lg" passwordVisible /></Col>
                                        <Col xs={12} md={6}><IconField icon="lock" name="confirmPassword" onChange={onpasswordChange} type="password" placeholder="Confirm Password" classes="w-100 h-lg" passwordVisible /></Col>
                                    </Row>
                                </TabCard>
                                <Button className="mc-btn primary mt-3" onClick={changePassword} icon="verified" text="Update" />
                            </Tab>
                            {/* <Tab eventKey="settings" title="other settings" className="mc-tabpane settings">
                                <Row xs={1} md={2}>
                                    <Col>
                                        <TabCard title="activity email settings">
                                            <Form.Check type="switch" id="switch1" label="Someone adds you as a connection" />
                                            <Form.Check type="switch" id="switch2" label="you're sent a direct message" defaultChecked/>
                                            <Form.Check type="switch" id="switch3" label="New membership approval" defaultChecked/>
                                            <Form.Check type="switch" id="switch4" label="Send Copy To Personal Email" defaultChecked/>
                                            <Form.Check type="switch" id="switch5" label="Tips on getting more out of PCT-themes" />
                                        </TabCard>
                                    </Col>
                                    <Col>
                                        <TabCard title="product email settings">
                                            <Form.Check type="checkbox" id="check1" label="Someone adds you as a connection" defaultChecked/>
                                            <Form.Check type="checkbox" id="check2" label="you're sent a direct message" defaultChecked/>
                                            <Form.Check type="checkbox" id="check3" label="New membership approval" defaultChecked/>
                                            <Form.Check type="checkbox" id="check4" label="Send Copy To Personal Email" />
                                            <Form.Check type="checkbox" id="check5" label="Tips on getting more out of PCT-themes" />
                                        </TabCard>
                                    </Col>
                                </Row>
                                <Button className="mc-btn primary mt-3" icon="verified" text="update changes" />
                            </Tab> */}
                        </Tabs>
                    </CardLayout>
                </Col>
            </Row>
            <ToastContainer />
        </PageLayout>
    )
}



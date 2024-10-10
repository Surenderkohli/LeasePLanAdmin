import React, {useState} from "react";
import { Box, Form, Heading, Button, Anchor, Image, Text } from "../../components/elements";
import IconField from "../../components/fields/IconField";
import Logo from "../../components/Logo";
import data from "../../data/master/forgot.json";
import { Row, Col, Tab, Tabs } from "react-bootstrap";
import HostedApi from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";




export default function ForgotPassword() {
    const[showOtp, setShowOtp] = useState(false)
    const[email, setEmailinput] = useState()
    const[passwordinput, setPasswordinput] = useState({
        otp:"",
        newPassword:"",
    })

    const handleChangeEmail = (e) => {
        const { name, value } = e.target;
        console.log(value, "hihihihichangeemail")
        setEmailinput({[name]:value});
    }

    const handleChangeReset = (e) => {
        const { name, value } = e.target;
        setPasswordinput({...passwordinput, [name]:value});
        console.log(passwordinput, "hhhhhhhhhpass")
    }

    // const sendOtp = () => {
       
    // }

    const resetPassword = async() => {
        if(passwordinput.otp === "" || passwordinput.newPassword === ""){
            toast.error("Please enter a OTP/new password")
        }
       
        try{
          await HostedApi({
             url:"/user/reset_password",
             method:"POST",
             data:passwordinput,
             headers: { 'Content-Type': 'multipart/form-data' }
          }).then((res) => {
        toast.success('Password changed successfully');
        setTimeout(() => {
            window.location.assign("/")
        }, 1000);

       });
        }catch(e){
            console.log(e.response.data.msg, "this is an error msg")
            toast.error(e.response.data.msg);
        }
    }
   
    const emailotp = async() => {
        if(email === ''){
            toast.error("Please enter an email")
        }
        try{
          await HostedApi({
             url:"/user/forgot_password",
             method:"POST",
             data:email,
             headers: { 'Content-Type': 'multipart/form-data' }
          }).then((res) => {
            toast.success('Password sent successfully');
            setTimeout(() => {
                setShowOtp(true)
            },1000)   
    });
        }catch(e){
            console.log(e.response.data.msg)
            toast.error(e.response.data.msg);
        }
    }

    return (
        <Box className="mc-auth">
            <Image 
                className="mc-auth-pattern" 
                src={ data?.pattern.src } 
                alt={ data?.pattern.alt } 
            />  
            {
                showOtp ?
                <>
                <Box className="mc-auth-group">
                <Logo 
                    src = { data?.logo.src }
                    alt = { data?.logo.alt }
                    href = { data?.logo.path }
                    className = "mc-auth-logo"
                />
                <Heading as="h4" className="mc-auth-title">{ data?.title }</Heading>
                <Form className="mc-auth-form">
                    <Row>
                        <Col xs={12} md={12}><IconField icon="lock" name="otp"  type="number" onChange={handleChangeReset} placeholder="Enter OTP" classes="w-100 h-lg" passwordVisible /></Col>
                        <Col xs={12} md={12}><IconField icon="add_moderator" name="newPassword" onChange={handleChangeReset}  type="password" placeholder="new password" classes="w-100 h-lg" passwordVisible /></Col>
                                
                   </Row>
                    <Button className={`mc-auth-btn ${data?.button.fieldSize}`} type={ data?.button.type } onClick={resetPassword}>Reset Password</Button>
                </Form>
                <Box className="mc-auth-navigate">
                    <Text as="span">{ data?.navigate.title }</Text>
                    <Anchor href={ data?.navigate.path }>{ data?.navigate.text }</Anchor>
                </Box>
                <ToastContainer />
                </Box>
                </> : 
                <>
                <Box className="mc-auth-group">
                <Logo 
                    src = { data?.logo.src }
                    alt = { data?.logo.alt }
                    href = { data?.logo.path }
                    className = "mc-auth-logo"
                />
                <Heading as="h4" className="mc-auth-title">{ data?.title }</Heading>
                <Form className="mc-auth-form">
                    <Row>
                     <Col xs={12} md={12}><IconField icon="email" name="email" onChange={handleChangeEmail}  type="email" placeholder="Enter Email" classes="w-100 h-lg" passwordVisible /></Col>
                    </Row>
                    <Button className={`mc-auth-btn ${data?.buttonotp.fieldSize}`} onClick={emailotp} type={ data?.buttonotp.type } >Get OTP</Button>
                </Form>
                <Box className="mc-auth-navigate">
                    <Text as="span">{ data?.navigate.title }</Text>
                    <Anchor href={ data?.navigate.path }>{ data?.navigate.text }</Anchor>
                </Box>
                </Box>
                <ToastContainer />
                </>
            }
            
        </Box>
       
    );
}


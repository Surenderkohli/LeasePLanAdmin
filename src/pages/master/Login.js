import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import instance from "../../api/axios";
import { Box, Form, Heading, Button, Anchor, Image, Text } from "../../components/elements";
import IconField from "../../components/fields/IconField";
import Logo from "../../components/Logo";
import data from "../../data/master/login.json";

export default function Login() {
    const [loginData, setLoginData] = useState({
        email:" ",
        password:" ",
    })
    
    const [buttonlogin, setButtonlogin] = useState(true)

    const handleDataOnChange = (e, index)=>{
           
            setLoginData({   ...loginData,
                [e.target.name]: e.target.value})
           
     }

    console.log(loginData, "Logindata")

    useEffect(() => {
      localStorage.clear()
    
      return () => {
        
      }
    }, [])
    
   const navigate = useNavigate()

   const loginAdmin=async ()=>{
        
        try {
          await instance({
            url: "user/login",
            method: "POST",
            data:loginData,
            
          },).then((res) => {
            
           if(res.status===200){

            console.log(res.data.data.name, "this is auth")
            localStorage.clear()
            // if(res.data.user.role=="None"){
            //     localStorage.clear()
            //     return navigate("/login") 
            // }
            localStorage.setItem("admin_token_validation",res.data.data.token)
            // localStorage.setItem("admin_role_validation",res.data.user.role)
            localStorage.setItem("admin_email_validation",res.data.data.email)
            localStorage.setItem("admin_name_validation",res.data.data.name)
            // localStorage.setItem("admin_id_validation",res.data.user._id)
            // localStorage.setItem("admin_img_validation",res.data.user.img)
            setButtonlogin(false)

           toast.success('Login Sucessfully  ', {
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
            }, 1000 )

           } 
        //    navigate("/leads-section")

          });
        } catch (e) {
            localStorage.clear()
            toast.error('Oops! Please Enter Valid Email & Password', {
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
        <Box className="mc-auth">
            <Image
                src={ data?.pattern.src } 
                alt={ data?.pattern.alt }
                className="mc-auth-pattern"  
            />
            <Box className="mc-auth-group">
                <Logo 
                    src = { data?.logo.src }
                    alt = { data?.logo.alt }
                    href = { data?.logo.path }
                    className = "mc-auth-logo"
                />
                <Heading as="h4" className="mc-auth-title font-extrabold">{ data?.title }</Heading>
                <Form className="mc-auth-form">
                    {data?.input.map((item, index) => (
                        <IconField 
                            key = { index }
                            icon = { item.icon }
                            type = { item.type }
                            name = {item.name}
                            option = { item.option }
                            classes = { item.fieldSize }
                            placeholder = { item.placeholder }
                            passwordVisible = { item.passwordVisible }
                            onChange={(e)=> handleDataOnChange(e,index)}
                        />
                    ))}
                    <Button onClick={loginAdmin} className={`mc-auth-btn ${data?.button.fieldSize} bg-primary`} type={ "button" }> {buttonlogin ? "Login" : "Processing..."} </Button>
                    
                    {/* <Button onClick={()=>navigate("/home")} className={`mc-auth-btn ${data?.button.fieldSize} bg-primary`} type={ "button" }> Login </Button> */}
                    <Anchor className="mc-auth-forgot" href={ data?.forgot.path }>{ data?.forgot.text }</Anchor>
                </Form>
            </Box>
            <ToastContainer/>
        </Box>
    );
}
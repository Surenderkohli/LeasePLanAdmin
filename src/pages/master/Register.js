import axios from "axios";
import React, { useState } from "react";
import {
  Box,
  Text,
  Form,
  Image,
  Button,
  Anchor,
  Heading,
  Input,
  Label,
  Icon,
} from "../../components/elements";
import IconField from "../../components/fields/IconField";
import Logo from "../../components/Logo";
import data from "../../data/master/register.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from "../../api/axios";

export default function Register() {
  const [registerData, setRegisterData] = useState({});
  const register = (e, index) => {
    if (index === 0) {
      setRegisterData({ ...registerData, name: e.target.value });
    }
    if (index === 1) {
      setRegisterData({ ...registerData, email: e.target.value });
    }
    if (index === 2) {
      setRegisterData({ ...registerData, mobileNumber: e.target.value });
    }
    if (index === 3) {
      setRegisterData({ ...registerData, address: e.target.value });
    }
    if (index === 4) {
      setRegisterData({ ...registerData, emirates: e.target.value });
    }

    if (index === 5) {
      setRegisterData({ ...registerData, practice: e.target.value });
    }

    if (index === 6) {
      setRegisterData({ ...registerData, role: e.target.value });
    }
    if (index === 7) {
      setRegisterData({ ...registerData, password: e.target.value });
    }
  };

  const registerApi = async () => {
    try {
      await instance({
        url: "/auth/signup",
        method: "POST",
        data: registerData,
      }).then((res) => {
        if (res.status === 200) {
          toast.success("SignUp Sucessfully", {
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
      });
    } catch (e) {
      toast.error("Signup faild, Please upload all the data", {
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
  };

  return (
    <Box className="mc-register">
      <Form className="mc-register-form">
        <Logo
          src={data?.logo.src}
          alt={data?.logo.alt}
          href={data?.logo.path}
          className="mc-auth-logo"
        />
        <Heading as="h4" className="mc-auth-title">
          {data?.title.from}
        </Heading>
        {data?.input.map((item, index) => (
          <IconField
            key={index}
            icon={item.icon}
            type={item.type}
            classes={item.fieldSize}
            option={item.option}
            placeholder={item.placeholder}
            passwordVisible={item.passwordVisible}
            onChange={(e) => register(e, index)}
          />
        ))}

        <Box className="mc-auth-checkbox">
          <Input type="checkbox" id="checkbox" />
          <Label text={data?.checkLabel} htmlFor="checkbox" />
        </Box>
        <Button
          onClick={() => registerApi()}
          className={`mc-auth-btn ${data?.button.fieldSize}`}
          type={data?.button.type}
        >
          {data?.button.text}
        </Button>
        <Box className="mc-auth-divide">
          <Text as="span">{data?.divide.text}</Text>
        </Box>
        <Box className="mc-register-navigate">
          <Text as="span">{data?.navigate.title}</Text>
          <Anchor href={data?.navigate.path}>{data?.navigate.text}</Anchor>
        </Box>
      </Form>
      <ToastContainer />
    </Box>
  );
}

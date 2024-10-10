import axios from "axios";
//let token  = localStorage.getItem("admin_token_validation")

const HostedApi = axios.create({
  // baseURL: "https://api.leaseplan.amazing7studios.com/",
  // baseURL: "http://10.0.0.250:5001/",
   baseURL: "http://192.168.1.43:5001/",
  

  // headers:{
  //   Authorization:`Bearer ${token}` ,
  //   timeout:1000,
  // }
})

export default HostedApi;
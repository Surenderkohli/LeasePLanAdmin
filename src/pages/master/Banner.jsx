import React from 'react'
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import HostedApi from '../../api/axios';
import Modal from 'react-bootstrap/Modal';
import { Box, Text } from '../../components/elements';
import { CardLayout, CardHeader } from '../../components/cards';
import { Table, Tbody, Td, Th, Thead, Tr } from '../../components/elements/Table';
import { Anchor, Heading, Input, Image, Icon, Button } from "../../components/elements";
import Deletesvg from "../../data/svgicons/Deletesvg.js"
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Editsvg from "../../data/svgicons/Editsvg.js"
import { DialogPage } from "../../components/dialog"
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { CloseIcon } from '../../components/icons/icons';
import PageLayout from '../../layouts/PageLayout';
import { FileUpload } from "../../components";
import Form from 'react-bootstrap/Form';




// Create a Toggle

// Add Modal
const AddBanner = ({ open, onClose }) => {

  const [bannerdata, setBannerData] = useState({
    image: null,
    title: "",
    description: "",

  })

  const addBanner = async (e) => {
    e.preventDefault();
    console.log(bannerdata, "iiiiiiiii")

    try {
      await HostedApi({
        url: "/banner/upload-banner",
        method: "POST",
        data: bannerdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      },).then((res) => {
        toast.success('Banner Upload successfully', {
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
          window.location.assign("/banner")
        }, 1000);
      });
      console.log(bannerdata, "value------------------")
    } catch (e) {
      console.log(e)
    }
  }
  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;


    setBannerData((prevalue) => {
      return {
        ...prevalue, // Spread Operator              
        [name]: value,

      }
    })

  }



  const handleImageUpload = (e) => {
    setBannerData({ ...bannerdata, image: e.target.files[0] })
  }



  return (
    <>
      <DialogPage open={open} close={onClose} type="verified" text="Add Banner">
        <Row>
          <form className="row g-3 mt-0 mb-5 p-2 needs-validation">
            <div className="col-md-6">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" name="title" onChange={handleChange} value={bannerdata.title} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Link</label>
              <input type="text" className="form-control" name="link" onChange={handleChange} value="https://leaseplan.dev.client.kloudlite.io/" required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Description</label>
              <textarea type="text" className="form-control" name="description" onChange={handleChange} value={bannerdata.description} required />
            </div>


            <Col xl={6}>
              <Box className="mc-user-avatar-upload ">
                <label className="form-label">Image Upload</label>
                <FileUpload onChange={handleImageUpload} icon="cloud_upload" text="upload" />
                {bannerdata.image &&

                  <div style={{ marginTop: "20px" }}>

                    <img width={100} src={URL.createObjectURL(bannerdata.image)} />
                  </div>
                }
              </Box>
            </Col>
          </form>


          <div className="col-6">
            <button className="btn btn-primary" onClick={onClose} >Cancel</button>
          </div>

          <div className="col-6">
            <button className="btn btn-primary" type="submit" onClick={addBanner}>Add Banner</button>
          </div>

        </Row>
      </DialogPage>
    </>
  )
}



// Edit Modal
const EditBanner = ({ open, onClose, data }) => {

  // console.log(data.data.title ,'open------------')

  const [editshow, setEditshow] = useState()
  const [uploadImg, setUploadImg] = useState()



  useEffect(() => {
    if (data) {

      console.log(data);
      setEditshow(data)
    }
  }, [data])

  const handleChange = (e) => {

    const { name, value } = e.target;

    setEditshow({ ...editshow, [name]: value })
  }


  const updateform = useCallback(async (e) => {
    e.preventDefault();
    console.log(editshow, "-----------");
    //console.log(uploadImg , "uploadimg data");
    let id = editshow._id


    // global.FormData = global.originalFormData
    const formData = new FormData()
    formData.append('title', editshow.title)
    formData.append('description', editshow.description)
    formData.append('image', uploadImg)



    try {
      await HostedApi({
        url: `/banner/update/${id}`,
        method: "PUT",
        data: editshow,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((res) => {
        if (res === 200) {
          toast.success('Updated successfully', {
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

        // console.log(formData, "formdatabhbh")

        setTimeout(() => {
          window.location.assign("/banner")
        }, 1000);
      })
    }

    catch (err) {
      console.log(err)
    }
  })


  const handleImageUpload = (e) => {
    console.log(e.target.files[0], "Image i")
    setEditshow({ ...editshow, image: e.target.files[0] })
    setUploadImg({ image: e.target.files[0] })
  }

  return (
    <>
      <DialogPage open={open} close={onClose} type="new_releases" text="Edit Banner">
        <Row>
          <form className="row g-3 mt-0 mb-5 p-2 needs-validation">
            <div className="col-md-6">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" name="title" value={editshow?.title} onChange={handleChange} required />

            </div>

            <div className="col-md-6">
              <label className="form-label">Description</label>
              <textarea type="text" className="form-control" name="description" value={editshow?.description} onChange={handleChange} required />

            </div>
            <Col xl={12}>
              <Box className="mc-user-avatar-upload ">
                <label className="form-label">Image Upload</label>
                <FileUpload onChange={handleImageUpload} icon="cloud_upload" text="upload" />
                {/* <div style={{marginTop:"20px"}}> 
                          <img width={100}  src={(editshow?.imageUrl)}/>
                        </div> */}

                {uploadImg ?

                  <div style={{ marginTop: "20px" }}>
                    <img width={100} src={URL.createObjectURL(editshow?.image)} />
                  </div> : <div style={{ marginTop: "20px" }}>  <img width={100} src={(editshow?.imageUrl)} /> </div>
                }


              </Box>
            </Col>
          </form>


          <div className="col-6">
            <button className="btn btn-primary" onClick={onClose} >Cancel</button>
          </div>

          <div className="col-6">
            <button className="btn btn-primary" onClick={updateform}>Update form</button>
          </div>



        </Row>
      </DialogPage>
    </>
  )
}





const Banner = () => {

  const [bannerdata, setbannerData] = useState(null)
  const [alertModal, setAlertModal] = useState(false);
  const [alertaddModal, setAlertaddModal] = useState(false);
  const [editdata, seteditData] = useState({})
  const [on, setOn] = useState(true);


  let history = useNavigate();


  const getBannerData = useCallback(async () => {
    try {
      await HostedApi({
        url: "/banner/get-banner",
        method: "GET",
      }).then((res) => {
        setbannerData(res.data)
      });
    } catch (e) {
      // console.error(e);
    }
  }, []);

  useEffect(() => {
    getBannerData();
    return () => { };
  }, []);


  const editbutton = async (data) => {

    seteditData(data)
    setAlertModal(true)

  }

  const addmodal = async (data) => {

    //seteditData(data)
    setAlertaddModal(true)

  }


  const activeInactive = async (id, status) => {

    var statusactive = (status === "active" ? "inactive" : "active")
    console.log(statusactive, "checked ")

    try {
      await HostedApi({
        url: `/banner/update/${id}`,
        method: 'PUT',
        data: JSON.stringify({ status: statusactive }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res.status === 200) {
          window.location.assign("/banner")
        }

      })
    } catch (e) {
      console.log(e)
    }

  }

  const deleteButton = async (id) => {
    // console.log(id, "jkkjjkkj")
    try {
      await HostedApi({
        url: `/banner/delete/${id}`,
        method: "DELETE",
        headers: { 'Content-Type': 'multipart/form-data' }
      },).then((res) => {
        toast.success('Banner Deleted successfully', {
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
          window.location.assign("/banner")
        })

      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <PageLayout>
      <CardHeader title={"Banner"} button={{ text: "Add Banner", }} onClick={addmodal} />
      <Box className="mc-table-responsive">
        <Table className="mc-table">
          <Thead className="mc-table-head primary">
            <Tr>
              <Th>
                <Box className="mc-table-check">
                  <Text>S.No</Text>
                </Box>
              </Th>

              <Th><Box className="mc-table-check">
                <Text>Image</Text>
              </Box></Th>
              <Th><Box className="mc-table-check">
                <Text>Title</Text>
              </Box></Th>
              <Th><Box className="mc-table-check">
                <Text>Summary</Text>
              </Box></Th>
              <Th><Box className="mc-table-check">
                <Text>Link</Text>
              </Box></Th>
              <Th><Box className="mc-table-check">
                <Text>Action</Text>
              </Box></Th>

            </Tr>
          </Thead>

          {

            bannerdata === null ? <Tbody><Tr><Td>No data found</Td></Tr></Tbody> :

              <Tbody className="mc-table-body even">
                {bannerdata?.map((value, index) => {

                  return (
                    <Tr key={index}>
                      <Td title="id">
                        <Box className="mc-table-profile">
                          <Text>{index + 1}</Text>
                          {/* <Text>{value._id}</Text> */}
                        </Box>
                      </Td>
                      <Td>
                        <Box className="mc-table-profile">
                          {/* <img src={`http://api.leaseplan.dev.client.kloudlite.io/${value?.banner}`} alt='' className='' height={6} width={6} /> */}
                          <img src={value?.imageUrl} alt='' className='' height={20} width={20} />
                        </Box>
                      </Td>
                      <Td >
                        <Box className="mc-table-profile">
                          <Text>{value?.title}</Text>
                        </Box>
                      </Td>
                      <Td>
                        <Box className="mc-table-profile">
                          <Text>{value?.description}</Text>
                        </Box>
                      </Td>
                      <Td>
                        <Box className="mc-table-profile">
                          <Text>https://leaseplan.dev.client.kloudlite.io/</Text>
                        </Box>
                      </Td>
                      <Td>
                        <Box className="mc-table-action">

                          <Anchor title="Edit" onClick={() => editbutton(value)} className="material-icons edit">

                            <Editsvg />

                          </Anchor>

                          <Button title="Delete" className="material-icons delete" onClick={() => deleteButton(value?._id)}>
                            <Deletesvg width={100} />
                          </Button>

                          <Form className='p-2'>
                            <Form.Check
                              type="switch"
                              id={value?._id}
                              onChange={() => activeInactive(value?._id, value?.status)}
                              // defaultChecked={value?.status === 'active'? "true": ""}
                              className="checkBoxCard"
                              checked={value?.status === 'active' ? true : false}
                            />

                          </Form>
                        </Box>
                      </Td>
                    </Tr>
                  )
                })}

              </Tbody>
          }

        </Table>
        <EditBanner open={alertModal} onClose={() => setAlertModal(!alertModal)} data={editdata} />
        <AddBanner open={alertaddModal} onClose={() => setAlertaddModal(!alertaddModal)} />

      </Box>
    </PageLayout>
  )
}

export default Banner



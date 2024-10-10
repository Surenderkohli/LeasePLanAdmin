import React, { useEffect, useState } from 'react'

import { Table, Thead, Tbody, Th, Tr, Td } from "../../elements/Table";
import { Text, Box } from "../../elements";
import { Anchor, Heading, Input, Image, Icon, Button } from "../../elements";

import Deletesvg from "../../../data/svgicons/Deletesvg.js"
import Editsvg from "../../../data/svgicons/Editsvg.js"
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import HostedApi from '../../../api/axios';
import ReactPaginate from 'react-paginate';
import Form from 'react-bootstrap/Form';
import Eye from '../../../data/svgicons/Eye';

export const Offertable = ({ thead, tbody, query, addcsv, Carcsv, verifiDelete }) => {



  const [itemOffset, setItemOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState();
  const [resultfilter, setResultfilter] = useState();



  const itemsPerPage = 10;
  const endoffset = itemsPerPage + itemOffset;



  // const filter = tbody?.filter((data) => data?.calculationNo === searchTerm)
  // console.log(filter, "this is filter data")


  useEffect(() => {
    const filter = tbody?.filter(data => data?.calculationNo == searchTerm || data?.modelCode == searchTerm || data?.makeCode == searchTerm) || [];

    setResultfilter(filter)
  }, [tbody, searchTerm])





  const activeInactive = async (id, bestDeals) => {

    console.log(id, bestDeals, "this is bestDEals")

    var statusactive = (bestDeals === "No" ? "Yes" : "No")
    // console.log(statusactive, "checked ")

    try {
      await HostedApi({
        url: `/carOffer/edit-offer/${id}`,
        method: 'PUT',
        data: JSON.stringify({ bestDeals: statusactive }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res.status === 200) {
          window.location.assign("/offers")
        }

      })
    } catch (e) {
      console.log(e)
      toast.error(e)
    }

  }



  // Displaying User based on search / API Data

  const displayUsers = resultfilter?.length === 0 ? tbody?.slice(itemOffset, endoffset)?.map((value, index) => {
    return (
      <Tr key={index}>
        <Td title="id">
          <Box className="mc-table-profile">
            <Text>{Number(endoffset) - Number(itemsPerPage) + index + 1}</Text>
          </Box>
        </Td>
        <Td>
          <Box className="mc-table-profile">
            <Text>{value?.leaseType}</Text>
          </Box>
        </Td>

        <Td >
          <Box className="mc-table-profile">
            <Text>{value?.makeCode}</Text>
          </Box>
        </Td>
        <Td>
          <Box className="mc-table-profile">
            <Text>{value?.modelCode}</Text>
          </Box>
        </Td>

        <Td >
          <Box className="mc-table-profile">
            <Text>{value?.duration}</Text>
          </Box>
        </Td>

        <Td >
          <Box className="mc-table-profile">
            <Text>{value?.annualMileage}</Text>
          </Box>
        </Td>

        <Td >
          <Box className="mc-table-profile">
            <Text>{value?.monthlyCost}</Text>
          </Box>
        </Td>
        <Td >
          <Box className="mc-table-profile">
            <Text>{value?.calculationNo}</Text>
          </Box>
        </Td>

        <Td >
          <Box className="mc-table-profile">
            <Text>{value?.validFrom}</Text>
          </Box>
        </Td>
        <Td >
          <Box className="mc-table-profile">
            <Text>{value?.validTo}</Text>
          </Box>
        </Td>
        <Td >
          <Box className="mc-table-profile">
            <Text>{value?.expired ? "Expired" : "Not Expired"}</Text>
          </Box>
        </Td>
        <Td>
          <Box className="mc-table-action">

            <Anchor title="Edit" href={`/offer-update?query_id=${value?._id}`} className="material-icons edit"><Editsvg /></Anchor>
            {/* <Button title="Delete" className="material-icons delete" onClick={() => deleteButton(value?._id)}>
                             <Deletesvg width={100}/>
                          </Button> */}
            <Form className='p-2'>
              <Form.Check
                type="switch"
                id={value?._id}
                onChange={() => activeInactive(value?._id, value?.bestDeals)}
                // defaultChecked={value?.status === 'active'? "true": ""}
                className="checkBoxCard"
                checked={value?.bestDeals === 'Yes' ? true : false}
              />
            </Form>
            <Button title="Delete" className="material-icons delete" onClick={() => verifiDelete(value?._id)}>
              <Deletesvg width={100} />
            </Button>
            {/* <Anchor  title="Edit" onClick={Carcsv} className="material-icons edit"><Eye/></Anchor> */}
          </Box>
        </Td>
      </Tr>
    );
  }) : resultfilter?.slice(itemOffset, endoffset)?.map((value, index) => {
    return (
      <Tr key={index}>
        <Td title="id">
          <Box className="mc-table-profile">
            <Text>{Number(endoffset) - Number(itemsPerPage) + index + 1}</Text>
          </Box>
        </Td>
        <Td>
          <Box className="mc-table-profile">
            <Text>{value?.leaseType}</Text>
          </Box>
        </Td>

        <Td >
          <Box className="mc-table-profile">
            <Text>{value?.makeCode}</Text>
          </Box>
        </Td>
        <Td>
          <Box className="mc-table-profile">
            <Text>{value?.modelCode}</Text>
          </Box>
        </Td>

        <Td >
          <Box className="mc-table-profile">
            <Text>{value?.duration}</Text>
          </Box>
        </Td>

        <Td >
          <Box className="mc-table-profile">
            <Text>{value?.annualMileage}</Text>
          </Box>
        </Td>

        <Td >
          <Box className="mc-table-profile">
            <Text>{value?.monthlyCost}</Text>
          </Box>
        </Td>
        <Td >
          <Box className="mc-table-profile">
            <Text>{value?.calculationNo}</Text>
          </Box>
        </Td>
        <Td >
          <Box className="mc-table-profile">
            <Text>{value?.validFrom}</Text>
          </Box>
        </Td>
        <Td >
          <Box className="mc-table-profile">
            <Text>{value?.validTo}</Text>
          </Box>
        </Td>
        <Td >
          <Box className="mc-table-profile">
            <Text>{value?.expired ? "Expired" : "Not Expired"}</Text>
          </Box>
        </Td>
        <Td>
          <Box className="mc-table-action">

            <Anchor title="Edit" href={`/offer-update?query_id=${value?._id}`} className="material-icons edit"><Editsvg /></Anchor>
            {/* <Button title="Delete" className="material-icons delete" onClick={() => deleteButton(value?._id)}>
                               <Deletesvg width={100}/>
                            </Button> */}
            <Form className='p-2'>
              <Form.Check
                type="switch"
                id={value?._id}
                onChange={() => activeInactive(value?._id, value?.bestDeals)}
                // defaultChecked={value?.status === 'active'? "true": ""}
                className="checkBoxCard"
                checked={value?.bestDeals === 'Yes' ? true : false}
              />

            </Form>
            <Button title="Delete" className="material-icons delete" onClick={verifiDelete}>
              <Deletesvg width={100} />
            </Button>
            {/* <Anchor  title="Edit" onClick={Carcsv} className="material-icons edit"><Eye/></Anchor> */}
          </Box>
        </Td>
      </Tr>
    );
  });

  console.log(displayUsers, "this is -----user data")

  const pageCount = resultfilter?.length != 0 ? Math.ceil((resultfilter?.length / itemsPerPage)) : Math.ceil((tbody?.length / itemsPerPage))
  console.log(pageCount, "tis pageCount")
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % tbody.length;
    setItemOffset(newOffset);
  }


  let history = useNavigate();

  const editbutton = async (id) => {
    console.log(id, "editbtn")
    // history(`/update/${id}`);
  }

  const deleteButton = async (id) => {
    console.log(id, "jkkjjkkj")
    try {
      await HostedApi({
        url: `/cardetails/delete/${id}`,
        method: "DELETE",
        headers: { 'Content-Type': 'multipart/form-data' }
      },).then((res) => {
        toast.success('Deleted successfully', {
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
          window.location.assign("/inventory")
        })

      })
    } catch (e) {
      console.log(e)
    }
  }

  return (

    <Box className="mc-table-responsive">
      <Box className="mc-table-search p-2 border float-start rounded mb-2">
        <input

          type="number"
          placeholder="Search by Calculations No.."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </Box>
      <Table className="mc-table">
        <Thead className="mc-table-head primary">
          <Tr>
            <Th>
              <Box className="mc-table-check">
                <Text>S.No</Text>
              </Box>
            </Th>

            <Th><Box className="mc-table-check">
              <Text>Lease Type</Text>
            </Box></Th>

            <Th><Box className="mc-table-check">
              <Text>Make Code</Text>
            </Box></Th>
            <Th><Box className="mc-table-check">
              <Text>Model Code</Text>
            </Box></Th>
            <Th><Box className="mc-table-check">
              <Text>Durations</Text>
            </Box></Th>
            <Th><Box className="mc-table-check">
              <Text>Annual Mileage</Text>
            </Box></Th>
            <Th><Box className="mc-table-check">
              <Text>Monthly Cost</Text>
            </Box></Th>
            <Th><Box className="mc-table-check">
              <Text>Calculation No.</Text>
            </Box></Th>

            <Th><Box className="mc-table-check">
              <Text>Start Date</Text>
            </Box></Th>
            <Th><Box className="mc-table-check">
              <Text>End Date</Text>
            </Box></Th>
            <Th><Box className="mc-table-check">
              <Text>EXpired</Text>
            </Box></Th>

            <Th><Box className="mc-table-check">
              <Text>Action</Text>
            </Box></Th>


          </Tr>
        </Thead>
        {
          displayUsers?.length === 0 ? <Tbody>  <Tr>
            <Th>
              <Box className="mc-table-profile">
                <Text className="p-3 ">Searched Offer Not Found </Text>
              </Box>
            </Th>
          </Tr>

          </Tbody> :
            <Tbody className="mc-table-body even">
              {/* {tbody?.map((value, index) => {
                return(
                  <Tr key={index}>
                  <Td title="id">
                    <Box className="mc-table-profile">
                      <Text>{index+1}</Text>
                    </Box>
                  </Td>
                  <Td>
                    <Box>
                      <Text><img src={value?.image[0]?.imageUrl} alt='' className='' height={60} width={100} /></Text>
                    </Box>
                  </Td>
                  <Td>
                    <Box className="mc-table-profile">
                      <Text>{value?.leaseType?.leaseType}</Text>
                    </Box>
                  </Td>
                  <Td >
                    <Box className="mc-table-profile">
                      <Text>{value?.carBrand?.companyName}</Text>
                    </Box>
                  </Td>
                  <Td>
                    <Box className="mc-table-profile">
                      <Text>{value?.carSeries?.seriesName}</Text>
                    </Box>
                  </Td>

                  <Td >
                    <Box className="mc-table-profile">
                      <Text>{value?.bodyType}</Text>
                    </Box>
                  </Td>

                  <Td >
                    <Box className="mc-table-profile">
                      <Text>{value?.fuelType}</Text>
                    </Box>
                  </Td>

                  <Td >
                    <Box className="mc-table-profile">
                      <Text>{value?.price}</Text>
                    </Box>
                  </Td>

                  <Td>
                                <Box className="mc-table-action">
                              
                                    <Anchor href={`/update/${value?._id}`} title="Edit" onClick={() => editbutton(value?._id)} className="material-icons edit"><Editsvg/></Anchor>
                                    <Button title="Delete" className="material-icons delete" onClick={() => deleteButton(value?._id)}>
                                       <Deletesvg width={100}/>
                                    </Button>
                                </Box>
                   </Td>
              </Tr>
                )
              
              })} */}
              {displayUsers}
            </Tbody>
        }
      </Table>
      <ReactPaginate
        previousLabel={"⟵"}
        nextLabel={"⟶"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"paginationBttns"}
        previousClassName={"pre"}
        nextClassName={"next"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />

    </Box>
  )
}

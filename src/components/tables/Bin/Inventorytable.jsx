import React, { useState } from 'react'

import { Table, Thead, Tbody, Th, Tr, Td } from "../../elements/Table";
import { Text, Box } from "../../elements";
import { Anchor, Heading, Input, Image, Icon, Button } from "../../elements";

import Deletesvg from "../../../data/svgicons/Deletesvg.js"
import Editsvg from "../../../data/svgicons/Editsvg.js"
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import HostedApi from '../../../api/axios';
import ReactPaginate from 'react-paginate';
import Eye from '../../../data/svgicons/Eye';
import { ProductView } from '../../../pages/master';


export const Inventorytable = ({ thead, tbody, query, addcsv, Carcsv }) => {



  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 10;
  const endoffset = itemsPerPage + itemOffset;



  const displayUsers = tbody
    .filter((data) => data?.carBrand_id?.companyName?.toLowerCase().includes(query))
    ?.slice(itemOffset, endoffset)
    .map((value, index) => {

      return (
        <Tr key={index}>
          <Td title="id">
            <Box className="mc-table-profile">
              <Text>{Number(endoffset) - Number(itemsPerPage) + index + 1}</Text>
            </Box>
          </Td>
          <Td>
            <Box>
              <Text><img src={value?.details?.image[0]?.imageUrl} alt='' className='' height={60} width={100} /></Text>
            </Box>
          </Td>
          <Td>
            <Box className="mc-table-profile">
              <Text>{value?.leaseType}</Text>
            </Box>
          </Td>
          <Td>
            <Box className="mc-table-profile">
              <Text>{value?.term}</Text>
            </Box>
          </Td>
          <Td >
            <Box className="mc-table-profile">
              <Text>{value?.carBrand_id?.companyName}</Text>
            </Box>
          </Td>
          <Td>
            <Box className="mc-table-profile">
              <Text>{value?.carSeries_id?.seriesName}</Text>
            </Box>
          </Td>

          <Td >
            <Box className="mc-table-profile">
              <Text>{value?.details?.bodyType}</Text>
            </Box>
          </Td>

          <Td >
            <Box className="mc-table-profile">
              <Text>{value?.details?.fuelType}</Text>
            </Box>
          </Td>

          <Td >
            <Box className="mc-table-profile">
              <Text>{value?.carBrand_id?.makeCode}</Text>
            </Box>
          </Td>
          <Td >
            <Box className="mc-table-profile">
              <Text>{value?.carSeries_id?.modelCode}</Text>
            </Box>
          </Td>

          <Td>
            <Box className="mc-table-action">

              <Anchor
                href={`/product-upload?query_id=${value?._id}`}
                title="Edit"
                // onClick={addcsv} 
                className="material-icons edit"
              >

                <Editsvg />

              </Anchor>
              <Button title="Delete" className="material-icons delete" onClick={() => deleteButton(value?._id)}>
                <Deletesvg width={100} />
              </Button>
              {/* <Anchor  title="Edit" onClick={Carcsv} className="material-icons edit"><Eye/></Anchor> */}
              <Anchor
                href={`/product-view?query_id=${value?._id}&name=${value?.carSeries?.seriesName}`}
                title="View"
                className="material-icons view"
              //  onClick={<ProductView/>}
              >
                <Eye />
              </Anchor>
            </Box>
          </Td>
        </Tr>
      );
    });

  console.log(displayUsers?.length == 0, "this is displayuser data")

  const pageCount = Math.ceil(tbody.length / itemsPerPage)
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
        url: `/carOffer/delete-car/${id}`,
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
        }, 1000)

      })
    } catch (e) {
      console.log(e)
    }
  }

  return (

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
              <Text>Category</Text>
            </Box></Th>
            <Th><Box className="mc-table-check">
              <Text>Term</Text>
            </Box></Th>
            <Th><Box className="mc-table-check">
              <Text>Company</Text>
            </Box></Th>
            <Th><Box className="mc-table-check">
              <Text>Model</Text>
            </Box></Th>
            <Th><Box className="mc-table-check">
              <Text>Body Type</Text>
            </Box></Th>
            <Th><Box className="mc-table-check">
              <Text>Fuel Type</Text>
            </Box></Th>
            <Th><Box className="mc-table-check">
              <Text>Make Code</Text>
            </Box></Th>
            <Th><Box className="mc-table-check">
              <Text>Model Code</Text>
            </Box></Th>
            <Th><Box className="mc-table-check">
              <Text>Action</Text>
            </Box></Th>

          </Tr>
        </Thead>
        {
          displayUsers?.length === 0 ? <Th>
            <Th>
              <Box className="mc-table-profile">
                <Text className="p-3 ">Searched Car Not Found </Text>
              </Box>
            </Th>
          </Th>

            :
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

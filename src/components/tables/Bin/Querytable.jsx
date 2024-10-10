import React, {useCallback, useState} from 'react'
import { Table, Thead, Tbody, Th, Tr, Td } from "../../elements/Table";
import {Anchor, Text,Box} from "../../elements";
import ReactPaginate from 'react-paginate';


export default function QueryTable(querydata, { thead,tbody }) {
    // console.log(querydata?.querydata?.data, "query data")

   
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 10;

   
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
      };
  
    const filteredData = querydata?.querydata?.data?.filter(value =>
        value.firstName.toLowerCase().includes(searchTerm.toLowerCase())
      );
     
      const pageCount = Math.ceil(filteredData?.length / itemsPerPage);
      const paginatedData = filteredData?.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
      );
    
    const downloadPdf = useCallback(async (form_id) => {
        window.open(`https://api.leaseplan.dev.client.kloudlite.io/enquiry-form/${form_id}/download`);
      
    }, [])



    
    
    return (
        
        <Box className="mc-table-responsive">
        <Box className="mc-table-search p-3">
            <input
              type="text"
              placeholder="Search by First Name ..."
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
                            <Text>First Name</Text>
                        </Box></Th>
                        <Th><Box className="mc-table-check">
                            <Text>Last Name</Text>
                        </Box></Th>
                        <Th><Box className="mc-table-check">
                            <Text>Mobile No.</Text>
                        </Box></Th>
                        <Th><Box className="mc-table-check">
                            <Text>Email</Text>
                        </Box></Th>
                        <Th><Box className="mc-table-check">
                            <Text>Summary</Text>
                        </Box></Th>
                        <Th><Box className="mc-table-check">
                            <Text>Date</Text>
                        </Box></Th>
                        <Th><Box className="mc-table-check">
                        <Text>Pdf</Text>
                      </Box></Th>
          
          
                       

                    </Tr>
                </Thead>
                <Tbody className="mc-table-body even">
                 
                    {paginatedData?.length === 0 ? 
                        <Tr>
                           <Td>
                             <Box className='mc-table-profile  position-absolute'>
                                 <Text> Data Not Found</Text>
                             </Box>
                           </Td>
                        </Tr> 
                        : 
                        paginatedData?.map((value, index) => {
                            const serialNumber = currentPage * itemsPerPage + index + 1;
                        return (
                            <Tr>
                        <Td title="id">
                            <Box className="mc-table-profile">
                             
                            <Text>{serialNumber}</Text>  
                            </Box>
                        </Td>
                        <Td>
                            <Box className="mc-table-profile">
                                <Text>{value?.firstName}</Text>
                            </Box>
                        </Td>
                        <Td >
                            <Box className="mc-table-profile">
                                <Text>{value?.lastName}</Text>
                            </Box>
                        </Td>
                        <Td>
                            <Box className="mc-table-profile">
                                <Text>{value?.mobileNumber}</Text>
                            </Box>
                        </Td>

                        <Td>
                            <Box className="mc-table-profile">
                                <Text>{value?.emailAddress}</Text>
                            </Box>
                        </Td>

                        <Td>
                            <Box className="mc-table-profile">
                                <Text>{value?.questions}</Text>
                            </Box>
                        </Td>

                        <Td>
                            <Box className="mc-table-profile">
                                <Text>{value?.dateAdded}</Text>
                            </Box>
                        </Td>

                        <Td>
                        <Box className="mc-table-profile">
      
                          <Anchor title="Link" className="material-icons download" key={value._id} id={value._id} onClick={() => downloadPdf(value?._id)} >{'download'}</Anchor>
                          
                        </Box>
      
                      </Td>

                    </Tr>
                        )
                       }) 
                    }
                </Tbody>
                <ReactPaginate
                className=''
                previousLabel={"⟵"}
                nextLabel={"⟶"}
                pageCount={pageCount} 
                onPageChange={handlePageChange}
                containerClassName={"paginationBttns ttt"}
                previousClassName={"pre"} 
                nextClassName={"next"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              />
            </Table>


        </Box>
    );
}

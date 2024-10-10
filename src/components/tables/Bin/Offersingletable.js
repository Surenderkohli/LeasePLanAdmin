
import { Table, Thead, Tbody, Th, Tr, Td } from "../../elements/Table";
import { Text,Box} from "../../elements";
import { Anchor, Heading, Input, Image, Icon, Button } from "../../elements";
import Deletesvg from "../../../data/svgicons/Deletesvg";
import { DateTime } from "luxon";
import {toast, ToastContainer} from "react-toastify"
import { useState } from "react";
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { useEffect } from "react";


export default function Offersingletable({ thead, tbody,deleteButton, deals, setDeal }) {


  // console.log("got it---------------", finaldata)
  // console.log(deals, "deakl===ll")
    console.log(tbody, "Home Table");
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
                  <Text>Lease Type</Text>
                </Box>
            </Th>

            <Th><Box className="mc-table-check">
                  <Text>Term Type</Text>
                </Box>
            </Th>

         
            <Th><Box className="mc-table-check">
              <Text>Annual Mileage</Text>
            </Box></Th>
            <Th><Box className="mc-table-check">
              <Text>Monthly Cost</Text>
            </Box></Th>
            <Th><Box className="mc-table-check">
              <Text>Durations</Text>
            </Box></Th>
            <Th><Box className="mc-table-check">
              <Text>Calculation No.</Text>
            </Box></Th>

            <Th><Box className="mc-table-check">
              <Text>Valid From.</Text>
            </Box></Th>

            <Th><Box className="mc-table-check">
              <Text>Valid To.</Text>
            </Box></Th>
           
            <Th><Box className="mc-table-check">
              <Text>Actions</Text>
            </Box></Th>
           
          </Tr>
        </Thead>
        <Tbody className="mc-table-body even">

          {
            tbody?.length === 0 &&  <p  className="position-absolute  mt-2 text-center" style={{left:"50%"}}>No Offers added yet.</p>
          }
          
          {tbody?.map((value, index) => {
            return(
              <Tr key={index}>
             
              <Td title="id">
                <Box className="mc-table-profile">
                  <Text>{index+1}</Text>
                </Box>
              </Td>
              <Td>
                <Box className="mc-table-profile">
                  <Text>{value?.leasetype}</Text>
                </Box>
              </Td>
              <Td>
                <Box className="mc-table-profile">
                  <Text>{value?.termtype}</Text>
                </Box>
              </Td>
              <Td>
                <Box className="mc-table-profile">
                  <Text>{value?.annualMileage}</Text>
                </Box>
              </Td>

              <Td >
                <Box className="mc-table-profile">
                  <Text>{value?.monthlycost}</Text>
                </Box>
              </Td>

              <Td >
                <Box className="mc-table-profile">
                  <Text>{value?.durations}</Text>
                </Box>
              </Td>

              <Td >
                <Box className="mc-table-profile">
                  <Text>{value?.calculation}</Text>
                </Box>
              </Td>

              <Td >
             
                <Box className="mc-table-profile">
                  {/* {new Date().toLocaleString(DateTime.DATE_MED)} */}
                  {/* {DateTime.now(value.validFrom).toFormat('dd-MM-yyyy')} */}
                  <Text>{DateTime.fromISO(value?.validFrom).toLocaleString(DateTime.DATE_MED)}</Text>
                </Box>
              </Td>

              <Td >
                <Box className="mc-table-profile">
                  {/* {new Date(value.validTo).toLocaleString(DateTime.DATE_MED)} */}
                    {/* {DateTime.now(value.validTo).toFormat('dd-MM-yyyy')} */}
                    <Text>{DateTime.fromISO(value?.validTo).toLocaleString(DateTime.DATE_MED)}</Text>
                </Box>
              </Td>
              
              <Td>
                <Box className={"mc-table-profile"}>
                    <Text>
                        <Button title="Delete" className="material-icons delete" onClick={() => deleteButton(index)}>
                             <Deletesvg width={100}/>
                          </Button>
                    </Text>
                </Box>  
                {/* <BootstrapSwitchButton
                      value={value?.deal}
                      onlabel='Yes'
                      offlabel='No'
                      onChange={(checked) => {
                       setDeal(checked);
                     }}/> */}
              </Td>
             </Tr>
            )
          
          })}
        </Tbody>
      </Table>


    </Box>
    );
}

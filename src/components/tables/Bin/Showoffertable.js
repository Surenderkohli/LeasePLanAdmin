
import { Table, Thead, Tbody, Th, Tr, Td } from "../../elements/Table";
import { Text,Box} from "../../elements";
import { Anchor, Heading, Input, Image, Icon, Button } from "../../elements";
import Deletesvg from "../../../data/svgicons/Deletesvg";
import {toast, ToastContainer} from "react-toastify"
import { useEffect, useState } from "react";
import BootstrapSwitchButton from 'bootstrap-switch-button-react';


export default function Showoffertable({ thead, tbody, deals, setDeal }) {

  const [finaldata, setFinaldata] = useState(tbody)


  useEffect(() => {
    
  })


//   const deleteButton = (index) => {
//       const FilterData = tbody
//       FilterData.splice(index, 1);
//        setFinaldata(...FilterData)
//        toast.error("Oops! Deleted Successfully ")
       
       
//   }
  console.log("got it", finaldata)
  // console.log(deals, "deakl===ll")
    // console.log(tbody, "Home Table");
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
           
        
          

          </Tr>
        </Thead>
        <Tbody className="mc-table-body even">

          {
            tbody?.length == 0 &&  <p  className="position-absolute  mt-2 text-center" style={{left:"50%"}}>No Offers added yet.</p>
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
                  <Text>{value?.duration}</Text>
                </Box>
              </Td>

              <Td >
                <Box className="mc-table-profile">
                  <Text>{value?.calculationNo}</Text>
                </Box>
              </Td>
           
          </Tr>
            )
          
          })}
        </Tbody>
      </Table>


    </Box>
    );
}

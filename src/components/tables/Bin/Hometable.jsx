
import { Table, Thead, Tbody, Th, Tr, Td } from "../../elements/Table";
import { Text,Box} from "../../elements";
import { Anchor, Heading, Input, Image, Icon, Button } from "../../elements";


export default function HomeTable({ thead, tbody }) {
    console.log(tbody, "-----Home Table");
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
                  <Text>Company Name</Text>
                </Box>
            </Th>
            <Th><Box className="mc-table-check">
                  <Text>Make Code</Text>
                </Box>
            </Th>
            <Th><Box className="mc-table-check">
              <Text>Series Name</Text>
            </Box></Th>
            <Th><Box className="mc-table-check">
              <Text>Model Code</Text>
            </Box></Th>
            <Th><Box className="mc-table-check">
              <Text> Lease Type</Text>
            </Box></Th>
            <Th><Box className="mc-table-check">
              <Text>Term</Text>
            </Box></Th>
      
            <Th><Box className="mc-table-check">
              <Text>Duration</Text>
            </Box></Th>
            <Th><Box className="mc-table-check">
              <Text>Annual Mileage</Text>
            </Box></Th>
            <Th><Box className="mc-table-check">
              <Text>Monthly Cost</Text>
            </Box></Th>
            <Th><Box className="mc-table-check">
              <Text>Calculation No</Text>
            </Box></Th>
          

          </Tr>
        </Thead>
        <Tbody className="mc-table-body even">
          {tbody?.map((value, index) => {
            return(
              <Tr key={index}>
             
              <Td title="id">
                <Box className="mc-table-profile">
                  <Text>{index+1}</Text>
                </Box>
              </Td>
                 <Td>
                    <Box>
                      <Text>{value?.carBrand_id?.companyName}</Text>
                    </Box>
                  </Td>
              <Td>
                <Box className="mc-table-profile">
                  <Text>{value?.carBrand_id?.makeCode}</Text>
                </Box>
              </Td>
              <Td >
                <Box className="mc-table-profile">
                  <Text>{value?.carSeries_id?.seriesName}</Text>
                </Box>
              </Td>
              <Td>
                <Box className="mc-table-profile">
                  <Text>{value?.carSeries_id?.modelCode}</Text>
                </Box>
              </Td>

              <Td >
                <Box className="mc-table-profile">
                  <Text>{value?.leaseType}</Text>
                </Box>
              </Td>

              <Td >
                <Box className="mc-table-profile">
                  <Text>{value?.term}</Text>
                </Box>
              </Td>


              <Td >
                <Box className="mc-table-profile">
                  <Text>{value?.offers[0]?.duration}</Text>
                </Box>
              </Td>

              <Td >
                <Box className="mc-table-profile">
                  <Text>{value?.offers[0]?.annualMileage}</Text>
                </Box>
              </Td>

              <Td >
                <Box className="mc-table-profile">
                  <Text>{value?.offers[0]?.monthlyCost}</Text>
                </Box>
              </Td>

              <Td >
                <Box className="mc-table-profile">
                  <Text>{value?.offers[0]?.calculationNo}</Text>
                </Box>
              </Td>

            
          </Tr>
            )
          
          })}
          
          {
            tbody?.length == 0 &&  <p  className="position-absolute  text-center" style={{left:"50%"}}>No Data added yet.</p>
          }


        </Tbody>
      </Table>


    </Box>
    );
}

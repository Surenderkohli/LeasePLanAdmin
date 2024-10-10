import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Modal, Form } from "react-bootstrap";
import { Table, Thead, Tbody, Th, Tr, Td } from "../../elements/Table";
import {
  Button,
  Image,
  Input,
  Text,
  Box,
  Icon,
  Anchor,
  Option,
  Heading,
} from "../../elements";
import teamInfo from "../../../data/master/Bin/leads.json";

export default function LeadsTable({ thead, tbody }) {
  const [data, setData] = useState([]);
  const [userData, setUserData] = React.useState("");
  const [editModal, setEditModal] = React.useState(false);
  const [blockModal, setBlockModal] = React.useState(false);
  // useEffect(() => {
  //   const query = ref(db, "users");

  //   let d = onValue(query, (snapshot) => {
  //     const data1 = snapshot.val();
  //     if (snapshot.exists()) {
  //     setData([]);

  //       Object.values(data1).map((user) => {
  //         setData((data) => [...data, user]);
  //       });
  //     }
  //   });
  //   return () => d;
  // }, []);

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
            {thead.map((item, index) => (
              <Th key={index}>{item}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody className="mc-table-body even">
          {data?.map((item, index) => (
            <Tr key={index}>
              <Td title="id">
                <Box className="mc-table-check">
                      <Text>{(Number(endOffset)-Number(itemsPerPage)+index+1)}</Text>

                </Box>
              </Td>
              <Td title={item.name}>
                <Box className="mc-table-profile">
                  <Text>{item?.name}</Text>
                </Box>
              </Td>
              <Td title={item.email}>
                <Box className="mc-table-profile">
                  <Text>{item?.email}</Text>
                </Box>
              </Td>
              <Td title={item.appoitement}>
                <Box className="mc-table-profile">
                  <Text>{item?.dateandtime}</Text>
                </Box>
              </Td>
              <Td title={item.contat}>
                <Box className="mc-table-profile">
                  <Text>{item?.contact}</Text>
                </Box>
              </Td>
              <Td title={item.expertise}>
                <Box className="mc-table-profile">
                  <Text>{item?.expertise}</Text>
                </Box>
              </Td>
              <Td title={item.consultant}>
                <Box className="mc-table-profile">
                  <Text>{item?.consultant}</Text>
                </Box>
              </Td>
            </Tr>
          ))}
          
        </Tbody>
      </Table>

      <Modal
        show={editModal}
        onHide={() => setEditModal(false, setUserData(""))}
      >
        <Box className="mc-user-modal">
          <Image src={userData.src} alt={userData?.alt} />
          <Heading as="h4">{userData?.name}</Heading>
          <Text as="p">{userData?.email}</Text>
          <Form.Group className="form-group inline mb-4">
            <Form.Label>role</Form.Label>
            <Form.Select>
              <Option>{userData?.role ? userData?.role.text : ""}</Option>
              {/* {teamInfo?.role?.map((item, index)=> (
                                <Option key={ index } value={ item }>{ item }</Option>
                            ))} */}
            </Form.Select>
          </Form.Group>
          <Form.Group className="form-group inline">
            <Form.Label>status</Form.Label>
            <Form.Select>
              <Option>{userData?.status}</Option>
              {/* {teamInfo?.status?.map((item, index)=> (
                                <Option key={ index } value={ item }>{ item }</Option>
                            ))} */}
            </Form.Select>
          </Form.Group>
          <Modal.Footer>
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEditModal(false)}
            >
              close popup
            </Button>
            <Button
              type="button"
              className="btn btn-success"
              onClick={() => setEditModal(false)}
            >
              Update
            </Button>
          </Modal.Footer>
        </Box>
      </Modal>

      <Modal show={blockModal} onHide={() => setBlockModal(false)}>
        <Box className="mc-alert-modal">
          <Icon type="new_releases" />
          <Heading as="h3">are your sure!</Heading>
          <Text as="p">Want to block this user's account?</Text>
          <Modal.Footer>
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={() => setBlockModal(false)}
            >
              nop, close
            </Button>
            <Button
              type="button"
              className="btn btn-danger"
              onClick={() => setBlockModal(false)}
            >
              yes, block
            </Button>
          </Modal.Footer>
        </Box>
      </Modal>
    </Box>
  );
}

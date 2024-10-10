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
  Item,
} from "../../elements";
import ReactPaginate from "react-paginate";
import Moment from 'react-moment';


export default function LeadsTable({ thead, tbody }) {
  const [data, setData] = useState([]);
  const [userData, setUserData] = React.useState("");
  const [editModal, setEditModal] = React.useState(false);
  const [blockModal, setBlockModal] = React.useState(false);
  useEffect(() => {
    setData(tbody);
  }, [tbody]);
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 6;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data?.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data?.length;
    setItemOffset(newOffset);
  };

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
          {currentItems?.map((item, index) => (
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
              <Td title={item.slotdateAndTime}>
                <Box className="mc-table-profile">
                  <Text>
                    {/* <Moment>{item?.slotdateAndTime}</Moment> */}
                    {item?.slotdateAndTime}
                    </Text>
                </Box>
              </Td>
              <Td title={item.mobileNumber}>
                <Box className="mc-table-profile">
                  <Text>{item?.mobileNumber}</Text>
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
              <Td title={item.email}>
                <Box className="mc-table-action">
                  <Anchor
                    href={`/new-client-profile?message=${item.message}&query_id=${item._id}`}
                    title="Edit"
                    className="material-icons view"
                  >
                    {"visibility"}
                  </Anchor>
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
            </Form.Select>
          </Form.Group>
          <Form.Group className="form-group inline">
            <Form.Label>status</Form.Label>
            <Form.Select>
              <Option>{userData?.status}</Option>
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
      <ReactPaginate
        className="mc-paginate-list mt-3"
        activeLinkClassName="bg-primary p-2 rounded-circle pag-siz"
        breakLabel="..."
        nextLabel={
          <Item className="mc-paginate-item">
            <Icon type="chevron_right" />
          </Item>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel={
          <Item className="mc-paginate-item">
            <Icon type="chevron_left" />
          </Item>
        }
        renderOnZeroPageCount={null}
      />
    </Box>
  );
}
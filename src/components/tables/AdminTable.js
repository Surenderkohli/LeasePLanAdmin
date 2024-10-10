import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import {
  Image,
  Input,
  Text,
  Box,
  Icon,
  Button,
  Heading,
  Anchor,
  Item,
} from "../elements";
import instance from "../../api/axios";
import ReactPaginate from "react-paginate";


export default function AdminTable({ thead, tbody }) {
  const [alertModal, setAlertModal] = useState(false);
  const [data, setData] = useState([]);
  const [updateAdminID, setUpdateAdminID] = useState(null);

  useEffect(() => {
    setData(tbody);
  }, [tbody]);

  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 6;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data?.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data?.length;;
    setItemOffset(newOffset);
  };



  const deactivateAdmin = async (id) => {
    try {
      await instance({
        url: `/auth/update-admin/${id}`,
        method: "PUT",
        data: { isActive: false },
      }).then((res) => {
        setAlertModal(false);
        window.location.reload();
      });
    } catch (e) {
      console.log(e);
    }
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
              <Td>
                <Box className="mc-table-check">
                  <Text>{(Number(endOffset)-Number(itemsPerPage)+index+1)}</Text>
                </Box>
              </Td>
              <Td>
                <Box className="mc-table-profile">
                  <Text>{item?.name}</Text>
                </Box>
              </Td>
              <Td>{item?.email}</Td>
              <Td>{item?.mobileNumber}</Td>
              <Td>{item?.role}</Td>
              <Td>
                <Text
                  className={`mc-table-badge ${
                    item?.isActive ? `lg green` : "lg red"
                  }`}
                >
                  {item?.isActive ? "Active" : "Inactive"}
                </Text>
              </Td>

              <Td>
                <Box className="mc-table-action">
                  <Anchor
                    title="Download"
                    href={`/editmyacount?query_id=${item?._id}&user_name=${item?.name}`}
                    className="material-icons download"
                    download
                  >
                    {"edit"}
                  </Anchor>
                  {/* <Button
                    title="Delete"
                    className="material-icons delete"
                    onClick={() => {
                      setUpdateAdminID(item._id);
                      setAlertModal(true);
                    }}
                  >
                    {"block"}
                  </Button> */}
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal show={alertModal} onHide={() => setAlertModal(false)}>
        <Box className="mc-alert-modal">
          <Icon type="new_releases" />
          <Heading as="h3">are your sure!</Heading>
          <Text as="p">Want to deactivate ?</Text>
          <Modal.Footer>
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={() => setAlertModal(false)}
            >
              close
            </Button>
            <Button
              type="button"
              className="btn btn-danger"
              onClick={() => deactivateAdmin(updateAdminID)}
            >
              Yes,deactivate
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
{
  /* <Box className="mc-paginate">
            <Text className="mc-paginate-title">Showing <b>12</b> of <b>60</b> Results</Text>
            <List className="mc-paginate-list">
                <Item className="mc-paginate-item">
                    <Icon type="chevron_left" />
                </Item>
                <Item className="mc-paginate-item active">1</Item>
                <Item className="mc-paginate-item">2</Item>
                <Item className="mc-paginate-item">3</Item>
                <Item className="mc-paginate-item">...</Item>
                <Item className="mc-paginate-item">45</Item>
                
            </List>
        </Box> */
}

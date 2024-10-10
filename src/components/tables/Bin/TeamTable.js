import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { Table, Thead, Tbody, Th, Tr, Td } from "../../elements/Table";
import { Button, Image, Input, Text, Box, Icon, Anchor, Option, Heading, Item } from "../../elements";
import teamInfo from "../../../data/master/Bin/ourTeam.json";
import ReactPaginate from "react-paginate";
import { useCallback } from "react";
import instance from "../../../api/axios";
import { toast,ToastContainer } from "react-toastify";


export default function TeamTable({ thead, tbody }) {

    const [data, setData] = useState([]);
    const [userData, setUserData] = React.useState("");
    const [editModal, setEditModal] = React.useState(false);
    const [blockModal, setBlockModal] = React.useState(false);
    useEffect(() => { setData(tbody) }, [tbody]);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 6;

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = data?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data?.length / itemsPerPage);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data?.length;
        setItemOffset(newOffset);
    };
    const handleCheckbox = (event) => {
        const { name, checked } = event.target;

        if (name === "allCheck") {
            const checkData = data?.map((item) => {
                return { ...item, isChecked: checked };
            });
            setData(checkData);
        }
        else {
            const checkData = data?.map((item) =>
                item.name === name ? { ...item, isChecked: checked } : item
            );
            setData(checkData);
        }
    }
    const [singleTeamData, setSingleTeamData] = useState(null);

    const getTeam = useCallback(async (id) => {
        try {
          await instance({
            url: `/ourteams/get-single-team/${id}`,
            method: "GET",
          }).then((res) => {
            setSingleTeamData(res.data);
            // setShowImage(`https://api.binhaider.dev.client.kloudlite.io/${res.data.img}`);
          });
        } catch (e) {
          console.error(e);
        }
      }, []);
    
      const updateTeam = async (id,featured) => {
        try {
          await instance({
            url: `/ourteams/update-team/${id}`,
            method: "put",
            data: {...singleTeamData,featured:featured},
          }).then((res) => {
            
         
                window.location.reload()
                  
          
          });
        } catch (e) {
          console.error(e);
        }
      };

    return (
        <Box className="mc-table-responsive">
            <Table className="mc-table">
                <Thead className="mc-table-head primary">
                    <Tr >
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

                                    <Text>{item?.en?.name}</Text>
                                </Box>
                            </Td>
                            <Td title={item.email}>
                                <Box className="mc-table-profile">

                                    <Text>{item?.en?.email}</Text>
                                </Box>
                            </Td>
                            <Td title={item.role}>
                                <Box className="mc-table-profile">

                                    <Text>{item?.en?.position}</Text>
                                </Box>
                            </Td>

                            <Td title={item.status}>
                                {item?.isActive === "active" && <Text className="mc-table-badge green">{item?.isActive}</Text>}
                                {item?.isActive === "inactive" && <Text className="mc-table-badge red">{item?.isActive}</Text>}
                            </Td>
                            <Td title={item.role}>
                                <Box className="mc-table-profile">

                                    <Text>{item?.experienceyear}</Text>
                                </Box>
                            </Td>
                            <Td title={item.featured}>
                                <Box className="mc-table-profile">
                                    <div class="form-check form-switch">
                                        <input onChange={(e)=>{getTeam(item._id);updateTeam(item._id,e.target.checked)}} checked={item.featured}  class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                                    </div>
                                      {/* <Text>{item?.featured?"true":"false"}</Text> */}
                                </Box>
                            </Td>
                            <Td>
                                <Box className="mc-table-action">
                                    <Anchor href={`/edit-team-member?query_id=${item?._id}&name=${item?.en?.name}`} title="Edit" className="material-icons view">{'edit'}</Anchor>
                                    {/* <Button title="" className="material-icons edit" onClick={()=> setEditModal(true, setUserData(item))}>{ item.action.edit }</Button> */}
                                    {/* <Button title="Block" className="material-icons block" onClick={() => setBlockModal(true)}>{'block'}</Button> */}
                                </Box>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <Modal show={editModal} onHide={() => setEditModal(false, setUserData(""))}>
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
                        <Button type="button" className="btn btn-secondary" onClick={() => setEditModal(false)}>close popup</Button>
                        <Button type="button" className="btn btn-success" onClick={() => setEditModal(false)}>Update</Button>
                    </Modal.Footer>
                </Box>
            </Modal>

            <Modal show={blockModal} onHide={() => setBlockModal(false)}>
                <Box className="mc-alert-modal">
                    <Icon type="new_releases" />
                    <Heading as="h3">are your sure!</Heading>
                    <Text as="p">Want to block this user's account?</Text>
                    <Modal.Footer>
                        <Button type="button" className="btn btn-secondary" onClick={() => setBlockModal(false)}>nop, close</Button>
                        <Button type="button" className="btn btn-danger" onClick={() => setBlockModal(false)}>yes, block</Button>
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
            <ToastContainer/>
        </Box>
    )
}
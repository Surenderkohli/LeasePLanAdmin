import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { Table, Thead, Tbody, Th, Tr, Td } from "../../elements/Table";
import { Button, Image, Input, Text, Box, Icon, Anchor, Option, Heading, Item } from "../../elements";

import ReactPaginate from "react-paginate";
import { useCallback } from "react";
import instance from "../../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import { updateTodayConsultant, singletodayconsultant, updateorsavetodayconsultant, todayconsultantbyid } from "../../../api/endpoints";

export default function TodayConsultantTable({ thead, tbody }) {

    const [data, setData] = useState([]);
    const [consultantData, setConsultantData] = React.useState("");
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


    const getSingleTodayConsultantFunction = useCallback(async (id) => {
        try {
            await instance({
                url: `${singletodayconsultant}/${id}`,
                method: "GET",
            }).then((res) => {
                setConsultantData(res.data);
                // setShowImage(`https://api.binhaider.dev.client.kloudlite.io/${res.data.img}`);
            });
        } catch (e) {
            console.error(e);
        }
    }, []);

    const findStatus = async (id) => {
        try {
            await instance({
                url: `${todayconsultantbyid}/${id}`,
                method: "GET",
            }).then((res) => {
                if (res.status === 200) {
                   
                    return res
                }
            });
        } catch (e) {
            return e
            console.log("error", e)
        }

    };


    const updateOrSaveTodayConsultantFunction = async (id) => {
        try {
            await instance({
                url: `${updateorsavetodayconsultant}/${id}`,
                method: "post",
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
                        <>
                            {item != null &&
                                <Tr key={index}>
                                    <Td title="id">
                                        <Box className="mc-table-check">
                                            <Text>{(Number(endOffset) - Number(itemsPerPage) + index + 1)}</Text>

                                        </Box>
                                    </Td>
                                    <Td title={item?.c?.en?.name}>
                                        <Box className="mc-table-profile">

                                            <Text>{item?.c?.en?.name}</Text>
                                        </Box>
                                    </Td>
                                    <Td title={item?.c?.en?.email}>
                                        <Box className="mc-table-profile">
                                            <Text>{item?.c?.en?.email}</Text>
                                        </Box>
                                    </Td>



                                    <Td title={item?.activeornot}>
                                        <Box className="mc-table-profile">
                                            <div class="form-check form-switch">
                                                {/* <p>{ async()=>await findStatus(item._id)?.data?.todayActive}</p> */}

                                                <input onChange={(e) => { updateOrSaveTodayConsultantFunction(item.c._id) }} checked={item?.activeornot === "active" ? true : false} class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                            </div>

                                        </Box>
                                    </Td>

                                </Tr>
                            }
                        </>
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
            <ToastContainer />
        </Box>
    )
}
import React, { useCallback, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Anchor, Item } from "../../../components/elements";
import { CardLayout, CardHeader, FloatCard } from "../../../components/cards";
import { Breadcrumb, Pagination } from "../../../components";
import LabelField from "../../../components/fields/LabelField";
import BlogTable from "../../../components/tables/Bin/BlogTable";
import PageLayout from "../../../layouts/PageLayout";
import data from "../../../data/master/Bin/todayConsultant.json";
import { toast, ToastContainer } from "react-toastify";
import instance from "../../../api/axios";
import { alltodayconactiveinactive, allTodayConsultant } from "../../../api/endpoints";
import TodayConsultantTable from "../../../components/tables/Bin/TodayConsultantTable";

export default function TodayConsultant() {
  const [allTodayConsultantData, setTodayConsultantData] = useState([]);
  const [query, setQuery] = useState("");
  const [allfilterData, setAllfilterData] = useState(null);
//   const search = () => {
//     if (query != "" || query != null) {
//       const filterarray = allBlogs?.filter((e) => {
//         if (e.en.title.toLowerCase().includes(query.toLowerCase())) {
//           return e;
//         }
//       });
//       setAllfilterData(filterarray);
//     }
//   };
  // const getTodaysConsultant = useCallback(async () => {
  //   try {
  //     await instance({
  //       url: allTodayConsultant,
  //       method: "GET",
  //     }).then((res) => {
  //       setTodayConsultantData(res.data);
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, []);
  const getAllConsultant = useCallback(async () => {
    try {
      await instance({
        url: `${alltodayconactiveinactive}`,
        method: "GET",
      }).then((res) => {
       
        res.data.map((e)=>{
          if(e != null){
            setTodayConsultantData((pre)=>[...pre,e])
          }
        })
        
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  // console.log(allTodayConsultantData)
  useEffect(() => {
    getAllConsultant();
    // search();
    return () => {};
  }, [query]);


  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title={`Manage consultant's status - ${new Date().toLocaleDateString()}`} >
              {/* {data?.breadcrumb.map((item, index) => (
                <Item key={index} className="mc-breadcrumb-item">
                  {item.path ? (
                    <Anchor className="mc-breadcrumb-link" href={item.path}>
                      {item.text}
                    </Anchor>
                  ) : (
                    item.text
                  )}
                </Item>
              ))} */}
            </Breadcrumb>
          </CardLayout>
        </Col>

        <Col xl={12}>
          <CardLayout>
            <Row>
              <Col xl={10}>
                {" "}
               
              </Col>
              <Col xl={2}>
               
              </Col>
            </Row>

            <Row xs={1} sm={4} className="mb-4">
              <Col xl={8} sm={0}></Col>
              
            </Row>
            <TodayConsultantTable
              thead={data?.table.thead}
              tbody={query ? allfilterData : allTodayConsultantData}
            />
       {/* <Pagination /> */}          </CardLayout>
        </Col>
      </Row>
      <ToastContainer />
    </PageLayout>
  );
}

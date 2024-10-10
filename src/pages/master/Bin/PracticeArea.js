import React, { useCallback, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Anchor, Item } from "../../../components/elements";
import { CardLayout, CardHeader, FloatCard } from "../../../components/cards";
import { Breadcrumb, Pagination } from "../../../components";
import LabelField from "../../../components/fields/LabelField";
import PracticeTable from "../../../components/tables/Bin/PracticeTable";
import PageLayout from "../../../layouts/PageLayout";
import data from "../../../data/master/Bin/practiceArea.json";
import instance from "../../../api/axios";

export default function PracticeArea() {
  const [allPractices, setAllPractices] = useState(null)
  const [query, setQuery] = useState("");
  const [allfilterData, setAllfilterData] = useState(null);
  const search = () => {
    if (query != "" || query != null) {
      const filterarray = allPractices?.filter((e) => {
        if (e.en.title.toLowerCase().includes(query.toLowerCase())) {
          return e;
        }
      });
      setAllfilterData(filterarray);
    }
  };
  const getPractices=useCallback(async ()=>{
    try {
      await instance({
        url: "/practice/all-practice",
        method: "GET", 
      },).then((res) => {
        setAllPractices(res.data)
      });
    } catch (e) {
      console.error(e);
    }
  },[])
  useEffect(() => {
    getPractices()
    search()
    return () => {
      
    }
  }, [query])
  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title={data?.pageTitle}>
              {data?.breadcrumb.map((item, index) => (
                <Item key={index} className="mc-breadcrumb-item">
                  {item.path ? (
                    <Anchor className="mc-breadcrumb-link" href={item.path}>
                      {item.text}
                    </Anchor>
                  ) : (
                    item.text
                  )}
                </Item>
              ))}
            </Breadcrumb>
          </CardLayout>
        </Col>

        <Col xl={12}>
          <CardLayout>
            <Row>
              <Col xl={10}>
                {" "}
                {/* <CardHeader title="All Areas" /> */}
              </Col>
              <Col xl={2}>
                {/* <Anchor
                  className="mc-breadcrumb-link d-flex flex-row-reverse"
                  href="/addpractices"
                >
                  Add
                </Anchor> */}
              </Col>
            </Row>

            <Row xs={1} sm={4} className="mb-4">
              <Col xl={8} sm={0}>

              </Col>
              {/* {data?.filter.map((item, index) => (
                <Col xl={4} sm={12} key={index}>
                  <LabelField
                    type={item.type}
                    label={item.label}
                    option={item.option}
                    placeholder={item.placeholder}
                    labelDir="label-col"
                    fieldSize="w-100 h-sm"
                    onChange={(e)=>setQuery(e.target.value)}
                  />
                </Col>
              ))} */}
            </Row>
            <PracticeTable
              thead={data?.table.thead}
              tbody={query?allfilterData:allPractices}
            />
            {/* <Pagination /> */}
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}

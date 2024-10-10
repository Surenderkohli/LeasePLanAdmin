import React, { useCallback, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import {
  List,
  Item,
  Icon,
  Text,
  Box,
  Anchor,
} from "../../../components/elements";
import {
  Breadcrumb,
  RoundAvatar,
  DivideTitle,
  DuelText,
} from "../../../components";
import {
  CardLayout,
  CardHeader,
  FloatCard,
  ActivityCard,
} from "../../../components/cards";
import PageLayout from "../../../layouts/PageLayout";
import data from "../../../data/master/Bin/contactProfile.json";
import { getSingleMessage } from "../../../api/endpoints";
import { useQuery } from "../../../api/query";
import instance from "../../../api/axios";

export default function ContactProfile() {
  const query = useQuery();
  const [contactProfile, setContactProfile] = useState(null);
  const getContactUser = useCallback(async () => {
    try {
      await instance({
        url: `${getSingleMessage}/${query.get("query_email")}`,
        method: "GET",
      }).then((res) => {
       
        setContactProfile(res.data);
      });
    } catch (e) {
      console.error(e);
    }
  }, []);
  useEffect(() => {
    getContactUser();
  }, []);
  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title="user profile">
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
        <Col xl={4}></Col>
        <Col xl={5}>
          <CardLayout>
            <CardHeader title="user information" />

            <Box className="mc-user-group">
              <Box className="mc-user-profile">
                {/* <RoundAvatar 
                                    src={ data?.profile.src } 
                                    alt={ data?.profile.alt } 
                                    size={ data?.profile.size } 
                                /> */}
                <DuelText 
                                    title={`@${contactProfile?.name}` }
                                    // descrip={ userProfile?.createdAt } 
                                    
                                    size={ data?.profile.size }
                                />
              </Box>
              <Box className="mb-4">
                {/* <DivideTitle title="communication" className="mb-4" /> */}
                <List className="mc-user-metalist">
                  {/* <Item >
                                            <Icon>{ 'phone_in_talk'}</Icon>
                                            <Text as="span">{ userProfile?.mobileNumber }</Text>
                                        </Item> */}
                  <Item>
                    <Icon>{"feed"}</Icon>
                    <Text as="span">{contactProfile?.email}</Text>
                  </Item>
                  <Item>
                    <Icon>{"lens"}</Icon>
                    <Text as="span">{contactProfile?.companyName}</Text>
                  </Item>
                  {/* <Item >
                                            <Icon>{ 'layers' }</Icon>
                                            <Text as="span">{ userProfile?.expertise }</Text>
                                        </Item> */}
                  {/* <Item >
                                            <Icon>{ 'map' }</Icon>
                                            <Text as="span">{ userProfile?.address }</Text>
                                        </Item> */}
                </List>
              </Box>
              <Box className="mb-4">
                <DivideTitle title={data?.bio.title} className="mb-3" />
                <Text className="mc-user-bio mb-4">{contactProfile?.message}</Text>
              </Box>
              {/* <Box>
                                <DivideTitle title="elsewhere" className="mb-4" />
                                <Box className="mc-user-social">
                                    {data?.social.map((item, index)=> (
                                        <Anchor 
                                            key = { index } 
                                            href = { item.path }
                                            text = { item.type }
                                            iconClass = { item.icon }
                                            className = { item.type }
                                        />
                                    ))}
                                </Box>
                            </Box> */}
            </Box>
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}

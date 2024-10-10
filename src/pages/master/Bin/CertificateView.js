// import React, { useCallback, useEffect, useState } from "react";
// import { Row, Col } from "react-bootstrap";
// import {
//   List,
//   Item,
//   Icon,
//   Text,
//   Box,
//   Anchor,
//   Image,
// } from "../../../components/elements";
// import {
//   Breadcrumb,
//   RoundAvatar,
//   DivideTitle,
//   DuelText,
//   FileUpload,
// } from "../../../components";
// import {
//   CardLayout,
//   CardHeader,
//   FloatCard,
//   ActivityCard,
// } from "../../../components/cards";
// import PageLayout from "../../../layouts/PageLayout";
// import data from "../../../data/master/Bin/certificateView.json";
// import { getNewClient } from "../../../api/endpoints";
// import { useQuery } from "../../../api/query";
// import instance from "../../../api/axios";
// import { LegendField } from "../../../components/fields";

// export default function CertificateView() {
//   const query = useQuery();
//   const [userProfile, setUserProfile] = useState(null);
//   const getNewUser = useCallback(async () => {
//     try {
//       await instance({
//         url: `${getNewClient}/${query.get("query_id")}`,
//         method: "GET",
//       }).then((res) => {
//         setUserProfile(res.data);
//       });
//     } catch (e) {
//       console.error(e);
//     }
//   }, []);
//   useEffect(() => {
//     getNewUser();
//   }, []);
//   return (
//     <PageLayout>
//       <Row>
//         <Col xl={12}>
//           <CardLayout>
//             <Breadcrumb title="Awards & Certificate">
//               {data?.breadcrumb.map((item, index) => (
//                 <Item key={index} className="mc-breadcrumb-item">
//                   {item.path ? (
//                     <Anchor className="mc-breadcrumb-link" href={item.path}>
//                       {item.text}
//                     </Anchor>
//                   ) : (
//                     item.text
//                   )}
//                 </Item>
//               ))}
//             </Breadcrumb>
//           </CardLayout>
//         </Col>
//         <Col xl={4}></Col>
//         <Col xl={5}>
//           <CardLayout>
//             <CardHeader title="Awards & Certificate information" />

//             <Box className="mc-user-group">
//               <Box className="mc-user-profile">
//                 <Row>
//                   <Col xl={6}>
//                     <Box className="mc-user-avatar-upload ">
//                       {/* <Box style={{ width: "100%" }} className="mb-2 shadow-sm">
//                         <Image
//                           src={data?.profile.src}
//                           alt={data?.profile.alt}
//                           size={data?.profile.size}
//                         />
//                       </Box> */}
//                        <Box className="mc-user-avatar">
//                           <Image
//                             src={ShowImage?ShowImage:data.avatar.src}

//                             alt={data?.avatar.alt}
//                           />
//                         </Box>
//                       <FileUpload
//                         // onChange={(e) => imageUpload(e)}
//                         icon="cloud_upload"
//                         text="upload"
//                       />
//                     </Box>
//                   </Col>
//                   <Col xl={6}>
//                           <LegendField
//                             title={data?.title}
//                             // value={singleBlog?.en?.title}
//                             // onChange={(e) => {
//                             //   setSingleBlog({
//                             //     ...singleBlog,
//                             //     en: { ...singleBlog.en, title: e.target.value },
//                             //   });
//                             // }}
//                           />
//                         </Col>
//                 </Row>
//                 {/* <Item >
//                                             <Icon>{ 'phone_in_talk'}</Icon>
//                                             <Text as="span">{ userProfile?.mobileNumber }</Text>
//                                         </Item> */}
//               </Box>
//               {/* <Box className="mb-4">
                           
//                                 <List className="mc-user-metalist">
                                    
//                                         <Item >
//                                             <Icon>{ 'phone_in_talk'}</Icon>
//                                             <Text as="span">{ userProfile?.mobileNumber }</Text>
//                                         </Item>
//                                         <Item >
//                                             <Icon>{ 'feed' }</Icon>
//                                             <Text as="span">{ userProfile?.email }</Text>
//                                         </Item>
//                                         <Item >
//                                             <Icon>{ 'event_note' }</Icon>
//                                             <Text as="span">{ userProfile?.slotdateAndTime }</Text>
//                                         </Item>
//                                         <Item >
//                                             <Icon>{ 'layers' }</Icon>
//                                             <Text as="span">{ userProfile?.expertise }</Text>
//                                         </Item>
//                                         <Item >
//                                             <Icon>{ 'map' }</Icon>
//                                             <Text as="span">{ userProfile?.address }</Text>
//                                         </Item>
                                      
                                   
//                                 </List>
//                             </Box> */}
//               {/* <Box className="mb-4">
//                                 <DivideTitle title={ data?.bio.title } className="mb-3" />
//                                 <Text className="mc-user-bio mb-4">{ userProfile?.message }</Text>
//                             </Box> */}
//               {/* <Box>
//                                 <DivideTitle title="elsewhere" className="mb-4" />
//                                 <Box className="mc-user-social">
//                                     {data?.social.map((item, index)=> (
//                                         <Anchor 
//                                             key = { index } 
//                                             href = { item.path }
//                                             text = { item.type }
//                                             iconClass = { item.icon }
//                                             className = { item.type }
//                                         />
//                                     ))}
//                                 </Box>
//                             </Box> */}
//             </Box>
//           </CardLayout>
//         </Col>
//       </Row>
//     </PageLayout>
//   );
// }

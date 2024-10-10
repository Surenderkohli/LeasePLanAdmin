import { ThemeProvider } from "./context/Themes";
import { LoaderProvider } from "./context/Preloader";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Overview, Documentation, ChangeLog, Error } from "./pages/supports";
import {
  Avatars,
  Alerts,
  Buttons,
  Charts,
  Tables,
  Fields,
  Headings,
  Colors,
} from "./pages/blocks";
import {
  Ecommerce,
  Analytics,
  CRM,
  ForgotPassword,
  Register,
  Login,
  UserList,
  UserProfile,
  MyAccount,
  ProductList,
  ProductView,
  ProductUpload,
  InvoiceList,
  InvoiceDetails,
  OrderList,

  Notification,
  BlankPage,
  Settings,
} from "./pages/master";
import EditMyProfile from "./pages/master/Bin/EditMyProfile";
import RegisterAdmin from "./pages/master/Bin/RegisterAdmin";
import PracticeArea from "./pages/master/Bin/PracticeArea";
import EditPracticeArea from "./pages/master/Bin/EditPracticeArea";
import AddPractice from "./pages/master/Bin/AddPractice";
import BlogSection from "./pages/master/Bin/BlogSection";
import AddBlog from "./pages/master/Bin/AddBlog";
import EditBlog from "./pages/master/Bin/EditBlog";
import EventSection from "./pages/master/Bin/EventSection";
import AddEvent from "./pages/master/Bin/AddEvent";
import EditEvent from "./pages/master/Bin/EditEvent";
import OurTeam from "./pages/master/Bin/OurTeam";
import EditAbout from "./pages/master/Bin/CMS/About/EditAbout";
import Message from "./pages/master/Bin/CEO/Message";

import AddTeam from "./pages/master/Bin/AddTeam";
import EditTeam from "./pages/master/Bin/EditTeam";
// frontend
// import { AboutUs } from "../src/frontend/src/Pages/AboutUs";
// import ClientOurTeam from "./frontend/src/Pages/ClientOurTeam";
// import ClientPracticeArea from "./frontend/src/Pages/ClientPracticeArea";
// import ClientBlog from "./frontend/src/Pages/ClientBlog";
// import Home from "./frontend/src/Pages/Home";
// import ContactUs from "./frontend/src/Pages/ContactUs";
// import BlogView from "./frontend/src/Pages/ClientBlogModal";
import Leads from "./pages/master/Bin/Leads";
// import ExistingClient from "./pages/master/Bin/ ExistingClient";
import NewClientProfile from "./pages/master/Bin/NewClientProfile";
import Protected from "./Protected";
import ExistingClientProfile from "./pages/master/Bin/ExistingClientProfile";
import Contact from "./pages/master/Bin/Contact";
import ContactProfile from "./pages/master/Bin/ContactProfile";
import Certificate from "./pages/master/Bin/Certificate";
import CertificateView from "./pages/master/Bin/CertificateView";
import AddCertificate from "./pages/master/Bin/AddCertificate";
import TodayConsultant from "./pages/master/Bin/TodayConsultant";
import AddTodayConsultant from "./pages/master/Bin/AddTodayConsultant";
import { adminLogout } from "./api/adminlogout";
import { useEffect } from "react";
import PageIntro from "./pages/master/Bin/CMS/Intro/PageIntro";
import { Home } from "./pages/master/Home";
import Banner from "./pages/master/Banner";
import Inventory from "./pages/master/Inventory";
import Offers from "./pages/master/Offers";
import Query from "./pages/master/Query";
import { AddBanner } from "./pages/master/addBanner";
import { AddInventory } from "./pages/master/addInventory";
import Home2 from "./pages/home2";
import { Leasedetails } from "./pages/master/Leasedetails";
import {Addcarbrand} from "./pages/master/Addcarbrand";
import Updatebanner from "./pages/master/Updatebanner";
import Editbanner from "./pages/master/Editbanner";
import Carbrand from "./pages/master/Carbrand";
import Carseries from "./pages/master/Carseries";
import Offeredit from "./pages/master/offeredit";


export default function App() {
  //setTimeout(() => { adminLogout() }, 1000 * 60 * 60 * 24)
  // useEffect(()=>{

  // },[])

// Adding pagination for 

  return (
    <ThemeProvider>
      <LoaderProvider>
        <BrowserRouter>
          <Routes>

            {/* master Pages */}
             {/* <Route path="/ecommerce" element={<Ecommerce />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
           
            
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/product-view" element={<ProductView />} />
           
            <Route path="/invoice-list" element={<InvoiceList />} />
            <Route path="/invoice-details" element={<InvoiceDetails />} />
            <Route path="/order-list" element={<OrderList />} />
            <Route path="/message" element={<Message />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/blank-page" element={<BlankPage />} />  */}
            {/* Bin */}
         
            <Route path="/forgot-password" 
               element={ 
                 <Protected>
                 <ForgotPassword />
                 </Protected>} />
            <Route path="/product-view" 
               element={
                <Protected>
                   <ProductView />
                </Protected>
              } />
            <Route path="/my-account" 
                element={
                  <Protected>
                     <MyAccount />
                  </Protected>
               } />
            <Route path="/invoice-list" 
                element={
                <Protected>
                 <InvoiceList />
                 </Protected>
                 } />
             <Route path="/" element={<Login />} />                                   
              <Route path="/home"
               element={
                <Protected>
                     <Home/>
                </Protected>
               }/>
               <Route path="/banner" 
                  element={
                  <Protected>
                  <Banner/>
                  </Protected>
                  }/>
              <Route path="/add-banner" 
                 element={
                  <Protected>
                    <AddBanner/>
                  </Protected>
                 }/>
              <Route path="/product-upload" 
                  element={
                    <Protected>
                    <ProductUpload />
                    </Protected>
                    } />
              <Route path="/offer-update" 
                  element={
                    <Protected>
                    <Offeredit />
                    </Protected>
                    } />

              <Route path="/add-car" 
                  element={
                    <Protected>
                       <Addcarbrand/>
                    </Protected>
                  }/>
              
              <Route path="/add-carbrand" 
                    element={
                    <Protected>
                       <Carbrand/>
                    </Protected>
                    }/>
              <Route path="/add-carseries" 
                     element={
                     <Protected>
                       <Carseries/>
                     </Protected>
                     }/>
              <Route path ="/inventory" 
                    element={
                      <Protected>
                        <Inventory/>
                      </Protected>
                   }/>
              <Route path ="/offers" 
                    element={
                      <Protected>
                          <Offers/>
                      </Protected>
                   }/>
              <Route path ="/add-inventory"
                   element={
                    <Protected>
                      <AddInventory/>
                    </Protected>
                   }/>
              <Route path ="/contact-details" 
                  element={
                  <Protected>
                  <Query/>
                  </Protected>}/> 
              <Route path ="/lease-details" 
                  element={
                  <Protected>
                  <Leasedetails/>
                  </Protected>}/>
              <Route path ="/Update-banner" 
                  element={ 
                  <Protected>
                  <Updatebanner/>
                  </Protected>}/>
              <Route path ="/resetpassword" 
                  element={
                  <Protected>
                  <Editbanner/>
                  </Protected>}/>

            { <Route
              path="/active-admin"
              element={
             
                  <ForgotPassword />
              
              }
            />
          /*
            <Route
              path="/editmyacount"
              element={
                <Protected>
                  <EditMyProfile />
                </Protected>
              }
            />
            <Route
              path="/registeradmin"
              element={
            
                  <RegisterAdmin />
              
              }
            />
            <Route
              path="/practicelist"
              element={
           
                  <PracticeArea />
              
              }
            />
            <Route
              path="/editpracticearea"
              element={
         
                  <EditPracticeArea />
                
              }
            />
            <Route
              path="/addpractices"
              element={
              
                  <AddPractice />
               
              }
            />
            <Route
              path="/blogsection"
              element={
             
                  <BlogSection />
               
              }
            />
            <Route
              path="/addblog"
              element={
             
                  <AddBlog />
              
              }
            />
            <Route
              path="/editblog"
              element={
           
                  <EditBlog />
             
              }
            />
            <Route
              path="/eventsection"
              element={
             
                  <EventSection />
               
              }
            /> */}
            {/* <Route
              path="/addevent"
              element={
          
                  <AddEvent />
              
              }
            />
            <Route
              path="/editevent"
              element={
                <Protected>
                  <EditEvent />
                </Protected>
              }
            />
            <Route
              path="/edit-cms-about"
              element={
                <Protected>
                  <EditAbout />
                </Protected>
              }
            />
            <Route
              path="/ourteams"
              element={
                <Protected>
                  <OurTeam />
                </Protected>
              }
            />
            <Route
              path="/add-team-member"
              element={
                <Protected>
                  <AddTeam />
                </Protected>
              }
            />
            <Route
              path="/edit-team-member"
              element={
                <Protected>
                  <EditTeam />
                </Protected>
              }
            />

            <Route path="/home" element={<Protected><Leads /></Protected>} />
           
            <Route
              path="/new-client-profile"
              element={
                <Protected>
                  <NewClientProfile />
                </Protected>
              }
            />
            <Route
              path="/existing-client-profile"
              element={
                <Protected>
                  <ExistingClientProfile />
                </Protected>
              }
            />
            <Route
              path="/user-contact"
              element={
                <Protected>
                  <Contact />
                </Protected>
              }
            />
            <Route
              path="/user-contact-profile"
              element={
                <Protected>
                  <ContactProfile />
                </Protected>
              }
            />
            <Route
              path="/ceo-message"
              element={
                <Protected>
                  <Message />
                </Protected>
              }
            />
            <Route
              path="/awards-certifications"
              element={
                <Protected>
                  <Certificate />
                </Protected>
              }
            /> */}
            {/* <Route
              path="/certificate-view"
              element={
                <Protected>
                  <CertificateView />
                </Protected>
              }
            /> */}
            {/* <Route
              path="/add-certificate"
              element={
                <Protected>
                  <AddCertificate />
                </Protected>
              }
            />

            <Route
              path="/today-consultant"
              element={
                <Protected>
                  <TodayConsultant />
                </Protected>
              }
            /> */}

        {/* <Route
              path="/page-intro"
              element={
                <Protected>
                  <PageIntro/>
                </Protected>
              }
            /> */}

              {/* <Route
              path="/add-today-consultant"
              element={
                <Protected>
                  <AddTodayConsultant />
                </Protected>
              }
            /> */}

            {/* //Frontend */}
            {/* <Route path="v1/client/about-us" element={<AboutUs />} />
            <Route path="v1/client/our-team" element={<ClientOurTeam />} />
            <Route path="v1/client/our-team" element={<ClientOurTeam />} />
            <Route
              path="v1/client/practice-area"
              element={<ClientPracticeArea />}
            /> */}
            {/* <Route path="v1/client/blog-section" element={<ClientBlog />} /> */}
            {/* <Route path="v1/client/home-section" element={<Home />} /> */}
            {/* <Route path="v1/client/contact-us" element={<ContactUs />} />
            <Route path="v1/client/blog-view" element={<BlogView />} /> */}


            {/* Blocks Pages */}
            {/* <Route path="/headings" element={<Headings />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/colors" element={<Colors />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/fields" element={<Fields />} />
            <Route path="/alerts" element={<Alerts />} /> */}

            {/* Supports Pages */}
            {/* <Route path="*" element={<Error />} />
             <Route path="/" element={
             
                <Navigate to="/leads-section" />
             
            } />  */}
             
            <Route path="/changelog" element={<ChangeLog />} /> 
          </Routes>
        </BrowserRouter>
      </LoaderProvider>
    </ThemeProvider>
  );
}

import React, {useState} from 'react'
import { Dialog } from '@headlessui/react'
import { Col, Row, Tab, Tabs } from "react-bootstrap";

const Editbanner = () => {

    const [editshow, setEditshow ] = useState()
    const [uploadImg, setUploadImg] = useState()
  
    
    const handleChange = (e) => {

        const { name, value } = e.target;
     
        setEditshow({...editshow, [name]: value })
    }
    

    return (
        <Row>
        <form className="row g-3 mt-0 mb-5 p-2 needs-validation">
            <div className="col-md-6">
            <label className="form-label">Current Password</label>
                       <input type="text" className="form-control" name="title" onChange={handleChange} value="Test" required />
                   </div>

                  <div className="col-md-6">
                       <label className="form-label">New Password</label>
                       <input type="text" className="form-control" name="link" onChange={handleChange} value="New password" required />
                   </div>

                   <div className="col-md-6">
                   <label className="form-label">Confirm Password</label>
                       <input type="text" className="form-control" name="description" onChange={handleChange} value="New password" required />
                  </div>


                 
       </form>
      
  

    <div className="col-6">
       <button className="btn btn-primary"  >Cancel</button>
    </div>

    <div className="col-6">
    <button className="btn btn-primary" type="submit" >Reset Password</button>
    </div>


 
        </Row>
    )  
}

export default Editbanner

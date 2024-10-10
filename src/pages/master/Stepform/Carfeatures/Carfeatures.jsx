import React, {useState} from 'react'
import './Carfeatures.css'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import {toast, ToastContainer} from 'react-toastify'

import {Col, Row, Tab, Tabs} from 'react-bootstrap'
import {Box, Anchor, Button} from '../../../../components/elements'

const Carfeatures = ({onButtonClick}) =>{


//   const[allfeatures, setAllfeatures] = useState({
//     exteriorFeatures:'',
//     interiorFeatures:'',
//     safetySecurityFeatures:'',
//     comfortConvenienceFeatures:'',
//     audioEntertainmentFeatures:'',
//   })

     const[exteriorFeatures, setExteriorFeatures] = useState([])
     const[interiorFeatures, setInteriorFeatures] = useState([])
     const[safetySecurityFeatures, setSafetySecurityFeatures] = useState([])
     const[comfortConvenienceFeatures, setComfortConvenienceFeatures] = useState([])
     const[audioEntertainmentFeatures, setAudioEntertainmentFeatures] = useState([])

     const[inputexterior, setInputexterior] = useState("");
     const[inputinterior, setInputinterior] = useState("");
     const[inputsafety, setInputSafety] = useState("");
     const[inputcomfort, setInputcomfort] = useState("");
     const[inputaudio, setInputaudio] = useState("");



    //  Adding custom fields for features

    const[customfield, setCustomfield] = useState([]);




     const handleSubmitexterior = (e) => {
        e.preventDefault();
        console.log(inputexterior, "hey clickinf me ")
        setExteriorFeatures([...exteriorFeatures, inputexterior])
        setInputexterior("")
        console.log(exteriorFeatures, "this is ")

        // if(inputexterior.trim()){
        //     setExteriorFeatures([...exteriorFeatures, inputexterior]);
        //     setInputexterior("");
        // }
     }
    
  

    const handleSubmitinterior = (e) => {
        e.preventDefault();
        setInteriorFeatures([...interiorFeatures, inputinterior])
        setInputinterior("")
    }

    const handleSubmitsafety = (e) => {
        e.preventDefault();
        setSafetySecurityFeatures([...safetySecurityFeatures, inputsafety])
        setInputSafety("")
    }

    const handleSubmitcomfort = (e) => {
        e.preventDefault();
        setComfortConvenienceFeatures([...comfortConvenienceFeatures, inputcomfort])
        setInputcomfort("")
    }

    const handleSubmitaudio = (e) => {
        e.preventDefault();
        setAudioEntertainmentFeatures([...audioEntertainmentFeatures, inputaudio])
        setInputaudio("")
    }

//   const handleChange = (e) => {
//       const{name,value} = e.target
//       setAllfeatures({...allfeatures, [name]:[value]})
//   }
    
   const handleRemoveInputinterior = (index) => {
       const filter = [...interiorFeatures];
       filter.splice(index, 1);
       setInteriorFeatures(filter)
      console.log(index, "indexitmeclienkd")
   }

// Adding Custom Features functionality

//   function addCustomField() {
//     setCustomFields([...customFields, { heading: '', code: '', descriptions: [] }]);
//   }

//   function handleFieldChange(index, fieldName, value) {
//     const updatedFields = [...customFields];
//     updatedFields[index][fieldName] = value;
//     setCustomFields(updatedFields);
//   }

//   function addDescription(index, description) {
//     const updatedFields = [...customFields];
//     updatedFields[index].descriptions.push(description);
//     setCustomFields(updatedFields);
//   }



  return (   
  
  <>
          <Row className="">
                <form className="row g-3 mt-0 p-2 mb-5  needs-validation">
                  
                   <div className="col-md-10 d-flex justify-content-between">
                        <label className="form-label" >Exterior features</label>
                        <div className='d-flex'>
                        <input type='number' className="form-control" style={{width: "45px", marginRight: "10px", paddingRight: "0px"}} name="exteriorFeatures" value='1' required disabled/>
                        <input type="text" placeholder='Add Exterior Features' className="form-control" name="exteriorFeatures" onChange={(e) =>setInputexterior(e.target.value) } value={inputexterior} required />
                        </div>
                  </div>

                    <div className="col-2 ">
                        <Anchor 
                            className="mc-btn w-100 btn btn-primary" 
                            // text="publish &amp; view" 
                            text="Exterior features"
                            icon="add_circle" 
                            onClick={handleSubmitexterior}
                        />
                    </div>
                    
                  <div>
                  <ul className='row d-flex mt-2'>
                        {exteriorFeatures?.map((item, index) => (
                            <li className='col-2 featurecss' key={index}> {item} </li>
                        ))}
                    </ul>
                  </div>

                    <div className="col-md-10 d-flex justify-content-between">
                        <label className="form-label">Interior features</label>
                        <div className='d-flex'>
                        <input type='number' className="form-control" style={{width: "45px", marginRight: "10px", paddingRight: "0px"}} name="interiorFeatures" value='2' required disabled/>
                        <input type="text" placeholder='Add Interior Features' className="form-control" name="interiorFeatures" onChange={(e) => setInputinterior(e.target.value)} value={inputinterior} required />
                        </div>
                    </div>
            
                    <div className="col-2 ">
                        <Anchor 
                            className="mc-btn w-100 btn btn-primary" 
                            // text="publish &amp; view" 
                            text="Interior features"
                            icon="add_circle" 
                            onClick={handleSubmitinterior}
                        />
                    </div>

                   <div>
                   <ul className='row d-flex mt-2'>
                        {interiorFeatures?.map((item, index) => (
                            <li className='col-2 featurecss' key={index}>
                             {item} 
                             <button className='remove' onClick={() => handleRemoveInputinterior(index)}>x</button>
                             </li>
                        ))}
                    </ul>
                   </div>
             

                    <div className="col-md-10 d-flex justify-content-between">
                        <label className="form-label">Safety security features</label>
                        <div className='d-flex'>
                        <input type='number' className="form-control" style={{width: "45px", marginRight: "10px", paddingRight: "0px"}} name="safetySecurityFeatures" value='3' required disabled/>
                        <input type="text" placeholder='Add Safety security Features' className="form-control" name="safetySecurityFeatures" onChange={(e) => setInputSafety(e.target.value)} value={inputsafety} required />
                        </div>
                  </div>

                    <div className="col-2 ">
                        <Anchor 
                            className="mc-btn w-100 btn btn-primary" 
                            // text="publish &amp; view" 
                            text="Security features"
                            icon="add_circle" 
                            onClick={handleSubmitsafety}
                        />
                    </div>

                  <div>
                  <ul className='row d-flex mt-2'>
                        {safetySecurityFeatures?.map((item, index) => (
                            <li className='col-2 featurecss' key={index}> {item} </li>
                        ))}
                    </ul>
                  </div>

                  <div className="col-md-10 d-flex justify-content-between">
                        <label className="form-label">Comfort Convenience features</label>
                        <div className='d-flex'>
                        <input type='number' className="form-control" style={{width: "45px", marginRight: "10px", paddingRight: "0px"}} name="comfortConvenienceFeatures" value='4' required disabled/>
                        <input type="text" placeholder='Add Comfort Convenience features' className="form-control" name="comfortConvenienceFeatures" onChange={(e) => setInputcomfort(e.target.value)} value={inputcomfort} required />
                        </div>
                  </div>
              
                    <div className="col-2 ">
                        <Anchor 
                            className="mc-btn w-100 btn btn-primary" 
                            // text="publish &amp; view" 
                            text="Comfort features"
                            icon="add_circle" 
                            onClick={handleSubmitcomfort}
                        />
                    </div>

                    <div>
                    <ul className="row mt-2">
                        {comfortConvenienceFeatures?.map((item, index) => (
                            <li className='col-4 featurecss' key={index}> {item} </li>
                        ))}
                    </ul>
                    </div>
                    

                    <div className="col-md-10 d-flex justify-content-between">
                        <label className="form-label">Audio Entertainent features</label>
                        <div className='d-flex'>
                        <input type='number' className="form-control" style={{width: "45px", marginRight: "10px", paddingRight: "0px"}} name="audioEntertainmentFeatures" value='5' required disabled/>
                        <input type="text" placeholder='Add Audio Entertainent features' className="form-control " name="audioEntertainmentFeatures" onChange={(e) => setInputaudio(e.target.value)} value={inputaudio} required />
                        </div>
                  </div>
              
                    <div className="col-2 ">
                        <Anchor 
                            className="mc-btn w-100 btn btn-primary" 
                            // text="publish &amp; view" 
                            text="Audio/Ent features"
                            icon="add_circle" 
                            onClick={handleSubmitaudio}
                        />
                    </div>

                  <div>

                  <ul className="row d-flex mt-2">
                        {audioEntertainmentFeatures?.map((item, index) => (
                            <li className='col-4 featurecss' key={index}> {item} </li>
                        ))}
                    </ul>
                  </div>

                    <div className="col-2 leftside">
                        {/* <button className="btn btn-primary" type="submit">Publish Now</button> */}
                        <Anchor 
                            className="mc-btn w-100 btn btn-primary mt-5" 
                            // text="publish &amp; view" 
                            text="Prev"
                            icon="keyboard_arrow_left" 
                            onClick={() => onButtonClick("pageone")}
                        />
                    </div>

                    <div className="col-2 rightsidefeatures">

                        <Anchor 
                            className="mc-btn w-100 btn btn-primary mt-5" 
                            // text="publish &amp; view" 
                            text="Next"
                            icon="navigate_next" 
                            onClick={() => onButtonClick(3)}
                        />

                    </div>

                   
                </form>
            </Row>



    <ToastContainer/>
  </>



  )
}

export default Carfeatures

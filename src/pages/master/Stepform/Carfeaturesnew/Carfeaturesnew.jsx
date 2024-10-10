import React, {useEffect, useState} from 'react'
import './Carfeaturesnew.css'
import {toast, ToastContainer} from 'react-toastify'
import {Col, Row, Tab, Tabs} from 'react-bootstrap'
import {Box, Anchor, Button} from '../../../../components/elements'


const Carfeaturesnew =  ({onButtonClick, handleBack, allData}) =>{
  

    const [categories, setCategories] = useState([]);
    const [categoryCode, setCategoryCode] = useState();
    const [categoryDescription, setCategoryDescription] = useState();
    const [featureDescription, setFeatureDescription] = useState();
    const [tempFeatures, setTempFeatures] = useState([]);
  
    
   useEffect(() => {
       if(allData.categories){
              setCategories(allData.categories )
       }
   }, [allData])

   
    const addCategory = () => {
      const newCategory = {
        code: categoryCode,
        description: categoryDescription,
        features: [...tempFeatures]
      };

      const CodeAlreadyused = categories.some((category) => category.code === categoryCode && category.description !== categoryDescription);

      if(categoryDescription.trim()!== '' && categoryCode.trim()!=='' && tempFeatures !== '' && !CodeAlreadyused ) {
      setCategories(prevCategories => [...prevCategories, newCategory]);
      setCategoryCode('');
      setCategoryDescription('');
      setTempFeatures([]);
      toast.success("New features added")
      }else if(CodeAlreadyused){
        toast.error("Category code already used with a different description")
      }
  
      console.log(categories, "this is a new category")
    };
  
    const addFeature = () => {
      if (featureDescription.trim() !== '') {
        setTempFeatures(prevFeatures => [...prevFeatures, featureDescription]);
        setFeatureDescription('');
        
      }
    };

    const validateStep2 = () => {
        if(categories.length === 0){
          return false
        }
        return true;
    }

    const handleNext = () => {
        if(validateStep2()){
          onButtonClick({ categories });
        }
      
      };

    const handlePrev = () => {
        handleBack({categories})
    }

    console.log(categories, "Allcategory")
    return (
      <div>
        {/* Category form */}
        <h3 className='mb-5 btn mc-btn btn-primary'>Feature Category Details</h3>
     
        <Row className="">
        <form className="row g-3 mt-0 p-2 mb-5  needs-validation" onSubmit={() => handleNext(3)}>
        <div>
            <div className="col-md-12 d-flex space-between mb-5">
                        <input for="validationCustom01" type="text" placeholder='Category Description' className="form-control w-25 me-5"   value={categoryDescription} onChange={(e) => setCategoryDescription(e.target.value)} required/>
                        <input for="validationCustom02" type="number" placeholder='Category Code'  className="form-control w-25 me-5"   value={categoryCode}
                         onChange={(e) => setCategoryCode(e.target.value)}
                          onKeyDown={(e) => {
                             if (e.key === '-' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                                 e.preventDefault();
                               }
                              }}
                          required/>  
                       <input for="validationCustomDescription"  type="text" placeholder='Features Description '  className="form-control w-25 me-5"   value={featureDescription} onChange={(e) => setFeatureDescription(e.target.value)} required/>

                        <Button 
                            className="mc-btn w-25 btn btn-primary" 
                            // text="publish &amp; view" 
                            
                            text="Add Description"
                            icon="add_circle" 
                            type="submit"
                            onClick={addFeature}
                        />
             </div>

             <div>
                        {
                              <div>
                                  <ul className='row d-flex mb-2'>
                                   {tempFeatures?.map((item, index) => (
                                  <li className='col-2 featurecss' key={index}> {item} </li>
                              ))}
                                  </ul>
                              </div>
                         }
             </div>

                    <div className="col-2 ">
                         <Button 
                            className="mc-btn w-100 btn btn-primary mb-2" 
                            // text="publish &amp; view" 
                            text="Add Feature"
                            icon="add_circle" 
                            onClick={addCategory}
                        />
                    </div>
  
        </div>
  
        {/* Render categories */}
        {categories.map((category, index) => (
          <div key={index}>
            <div className='d-flex justify-content-between'>
               <h2 className='mc-btn btn btn-primary'>{category.description} </h2>
               <p>Category Code: <span className='mc-btn btn btn-primary'>{category.code}</span></p>
            </div>
            <ul className='row d-flex mt-2'>
              {category.features.map((feature, featureIndex) => (
                <li className='col-2 featurecss' key={featureIndex}>
                {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}

                    <div className="col-2 leftside" >
                    
                        <Anchor 
                            className="mc-btn w-100 btn btn-primary mt-5" 
                            text="Prev"
                            icon="keyboard_arrow_left" 
                            onClick={handlePrev}
                        />
                    </div>

                    <div className="col-2 rightsidefeatures">
                        <button 
                            className="mc-btn w-100 btn btn-primary mt-5" 
                            // text="publish &amp; view" 
                            disabled={featureDescription}
                            icon="navigate_next" 
                            onClick={() => handleNext(3)}
                            style={{borderColor:"antiquewhite"}}
                            >
                            Next 
                        </button>

                    </div>
                    </form>
            </Row>
            <ToastContainer/>
      </div>
    );
  }


export default Carfeaturesnew

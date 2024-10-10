import React, {Children, createContext, useContext, useState} from 'react'

const StepFormContext = createContext();

const StepFormProvider = () => {
    const[step, setStep] = useState(1)
    const[formData, setFormData] = useState([{
       step1data:'',
       step2data:'',
       step3data:''
    }])

const handleNext = (data) => {
    setFormData((prevData) =>({
        ...prevData,
        ...data,

    }));
    setStep((prevStep) => prevStep + 1)
}

const handleBack = () => {
    setStep((prevStep) => prevStep - 1)
}

const nextPageNumber = (pageNumber) => {
 
  };

const handleSubmit = () => {
    console.log(formData)
}


const contextvalue = {
    step,
    ...formData,
    handleNext,
    handleBack,
    nextPageNumber,
    handleSubmit
}

  return (
    <div>
      <StepFormContext.Provider value={contextvalue} >
        {Children}
      </StepFormContext.Provider>
    </div>
  )
}

export {StepFormContext, StepFormProvider}

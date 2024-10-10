import React, { useEffect, useState } from 'react'
import './Caroffers.css'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import { Box, Anchor, Button } from "../../../../components/elements"
import { toast, ToastContainer } from "react-toastify"
import Offersingletable from '../../../../components/tables/Bin/Offersingletable';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateTime } from "luxon";



const Caroffer = ({ onSubmit, onLastpage, allData, handleBack }) => {

  const [inventorydata, setInventorydata] = useState([])
  const [tableData, setTableData] = useState([])
  const [deal, setDeal] = useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState();
  // const [carOffers, setCaroffers] = useState([])


  // adding the multiple data form in array of object and show in table in react



  const handleChange = (e) => {
    const { name, value } = e.target
    setInventorydata({ ...inventorydata, [name]: value })
  }

  useEffect(() => {

    const car_offers = {
      carOffers: []
    };
    inventorydata.forEach((offer) => {
      const { leasetype, termtype, annualMileage, durations, calculation, monthlycost, validFrom, validTo } = offer;


      const existingOffer = car_offers.carOffers.find((item) => item.leaseType === leasetype && item.termtype === termtype);

      console.log(existingOffer, "this check")

      if (existingOffer) {
        existingOffer.offers.push({
          duration: parseInt(durations),
          annualMileage: parseInt(annualMileage),
          monthlyCost: parseInt(monthlycost),
          calculationNo: parseInt(calculation),
          // validFrom:DateTime.fromISO(offer.validFrom).toUTC().toFormat('dd/MM/yy'),
          // validTo:DateTime.fromISO(offer.validTo).toUTC().toFormat('dd/MM/yy'),
          validFrom: DateTime.fromISO(offer.validFrom).toFormat('dd/MM/yy'),
          validTo: DateTime.fromISO(offer.validTo).toFormat('dd/MM/yy')

        });
      } else {
        car_offers.carOffers.push({
          leaseType: leasetype,
          termtype: termtype,
          offers: [
            {
              duration: parseInt(durations),
              annualMileage: parseInt(annualMileage),
              monthlyCost: parseInt(monthlycost),
              calculationNo: parseInt(calculation),
              validFrom: DateTime.fromISO(offer.validFrom).toFormat('dd/MM/yy'),
              validTo: DateTime.fromISO(offer.validTo).toFormat('dd/MM/yy')
            }
          ]
        });
      }
    });
    onLastpage({ car_offers });
    console.log(car_offers, "this is carOffer----------------------")
  }, [inventorydata])


  useEffect(() => {
    setTableData(inventorydata)
  }, [inventorydata])

  console.log(startDate, "this is startDate")
  console.log(endDate, "this is endDate")

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const dataform = {
      leasetype: form.leasetype.value,
      termtype: form.termtype.value,
      // yearModel:form.yearModel.value,
      annualMileage: form.annualMileage.value,
      durations: form.durations.value,
      calculation: form.calculation.value,
      monthlycost: form.monthlycost.value,
      validFrom: DateTime.fromJSDate(startDate).toISO(),
      validTo: DateTime.fromJSDate(endDate).toISO(),
    }

    setInventorydata([...inventorydata, dataform])
    setStartDate('')
    setEndDate('')


    console.log(inventorydata, "this is inventory data")

    // console.log(car_offers, "ths is offer")


    toast.success("Yeah! Offer Added ")
    form.reset();
  }

  const deleteButton = (index) => {
    inventorydata.splice(index, 1)
    setInventorydata([...inventorydata])
    toast.error("Oops! Deleted Successfully ")
  }


  console.log(inventorydata, "data form reset")

  // const car_offers = {
  //   carOffers: []
  // };

  // inventorydata.forEach((offer) => {
  //   const { leasetype, termtype, annualMileage, durations, calculation, monthlycost } = offer;


  //   const existingOffer = car_offers.carOffers.find((item) => item.leaseType === leasetype && item.termtype === termtype);

  //   console.log(existingOffer, "this check")

  //   if (existingOffer) {
  //     existingOffer.offers.push({
  //       duration: parseInt(durations),
  //       annualMileage: parseInt(annualMileage),
  //       monthlyCost: parseInt(monthlycost),
  //       calculationNo: parseInt(calculation)
  //     });
  //   } else {
  //     car_offers.carOffers.push({
  //       leaseType: leasetype,     
  //       termtype: termtype,
  //       offers: [
  //         {
  //           duration: parseInt(durations),
  //           annualMileage: parseInt(annualMileage),
  //           monthlyCost: parseInt(monthlycost),
  //           calculationNo: parseInt(calculation)
  //         }
  //       ]
  //     });
  //   }
  // });

  //  console.log(car_offers, "jijijijiji");
  console.log(deal, "deaklll")

  return (
    <>
      <Row>
        <form className="row mt-0 p-2 g-3 p-3 needs-validation" onSubmit={handleFormSubmit} >

          <div className="col-md-4">
            <label for="validationCustom04" className="form-label">Lease Type</label>
            <select className="form-select" name='leasetype' required>

              <>
                <option selected disabled value="">Choose...</option>
                <option name="Privatelease" value="Private Lease">Private Lease</option>
                <option name="Businesslease" value="Business Lease">Business Lease</option>
              </>

            </select>

          </div>

          <div className="col-md-4">
            <label for="validationCustom04" className="form-label">Term Type</label>
            <select className="form-select" name='termtype' required>

              <>
                <option selected disabled value="">Choose...</option>
                <option name="Short Term" value="Short Term">Short Term</option>
                <option name="Longterm" value="Long Term">Long Term</option>
              </>

            </select>

          </div>

          {/* <div className="col-md-4">
                        <label for="validationCustom02" className="form-label"> Year Model</label>
                        <input type="number" className="form-control" name="yearModel" placeholder='Enter Year Model' required />

                    </div> */}

          <div className="col-md-4">
            <label for="validationCustom01" className="form-label">Annual Mileage</label>
            <input type="number" className="form-control" name="annualMileage"
              onKeyDown={(e) => {
                if (e.key === '-' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                  e.preventDefault();
                }
              }}
              placeholder='Enter Annual Mileage' required />

          </div>

          <div className="col-md-4">
            <label for="validationCustom01" className="form-label">Duration</label>
            <input type="number" className="form-control" name="durations"
              onKeyDown={(e) => {
                if (e.key === '-' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                  e.preventDefault();
                }
              }}
              placeholder='Enter Durations' required />

          </div>
          <div className="col-md-4">
            <label for="validationCustom01" className="form-label">Calculation No.</label>
            <input type="number" className="form-control" name="calculation"
              onKeyDown={(e) => {
                if (e.key === '-' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                  e.preventDefault();
                }
              }}
              placeholder='Enter Calculations number' required />

          </div>

          <div className="col-md-4">
            <label for="validationCustom01" className="form-label">Monthly Cost</label>
            <input type="number" className="form-control" name="monthlycost"
              onKeyDown={(e) => {
                if (e.key === '-' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                  e.preventDefault();
                }
              }}
              placeholder='Enter Monthly cost' required />

          </div>

          <div className="col-md-4 " >
            <label for="validationCustom01" className="form-label">Valid From </label>
            <DatePicker selected={startDate} placeholderText='DD/MM/YYYY' dateFormat="dd/MM/yyyy" minDate={new Date()} onChange={(date) => {

              setStartDate(date)
              // setCardetails({...cardetails, validFrom:DateTime.fromJSDate(date).toUTC()})

            }

            } />
          </div>

          <div className="col-md-4 ">
            <label for="validationCustom01" className="form-label">Valid To</label>

            <DatePicker selected={endDate} placeholderText='DD/MM/YYYY' dateFormat="dd/MM/yyyy" startDate={startDate} minDate={startDate} onChange={(date) => {

              setEndDate(date)
              // setCardetails({...cardetails, validTo:DateTime.fromJSDate(date).toUTC()})
            }} />


          </div>


          {/* 
                    <div className="col-1 rightoffer">

                       <Anchor 
                         className="mc-btn w-80 btn btn-primary mt-5" 
                       // text="publish &amp; view" 
                         text="Add Offer"
                         icon="add_to_photos" 
                         type="submit"
                         />
                    </div> */}

          <div style={{ textAlign: "end" }} >
            <Button className="mc-btn w-80 btn btn-primary mt-5" icon="add_to_photos" type="submit" text="Add Offer" />
          </div>


          <Offersingletable tbody={inventorydata} deleteButton={deleteButton} deals setDeal />



          <div className="col-12 ">
            {/* <button className="btn btn-primary" type="submit">Publish Now</button> */}
            <Anchor
              className="mc-btn w-100 btn btn-primary mt-5"
              text="publish &amp; view"
              icon="publish"

              onClick={onSubmit}
            />
          </div>
        </form>
      </Row>
      <ToastContainer />
    </>
  )
}

export default Caroffer

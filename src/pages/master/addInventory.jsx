import React from 'react'
import { useState } from 'react';
import { Row } from 'react-bootstrap';
import PageLayout from "../../layouts/PageLayout";
import {  CardHeader } from '../../components/cards';

export const AddInventory = () => {

    const [inventorydata, setInventoryData] = useState({
        door: "",
        bodytype: "",
        seat: "",
        mileage: "",
        fuelType: "",
        price: "",
        transmission: "",
        description: "",
        category: ""

    })

    const handleInventoryChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;

        setInventoryData((prevalue) => {
            return {
                ...prevalue,   // Spread Operator               
                [name]: value
            }
        })

    }

    console.log(inventorydata, "car")

    return (
        
        <PageLayout>
           <CardHeader title={"Add Inventory"}  />
            <Row>
                <form className="row g-3 p-3 needs-validation" >
                    <div className="col-md-4">
                        <label for="validationCustom04" className="form-label">Category</label>
                        <select className="form-select" name='category' onChange={handleInventoryChange} value={inventorydata.category} required>
                            <option selected disabled value="">Choose...</option>
                            <option name="Flexilease" value="Flexilease">Flexilease</option>
                            <option name="LongTerm" value="LongTerm">LongTerm</option>
                        </select>
                    </div>

                    <div className="col-md-4">
                        <label for="validationCustom01" className="form-label">Car Company Name</label>
                        <input type="text" className="form-control" name="title" onChange={handleInventoryChange} value={inventorydata.title} required />

                    </div>
                    <div className="col-md-4">
                        <label for="validationCustom02" className="form-label">Model Name</label>
                        <input type="text" className="form-control" name="title" onChange={handleInventoryChange} value={inventorydata.title} required />

                    </div>
                    <div className="col-md-4">
                        <label for="validationCustom01" className="form-label">Body Type</label>
                        <input type="text" className="form-control" name="title" onChange={handleInventoryChange} value={inventorydata.bodytype} required />

                    </div>
                    <div className="col-md-4">
                        <label for="validationCustom04" className="form-label" >Transmission</label>
                        <select className="form-select" name='transmission' onChange={handleInventoryChange} value={inventorydata.transmission} required>
                            <option selected disabled value="">Choose...</option>
                            <option name="Manual" value="Manual">Manual</option>
                            <option name="Manual" value="Automatic">Automatic</option>
                        </select>

                    </div>

                    <div className="col-md-4">
                        <label for="validationCustom04" className="form-label">Fuel Type</label>
                        <select className="form-select" onChange={handleInventoryChange} name='fuelType' value={inventorydata.fuelType} required>
                            <option selected disabled value="">Choose...</option>
                            <option name="Petrol" value="Petrol">Petrol</option>
                            <option name="Electric" value="Electric">Electric</option>
                            <option name="Hybrid" value="Hybrid">Hybrid</option>
                            <option name="Diesel" value="Diesel">Diesel</option>
                        </select>

                    </div>

                    <div className="col-md-4">
                        <label for="validationCustom02" className="form-label">Seat</label>
                        <input type="number" className="form-control" name="seat" onChange={handleInventoryChange} value={inventorydata.seat} required />

                    </div>

                    <div className="col-md-4">
                        <label for="validationCustom02" className="form-label">Mileage</label>
                        <input type="number" className="form-control" name="mileage" onChange={handleInventoryChange} value={inventorydata.mileage} required />

                    </div>
                    <div className="col-md-4">
                        <label for="validationCustom01" className="form-label">Door</label>
                        <input type="number" className="form-control" name="door" onChange={handleInventoryChange} value={inventorydata.door} required />

                    </div>

                    <div className="col-md-8">
                        <label for="validationCustom02" className="form-label">Description</label>
                        <textarea type="text" className="form-control" name="description" onChange={handleInventoryChange} value={inventorydata.description} required />

                    </div>


                    <div className="col-12">
                        <button className="btn btn-primary" type="submit">Submit form</button>
                    </div>
                </form>
            </Row>

        </PageLayout>
    )
}

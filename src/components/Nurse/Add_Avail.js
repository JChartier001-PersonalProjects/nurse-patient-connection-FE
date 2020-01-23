import React, {useState} from 'react';
import axiosWithAuth from "../../api/axiosWithAuth.js";
import { Form, Row, Col, Button } from 'react-bootstrap';
import axios from "axios";

const Add_Avail = () => {
    const id = localStorage.getItem('nurse_id')
    const [posting, setPosting] = useState({
        
    })
       
    const [days, setDays] = useState([]);
    const [shifts, setShifts] = useState([
    //    shifts:{
    //     nurse_id: id,
    //     shift_id: null
    // }
    ]);

    const handlePost = e =>{{
        setPosting({
            ...posting,
            nurse_id: id,
           [e.target.name]: e.target.value
        })
    }}
    const handleDays = e => {
        setDays([
            ...days,
            {nurse_id: id, day_id: e.target.value}
        ])
    }
    const handleShifts = e => {
       setShifts([
           ...shifts,
           {nurse_id: id, shift_id: e.target.value}
       ])
    }
    
    const handleSubmit = e => {
        const token = localStorage.getItem('token');
        console.log(token)
        e.preventDefault();
        axios
        .post(`http://localhost:4000/api/avail`, {
            posting, days, shifts,
            header: {Authorization: token}
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }
    console.log("posting", posting, "days", days, "shifts", shifts)
    return(        
        <div className="addAvail">
        <h2>Add Availability</h2>
        <p>Please check options below</p>
            <Form.Group >
                <div className="left">
                    <Col xs={12}>                        
                        <Form.Check type="checkbox" label="Willing to Case Manage?" name='case_manage' value="true" onChange={handlePost} />
                    </Col>
                    <Col xs={12}>
                        <Form.Check type="checkbox" label="Do you have pets?" name='pets' value="true" onChange={handlePost} />   
                        <Form.Label>Type of Pet</Form.Label>
                        <Form.Control type="text" name='type_pet' onChange={handlePost}/>                  
                    </Col>
                    <Col xs={12}>
                        <Form.Check type="checkbox" label="Do you smoke/vape?" name='smoke' value="true" onChange={handlePost}/>
                    </Col>
                    <Col xs={12}>
                        <Form.Check type="checkbox" label="Any lift restrictions" name='list_res' value="true" onChange={handlePost}/>
                        <Form.Label>Type of Lift Restrictions</Form.Label>
                        <Form.Control type="text" name='list_res_type' onChange={handlePost}/> 
                    </Col>
                </div>
                <div className="right">
                    <Col xs={12}>
                        <Form.Check type="checkbox" label="Experience with Pediatric Patients" name='peds_exp' value="true" onChange={handlePost}/>
                        <Form.Label >How Many Years</Form.Label>
                        <Form.Control as="select" name='peds_years' defaultValue='' onChange={handlePost}>  
                            <option value='' disabled hidden>Please Select</option>
                            <option value="1">0-1</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option> 
                            <option value="4">4</option>
                            <option value="5+">5+</option>
                        </Form.Control> 
                    </Col>
                    <Col xs={12}>
                        <Form.Check type="checkbox" label="PDN/Home Health Experience?" name='pdn_exp' value="true" onChange={handlePost} />
                        <Form.Label >How Many Years</Form.Label>
                        <Form.Control as="select" name='pdn_years'  defaultValue='' onChange={handlePost}>  
                            <option value='' disabled hidden>Please Select</option>
                            <option value="1">0-1</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option> 
                            <option value="4">4</option>
                            <option value="5+">5+</option>                  
                        </Form.Control>                 
                    </Col>
                    <Col xs={12}>
                        <Form.Check type="checkbox" label="Experience with Epileptic Patients" name='epilepsy_exp' value="true" onChange={handlePost} />
                        <Form.Label >How Many Years</Form.Label>
                        <Form.Control as="select" name='epilepsy_years'  defaultValue='' onChange={handlePost}> 
                            <option value='' disabled hidden>Please Select</option>
                            <option value="1">0-1</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option> 
                            <option value="4">4</option>
                            <option value="5+">5+</option>                  
                        </Form.Control> 
                    </Col>
                </div>
            </Form.Group>
            <Col xs={4}>
                <p className='days'>Days Available</p>
            </Col>
            <Form.Group className='days_avail'>
                <Form.Check type="checkbox" id='days' label="Sunday" name='day_id' value="1" onChange={handleDays}/>
                <Form.Check type="checkbox" id='days' label="Monday" name='day_id' value="2" onChange={handleDays} />
                <Form.Check type="checkbox"  id='days' label="Tuesday" name='day_id' value="3" onChange={handleDays} />
                <Form.Check type="checkbox" id='days' label="Wednesday" name='day_id' value="4" onChange={handleDays} />
                <Form.Check type="checkbox"  id='days' label="Thursday" name='day_id' value="5"  onChange={handleDays}/>
                <Form.Check type="checkbox" id='days' label="Friday" name='day_id' value="6" onChange={handleDays} />
                <Form.Check type="checkbox" id='days' label="Saturday" name='day_id' value="7" onChange={handleDays} />
            </Form.Group>
            <Col xs={4}>
                <p className='days'>Shifts Available</p>
            </Col>
            <Form.Group className='shifts_avail'>
                <Form.Check type="checkbox" label="8 hr AM" name='shift_id' value="1" onChange={handleShifts}/>
                <Form.Check type="checkbox" label="8 hr PM" name='shift_id' value="2" onChange={handleShifts}/>
                <Form.Check type="checkbox" label="8 hr NOC" name='shift_id' value="3" onChange={handleShifts} />
                <Form.Check type="checkbox" label="10 hr AM" name='shift_id' value="4" onChange={handleShifts} />
                <Form.Check type="checkbox" label="10 hr NOC" name='shift_id' value="5" onChange={handleShifts}/>
                <Form.Check type="checkbox" label="12 hr AM" name='shift_id' value="6" onChange={handleShifts} />
                <Form.Check type="checkbox" label="12 hr NOC" name='shift_id' value="7" onChange={handleShifts}/>  
            </Form.Group>
        <Button type="submit" variant="outline-info" onClick={handleSubmit}>Submit</Button>          
        </div>
    )
    
}




export default Add_Avail;
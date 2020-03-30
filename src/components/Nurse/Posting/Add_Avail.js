import React, {useState} from 'react';
import axiosWithAuth from "../../../api/axiosWithAuth.js";
import { Form, Row, Col, Button } from 'react-bootstrap';


const AddNew = (props) => {
    // console.log(props)
    const id = props.props.nurse.id
    // console.log(id)
    const [posting, setPosting] = useState({});    
    const handleClose = props.handleClose
       
    const [days, setDays] = useState({
        sunday: 0,
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0
    });
    const [shifts, setShifts] = useState({
            am_8hr: 0,
            pm_8hr: 0,
            noc_8hr: 0,
            am_10hr: 0,
            noc_10hr: 0,
            am_12hr: 0,
            noc_12hr: 0,
            other: ""
    });

    const stringToBoolean = string => {
        switch(string.toLowerCase().trim()) {
           case 'true': return true;
           case 'false': return false;
           default: return string;
     }}
    console.log(posting, days, shifts)
    const handlePost = e =>{
        setPosting({
            ...posting,
            nurse_id: id,
           [e.target.name]: stringToBoolean(e.target.value)
        })
    }
    const handleDays = e => {
        const stringToBoolean = string => {
            switch(string.toLowerCase().trim()) {
               case 'true': return true;
               case 'false': return false;
               default: return e.target.value;
         }}
        setDays({
           ...days,
            nurse_id: id, 
            [e.target.name]: stringToBoolean(e.target.value)
        })
    }
    const handleShifts = e => {
        const stringToBoolean = string => {
            switch(string.toLowerCase().trim()) {
               case 'true': return true;
               case 'false': return false;
               default: return e.target.value;
         }}
       setShifts({
           ...shifts,
           nurse_id: id, 
           [e.target.name]: stringToBoolean(e.target.value)
       })
    }
    
    const handleSubmit = e => {
        const token = localStorage.getItem('token');
        console.log(token)
        e.preventDefault();
        axiosWithAuth()
        .post(`api/avail`, 
            {posting: posting, days : days, shifts: shifts}
            
        )
        .then(response => {
            console.log(response);
            window.location.reload();
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    return(        
        <div className="form-modal">       
        <p>Please check options below</p>               
               
                 <Form.Group>
                     <Col xs={8}>
                        <Form.Check type="checkbox" label="Experience with Pediatric Patients" name='peds_exp' value={!posting.peds_exp} onChange={handlePost}/>
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
                        </Form.Group>
                        <Form.Group>

                    <Col xs={8}>
                        <Form.Check type="checkbox" label="PDN/Home Health Experience?" name='pdn_exp' value={!posting.pdc_exp} onChange={handlePost} />
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
                    </Form.Group>
                        <Form.Group>
                   <Col xs={8}>
                        <Form.Check type="checkbox" label="Experience with Epileptic Patients" name='epilepsy_exp' value={!posting.epilepsy_exp} onChange={handlePost} />
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
                        </Form.Group>
                   
                        <Form.Group>
                        </Form.Group>
                        <Form.Group>
                                       
                        <Form.Check type="checkbox" label="Willing to Case Manage?" name='case_manage' value={!posting.case_manage} onChange={handlePost} />
                   
                        <Form.Check type="checkbox" label="Do you smoke/vape?" name='smoke' value={!posting.smoke} onChange={handlePost}/>
                 
                    
                        <Form.Check type="checkbox" label="Any lift restrictions" name='list_res' value={!posting.lift_res} onChange={handlePost}/>
                        <Form.Label>Type of Lift Restrictions</Form.Label>
                        <Form.Control type="text" name='list_res_type' onChange={handlePost}/> 
                    
                
            </Form.Group>
                <p className='days'>Days Available</p>
            <Form.Group className='days'>
                <Form.Check type="checkbox" id="days" label="Sunday" name='sunday' value={!days.sunday} onChange={handleDays}/>
                <Form.Check type="checkbox" id='days' label="Monday" name='monday' value={!days.monday} onChange={handleDays} />
                <Form.Check type="checkbox"  id='days' label="Tuesday" name='tuesday' value={!days.tuesday} onChange={handleDays} />
                <Form.Check type="checkbox" id='days' label="Wednesday" name='wednesday' value={!days.wednesday} onChange={handleDays} />
                <Form.Check type="checkbox"  id='days' label="Thursday" name='thursday' value={!days.thursday}  onChange={handleDays}/>
                <Form.Check type="checkbox" id='days' label="Friday" name='friday' value={!days.friday} onChange={handleDays} />
                <Form.Check type="checkbox" id='days' label="Saturday" name='saturday' value={!days.saturday} onChange={handleDays} />
            </Form.Group>
                <p className='shifts'>Shifts Available</p>
            <Form.Group className='shifts'>
                <Form.Check type="checkbox" label="8 hr AM" name='am_8hr' value={!shifts.am_8hr} onChange={handleShifts}/>
                <Form.Check type="checkbox" label="8 hr PM" name='pm_8hr' value={!shifts.pm_8hr} onChange={handleShifts}/>
                <Form.Check type="checkbox" label="8 hr NOC" name='noc_8hr' value={!days.noc_8hr} onChange={handleShifts} />
                <Form.Check type="checkbox" label="10 hr AM" name='am_10hr' value={!days.am_10hr} onChange={handleShifts} />
                <Form.Check type="checkbox" label="10 hr NOC" name='noc_10hr' value={!days.noc_10hr} onChange={handleShifts}/>
                <Form.Check type="checkbox" label="12 hr AM" name='am_12hr' value={!days.am_12hr} onChange={handleShifts} />
                <Form.Check type="checkbox" label="12 hr NOC" name='noc_12hr' value={!days.noc_12hr} onChange={handleShifts}/>  
                <div>
                <Form.Label>Other</Form.Label>
                <Form.Control type="text" name="other" onChange={handleShifts}/>
                </div>
            </Form.Group>
            <Button variant="outline-info" name="showShifts" onClick={handleClose}>Close</Button>
            <Button variant="outline-info" name="showShifts" onClick={handleSubmit}>Save Changes</Button>         
        </div>
    )
    
}




export default AddNew;
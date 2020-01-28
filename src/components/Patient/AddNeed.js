import React, {useState} from 'react';
import axiosWithAuth from "../../api/axiosWithAuth.js";
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';


const AddNeed = (props) => {
    const id = localStorage.getItem('nurse_id')
    const [posting, setPosting] = useState({});       
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
    
    const handleInput = e =>{
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
        .post(`http://localhost:4000/api/avail`, 
            {posting, days, shifts}
            
        )
        .then(response => {
            (props.history.push('/dashboard'))
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    return(        
        <div className="addAvail">
            <Modal.Title>Add Your Current Nurse Needs</Modal.Title>
            <Modal.Body>
            <div className="check">
                    <Form.Label>Nurse Requirements</Form.Label>
                    <Form.Check type="checkbox" label="Who does the patient live with?" name='case_manager' value="true" onChange={handleInput}/>
                    <Form.Check type="checkbox" label="" name='vent' value="true" onChange={handleInput}/>
                    <Form.Check type="checkbox" label="G-tube" name='gt' value="true" onChange={handleInput}/>                    
                    <Form.Check type="checkbox" label="Developmentally Delayed" name='develop_disabled' value="true" onChange={handleInput}/>
                    <Form.Check type="checkbox" label="Verbal" name='verbal' value="true" onChange={handleInput}/>
                    <Form.Check type="checkbox" label="Non-verbal" name='verbal' value="false" onChange={handleInput}/>
                    <Form.Check type="checkbox" label="Attends School" name='school' value="true" onChange={handleInput}/>
                    </div >
            </Modal.Body>
            <div className="check">
                <Form.Check type="checkbox" label="Nurse to attend appointments?" name='appt' value="true" onChange={handleInput}/>
                <Form.Check type="checkbox" label="If yes, will nurse need to use own car?" name='use_car' value="true" onChange={handleInput}/>
                </div>
                <div className="check animal">
                <Form.Check type="checkbox" label="Animals in the home?" name='animals' value="true" onChange={handleInput}/>
                </div>
               
                <p className='days'>Days Available</p>
            <Form.Group className='days_avail'>
                <Form.Check type="checkbox" id="days" label="Sunday" name='sunday' value={!days.sunday} onChange={handleDays}/>
                <Form.Check type="checkbox" id='days' label="Monday" name='monday' value={!days.monday} onChange={handleDays} />
                <Form.Check type="checkbox"  id='days' label="Tuesday" name='tuesday' value={!days.tuesday} onChange={handleDays} />
                <Form.Check type="checkbox" id='days' label="Wednesday" name='wednesday' value={!days.wednesday} onChange={handleDays} />
                <Form.Check type="checkbox"  id='days' label="Thursday" name='thursday' value={!days.thursday}  onChange={handleDays}/>
                <Form.Check type="checkbox" id='days' label="Friday" name='friday' value={!days.friday} onChange={handleDays} />
                <Form.Check type="checkbox" id='days' label="Saturday" name='saturday' value={!days.saturday} onChange={handleDays} />
            </Form.Group>
                <p className='days'>Shifts Available</p>
            <Form.Group className='shifts_avail'>
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
        <Button type="submit" variant="outline-info" onClick={handleSubmit}>Submit</Button>          
        </div>
    )
    
}




export default AddNeed;
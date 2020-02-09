import React, {useState} from 'react';
import axiosWithAuth from "../../../api/axiosWithAuth.js";
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';


const AddNeed = (props) => {
    
    const [posting, setPosting] = useState({
        pt_id: props.id,
        need_id: props.need[0].id,
        smoke: false,
        case_manager: false,       
        lift_req: false,
        lift_weight: '',
        school: false,       
        pets: false,       
        use_car: false,
        appt: false,
        school_time: '',       
        live_with: '',
        pet_type: ''
    });       
    
    const [days, setDays] = useState({
        pt_id: props.id,
        sunday: 0,
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0
    });

    const [shifts, setShifts] = useState({
        pt_id: props.id,
        am_8hr: 0,
        pm_8hr: 0,
        noc_8hr: 0,
        am_10hr: 0,
        noc_10hr: 0,
        am_12hr: 0,
        noc_12hr: 0,
        other: ""
    });
    console.log(posting, days, shifts)
    console.log("add",props)
    const stringToBoolean = string => {
        switch(string.toLowerCase().trim()) {
           case 'true': return true;
           case 'false': return false;
           default: return string;
     }}
    
    const handleInput = e =>{
        setPosting({
            ...posting,
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
           
           [e.target.name]: stringToBoolean(e.target.value)
       })
    }
    
    const handleSubmit = e => {
        const token = localStorage.getItem('token');
        console.log(token)
        e.preventDefault();
        axiosWithAuth()
        .post(`/api/case`, 
            {
                posting : posting, 
                days:days,
                shifts: shifts}
            
        )
        .then(() => {
            window.location.reload();
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    return(        
        <div className="form-modal">
            <Form.Group>
                <Form.Label >In need of a Case Manager?</Form.Label>
                <Form.Control as="select"  name='case_manager' onChange={handleInput} defaultValue=''>                
                    <option value='' disabled hidden>Please Select</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>    
                </Form.Control> 
            </Form.Group>
            <Form.Group>
                <Form.Label >Who does the patient live with? </Form.Label>
                <Form.Check type="checkbox" label="Self" name='live_with' value="self" onChange={handleInput}/>
                <Form.Check type="checkbox" label="Parents" name='live_with' value="parent" onChange={handleInput}/>
                <Form.Check type="checkbox" label="Others"name='live_with' value="other" onChange={handleInput}/>
            </Form.Group>
            <Form.Group>
                <Form.Label >Does anyone in the family smoke/vape? </Form.Label>
                <Form.Control as="select"  name='smoke' onChange={handleInput} defaultValue=''>                
                    <option value='' disabled hidden>Please Select</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>    
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label >Are there any animals in the home? </Form.Label>
                <Form.Control as="select"  name='pets' onChange={handleInput} defaultValue=''>     
                    <option value='' disabled hidden>Please Select</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>    
                </Form.Control>      
                <Form.Label >If yes, what type? </Form.Label>  
                <Form.Control type="text" name="pet_type" onChange={handleInput}/>
            </Form.Group>
            <Form.Group>
                <Form.Label >Is the nurse expected to attend appts? </Form.Label>   
                <Form.Control as="select"  name='appt' onChange={handleInput} defaultValue=''>     
                    <option value='' disabled hidden>Please Select</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>    
                </Form.Control>   
                <Form.Label >If yes, will nurse be need to use own car? </Form.Label>     
                <Form.Control as="select"  name='use_car' onChange={handleInput} defaultValue=''>     
                    <option value='' disabled hidden>Please Select</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>    
                </Form.Control>    
            </Form.Group>
            <Form.Group>
                <Form.Label >Any lifting requirements? </Form.Label>   
                <Form.Control as="select"  name='lift_req' onChange={handleInput} defaultValue=''>     
                    <option value='' disabled hidden>Please Select</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>    
                </Form.Control>   
                <Form.Label >If yes, what is weight? </Form.Label>  
                <Form.Control type="text" name="lift_weight" onChange={handleInput}/>  
            </Form.Group>
            <Form.Group>
                <Form.Check type="checkbox" label="Attends School" name='school' value="true" onChange={handleInput}/><br/>
                <Form.Label className="input" >If yes, what time does the patient attend school?</Form.Label>
                <Form.Control type="text" name="school_time" onChange={handleInput}/>
            </Form.Group>
            <Form.Group>
                <Form.Label  className="input" >What are the patient's mobility needs</Form.Label>
                <Form.Control type="text" name="mobility" onInput={handleInput}/>
            </Form.Group>

            <p className='days'>Days Nurse is Needed</p>
            <Form.Group className='days'>
                <Form.Check type="checkbox" id="days" label="Sunday" name='sunday' value={!days.sunday} onChange={handleDays}/>
                <Form.Check type="checkbox" id='days' label="Monday" name='monday' value={!days.monday} onChange={handleDays} />
                <Form.Check type="checkbox"  id='days' label="Tuesday" name='tuesday' value={!days.tuesday} onChange={handleDays} />
                <Form.Check type="checkbox" id='days' label="Wednesday" name='wednesday' value={!days.wednesday} onChange={handleDays} />
                <Form.Check type="checkbox"  id='days' label="Thursday" name='thursday' value={!days.thursday}  onChange={handleDays}/>
                <Form.Check type="checkbox" id='days' label="Friday" name='friday' value={!days.friday} onChange={handleDays} />
                <Form.Check type="checkbox" id='days' label="Saturday" name='saturday' value={!days.saturday} onChange={handleDays} />
            </Form.Group>

            <p className='days'>Shifts Nurse is Needed</p>
            <Form.Group className='shifts_avail'>
                <Form.Check type="checkbox" label="8 hr AM" name='am_8hr' value={!shifts.am_8hr} onChange={handleShifts}/>
                <Form.Check type="checkbox" label="8 hr PM" name='pm_8hr' value={!shifts.pm_8hr} onChange={handleShifts}/>
                <Form.Check type="checkbox" label="8 hr NOC" name='noc_8hr' value={!shifts.noc_8hr} onChange={handleShifts} />
                <Form.Check type="checkbox" label="10 hr AM" name='am_10hr' value={!shifts.am_10hr} onChange={handleShifts} />
                <Form.Check type="checkbox" label="10 hr NOC" name='noc_10hr' value={!shifts.noc_10hr} onChange={handleShifts}/>
                <Form.Check type="checkbox" label="12 hr AM" name='am_12hr' value={!shifts.am_12hr} onChange={handleShifts} />
                <Form.Check type="checkbox" label="12 hr NOC" name='noc_12hr' value={!shifts.noc_12hr} onChange={handleShifts}/>  
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
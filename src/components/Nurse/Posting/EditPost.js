import React, {useState} from 'react';
import {Form, Button} from "react-bootstrap";
import axiosWithAuth from "../../../api/axiosWithAuth.js";

const EditPost = (props) => {    
    const edit= props.posting[0];
    const day=props.days
    const shifts = props.shifts
    const handleClose = props.handleClose;
    
    const [posting, setPosting] = useState({
        id: edit.id,
        nurse_id: edit.nurse_id,
        case_manage: edit.case_manage,
        pets: edit.pets,
        type_pet: edit.type_pet,
        peds_exp: edit.peds_exp,
        peds_years: edit.peds_years,
        pdn_exp: edit.pdn_exp,
        pdn_years: edit.pdn_years,
        epilepsy_exp: edit.epilepsy_exp,
        epilepsy_years: edit.epilepsy_years,
        smoke: edit.smoke,
        lift_res: edit.lift_res,
        lift_res_type: edit.lift_res_type

    });

    const [days, setDays] = useState({
        id: day.id,
        nurse_id: day.nurse_id,
        sunday: day.sunday,
        monday: day.monday,
        tuesday: day.tuesday,
        wednesday: day.wednesday,
        thursday: day.thursday,
        friday: day.friday,
        saturday: day.saturday
    });

    const [shift, setShift] = useState({
        id: edit.id,
        nurse_id: shifts.nurse_id,
        am_8hr :shifts.am_8hr,
        pm_8hr: shifts.pm_8hr,
        noc_8hr: shifts.noc_8hr,
        am_10hr: shifts.am_10hr,
        noc_10hr: shifts.pm_10hr,
        am_12hr: shifts.am_12hr,
        noc_12hr: shifts.noc_12hr,
        other: shifts.other
    });
    

    const handlePostCheck = e => {
        const stringToBoolean = string => {
            switch(string) {
               case 'true': return 1;
               case 'false': return 0;
               default: return e.target.value;
         }}
        setPosting({
            ...posting,
            [e.target.name]: stringToBoolean(e.target.value)
        })
    } ;
    
    const handleDayCheck = e => {
        const stringToBoolean = string => {
            switch(string) {
               case 'true': return 1;
               case 'false': return 0;
               default: return e.target.value;
         }}
        setDays({
            ...days,
            [e.target.name]: stringToBoolean(e.target.value)
        })
    }   

    const handleShiftCheck = e => {
        const stringToBoolean = string => {
            switch(string) {
               case 'true': return 1;
               case 'false': return 0;
               default: return e.target.value;
         }}
        setShift({
            ...shift,
            [e.target.name]: stringToBoolean(e.target.value)
        })
    }   

    
    const handlePost = e =>{
         setPosting({
             ...posting,
             [e.target.name]: e.target.value
         })
    }

    const handleSubmit = e =>{
        e.preventDefault();
        axiosWithAuth()
        .put(`http://localhost:4000/api/avail/${posting.id}`, {
            posting: posting,
            days: days,
            shifts:shifts
        })
        .then(response => {
            console.log("response", response)
            handleClose('showPosting')
            // const id = edit.nurse_id;
            // axiosWithAuth()
            // .get(`http://localhost:4000/api/avail/${id}`)
            // .then(response => {
            //     console.log(response);
            //     setPosting(response.data)
            // })
            // .catch(error => {
            //     console.log(error)
            // })
      
        })
        .catch(error => {
            console.log(error)
        })
    }

    const booleanToString = boolean => {
        switch(boolean){
            case "true": return true;
            case "false" : return false;
            default: return boolean
        }
    }

    const handleInput = e => {
        setShift({
            ...shift,
            [e.target.name]: e.target.value
        })
    }
    console.log('shifts', shift)
console.log('days', days)
  console.log("posting", posting)
    return (
        <div className="edit">
            <Form.Check  type="checkbox" label="Willing to Case Manage?"  name='case_manage'  value={!posting.case_manage}  checked={booleanToString(posting.case_manage)} onChange={handlePostCheck} />
                <Form.Check type="checkbox" label="PDN/Home Health Experience?" name='pdn_exp' value={!posting.pdn_exp} checked={booleanToString(posting.pdn_exp)} onChange={handlePostCheck} />
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
                <Form.Check type="checkbox" label="Experience with Pediatric Patients" name='peds_exp' value={!posting.peds_exp} checked={booleanToString(posting.peds_exp)} onChange={handlePostCheck}/>
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
                <Form.Check type="checkbox" label="Experience with Epileptic Patients" name='epilepsy_exp' value={!posting.epilepsy_exp} checked={booleanToString(posting.epilepsy_exp)} onChange={handlePostCheck} />
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
                <Form.Check type="checkbox" label="Any lift restrictions" name='lift_res'  value={!posting.lift_res} checked={booleanToString(posting.lift_res)} onChange={handlePostCheck}/>
                <Form.Label>Type of Lift Restrictions</Form.Label>
                <Form.Control type="text" name='list_res_type' onChange={handlePost}/>
                <Form.Check type="checkbox" label="Do you have pets?" name='pets'  value={!posting.pets} checked={booleanToString(posting.pets)} onChange={handlePostCheck} />   
                <Form.Label>Type of Pet</Form.Label>
                <Form.Control type="text" name='type_pet' onChange={handlePost}/>   
               
        
        <Form.Group className='days_avail'>
            <h4>Edit Days</h4>
            <Form.Check type="checkbox" id="days" label="Sunday" name='sunday' value={!days.sunday} checked={booleanToString(days.sunday)} onChange={handleDayCheck}/>
            <Form.Check type="checkbox" id='days' label="Monday" name='monday' value={!days.monday} checked={booleanToString(days.monday)} onChange={handleDayCheck} />
            <Form.Check type="checkbox"  id='days' label="Tuesday" name='tuesday' value={!days.tuesday} checked={booleanToString(days.tuesday)} onChange={handleDayCheck} />
            <Form.Check type="checkbox" id='days' label="Wednesday" name='wednesday' value={!days.wednesday} checked={booleanToString(days.wednesday)} onChange={handleDayCheck} />
            <Form.Check type="checkbox"  id='days' label="Thursday" name='thursday' value={!days.thursday} checked={booleanToString(days.thursday)}  onChange={handleDayCheck}/>
            <Form.Check type="checkbox" id='days' label="Friday" name='friday' value={!days.friday} checked={booleanToString(days.friday)} onChange={handleDayCheck} />
            <Form.Check type="checkbox" id='days' label="Saturday" name='saturday' value={!days.saturday} checked={booleanToString(days.saturday)} onChange={handleDayCheck} />
        </Form.Group>
        
        
        <Form.Group className='shifts_avail'>
            <h4>Edit Shifts</h4>
                <Form.Check type="checkbox" label="8 hr AM" name='am_8hr' value={!shift.am_8hr} checked={booleanToString(shift.am_8hr)} onChange={handleShiftCheck}/>
                <Form.Check type="checkbox" label="8 hr PM" name='pm_8hr' value={!shift.pm_8hr}  checked={booleanToString(shift.pm_8hr)}onChange={handleShiftCheck}/>
                <Form.Check type="checkbox" label="8 hr NOC" name='noc_8hr' value={!shift.noc_8hr}  checked={booleanToString(shift.noc_8hr)}onChange={handleShiftCheck} />
                <Form.Check type="checkbox" label="10 hr AM" name='am_10hr' value={!shift.am_10hr} checked={booleanToString(shift.am_10hr)} onChange={handleShiftCheck} />
                <Form.Check type="checkbox" label="10 hr NOC" name='noc_10hr' value={!shift.noc_10hr}  checked={booleanToString(shift.noc_10hr)} onChange={handleShiftCheck}/>
                <Form.Check type="checkbox" label="12 hr AM" name='am_12hr' value={!shift.am_12hr} checked={booleanToString(shift.am_12hr)} onChange={handleShiftCheck} />
                <Form.Check type="checkbox" label="12 hr NOC" name='noc_12hr' value={!shift.noc_12hr} checked={booleanToString(shift.noc_12hr)} onChange={handleShiftCheck}/>  
                <div>
                <Form.Label>Other</Form.Label>
                <Form.Control type="text" name="other" onChange={handleInput}/>
                </div>
            </Form.Group>
            <Button variant="outline-info" name="showShifts" onClick={handleSubmit}>Save Changes</Button>
            <Button variant="outline-info" name="showShifts" onClick={handleClose}>Close</Button>
            
    </div>

    )
  }
  export default EditPost;
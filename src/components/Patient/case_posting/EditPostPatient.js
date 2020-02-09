import React, {useState} from 'react';
import {Form, Button} from "react-bootstrap";
import axiosWithAuth from "../../../api/axiosWithAuth.js";

const EditPostPatient= (props) => {
    const edit= props.posting[0];
    console.log("props", props)
    const handleClose = props.handleClose;
        console.log(edit)
    const [posting, setPosting] = useState({
        id: edit.id,
        pt_id: edit.pt_id,
        need_id: edit.need_id,
        smoke: edit.smoke,
        case_manager: edit.case_manager,       
        lift_req: edit.lift_req,
        lift_weight: edit.lift_weight,
        school: edit.school,       
        pets: edit.pets,       
        use_car: edit.use_car,
        appt: edit.appt,
        school_time: edit.school_time,       
        live_with: edit.live_with,
        pet_type: edit.pet_type,
        mobility: edit.mobility
    });
    const [needs, setNeeds] = useState({
        trach: edit.trach,
        gt: edit.gt,
        vent: edit.vent,
        epilepsy: edit.epilepsy,
        o2: edit.o2,
        verbal: edit.verbal,
        develop_disabled: edit.develop_disabled
    })

    const [days, setDays] = useState({
        id: props.day[0].id,
        pt_id: props.day[0].pt_id,
        sunday: props.day[0].sunday,
        monday: props.day[0].monday,
        tuesday: props.day[0].tuesday,
        wednesday: props.day[0].wednesday,
        thursday: props.day[0].thursday,
        friday: props.day[0].friday,
        saturday: props.day[0].saturday      
    });

    const [shift, setShift] = useState({
        pt_id: props.shift[0].pt_id,
        am_8hr: props.shift[0].am_8hr,
        pm_8hr: props.shift[0].pm_8hr,
        noc_8hr:  props.shift[0].noc_8hr,
        am_10hr:  props.shift[0].am_10hr,
        noc_10hr:  props.shift[0].noc_10hr,
        am_12hr:  props.shift[0].am_12hr,
        noc_12hr: props.shift[0].noc_12hr,
        other: props.shift[0].other
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
    }   
    const handleDaysCheck = e => {
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

    const handleNeed = e => {
        const stringToBoolean = string => {
            switch(string.toLowerCase().trim()) {
               case 'true': return true;
               case 'false': return false;
               default: return e.target.value;
         }}        
        setNeeds({
            ...needs,
            [e.target.name]: stringToBoolean(e.target.value)
        })
    };
    
    const handleInput = e =>{
        const stringToBoolean = string => {
            switch(string) {
               case 'true': return 1;
               case 'false': return 0;
               default: return e.target.value;
         }}
         setPosting({
             ...posting,
             [e.target.name]:stringToBoolean(e.target.value)
         })
    }

    const handleSubmit = e =>{
        const id = posting.pt_id
        e.preventDefault();
        axiosWithAuth()
        .put(`/api/case/${id}`, {
            posting:posting,
        days: days,
    shifts: shift
})
        .then(() => {
           
            handleClose('showPosting')
            window.location.reload();
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

  console.log(posting, shift, days, posting.pt_id)
    return (
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
                <Form.Check type="checkbox" label="Self" name='live_with' value= "self"  onChange={handleInput}/>
                <Form.Check type="checkbox" label="Parents" name='live_with' value="parents" onChange={handleInput}/>
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
                <Form.Check type="checkbox" label="Attends School" name='school' value={!posting.school}  checked={booleanToString(posting.school)} onChange={handlePostCheck}/><br/>
                <Form.Label className="input" >If yes, what time does the patient attend school?</Form.Label>
                <Form.Control type="text" name="school_time" onChange={handleInput}/>
            </Form.Group>
            <Form.Group>
                <Form.Label  className="input" >What are the patient's mobility needs</Form.Label>
                <Form.Control type="text" name="mobility" onInput={handleInput}/>
            </Form.Group>
                <Form.Check type="checkbox" label="Trach" name="trach" value={!needs.trach} checked={booleanToString(needs.trach)} onChange={handleNeed}/>
                
                <Form.Check type="checkbox" label="Vent" name='vent'  value={!needs.vent}  checked={booleanToString(needs.vent)} onChange={handleNeed}/>
                <Form.Check type="checkbox" label="Oxygen Needs" name='o2'  value={!needs.o2}  checked={booleanToString(needs.o2)}  onChange={handleNeed}/>
                <Form.Check type="checkbox" label="G-tube" name='gt'  value={!needs.gt}  checked={booleanToString(needs.gt)}  onChange={handleNeed}/>             
                <Form.Check type="checkbox" label="Epilepsy" name='epilepsy'  value={!needs.epilepsy}  checked={booleanToString(needs.epilepsy)}  onChange={handleNeed}/>       
                <Form.Check type="checkbox" label="Developmentally Delayed" name='develop_disabled'  value={!needs.develop_disabled}  checked={booleanToString(needs.develop_disabled)}  onChange={handleNeed}/>
                <Form.Check type="checkbox" label="Verbal" name='verbal'  value={!needs.verbal}  checked={booleanToString(needs.verbal)}  onChange={handleNeed}/>
                <Form.Check type="checkbox" label="Non-verbal" name='verbal'  value={!!needs.verbal}  checked={booleanToString(!needs.verbal)}  onChange={handleNeed}/>
               

                <div className="edit">
            <Form.Group className='days'>
                <h4>Edit Days Nurse is Needed</h4>
                <Form.Check type="checkbox" id="days" label="Sunday" name='sunday' value={!days.sunday} checked={booleanToString(days.sunday)} onChange={handleDaysCheck}/>
                <Form.Check type="checkbox" id='days' label="Monday" name='monday' value={!days.monday} checked={booleanToString(days.monday)} onChange={handleDaysCheck} />
                <Form.Check type="checkbox"  id='days' label="Tuesday" name='tuesday' value={!days.tuesday} checked={booleanToString(days.tuesday)} onChange={handleDaysCheck} />
                <Form.Check type="checkbox" id='days' label="Wednesday" name='wednesday' value={!days.wednesday} checked={booleanToString(days.wednesday)} onChange={handleDaysCheck} />
                <Form.Check type="checkbox"  id='days' label="Thursday" name='thursday' value={!days.thursday} checked={booleanToString(days.thursday)}  onChange={handleDaysCheck}/>
                <Form.Check type="checkbox" id='days' label="Friday" name='friday' value={!days.friday} checked={booleanToString(days.friday)} onChange={handleDaysCheck} />
                <Form.Check type="checkbox" id='days' label="Saturday" name='saturday' value={!days.saturday} checked={booleanToString(days.saturday)} onChange={handleDaysCheck} />
            </Form.Group>
          
        </div>
        <Form.Group className='shifts'>
            <h4>Edit Shifts Nurse is Needed</h4>
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
                <div className="buttons">
                
            <Button variant="outline-info" name="showDays" onClick={handleSubmit}>Save Changes</Button>
            <Button variant="outline-info" name="showDays" onClick={handleClose}>Close</Button>
            </div>
        </div>

    )
  }
  export default EditPostPatient;
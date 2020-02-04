import React, {useState} from 'react';
import {Form, Button} from "react-bootstrap";
import axiosWithAuth from "../../../api/axiosWithAuth.js";

const EditPostPatient= (props) => {
    const edit= props.posting[0];
    const handleClose = props.handleClose;
        
    const [posting, setPosting] = useState({
        pt_id: edit.id,
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

    const handleCheck = e => {
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
         setPosting({
             ...posting,
             [e.target.name]: e.target.value
         })
    }

    const handleSubmit = e =>{
        e.preventDefault();
        axiosWithAuth()
        .put('/api/avail/posting', posting)
        .then(posting => {
            axiosWithAuth()
            .put('/api/case/')
            // console.log("response", response)
            handleClose('showPosting')
            // window.location.reload();
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

  console.log(posting, needs)
    return (
        <div className="edit">
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
                <Form.Check type="checkbox" label="Attends School" name='school' value={!posting.school}  checked={booleanToString(posting.school)} onChange={handleCheck}/><br/>
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
                <Button type="submit" variant="outline-info" onClick={handleSubmit}>Submit</Button>
        </div>

    )
  }
  export default EditPostPatient;
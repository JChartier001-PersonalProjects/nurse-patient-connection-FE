import React, {useState} from 'react';
import {Form, Button} from "react-bootstrap";
import axiosWithAuth from "../../../api/axiosWithAuth.js";

const Editpost = (props) => {
    const edit= props.posting[0];
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

    console.log("posting", posting)
    const handleDelete = e => {   
        setPosting({
            ...posting,
            [e.target.name]: e.target.value
        })
        const element = document.getElementById(e.target.id);
        element.remove();;
    }

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
    
    const handlePost = e =>{
         setPosting({
             ...posting,
             [e.target.name]: e.target.value
         })
    }

    const handleSubmit = e =>{
        e.preventDefault();
        axiosWithAuth()
        .put('/api/avail/posting', posting)
        .then(response => {
            console.log("response", response)
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

  console.log(posting)
    return (
        <div className="edit">
            <Form.Check  type="checkbox" label="Willing to Case Manage?"  name='case_manage'  value={!posting.case_manage}  checked={booleanToString(posting.case_manage)} onChange={handleCheck} />
                <Form.Check type="checkbox" label="PDN/Home Health Experience?" name='pdn_exp' value={!posting.pdn_exp} checked={booleanToString(posting.pdn_exp)} onChange={handleCheck} />
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
                <Form.Check type="checkbox" label="Experience with Pediatric Patients" name='peds_exp' value={!posting.peds_exp} checked={booleanToString(posting.peds_exp)} onChange={handleCheck}/>
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
                <Form.Check type="checkbox" label="Experience with Epileptic Patients" name='epilepsy_exp' value={!posting.epilepsy_exp} checked={booleanToString(posting.epilepsy_exp)} onChange={handleCheck} />
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
                <Form.Check type="checkbox" label="Any lift restrictions" name='list_res'  value={!posting.lift_res} checked={booleanToString(posting.lift_res)} onChange={handleCheck}/>
                <Form.Label>Type of Lift Restrictions</Form.Label>
                <Form.Control type="text" name='list_res_type' onChange={handlePost}/>
                <Form.Check type="checkbox" label="Do you have pets?" name='pets'  value={!posting.pets} checked={booleanToString(posting.pets)} onChange={handleCheck} />   
                <Form.Label>Type of Pet</Form.Label>
                <Form.Control type="text" name='type_pet' onChange={handlePost}/>   
                <Button variant="outline-info" onClick={handleClose}>Close</Button>
                <Button variant="outline-info" onClick={handleSubmit}>Save Changes</Button>
        </div>

    )
  }
  export default Editpost;
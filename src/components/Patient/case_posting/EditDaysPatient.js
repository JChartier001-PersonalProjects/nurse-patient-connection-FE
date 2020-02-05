import React, {useState} from 'react';
import {Form, Button} from "react-bootstrap";
import axiosWithAuth from "../../../api/axiosWithAuth.js"

const EditDaysPatient = (props) => {
        const edit = props.days[0];
        const handleClose = props.handleClose
      
    const [days, setDays] = useState({
        id: edit.id,
        pt_id: edit.pt_id,
        sunday: edit.sunday,
        monday: edit.monday,
        tuesday: edit.tuesday,
        wednesday: edit.wednesday,
        thursday: edit.thursday,
        friday: edit.friday,
        saturday: edit.saturday      
    });

    const handleCheck = e =>{
        const stringToBoolean = string => {
            switch(string){
                case "true": return 1;
                case "false": return 0;
                case true: return 1;
                case false: return 0;
                default: return string;
            }    
        }
        setDays({
            ...days,
            [e.target.name]: stringToBoolean(e.target.value)
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        
        console.log("days", days)
        axiosWithAuth()
        .put('/api/case/days',   days)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.dir(error)
        })
    }

    const booleanToString = boolean => {
        switch(boolean){
            case 1: return true;
            case 2: return false;
            default: return boolean;
        }
    }
 
    return (
        <div className="edit">
            <Form.Group className='days_needed'>
                <Form.Check type="checkbox" id="days" label="Sunday" name='sunday' value={!days.sunday} checked={booleanToString(days.sunday)} onChange={handleCheck}/>
                <Form.Check type="checkbox" id='days' label="Monday" name='monday' value={!days.monday} checked={booleanToString(days.monday)} onChange={handleCheck} />
                <Form.Check type="checkbox"  id='days' label="Tuesday" name='tuesday' value={!days.tuesday} checked={booleanToString(days.tuesday)} onChange={handleCheck} />
                <Form.Check type="checkbox" id='days' label="Wednesday" name='wednesday' value={!days.wednesday} checked={booleanToString(days.wednesday)} onChange={handleCheck} />
                <Form.Check type="checkbox"  id='days' label="Thursday" name='thursday' value={!days.thursday} checked={booleanToString(days.thursday)}  onChange={handleCheck}/>
                <Form.Check type="checkbox" id='days' label="Friday" name='friday' value={!days.friday} checked={booleanToString(days.friday)} onChange={handleCheck} />
                <Form.Check type="checkbox" id='days' label="Saturday" name='saturday' value={!days.saturday} checked={booleanToString(days.saturday)} onChange={handleCheck} />
            </Form.Group>
            <Button variant="outline-info" name="showDays" onClick={handleClose}>Close</Button>
            <Button variant="outline-info" name="showDays" onClick={handleSubmit}>Save Changes</Button>
        </div>
)
  }
  export default EditDaysPatient;
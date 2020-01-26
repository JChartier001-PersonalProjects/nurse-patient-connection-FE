import React, {useState} from 'react';
import {Form} from "react-bootstrap";

const EditDays = (props) => {
        const edit = props.days;
    
    const [days, setDays] = useState({
        nurse_id: edit.nurse_id,
        sunday: edit.sunday,
        monday: edit.monday,
        tuesday: edit.tuesday,
        wednesday: edit.wednesday,
        thursday: edit.thursday,
        friday: edit.friday,
        saturday: edit.saturday
    });

    const handleCheck = e => {
        setDays({
            ...days,
            [e.target.name]: e.target.checked
        })
    }
    
    const handlePost = e =>{
         setDays({
             ...days,
             [e.target.name]: e.target.name
         })
    }
  
    return (
        <div className="edit">
             <Form.Group className='days_avail'>
                <Form.Check type="checkbox" id="days" label="Sunday" name='sunday' value={!days.sunday} onChange={handleCheck}/>
                <Form.Check type="checkbox" id='days' label="Monday" name='monday' value={!days.monday} onChange={handleCheck} />
                <Form.Check type="checkbox"  id='days' label="Tuesday" name='tuesday' value={!days.tuesday} onChange={handleCheck} />
                <Form.Check type="checkbox" id='days' label="Wednesday" name='wednesday' value={!days.wednesday} onChange={handleCheck} />
                <Form.Check type="checkbox"  id='days' label="Thursday" name='thursday' value={!days.thursday}  onChange={handleCheck}/>
                <Form.Check type="checkbox" id='days' label="Friday" name='friday' value={!days.friday} onChange={handleCheck} />
                <Form.Check type="checkbox" id='days' label="Saturday" name='saturday' value={!days.saturday} onChange={handleCheck} />
            </Form.Group>
        </div>

    )
  }
  export default EditDays;
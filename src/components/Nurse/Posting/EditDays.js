import React, {useState} from 'react';
import {Form, Button} from "react-bootstrap";

const EditDays = (props) => {
        const edit = props.days[0];
        const handleClose = props.handleClose
    console.log(props)
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
  
    return (
        <div className="edit">
            <Form.Group className='days_avail'>
                <Form.Check type="checkbox" id="days" label="Sunday" name='sunday' value={!days.sunday} checked={!!days.sunday} onChange={handleCheck}/>
                <Form.Check type="checkbox" id='days' label="Monday" name='monday' value={!days.monday} checked={!!days.monday} onChange={handleCheck} />
                <Form.Check type="checkbox"  id='days' label="Tuesday" name='tuesday' value={!days.tuesday} checked={!!days.tuesday} onChange={handleCheck} />
                <Form.Check type="checkbox" id='days' label="Wednesday" name='wednesday' value={!days.wednesday} checked={!!days.wednesday} onChange={handleCheck} />
                <Form.Check type="checkbox"  id='days' label="Thursday" name='thursday' value={!days.thursday} checked={!!days.thursday}  onChange={handleCheck}/>
                <Form.Check type="checkbox" id='days' label="Friday" name='friday' value={!days.friday} checked={!!days.friday} onChange={handleCheck} />
                <Form.Check type="checkbox" id='days' label="Saturday" name='saturday' value={!days.saturday} checked={!!days.saturday} onChange={handleCheck} />
            </Form.Group>
            <Button variant="outline-info" name="showDays" onClick={handleClose}>Close</Button>
            <Button variant="outline-info" onClick={handleClose}>Save Changes</Button>
        </div>
)
  }
  export default EditDays;
import React, {useState} from 'react';
import {Form, Button} from "react-bootstrap";

const EditShifts = (props) => {
        const edit = props.shift[0];
        const handleClose = props.handleClose;
        console.log(edit)
    console.log(props)
    const [shift, setShift] = useState({
        nurse_id: edit.nurse_id,
        am_8hr: edit.am_8hr,
        pm_8hr: edit.pm_8hr,
        noc_8hr: edit.noc_8hr,
        am_10hr: edit.am_10hr,
        noc_10hr: edit.pm_10hr,
        am_12hr: edit.am_12hr,
        noc_12hr: edit.noc_12hr,
        other: edit.other
    });
    console.log(shift)
    const handleCheck = e => {
        setShift({
            ...shift,
            [e.target.name]: e.target.checked
        })
    }
    const handleInput = e => {
        setShift({
            ...shift,
            [e.target.name]: e.target.value
        })
    }
  
    return (
        <div className='edit'>
        <Form.Group className='shifts_avail'>
                <Form.Check type="checkbox" label="8 hr AM" name='am_8hr' value={!shift.am_8hr} checked={shift.am_8hr} onChange={handleCheck}/>
                <Form.Check type="checkbox" label="8 hr PM" name='pm_8hr' value={!shift.pm_8hr} onChange={handleCheck}/>
                <Form.Check type="checkbox" label="8 hr NOC" name='noc_8hr' value={!shift.noc_8hr} onChange={handleCheck} />
                <Form.Check type="checkbox" label="10 hr AM" name='am_10hr' value={!shift.am_10hr} onChange={handleCheck} />
                <Form.Check type="checkbox" label="10 hr NOC" name='noc_10hr' value={!shift.noc_10hr} onChange={handleCheck}/>
                <Form.Check type="checkbox" label="12 hr AM" name='am_12hr' value={!shift.am_12hr} onChange={handleCheck} />
                <Form.Check type="checkbox" label="12 hr NOC" name='noc_12hr' value={!shift.noc_12hr} onChange={handleCheck}/>  
                <div>
                <Form.Label>Other</Form.Label>
                <Form.Control type="text" name="other" onChange={handleInput}/>
                </div>
            </Form.Group>
            <Button variant="outline-info" name="showShifts" onClick={handleClose}>Close</Button>
            <Button variant="outline-info" name="showShifts" onClick={handleClose}>Save Changes</Button>
            </div>
)
  }
  export default EditShifts;
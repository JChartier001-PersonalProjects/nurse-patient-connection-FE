import React, {useState} from 'react';
import {Form, Button} from "react-bootstrap";

const EditShifts = (props) => {
        const edit = props.shifts[0];
        const handleClose = props.handleClose
    console.log(props)
    const [shift, setShift] = useState({
        nurse_id: edit.nurse_id,
        am_8hr: edit.am_8hr,
        pm_8hr: edit.pm_8hr,
        noc_8hr: edit.noc_8hr,
        am_10hr: edit.am_10hr,
        pm_10hr: edit.pm_10hr,
        am_12hr: edit.am_12hr,
        noc_12hr: edit.noc_12hr
    });

    const handleCheck = e => {
        setShift({
            ...shifts,
            [e.target.name]: e.target.checked
        })
    }
  
    return (
        <Form.Group className='shifts_avail'>
                <Form.Check type="checkbox" label="8 hr AM" name='am_8hr' value={!shift.am_8hr} checked={shift.am_8hr} onChange={handleCheck}/>
                <Form.Check type="checkbox" label="8 hr PM" name='pm_8hr' value={!shift.pm_8hr} onChange={handleShifts}/>
                <Form.Check type="checkbox" label="8 hr NOC" name='noc_8hr' value={!shift.noc_8hr} onChange={handleShifts} />
                <Form.Check type="checkbox" label="10 hr AM" name='am_10hr' value={!shift.am_10hr} onChange={handleShifts} />
                <Form.Check type="checkbox" label="10 hr NOC" name='noc_10hr' value={!shift.noc_10hr} onChange={handleShifts}/>
                <Form.Check type="checkbox" label="12 hr AM" name='am_12hr' value={!shift.am_12hr} onChange={handleShifts} />
                <Form.Check type="checkbox" label="12 hr NOC" name='noc_12hr' value={!shift.noc_12hr} onChange={handleShifts}/>  
                <div>
                <Form.Label>Other</Form.Label>
                <Form.Control type="text" name="other" onChange={handleShifts}/>
                </div>
            </Form.Group>
)
  }
  export default EditShifts;
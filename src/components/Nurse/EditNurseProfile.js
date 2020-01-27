<Form.Group className="edit" controlId="exampleForm.ControlSelect1">
<Form.Label >License Type:</Form.Label>
<Form.Control as="select" name='license_type' onChange={handleInput} defaultValue=''>
    <option value='' disabled hidden>Please Select</option>
    <option value="RN">RN</option>
    <option value="LPN">LPN</option>
</Form.Control>

<Form.Label >Current Pediatric Vent Certification:</Form.Label>
    <Form.Control as="select" name='rsc_child' onChange={handleInput} defaultValue=''>
    <option value='' disabled hidden>Please Select</option>
    <option value={true} >Yes</option>
    <option value={false}>No</option>
</Form.Control>


<Form.Label >Current Adult Vent Certification:</Form.Label>
<Form.Control as="select" name='rsc_adult' onChange={handleInput} defaultValue=''>
    <option value='' disabled hidden>Please Select</option>
    <option value={true} >Yes</option>
    <option value={false}>No</option>
</Form.Control>  

<Button type="submit" variant="outline-info" onClick={handleSubmit}>Submit</Button>
</Form.Group>
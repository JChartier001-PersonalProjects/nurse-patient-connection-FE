import React, {useState, useEffect} from 'react';
import axiosWithAuth from "../../api/axiosWithAuth.js";
import {Link} from "react-router-dom";
import {Card, Button, Modal} from "react-bootstrap";
import CurrentPosting from "./Posting/CurrentPosting.js";
import EditProfile from "./EditProfile.js";
import EditNurseProfile from "./EditNurseProfile.js";

const NurseDashboard = (props) => {
 
    const [nurse, setNurse] = useState();
    
    const [show, setShow] = useState({
        showProfile: false,
        showNurseProfile: false}
        );         
      const handleClose = (name) => setShow({name: false});
      const handleShow = (e) => setShow({[e.target.name]:true});

      const token = localStorage.getItem('token')
      const parse = JSON.parse(atob(token.split('.')[1]))
      const id = parse.id

    useEffect(() => {
        const token = localStorage.getItem('token')
        const parse = JSON.parse(atob(token.split('.')[1]))
        const id = parse.id
       
        axiosWithAuth()
        .get(`api/nurse/${id}`)
        .then(response => {
            console.log(response)
            setNurse(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    }, [])
   
    return(
        <div className="dashCont">
        {nurse && nurse.length > 0 ? 
        nurse.map(nurse => {
            return(
                <div  key={nurse.id}>
                     <h3>Welcome {nurse.first_name}</h3>
                    <div className="nurseDash">
                                           <div className="left">
                                 <p>Looking for a new case? <Link to ="/search">Click Here</Link></p>
                        <Card border="info" style={{ width: "fit-content"}}>
                            <Card.Header>Profile  <Button variant="outline-info" name="showProfile" onClick={handleShow}>Edit</Button>
                  <Modal show={show.showProfile} onHide={handleClose} >
                    <Modal.Header>
                      <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                      <EditProfile nurse={nurse}  id={id} handleClose={handleClose}/>
                    </Modal.Body>                    
                  </Modal></Card.Header>
                            <Card.Body className="profile">
                                <Card.Text className="list">
                                    <span>{nurse.first_name} {nurse.last_name}</span>
                                    <span>{nurse.email}</span>
                                    <span>{nurse.city}, {nurse.state}</span>                                    
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card border="info" style={{ width: "fit-content"}}>
                            <Card.Header>Nurse Profile  <Button variant="outline-info" name="showNurseProfile" onClick={handleShow}>Edit</Button>
                  <Modal show={show.showNurseProfile} onHide={handleClose} >
                    <Modal.Header>
                      <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                      <EditNurseProfile nurse={nurse}  id={id} handleClose={handleClose}/>
                    </Modal.Body>
                    </Modal>
                    </Card.Header>
                    
                            <Card.Body className='profile'>
                                <Card.Text className="list">
                                    <span>License Type: {nurse.license_type}</span>
                                    <span>Ped Vent Cert: {nurse.rsc_child === 1 ? "Yes" : "No"}</span>
                                    <span> Adult Vent Cert: {nurse.rsc_adult === 1 ? "Yes" : "No"}</span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <CurrentPosting props={props} id={nurse.id}/>
                    </div>
                    {/* <input className='search' type="text" name="search" placeholder="Search"/> */}
                </div>
         )})
        : null
        }
        </div>
    )
}
export default NurseDashboard;
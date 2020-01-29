import React, {useState, useEffect} from 'react'
import axiosWithAuth from "../../../api/axiosWithAuth.js";
import {Card, Button, Modal, Form, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import AddNeed from "../case_posting/AddNeed.js";
import EditPostPatient from "./EditPatientInfo.js"

const CurrentPosting = (props) => {
    const [posting, setPosting] = useState([]);
    const post = posting[0]; 
    const shift = posting.shifts;
    const day = posting.days; 
    console.log("day", day)

    const [show, setShow] = useState({
      showPosting: false,
      showDays: false,
      showShifts: false}
      );         
    const handleClose = (name) => setShow({name: false});
    const handleShow = (e) => setShow({[e.target.name]:true});
    
    
    useEffect(() => {
        const id = props.id
        axiosWithAuth()
        .get(`/api/case/${id}`)
        .then(response => {
            console.log(response);
            setPosting(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [props.id])

    const handleDelete = e =>{
        e.preventDefault();
        const id = post.nurse_id
        axiosWithAuth()
        .delete(`/api/avail/${id}`)
        .then(() => {
            window.location.reload()
        })
        .catch(error => {
            console.log(error)
        })
    }
console.log("post", post, "posting", posting)
    return (
        <div  className="post">
        {post && post.length !==0 ? 
          <Card border="info" style={{ width: "fit-content"}}>
            <Card.Header>Current Postings<Button variant="outline-info" onClick={handleDelete}>Delete</Button></Card.Header> 
              <Card.Header className="lightHeader">About Patient
                <Button variant="outline-info" name="showPosting" onClick={handleShow}>Edit</Button>
                  <Modal show={show.showPosting} onHide={handleClose} >
                    <Modal.Header>
                      <Modal.Title>Edit Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                      <EditPostPatient   posting={[post]}  handleClose={handleClose}/>
                    </Modal.Body>
                    <Modal.Footer>
                      
                    </Modal.Footer>
                  </Modal>
              </Card.Header>
            <Card.Body  className="profile">
              <Card.Text  className="list">
                <span>{!!post.case_manager  && <li>Case Manager Needed</li>}</span>
                <span>{!!post.lift_req && <li>Lift Requirements {post.lift_weight}</li>}</span>
                <span>{!!post.school  && <li>Attends school from {post.school_time}</li>}</span>
                <span>{!!post.appt && <li>Nurse to attend appt with patient</li>}</span>
                <span>{!!post.appt &&  <li>Does nurse need to use own car for appt? {post.use_car === 1 ? "Yes": "No"}</li>}</span>
                <span>{!!post.pets  && <li>Pets in home: {post.pet_type}</li>}</span>
                <span>{!!post.smoke && <li>Family Smokes</li>}</span>
                <span>{!!post.live_with && <li>Patient lives with: {post.live_with}</li>}</span>
              </Card.Text>               
            </Card.Body>


            <Card.Header className="lightHeader">Days Needed
            <Button variant="outline-info" name="showDays" onClick={handleShow}>Edit</Button>
              <Modal show={show.showDays} name="showDays" >
                <Modal.Header>
                  <Modal.Title>Edit Days</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* <EditDays days={day} handleClose={handleClose} /> */}
                </Modal.Body>
                <Modal.Footer>
                  
                </Modal.Footer>
              </Modal>
            </Card.Header>
            <Card.Body className="profile">
              <Card.Text className="list"> 
                <span>{!!day[0].sunday && "Sunday"}</span>
                <span> {!!day[0].monday && "Monday"}</span>
                <span>{!!day[0].tuesday && "Tuesday"}</span>
                <span>{!!day[0].wednesday && "Wednesday"}</span>
                <span> {!!day[0].thursday && "Thursday"}</span>
                <span> {!!day[0].friday && "Friday"}</span>
                <span>{!!day[0].saturday && "Saturday"}</span></Card.Text>
            </Card.Body>

            <Card.Header className="lightHeader">Shifts Needed<Button variant="outline-info" name="showShifts" onClick={handleShow}>Edit</Button>  
              <Modal show={show.showShifts} onHide={handleClose}>
                <Modal.Header >
                  <Modal.Title>Edit Shift</Modal.Title>
                </Modal.Header>
                {/* <Modal.Body><EditShift shift={shift} handleClose={handleClose}/></Modal.Body> */}
                <Modal.Footer>
                  
                </Modal.Footer>
              </Modal>
            </Card.Header>
            <Card.Body className="profile">                      
              <Card.Text  className="list">
                <span>{!!shift[0].am_8hr  && "8 hr AM"}</span>
                <span >{!!shift[0].pm_8hr  && "8 hr PM"}</span>
                <span>{!!shift[0].noc_8hr  && "8 hr NOC"}</span>
                <span>{!!shift[0].am_10hr  && "10 hr AM"}</span>
                <span >{!!shift[0].pm_10hr  && "10 hr PM"}</span>
                <span >{!!shift[0].am_12hr  && "12 hr AM"}</span>
                <span >{!!shift[0].noc_12hr  && "12 hr NOC"}</span> 
              </Card.Text>
            </Card.Body>
          </Card>
                     :
          <Card className="noPost" border="info" style={{ width: "23rem"}}>       
            <Card.Header>Current Postings<Link to="/delete-post"><Button variant="outline-info">Delete</Button></Link></Card.Header>              
            <Card.Body>
              <Card.Text>You have no current postings</Card.Text>
              <Button variant="outline-info" name="showAddNeed" onClick={handleShow}>Add New Post</Button>
                  <Modal show={show.showAddNeed} onHide={handleClose} >
                    <Modal.Title>Add Current Nurse Needs</Modal.Title>
                    <Modal.Body>
                      <AddNeed  id={props.id} need={props.need}/>
                      </Modal.Body>
                    </Modal>
            </Card.Body>
          </Card>
            } 
         </div>
    );
}



export default CurrentPosting;
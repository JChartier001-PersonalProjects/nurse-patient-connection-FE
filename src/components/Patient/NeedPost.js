import React, {useState, useEffect} from 'react'
import axiosWithAuth from "../../api/axiosWithAuth.js";
import {Card, Button, Modal, Form, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import AddNeed from "./AddNeed.js"

const CurrentPosting = (props) => {
    const [posting, setPosting] = useState([]);
    const post = posting[0]; 
    const shift = posting.shifts;
    const day = posting.days; 
    const id = localStorage.getItem('nurse_id');
    console.log("posting", posting)

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

    return (
        <div  className="post">
        {post && post.length !==0 ? 
          <Card border="info" style={{ width: "fit-content"}}>
            <Card.Header>Current Postings<Button variant="outline-info" onClick={handleDelete}>Delete</Button></Card.Header> 
              <Card.Header className="lightHeader">About Me
                <Button variant="outline-info" name="showPosting" onClick={handleShow}>Edit</Button>
                  <Modal show={show.showPosting} onHide={handleClose} >
                    <Modal.Header>
                      <Modal.Title>Edit Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                      {/* <EditPost   posting={[post]} handleClose={handleClose}/> */}
                    </Modal.Body>
                    <Modal.Footer>
                      
                    </Modal.Footer>
                  </Modal>
              </Card.Header>
            <Card.Body  className="profile">
              <Card.Text  className="list">
                <span>{!!post.case_manage  && "Case Manage"}</span>
                <span>{!!post.pdn_exp && `${post.pdn_years} years of PDN exp`}</span>
                <span>{!!post.peds_exp  && `${post.peds_years} years of Peds exp`}</span>
                <span>{!!post.epilepsy_exp  && `${post.epilepsy_years} of exp with epileptic patients`}</span>
                <span>{!!post.lift_res  && `${post.lift_res_type} lift restrictions`}</span>
              </Card.Text>               
            </Card.Body>


            <Card.Header className="lightHeader">Days Available
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

            <Card.Header className="lightHeader">Shifts Available<Button variant="outline-info" name="showShifts" onClick={handleShow}>Edit</Button>  
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
                {/* <span>{!!shift[0].am_8hr  && "8 hr AM"}</span>
                <span >{!!shift[0].pm_8hr  && "8 hr PM"}</span>
                <span>{!!shift[0].noc_8hr  && "8 hr NOC"}</span>
                <span>{!!shift[0].am_10hr  && "10 hr AM"}</span>
                <span >{!!shift[0].pm_10hr  && "10 hr PM"}</span>
                <span >{!!shift[0].am_12hr  && "12 hr AM"}</span>
                <span >{!!shift[0].noc_12hr  && "12 hr NOC"}</span> */}
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
                    {/* <Modal.Header>
                      <Modal.Title>Add Your Current Nurse Needs</Modal.Title>
                    </Modal.Header>
                    <Modal.Body > */}
                      <AddNeed/>
                    {/* </Modal.Body> */}
                    </Modal>
            </Card.Body>
          </Card>
            } 
         </div>
    );
}



export default CurrentPosting;
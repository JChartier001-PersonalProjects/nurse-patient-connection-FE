import React, {useState, useEffect} from 'react'
import axiosWithAuth from "../../../api/axiosWithAuth.js";
import {Card, Button, Modal, Form, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import EditPost from "./EditPost.js";
import AddNew from "./Add_Avail.js"


const CurrentPosting = (props) => {
    const [posting, setPosting] = useState([]);
    const post = posting.posting; 
    const shift = posting.shifts;
    const day = posting.days; 
    const id = props.nurse.id
    console.log("props", props, id)
    console.log("posting",posting, shift, day)
    console.log(post, "post")
  

    const [show, setShow] = useState({
      showPosting: false,
      showDays: false,
      showShifts: false}
      );         
    const handleClose = (name) => setShow({name: false});
    const handleShow = (e) => setShow({[e.target.name]:true});
    
    
    useEffect(() => {
        axiosWithAuth()
        .get(`/api/avail/${id}`)
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
          axiosWithAuth()
          .get(`/api/avail/${id}`)
          .then(response => {
              console.log(response);
              setPosting(response.data)
          })
          .catch(error => {
              console.log(error)
          })
      }, [props.id])
        
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div  className="post">
        {post && post.length !==0 ? 
          <Card border="info" style={{ width: "fit-content"}}>
            <Card.Header>Current Postings
            <Button variant="outline-info" name="showPosting" onClick={handleShow}>Edit</Button>
                  <Modal show={show.showPosting} onHide={handleClose} >
                    <Modal.Header>
                      <Modal.Title>Edit Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                      <EditPost   posting={[post[0]]} days={day[0]} shifts={shift[0]}handleClose={handleClose}/>
                    </Modal.Body>
                    <Modal.Footer>
                      
                    </Modal.Footer>
                  </Modal><Button variant="outline-info" onClick={handleDelete}>Delete</Button></Card.Header> 
              <Card.Header className="lightHeader">About Me
               
              </Card.Header>
            <Card.Body  className="profile">
              <Card.Text  className="list">
                <span>{!!post[0].case_manage  && "Case Manage"}</span>
                <span>{!!post[0].pdn_exp && `${post[0].pdn_years} years of PDN exp`}</span>
                <span>{!!post[0].peds_exp  && `${post[0].peds_years} years of Peds exp`}</span>
                <span>{!!post[0].epilepsy_exp  && `${post[0].epilepsy_years} of exp with epileptic patients`}</span>
                <span>{!!post[0].lift_res  && `${post[0].lift_res_type} lift restrictions`}</span>
              </Card.Text>               
            </Card.Body>


            <Card.Header className="lightHeader">Days Available </Card.Header>
            <Card.Body className="profile">
             { day && day.length > 0 ?
              <Card.Text className="list">
                <span>{!!day[0].sunday && "Sunday"}</span>
                <span> {!!day[0].monday && "Monday"}</span>
                <span>{!!day[0].tuesday && "Tuesday"}</span>
                <span>{!!day[0].wednesday && "Wednesday"}</span>
                <span> {!!day[0].thursday && "Thursday"}</span>
                <span> {!!day[0].friday && "Friday"}</span>
                <span>{!!day[0].saturday && "Saturday"}</span></Card.Text>    :null}        
            </Card.Body>

            <Card.Header className="lightHeader">Shifts Available</Card.Header>
            <Card.Body className="profile">            
            {shift && shift.length > 0 ?           
              <Card.Text  className="list">
                <span>{!!shift[0].am_8hr  && "8 hr AM"}</span>
                <span >{!!shift[0].pm_8hr  && "8 hr PM"}</span>
                <span>{!!shift[0].noc_8hr  && "8 hr NOC"}</span>
                <span>{!!shift[0].am_10hr  && "10 hr AM"}</span>
                <span >{!!shift[0].pm_10hr  && "10 hr PM"}</span>
                <span >{!!shift[0].am_12hr  && "12 hr AM"}</span>
                <span >{!!shift[0].noc_12hr  && "12 hr NOC"}</span> 
              </Card.Text> : null }
            </Card.Body>
          </Card>
                     :
          <Card className="noPost" border="info" style={{ width: "fit-content"}}>       
            <Card.Header>Current Postings</Card.Header>              
            <Card.Body>
              <Card.Text>You have no current postings</Card.Text>
              <Button variant="outline-info" name="showPosting" onClick={handleShow}>Add New Availability</Button>
                  <Modal show={show.showPosting} onHide={handleClose} >
                    <Modal.Header>
                      <Modal.Title>Add Availability</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                      <AddNew props={props} posting={post} days={day} shifts={shift}handleClose={handleClose}/>
                    </Modal.Body>
                    <Modal.Footer>
                      
                    </Modal.Footer>
                  </Modal>
            </Card.Body>
          </Card>
            } 
         </div>
    );
}



export default CurrentPosting;
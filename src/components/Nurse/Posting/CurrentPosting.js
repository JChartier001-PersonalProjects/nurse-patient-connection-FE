import React, {useState, useEffect} from 'react'
import axiosWithAuth from "../../../api/axiosWithAuth.js";
import {Card, Button, Modal, Form, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import EditPost from "./EditPost.js";
import EditDays from "./EditDays.js";

const CurrentPosting = (props) => {
    const [posting, setPosting] = useState([]);
    const post = posting[0]; 
    const shift = posting.shifts;
    const day = posting.days; 
    const nurse = localStorage.getItem('nurse_id');
    
    const [show, setShow] = useState(false);  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    useEffect(() => {
        const id = localStorage.getItem('nurse_id');
        console.log(id)
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
            window.location.reload()
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleEdit = e => {
        e.preventDefault();
        
        const id = post.nurse_id;
        props.props.props.history.push(`/edit-${e.target.name}/${id}`)
    }

    
   
    return (
        <div  className="post">
        {posting[0] && posting.length !==0 ? 
        <Card border="info" style={{ width: "fit-content"}}>
             <Card.Header>Current Postings<Button variant="outline-info" onClick={handleDelete}>Delete</Button></Card.Header> 
            <Card.Header className="lightHeader">About Me
        <Button variant="outline-info" onClick={handleShow}>
          Edit
        </Button>
  
      {/* <Modal show={show} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>Edit Post</Modal.Title>
          </Modal.Header>
          <Modal.Body  >
            <EditPost  size="lg" posting={[post]}/>
            </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-info" onClick={handleClose}>
              Close
            </Button>
            <Button variant="outline-info" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal> */}
      </Card.Header>
            <Card.Body  className="profile">
                <Card.Text className="edit">{!!post.case_manage  && "Case Manage"}</Card.Text>
                <Card.Text className="edit">{!!post.pdn_exp && `${post.pdn_years} years of PDN exp`}</Card.Text>
                <Card.Text className="edit">{!!post.peds_exp  && `${post.peds_years} years of Peds exp`}</Card.Text>
                <Card.Text className="edit"> {!!post.epilepsy_exp  && `${post.epilepsy_years} of exp with epileptic patients`}</Card.Text>
                <Card.Text className="edit">{!!post.lift_res  && `${post.lift_res_type} lift restrictions`}</Card.Text>               
            </Card.Body>
            <Card.Header className="lightHeader">Days Available
            <Button variant="outline-info" onClick={handleShow}>
          Edit
          </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Days</Modal.Title>
          </Modal.Header>
          <Modal.Body><EditDays days={day[0]}/>
            </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-info" onClick={handleClose}>
              Close
            </Button>
            <Button variant="outline-info" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        </Card.Header>
            <Card.Body className="profile">
              <Card.Text>{!!day[0].sunday && "Sunday"}</Card.Text>
              <Card.Text>{!!day[0].monday && "Monday"}</Card.Text>
              <Card.Text>{!!day[0].tuesday && "Tuesday"}</Card.Text>
              <Card.Text>{!!day[0].wednesday && "Wednesday"}</Card.Text>
              <Card.Text>{!!day[0].thursday && "Thursday"}</Card.Text>
              <Card.Text>{!!day[0].friday && "Friday"}</Card.Text>
              <Card.Text>{!!day[0].saturday && "Saturday"}</Card.Text>            
            </Card.Body>
            <Card.Header className="lightHeader">Shifts Available<Button variant="outline-info" onClick={handleShow}>Edit</Button>  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Post</Modal.Title>
          </Modal.Header>
          <Modal.Body><EditPost posting={[post]}/></Modal.Body>
          <Modal.Footer>
            <Button variant="outline-info" onClick={handleClose}>
              Close
            </Button>
            <Button variant="outline-info" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        </Card.Header>
            <Card.Body className="profile">                      
                <Card.Text >{!!shift[0].am_8hr  && "8 hr AM"}</Card.Text>
                <Card.Text >{!!shift[0].pm_8hr  && "8 hr PM"}</Card.Text>
                <Card.Text >{!!shift[0].noc_8hr  && "8 hr NOC"}</Card.Text>
                <Card.Text >{!!shift[0].am_10hr  && "10 hr AM"}</Card.Text>
                <Card.Text >{!!shift[0].pm_10hr  && "10 hr PM"}</Card.Text>
                <Card.Text >{!!shift[0].am_12hr  && "12 hr AM"}</Card.Text>
                <Card.Text >{!!shift[0].noc_12hr  && "12 hr NOC"}</Card.Text>
            </Card.Body>
            </Card>
                     :
         <Card className="noPost" border="info" style={{ width: "fit-content"}}>       
              <Card.Header>Current Postings<Link to="/delete-post"><Button variant="outline-info">Delete</Button></Link></Card.Header>              
                <Card.Body>
                    <Card.Text>You have no current postings</Card.Text>
                    <Link to={`/add-avail/${nurse}`}>Add New Post</Link>
                </Card.Body>
             </Card>
            } 

         </div>
    );
}



export default CurrentPosting;
import React, {useState, useEffect} from 'react'
import axiosWithAuth from "../../../api/axiosWithAuth.js";
import {Card, Button} from "react-bootstrap";
import {Link} from "react-router-dom";



const CurrentPosting = (props) => {
    const [posting, setPosting] = useState([]);
    console.log(props)
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
    const post = posting[0]
    console.log("length",posting)
    const nurse = localStorage.getItem('nurse_id')
    return (
        <div  className="post">
            
            
        {posting[0] && posting.length !==0 ? 
        <Card border="info" style={{ width: "fit-content"}}>
             <Card.Header>Current Postings<Link to="/delete-post"><Button variant="outline-info">Delete</Button></Link></Card.Header> 
            <Card.Header className="lightHeader">About Me<Link to="/edit-posting"><Button variant="outline-info">Edit</Button></Link></Card.Header>
            <Card.Body  className="profile">
                <Card.Text>{!!post.case_manage  && "Case Manage"}</Card.Text>
                <Card.Text>{!!post.pdn_exp && `${post.pdn_years} years of PDN exp`}</Card.Text>
                <Card.Text>{!!post.peds_exp  && `${post.peds_years} years of Peds exp`}</Card.Text>
                <Card.Text> {!!post.epilepsy_exp  && `${post.epilepsy_years} of exp with epileptic patients`}</Card.Text>
                <Card.Text>{!!post.lift_res  && `${post.lift_res_type} lift restrictions`}</Card.Text>               
            </Card.Body>
            <Card.Header className="lightHeader">Days Available<Link to="/edit-days"><Button variant="outline-info">Edit</Button></Link></Card.Header>
            <Card.Body className="profile">{posting.days && posting.days.length ? posting.days.map(day => {
                return(          
                <Card.Text key={day.id}>{!!posting.days  && `${day.day}`}</Card.Text>
                    )}) : null}
            </Card.Body>
            <Card.Header className="lightHeader">Shifts Available<Link to="/edit-days"><Button variant="outline-info">Edit</Button></Link></Card.Header>
            <Card.Body className="profile">{posting.shifts && posting.shifts.length ? posting.shifts.map(shifts => {
                return(          
                <Card.Text key={shifts.id}>{!!posting.shifts  && `${shifts.shift}`}</Card.Text>
                )}) : null}
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
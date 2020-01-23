import React, {useState, useEffect} from 'react'
import axiosWithAuth from "../../api/axiosWithAuth.js";
import {Card, Button} from "react-bootstrap";
import {Link} from "react-router-dom";



const CurrentPosting = (props) => {
    const [posting, setPosting] = useState([]);
    console.log(props)
    useEffect(() => {
        const id = props.id;
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
    }, [])
    const post = posting[0]

    return (
        <div className="container">
        {posting && posting.length !==0 ? 
        <div className="postDiv">
            {/* <Card border="info" style={{ width: "18rem"}}> */}
                <Card.Header>About Me<Link to="/edit-posting"><Button variant="outline-info">Edit</Button></Link></Card.Header>
                <Card.Body>
                    <Card.Text>{!!post.case_manage  && "Case Manage"}</Card.Text>
                    <Card.Text>{!!post.pdn_exp && `${post.pdn_years} years of PDN exp`}</Card.Text>
                    <Card.Text>{!!post.peds_exp  && `${post.peds_years} years of Peds exp`}</Card.Text>
                    <Card.Text> {!!post.epilepsy_exp  && `${post.epilepsy_years} of exp with epileptic <div>s`}</Card.Text>
                    <Card.Text>{!!post.lift_res  && `${post.lift_res_type} lift restrictions`}</Card.Text>
                    <Card.Text>{!!post.lift_weight && `${post.lift_weight}`}</Card.Text>
                </Card.Body>
            {/* </Card>
            <Card border="info" style={{ width: "18rem"}}> */}
                <Card.Header>Days Available<Link to="/edit-days"><Button variant="outline-info">Edit</Button></Link></Card.Header>
                <Card.Body>{posting.days && posting.days.length ? posting.days.map(day => {
                    return(          
                    <Card.Text key={day.id}>{!!posting.days  && `${day.day}`}</Card.Text>
                
                                       
                            )}) : null}
                            </Card.Body>
            {/* </Card>
            <Card border="info" style={{ width: "18rem"}}> */}
                <Card.Header>Shifts Available<Link to="/edit-days"><Button variant="outline-info">Edit</Button></Link></Card.Header>
                <Card.Body>{posting.shifts && posting.shifts.length ? posting.shifts.map(shifts => {
                    return(          
                    <Card.Text key={shifts.id}>{!!posting.shifts  && `${shifts.shift}`}</Card.Text>
                
                                      
                            )}) : null}
                            </Card.Body>
            {/* </Card> */}
            </div>
                            
                            
                            // <Card.Text>{!!post.school_time && `${post.school_time}`}</Card.Text>
                            // <Card.Text>{post.verbal === 1 ? "Verbal" : "Non-verbal"}</Card.Text>
                            // <Card.Text>{!!post.mobility !== null && `${post.mobility}`}</Card.Text>
                            // <Card.Text>{!!post.develop_disabled  && "Developmentally delayed" }</Card.Text>     
                
            
            :
            null
            }
            </div>
    );
    
}



export default CurrentPosting;
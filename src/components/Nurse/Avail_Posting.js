import React, {useState, useEffect} from 'react';
import axiosWithAuth from "../../api/axiosWithAuth.js";
import {Card, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import CurrentPosting from "./CurrentPosting.js";
const Avail_Posting = () => {
    const [posting, setPosting] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token')
        const parse = JSON.parse(atob(token.split('.')[1]))
        const id = parse.id

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
    const nurse = localStorage.getItem('nurse_id')
    return(
     <div className='post'>
        {posting && posting.length !== 0 ?
            <Card className="availPost" border="info" style= {{ width: 'fit-content'}}>
                <Card.Header>Current Postings<Link to="/delete-post"><Button variant="outline-info">Delete</Button></Link></Card.Header>                   
                <Card.Body className="availPost">
                    <CurrentPosting id={nurse}/>
                </Card.Body>
            </Card> :
            <Card border="info" style= {{ width: '18rem'}}>
                <Card.Header>Current Postings</Card.Header>                   
                <Card.Body>
                    <Card.Text>
                        You have no current postings
                        <Link to={`/add-avail/${nurse}`}>Add New Post</Link>

                    </Card.Text>
                </Card.Body>
            </Card>  
        }
        </div>
    )
}  
export default Avail_Posting;


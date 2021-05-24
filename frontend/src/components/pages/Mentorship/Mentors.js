import React, {useEffect, useState} from 'react';
import NavBar from "../../misc/NavBar.js";
import filler from "../../../images/filler.png"
import Button from "react-bootstrap/Button"
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'lkjsdfku4@#$@#o7w59 pajfclvkas%$#ur3daFDUA'

export default function Mentors() {
    const [mentors, setMentors] = useState([]);
    const [id, setId] = useState("");

    //get all potential members
    const findMentors = async () => {
      
        const tempUser = jwt.verify(localStorage.getItem('token'), JWT_SECRET);
        console.log(tempUser)

        const result = await fetch(`http://localhost:5000/fullUser/findMentors/${tempUser.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then( res => res.json() );
      
        console.log(result);
        setId(tempUser.id)
        setMentors(result);
      
    }

    useEffect(() => {
        findMentors();
    }, [])

    const createMentor = (mentor) => (
        <div className="mentor-placard">
            <img width="150px" height="150px" src={filler} alt=""/>

            <div className="center2">
                <h1>Brother {mentor.first} {mentor.last}</h1>
                <table cellSpacing="0" cellPadding="0">
                    <tbody>
                        <tr>
                            <td><em>Class:</em></td>
                            <td>{mentor.clss}</td>
                        </tr>
                        <tr>
                            <td><em>Major:</em></td>
                            <td>{mentor.major}</td>
                        </tr>
                        <tr>
                            <td><em>Occupation:</em></td>
                            <td>{mentor.occupation}</td>
                        </tr>
                    </tbody>
                </table>
                <a href={mentor.fb} target="_blank" rel="noopener noreferrer">
                    <Button variant="dark" className="mentor-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="home-svg" viewBox="0 0 16 16">
                            <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
                        </svg>
                        <p>Message</p>
                    </Button>
                </a>
                <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer">
                    <Button variant="dark" className="mentor-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white"viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            <p>LinkedIn</p>
                    </Button>
                </a>

            </div>
        </div>
    )

return (
    <div className="mentor-container">
        <NavBar/>
        <h1 className="mentor">Mentors</h1>

        {mentors.map((mentor) => mentor._id !== id ? createMentor(mentor) : null )}


    </div>
);
}
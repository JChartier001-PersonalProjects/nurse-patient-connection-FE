import React, {useState} from 'react'
import axios from "axios";
import axiosWithAuth from '../api/axiosWithAuth';

const NurseRegister = () => {
    const id = localStorage.getItem('userId');
    const [ nurse, setNurse] = useState({
        user_id: id,
        license_type: '',
        rsc_child: false,
        rsc_adult: false,
        case_manager: false,
        available: false
    });

    const handleInput = e => {
        const stringToBoolean = string => {
            switch(string.toLowerCase().trim()) {
               case 'true': return true;
               case 'false': return false;
               default: return e.target.value;
         }}
        console.log(nurse)
        setNurse({
            ...nurse,
            [e.target.name]: stringToBoolean(e.target.value)
        })
    };

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
        .post('http://localhost:4000/api/nurse', nurse)
        .then(response => {
            console.log(response);            
        })
    }
    console.log(nurse)

    return(
        <div className="nurseRegister">
            <form onSubmit={handleSubmit}>
                <label htmlFor="license_type">License Type: </label>
                <select className='user-select' name='license_type'	onChange={handleInput} defaultValue=''>
                    <option value='' disabled hidden>Please Select</option>
                    <option value="RN">RN</option>
                    <option value="LPN">LPN</option>
                </select>
                <label htmlFor="rsc_child">Do you have a current child vent certification? </label>
                <select className='user-select'	name='rsc_child' onChange={handleInput} defaultValue=''>
                    <option value='' disabled hidden>Please Select</option>
                    <option >Yes</option>
                    <option value={false}>No</option>
                </select>
                <label htmlFor="rsc_adult">Do you have a current adult vent certification? </label>
                <select className='user-select'	name='rsc_adult' onChange={handleInput} defaultValue=''>
                    <option value='' disabled hidden>Please Select</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                <label htmlFor="case_manager">If you are an RN, are you willing to case manage? </label>
                <select className='user-select'	name='case_manager' onChange={handleInput} defaultValue=''>
                    <option value='' disabled hidden>Please Select</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                <label htmlFor="available">Are you currently looking for a new case? </label>
                <select className='user-select'	name='available' onChange={handleInput} defaultValue=''>
                    <option value='' disabled hidden>Please Select</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
export default NurseRegister;
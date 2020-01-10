import React, {useState} from 'react';
import axiosWithAuth from "../api/axiosWithAuth.js"

const PatientRegister = (props) => {
    const id = localStorage.getItem('userId');
    
    const [ patient, setPatient] = useState({
      info: {
        user_id: id,
        city: '',
        state: 'WI',
        insurance: '',
        case_manager: false}
    });

    const [needs, setNeeds] = useState({
       needs:
        {trach: false,
        gt: false,
        school: false,
        verbal: false,
        animals: false,
        mobility: '',
        use_car: false,
        school_time: '',
        develop_disabled: false,
        live_with: '',
        vent: false,
        appt: false
        }
    })

    const handleInputPatient = e => {
        const stringToBoolean = string => {
            switch(string.toLowerCase().trim()) {
               case 'true': return true;
               case 'false': return false;
               default: return e.target.value;
         }}        
        setPatient({
            ...patient,
            info: {...patient.info, [e.target.name]: stringToBoolean(e.target.value)}
        })
    };

    const handleInputNeeds = e => {
        const stringToBoolean = string => {
            switch(string.toLowerCase().trim()) {
               case 'true': return true;
               case 'false': return false;
               default: return e.target.value;
         }}        
        setNeeds({
            ...needs,
           needs: {...needs.needs, [e.target.name]: stringToBoolean(e.target.value)}
        })
    }

    const handleSubmit = e => {
        console.log("inSubmit",patient, needs)
        e.preventDefault();
        axiosWithAuth()
        .post('http://localhost:4000/api/patient', patient, needs, id)
        .then(response => {
           console.log(response);
            props.history.push('/dashboard') 
        })
        .catch(error => {
            console.dir(error)
        })
    }
    console.log("patient", patient, "needs", needs)

    return(
        <div className="patientRegister">
            
                <label htmlFor="city">City</label>
                <input type='text' name="city" placeholder="City" onChange={handleInputPatient}/>

                <label htmlFor="state">If you reside outside of WI, please enter state</label>
                <input type='text' name="state" placeholder="State" onChange={handleInputPatient}/>

                <label htmlFor="insurance">Insurance Type</label>
                <select className='user-select'	name='insurance' onChange={handleInputPatient} defaultValue=''>                    
                    <option value='' disabled hidden>Please Select</option>
                    <option value="ForwardHealth">ForwardHealth</option>
                    <option value="Private Insurance">Private Insurance</option>
                    <option value="Other">Other</option>
                </select>

                <label htmlFor="case_manager">Are you currently looking for a case Manager? </label>
                <select className='user-select'	name='case_manager' onChange={handleInputPatient} defaultValue=''>
                    <option value='' disabled hidden>Please Select</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>

                <label htmlFor="trach">Does your child/self have a trach?
                    <input type="checkbox" name='trach' value="true" onChange={handleInputNeeds}/>
                </label>
                <label htmlFor="gt">Does your child/self have a g-tube?
                    <input type="checkbox" name='gt' value="true" onChange={handleInputNeeds}/>
                </label>
                <label htmlFor="vent">Does your child/self have a vent?
                    <input type="checkbox" name='vent' value="true" onChange={handleInputNeeds}/>
                </label>
                <label htmlFor="school">Does your child/self attend school?
                    <input type="checkbox" name='school' value="true" onChange={handleInputNeeds}/>
                </label>
                <label htmlFor="school_time">If yes, what times does your child attend school?
                    <input type="text" name="school_time" onChange={handleInputNeeds}/></label>
                <label htmlFor="verbal">Is your child/self verbal?
                    <input type="checkbox" name='verbal' value="true" onChange={handleInputNeeds}/>
                </label>
                <label htmlFor="mobility">What is your child/self's mobility needs
                    <input type="text" name="mobility" onInput={handleInputNeeds}/>
                </label>
                <label htmlFor="appt">Will nurse be going with your child/self to appointments?
                    <input type="checkbox" name='appt' value="true" onChange={handleInputNeeds}/></label>
                <label htmlFor="user_car">If yes, will the nurse need to use own car?
                    <input type="checkbox" name='use_car' value="true" onChange={handleInputNeeds}/>
                </label>
                <label htmlFor="develop_disabled">Is your child/self developmentally disabled?
                    <input type="checkbox" name='develop_disabled' value="true" onChange={handleInputNeeds}/>
                </label>
                <label htmlFor="live_with">Who does your child/self life with?  
                    Self: 
                        <input type="checkbox" name='live_with' value="self" onChange={handleInputNeeds}/>
                    Parents:
                        <input type="checkbox" name='live_with' value="parent" onChange={handleInputNeeds}/>  
                    Others: 
                        <input type="checkbox" name='live_with' value="other" onChange={handleInputNeeds}/>
                </label>


                
                <label htmlFor="animals">Are there animals in the home?<input type="checkbox" name='animals' value="true" onChange={handleInputNeeds}/></label>

                
                <button onClick={handleSubmit}>Submit</button>
            
        </div>
    )
}
export default PatientRegister;
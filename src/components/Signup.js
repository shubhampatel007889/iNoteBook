import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';

const Signup = () => {
  const [credentials, setCredentials] = useState({name:"", email: "", password: "",cpassword:"" })
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password} = credentials
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json"

      },
      body: JSON.stringify({ name,email,password })


    });
    const json = await response.json()
    console.log(json)
    if (json.sucess) {
      //save the auth token and redirect
      localStorage.setItem('token', json.authtoken)
      history.push("/")
    }
    else {
      alert("invalid credential")
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='mt-3'>
    <h2>SignUp to continue to iNoteBook</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" onChange={onChange} value={credentials.name}  />

          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={credentials.email} aria-describedby="emailHelp" />

          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credentials.password} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} value={credentials.cpassword} minLength={5} required/>
          </div>

          <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
      </div>
    
  )
}

export default Signup
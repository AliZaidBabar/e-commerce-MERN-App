import React, { useState } from 'react';
import api from '../Api-integration/api';
import { useNavigate } from 'react-router-dom';
import '../style.css'
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogIn = async (e) => {
      e.preventDefault();
      try {
        const response = await api.logIn({ email, password });
        // Assuming the response contains both token and role
        const { token, role } = response;
  
        // Store token and role in local storage
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        console.log('token :', token);
        console.log('role :', role);

        // Handle success, maybe store token in localStorage and redirect
        navigate('/UserProfile');

      } catch (error) {
        console.error('Error logging in:', error);
        // Handle error, maybe display a message to the user
      }
    };
  return (
    
       <div className="container mx-auto">
            <div className="row">
                <div className="col-lg-6 mx-auto border p-5 mt-5 text-center">
                <h2 className="text-2xl font-bold mb-4 text-center">SIGN IN</h2>
                <form onSubmit={handleLogIn}>
                <div className="mb-3 text-start">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3 text-start">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" required/>
                    <div id="passwordHelp" className="form-text text-start"><u>Forget Password?</u></div>
                </div>
                
                <button type="submit" className="btn custombtn btn-primary border-dark ">Sign in</button>
            </form>
                </div>
            </div>
           
        </div>
  )
}

export default Login
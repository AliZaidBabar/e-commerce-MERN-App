import React, { useState } from 'react';
import api from '../Api-integration/api';
import { useNavigate } from 'react-router-dom';
import '../style.css'

function SignUp() {
      const navigate = useNavigate();
      const [email, setEmail] = useState('');
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');

      const handleSignUp = async (e) => {
        e.preventDefault();
        try {
          const response = await api.signUp({ email, username, password });
          console.log(response);
          navigate('/LogIn');
        } catch (error) {
          console.error('Error signing up:', error);
          // Handle error, maybe display a message to the user
        }
      };

    return (
        <div className="container mx-auto pt-5 mt-5 mb-5 mb-5">
            <div className="row">
                <div className="col-lg-6 mx-auto border p-5 mt-5 text-center">
                <h2 className="text-2xl font-bold mb-4 text-center">CREATE ACCOUNT</h2>
                <form onSubmit={handleSignUp}>
                <div className="mb-3 text-start">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3 text-start">
                    <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"required />
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3 text-start">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1"required />
                    <div id="emailHelp" className="form-text text-start">By clicking “Create Account” I agree to Health & Beauty’s <u>Terms & Conditions</u> and <u>Privacy Policy.</u></div>
                </div>
                
                <button type="submit" className="btn custombtn btn-primary border-dark ">Create an Account</button>
            </form>
                </div>
            </div>
           
        </div>
       
    );
}

export default SignUp;
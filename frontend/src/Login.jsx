import { useState } from "react";




const Login = () => {

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async() => { 

  }
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset ">
              <legend className="fieldset-legend">Email ID</legend>
              <input type="email" 
              className="input" 
              value={emailId}  
              onChange={(e) => setEmailId(e.target.value)}/>
              
            
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset ">
              <legend className="fieldset-legend">Password</legend>
              <input type="password" className="input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
                />
            
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

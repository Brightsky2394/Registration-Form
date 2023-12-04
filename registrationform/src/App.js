import {useState} from "react";
import "./App.css";
import { validateEmail } from "./utils";

const PasswordErrormessage = () => {
  return(
    <p className="FieldError">Password must be at least 8 characters</p>
  )
};


export default function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    value: "",
    isTouched: false,
  });
  const [role, setRole] = useState("role");

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword({
      value: "",
      isTouched: false,
    });
    setRole("role"); 
  }

  const getIsFormValid = () => {
    return (
      firstName &&
      validateEmail(email) &&
      password.value.length >= 8 &&
      role !== "role"
    )
  }

  const handleSubmit = e => {
    e.preventDefault();
    alert("Account created!");
    clearForm();
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Sign Up</h2>
          <div className="Field">
            <label>First name <sup>*</sup></label>
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First name"/>
          </div>
          <div className="Field">
            <label>Last name </label>
            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last name"/>
          </div>
          <div className="Field">
            <label>Email address <sup>*</sup></label>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
          </div>
          <div className="Field">
            <label>Password <sup>*</sup></label>
            <input type="password" 
              placeholder="Password"
              value={password.value} 
              onChange={e => setPassword({...password, value: e.target.value})}
              onBlur={() => setPassword({...password, isTouched: true})}
              /> 
              {password.isTouched && password.value.length < 8 ? <PasswordErrormessage/> : null}  
          </div>

          <div className="Field">
            <label>Role <sup>*</sup></label>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <option value="role">Role</option>
              <option value="individual">Individual</option>
              <option value="business">Business</option>
            </select>
          </div>
          <button type="submit" disabled={!getIsFormValid()}>Create account</button>
        </fieldset>
      </form>
    </div>
  )
}
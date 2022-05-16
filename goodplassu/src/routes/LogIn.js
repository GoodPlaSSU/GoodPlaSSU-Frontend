import React, {useState} from 'react';


const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name ==="email"){
                setEmail(value);
            }
        else if(name==="password"){
                setPassword(value);
            }
    }
    const onSubmit = (event) => {
        event.preventDefault();
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder='Email' required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder='password' required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
            </form>
        </div>
    );
};
export default LogIn;
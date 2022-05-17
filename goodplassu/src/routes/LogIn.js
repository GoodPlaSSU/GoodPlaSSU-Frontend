import React, {useState} from 'react';


const LogIn = () => {
    const [email, setEmail] = useState(""); //이메일 입력받을 변수명(삭제예정)
    const [password, setPassword] = useState(""); //비밀번호 입력받음(삭제예정)
    const [newAccount, setNewAccount] = useState(true); //계정이 새계정인지 여부
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name ==="email"){
                setEmail(value); //email 입력받아 저장
            }
        else if(name==="password"){
                setPassword(value); //password 입력받아 저장
            }
            //이부분은 계정연동시 지워질예정
    };
    const onSubmit = (event) => {
        event.preventDefault(); //이메일,비번 입력후 제출시 새로고침 방지
        if(newAccount){
            //create account
        }
        else{//login
        }
    };
    const onSocialClick = async (event) =>{ //소셜로그인 구글, 카카오톡 경우나눔
        const{ target:{name}, }=event;
        if(name==="google"){ //구글 클릭시 구글연동 로그인되게
            
        } else if(name ==="kakaoTalk"){ //카카오톡 클릭시 카카오연동 로그인되게

        }
        console.log(event.target.name); //뭐클릭했는지 확인용 로그
        
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder='Email' required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder='password' required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {/* 입력받는창. 계정연동 성공시 삭제예정*/}
            </form> 
            <div>
                <button onClick={onSocialClick} name="google">구글로 로그인</button> 
                <button onClick={onSocialClick} name="kakaoTalk">카카오톡으로 로그인</button>
                {/* ->계정연동 버튼 */}
            </div>
        </div>
    );
};
export default LogIn;
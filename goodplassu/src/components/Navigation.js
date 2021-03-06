import React, { useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Typography from "@mui/material/node/Typography";

function LinkTab(props) {
    return (
      <Tab
        component='a'
        onClick={(event) => {}}
        {...props}
      />
    );
  }

const Navigation = () =>{
    useEffect(()=>{},[])
    const navigate = useNavigate();
    const onLogInClick = () =>{
        navigate('/LogIn');
        window.location.reload();
    }
    const onLogOutClick = () => {
        window.localStorage.clear();
        window.location.reload();
        }

    return(
        <Box sx={{width: '100%', color: "info.contrastText", bgcolor: 'info.main'}}>
            {window.innerWidth < '600' ?<Tabs scrollButtons allowScrollButtonsMobile sx={{fontWeight: 'bold'}} variant="scrollable" textColor="inherit" value={false}>     
                <Typography align='left' sx={{
                    mt: 1,
                    mr: 1,
                    fontWeight: 'bold'
                }}
                variant="h6">GoodplaSSU</Typography>
                <LinkTab label="선행게시판" href="/" />
                <LinkTab label="참여게시판" href="/cBoard"/>
                <LinkTab label="마이페이지" href={(localStorage.getItem('ID')!=null)? "/mypage":"/LogIn"}/>
                {(localStorage.getItem('ID')!=null) ? <Button sx={{height: 30, mt: 1}} variant="contained" onClick={onLogOutClick}>LOGOUT</Button> :
                <Button sx={{height: 30, mt: 1}} variant="contained" onClick={onLogInClick}>LOGIN</Button>}
            </Tabs>
            : <Tabs sx={{fontWeight: 'bold'}} centered={true} textColor="inherit" value={false}>     
                <Typography align='left' sx={{
                    mt: 1,
                    mr: 1,
                    fontWeight: 'bold'
                }}
                variant="h6">GoodplaSSU</Typography>
                <LinkTab label="선행게시판" href="/" />
                <LinkTab label="참여게시판" href="/cBoard"/>
                <LinkTab label="마이페이지" href={(localStorage.getItem('ID')!=null)? "/mypage":"/LogIn"}/>
                {(localStorage.getItem('ID')!=null) ? <Button sx={{height: 30, mt: 1}} variant="contained" onClick={onLogOutClick}>LOGOUT</Button> :
                <Button sx={{height: 30, mt: 1}} variant="contained" onClick={onLogInClick}>LOGIN</Button>}
            </Tabs>}
        </Box>
    );
};

export default Navigation
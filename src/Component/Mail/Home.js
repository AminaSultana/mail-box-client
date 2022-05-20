import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Home.module.css'
import Email from './Email';
import { useSelector } from 'react-redux';

const Home = () => {
    const unreadEmail=useSelector(state=>state.email.unreadEmail)
    const navigate=useNavigate()
    const redirectToCompose=(e)=>{
        e.preventDefault()
        navigate("/compose-mail")
    }
  return (
    <>
        <div className={classes.home}>
            <section>
                <button onClick={redirectToCompose}>Compose</button>
                <p>Unread: {unreadEmail}</p>
            </section>
            <section>
                <Email/>
            </section>
        </div>
    </>
  );
}

export default Home;

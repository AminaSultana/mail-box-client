import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Home.module.css'
import { fetchEmailFromDB } from '../../store/email';
import Email from './Email';
import { useDispatch } from 'react-redux';

const Home = () => {
   

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
            </section>
            <section>
                <Email/>
            </section>
        </div>
    </>
  );
}

export default Home;

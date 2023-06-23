'use client'
import SingIn from '../../components/SingIn/index';
import SingUp from '../../components/SingUp/index';
import { useState } from 'react';


export default function Login() {
    const [ status, setState ] = useState(true);
    
    function changeStatus() {
        setState(!status);
    }
    return (
        <>
            {status 
            ? <SingIn 
                ToggleCompLogin={changeStatus}
            /> 
            : <SingUp 
                ToggleCompLogin={changeStatus}
            />}
        </>
    )
}
  
'use client'
import React from 'react'
import SignUp from '@/components/SignUp'
import { useState } from 'react';
import Modal from '@/components/Modal';


const Register = () => {

    const [continueBtn, setContinueBtn] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);

    const handleContinueClick = (newDataOne: boolean) => {
        setContinueBtn(newDataOne);
    }

    const handleModal = () => {
        setModal(!modal);
    }

    interface Icredentials {
        type: string,
        name: string,
        placeholder: string,
        id: string,
        labelText: string,
        continueText: string
    }

    const credentials: Icredentials = {
        type: continueBtn ? 'email' : 'number',
        name: continueBtn ? 'email' : 'phone_number',
        placeholder: continueBtn ? 'Enter your email' : 'Enter your Phone number',
        id: continueBtn ? 'email' : 'phone',
        labelText: continueBtn ? 'Email' : 'Phone',
        continueText: continueBtn ? 'Continue with Phone number' : 'Continue with email',
    }

    return (
        <>
            <SignUp credentials={credentials} handleContinueClick={handleContinueClick} handleModal={handleModal} />
            {modal && <Modal setModal={handleModal} />}
        </>
    )
}

export default Register
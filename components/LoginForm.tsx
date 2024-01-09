'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useStorage from '@/app/libs/useStorage';

const LoginForm = () => {
    const { setItem, getItem } = useStorage();
    const router = useRouter();
    type UserInputType = "email" | "phone";
    const [userInput, setUserInput] = useState<string>("");
    const [userPass, setUserPass] = useState<string>("");
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [validInput, setValidInput] = useState<boolean>(false);
    const [inputType, setInputType] = useState<UserInputType>("email");
    const [errors, setErrors] = useState<string>("");


    async function handleSubmit(e: React.MouseEvent<HTMLFormElement>) {
        e.preventDefault();

        if (errors) {
            alert(errors);
        } else {
            try {
                const apiUrl = `http://localhost:3000/api/contacts/hostellogin?${inputType}=${userInput}&password=${userPass}`;
                const res = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!res.ok) {
                    throw new Error("Fail to connect to database endpoint");
                }
                const { user, message, success } = await res.json();
                console.log(user);
                if (success) {
                    setItem('user_name', user.name, 'session', 'hostel_user');
                    setItem('user_name', `${user.name}, ${message}`, 'local');
                    router.push('/question/1');
                }
            } catch (error: any) {
                throw new Error(error.message);
            }
        }

    };

    useEffect(() => {
        const msgStr: string = "Invalid email or phone number";

        const emailOrPhoneValidity = () => {
            const validEmailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
            const validPhoneRegex = /^(?:[+]?[2][3][3]|0)?[1-9]\d{8}$/;
            if (validEmailRegex.test(userInput)) {
                setValidInput(true);
                setInputType("email")
                setErrors("");
            } else if (validPhoneRegex.test(userInput)) {
                setValidInput(true);
                setInputType("phone");
                setErrors("");
            } else {
                setValidInput(false);
                setErrors(msgStr);
            }
        };
        emailOrPhoneValidity();

    }, [userInput, validInput]);

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', gap: '10px', padding: '50px 0px 50px 0px', borderRadius: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <input type='text' name={inputType} id={inputType} style={{ height: '40px', width: '50%', borderRadius: '5px', border: validInput ? '3px solid green' : '3px solid red' }} value={userInput} placeholder='Enter Email or Phone' onChange={({ target }) => setUserInput(target?.value)} />
                <input type='password' name='password' id='password' style={{ height: '40px', width: '50%', borderRadius: '5px' }} value={userPass} onChange={({ target }) => setUserPass(target?.value)} placeholder='Password' />
            </div>
            <div style={{ width: '50%', display: 'grid', gridTemplateColumns: 'auto auto', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
                    <input type='checkbox' name='remember' id='remember' value='remember' onChange={({ target }) => setIsChecked(target?.checked)} checked={isChecked} style={{ cursor: 'pointer' }} />
                    <p>Remember me</p>
                </span>
                <button type='submit' style={{ cursor: 'pointer', height: '70%', fontSize: '15px', fontWeight: 'bold' }}>Login</button>
            </div>
            <div style={{ width: '50%', display: 'grid', gridTemplateColumns: 'auto auto', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link style={{ textDecoration: 'none', color: 'blue' }} href='/register'>Register now</Link>
                <button type='button' style={{ cursor: 'pointer' }}>Forgot password?</button>
            </div>
            <div style={{ width: '50%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                <hr style={{ borderTop: '1px solid gray', width: '40%', height: '1px', margin: '0px' }} />
                <p>or</p>
                <hr style={{ borderTop: '1px solid gray', width: '40%', height: '1px', margin: '0px' }} />
            </div>
            <button type='button' style={{ display: 'flex', gap: '1rem', borderRadius: '0.5rem', paddingLeft: '0.75rem', alignItems: 'center', boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}>
                <Image src={'/google-logo.png'} alt='google logo' width={45} height={45} />
                <span style={{ backgroundColor: "#3B82F6", color: '#ffffff', paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '0.75rem', paddingBottom: '0.75rem' }}>
                    Sign in with Google
                </span>
            </button>
            {
                !validInput &&
                <div>{errors}</div>
            }
        </form>
    )
}

export default LoginForm
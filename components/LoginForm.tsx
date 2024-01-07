'use client'
import React, { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import checkPasswordValidity from '@/app/libs/checkPasswordValidity';

const LoginForm = () => {
    type UserInputType = "email" | "phone";
    const [userInput, setUserInput] = useState<string>("");
    const [userPass, setUserPass] = useState<string>("");
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [validInput, setValidInput] = useState<boolean>(false);
    const [inputType, setInputType] = useState<UserInputType>("email");
    const [errors, setErrors] = useState<string[]>([]);


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (errors.length > 0) {
            alert(errors.join('\n'));
        } else {
            try {
                const res = await fetch(`http://localhost:3000/api/contacts/hostellogin?${inputType}=${userInput}&password=${userPass}`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                if (!res.ok) {
                    throw new Error("Fail to connect to database endpoint");
                }
                const { user, message, success } = await res.json();
                console.log(user, message, success);
            } catch (error: any) {
                throw new Error(error.message);
            }
        }

    }

    useEffect(() => {
        const validEmailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        const validPhoneRegex = /^(?:[+]?[2][3][3]|0)?[1-9]\d{8}$/;
        const msgStr: string = "Invalid email or phone number";
        if (validEmailRegex.test(userInput)) {
            setValidInput(true);
            setInputType("email")
            setErrors((prev) => prev.filter((msg) => msg !== msgStr));
        } else if (validPhoneRegex.test(userInput)) {
            setValidInput(true);
            setInputType("phone");
            setErrors((prev) => prev.filter((msg) => msg !== msgStr));
        } else {
            setValidInput(false);
            setErrors(["Invalid email or phone number"]);
        }

        const errMsgs: string[] = checkPasswordValidity(userPass);
        let uniqueErrorMsg: string[] = [...new Set(errMsgs)];

        setErrors((prev): string[] => {
            uniqueErrorMsg = [...new Set(prev), ...new Set(errMsgs)]
            return [...new Set(uniqueErrorMsg)];
        });
        console.log(errors);

    }, [userInput, userPass, errors]);

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', gap: '10px', padding: '50px 0px 50px 0px', borderRadius: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <input type='text' name={inputType} id={inputType} style={{ height: '40px', width: '50%', borderRadius: '5px', border: validInput ? '3px solid green' : '3px solid red' }} value={userInput} placeholder='Enter Email or Phone' onChange={({ target }) => setUserInput(target.value)} />
                <input type='password' name='password' id='password' style={{ height: '40px', width: '50%', borderRadius: '5px' }} value={userPass} placeholder='Password' onChange={({ target }) => setUserPass(target?.value)} />
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
                (Array.isArray(errors) && errors.length !== 0) &&
                (errors as ReactNode[]).map((err, index) => (
                    <div key={index}>{err}</div>
                ))
            }
        </form>
    )
}

export default LoginForm
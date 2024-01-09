
import React, { ReactNode, useRef } from 'react'
import { useState, useEffect } from 'react';
import styles from '@/styles/Register.module.css'
import useStorage from '@/app/libs/useStorage';
import { MdOutlineVisibilityOff } from "react-icons/md"
import { MdOutlineVisibility } from "react-icons/md"
import checkPasswordValidity from '@/app/libs/checkPasswordValidity';

interface SignFormProps {
    credentials: { type: string, name: string, placeholder: string, id: string, labelText: string, continueText: string };
    handleContinueClick: (newDataOne: boolean) => void;
    handleModal: () => void;
    successInfo: (data: boolean) => void
}

const SignForm: React.FC<SignFormProps> = ({ credentials, handleContinueClick, handleModal, successInfo }) => {
    const [buttonClicked, setButtonClicked] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<Array<string | undefined>>([]);
    const [success, setSuccess] = useState<boolean>(false);
    const { setItem } = useStorage();
    const passToggleRef = useRef<HTMLInputElement | null>(null);
    const [isVisible, setIsVisible] = useState<"password" | "text">("password");
    const [validInput, setValidInput] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);



    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (errors.length > 0) {
            alert(errors.join('\n'));
        } else {
            setIsLoading(true);
            try {
                const res = await fetch('api/contacts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        [credentials.type === 'email' ? 'email' : 'phone']: credentials.type === 'email' ? email : phone,
                        password,
                        gender
                    })

                })

                if (!res.ok) {
                    throw new Error("Failed to submit data, please try again");
                } else {
                    setItem("user_name", name, 'local');
                    setItem('user_name', name, 'session', 'hostel_user');
                }

                const { msg, success } = await res.json();
                setErrorMsg(msg);
                setSuccess(success);
            } catch (error: any) {
                throw new Error("Error: ", error);
            } finally {
                setIsLoading(false);
                if (success) {
                    setName("");
                    setPhone("");
                    setEmail("");
                    setPassword("");
                    setGender("");

                }
            }
        }
    }

    const handleClick = () => {
        const newDataOne: boolean = !buttonClicked;
        setButtonClicked(newDataOne);
        handleContinueClick(newDataOne);

    }

    const handleClickModal = () => {
        const newDataTwo: boolean = !modal;
        setModal(newDataTwo);
        handleModal();
    }

    const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const eProp = passToggleRef.current;
        if (eProp) {
            if (eProp?.type === "password") {
                setIsVisible("text");
            } else {
                setIsVisible("password");
            }
        }

    }

    useEffect(() => {
        const msgStr: string = `Invalid ${credentials.type === 'email' ? credentials.type : 'phone ' + credentials.type}`;

        const emailOrPhoneValidity = () => {
            const validEmailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
            const validPhoneRegex = /^(?:[+]?[2][3][3]|0)?[1-9]\d{8}$/;
            if (validEmailRegex.test(email) || validPhoneRegex.test(phone)) {
                setValidInput(true);
            } else {
                setValidInput(false);
            }
        };
        emailOrPhoneValidity();

        const passValidity = () => {
            const errMsgs: string[] = checkPasswordValidity(password);
            setErrors(errMsgs);
        }
        passValidity();

        if (!validInput) {
            setErrors((prev) => [msgStr, ...prev]);
        }

        successInfo(success);
    }, [success, successInfo, email, phone, password, validInput, credentials.type])

    return (
        <form className={styles.form} onSubmit={handleSubmit} style={{ opacity: isLoading ? '0.5' : '1' }}>
            <div className={styles.registerInputItem}>
                <label htmlFor='name'>Enter name</label>
                <div className={styles.inputItem}>
                    <input type='text' name='name' placeholder='Enter your name' id='name' value={name} onChange={({ target }) => setName(target?.value)} />
                    {/* <Image src="/hostelIcon.png" alt="rem icon" width={100} height={100} /> */}
                </div>
            </div>
            <div className={styles.registerInputItemWithCredentialsInput}>
                <label htmlFor={credentials.id}>{credentials.labelText}</label>
                <div className={styles.inputItem}>
                    <input style={{ border: validInput ? '3px solid green' : '3px solid red' }} type={credentials.type} name={credentials.name} placeholder={credentials.placeholder} id={credentials.id} value={credentials.type === 'email' ? email : phone} onChange={({ target }) => credentials.type === 'email' ? setEmail(target?.value) : setPhone(target?.value)} />
                    <div className={styles.continue}>
                        <button type='button' className={styles.continueBtn} onClick={handleClick}>
                            <i>
                                {credentials.continueText}
                            </i>
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.registerInputItem}>
                <label htmlFor='password'>Password</label>
                <div className={styles.inputItemPass}>
                    <input style={{ borderRight: '0px', border: errors.length === 0 ? '3px solid green' : '3px solid red' }} ref={passToggleRef} type={isVisible} name='password' placeholder='Enter your password' id='password' value={password} onChange={({ target }) => setPassword(target?.value)} />
                    <button style={{ borderRadius: '0px', backgroundColor: 'white', borderLeft: '0px', cursor: 'pointer' }} onClick={togglePasswordVisibility}>{isVisible === "password" ? <MdOutlineVisibilityOff size={30} /> : <MdOutlineVisibility size={30} />}</button>
                </div>
            </div>
            <div className={styles.registerSelectGender}>
                <label htmlFor='gender'>Gender</label>
                <select className={styles.selectGender} value={gender} onChange={({ target }) => setGender(target?.value)}>
                    <option value="" disabled>Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className={styles.btnItem}>
                <button type='submit' className={styles.submitBtn} style={{ opacity: isLoading ? '0.5' : '1' }}>{isLoading ? 'Loading...' : 'SUBMIT'}</button>
                <button type='button' className={styles.skipBtn} onClick={handleClickModal}>skip -&gt;</button>
            </div>
            {errorMsg && (errorMsg as ReactNode[]).map((err, index) => (
                <div className={styles.errorMsg} style={success ? { color: 'green' } : { color: 'red' }} key={index}>{err}</div>
            ))}

            {
                (Array.isArray(errors) && errors.length !== 0) &&
                (errors as ReactNode[]).map((err, index) => (
                    <div key={index}>{err}</div>
                ))
            }
        </form>
    )
}

export default SignForm

import React, { ReactNode } from 'react'
import { useState, useEffect } from 'react';
import styles from '@/styles/Register.module.css'


const SignForm = ({ credentials, handleContinueClick, handleModal, successInfo }: {
    credentials:
    { type: string, name: string, placeholder: string, id: string, labelText: string, continueText: string },
    handleContinueClick: (newDataOne: boolean) => void,
    handleModal: () => void,
    successInfo: (data: boolean) => void
}) => {
    const [buttonClicked, setButtonClicked] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<Array<string | undefined>>([]);
    const [success, setSuccess] = useState<boolean>(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
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
            }

            const { msg, success } = await res.json();
            setErrorMsg(msg);
            setSuccess(success);



        } catch (error: any) {
            setError(error.message);
            console.error(error);
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

    const handleClick = () => {
        const newDataOne: boolean = !buttonClicked;
        setButtonClicked(newDataOne);
        handleContinueClick(newDataOne);

    }

    const handleClickModal = () => {
        const newDataTwo: boolean = !modal;
        setModal(newDataTwo);
        handleModal();
        // console.log("from signup ", newDataTwo);
    }

    useEffect(() => {
        successInfo(success);
    }, [success, successInfo])

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
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
                    <input type={credentials.type} name={credentials.name} placeholder={credentials.placeholder} id={credentials.id} value={credentials.type === 'email' ? email : phone} onChange={({ target }) => credentials.type === 'email' ? setEmail(target?.value) : setPhone(target?.value)} />

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
                <div className={styles.inputItem}>
                    <input type='password' name='password' placeholder='Enter your password' id='password' value={password} onChange={({ target }) => setPassword(target?.value)} />
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
                <button type='submit' className={styles.submitBtn}>{isLoading ? 'Loading...' : 'SUBMIT'}</button>
                <button type='button' className={styles.skipBtn} onClick={handleClickModal}>skip -&gt;</button>
            </div>
            {errorMsg && (errorMsg as ReactNode[]).map((err, index) => (
                <div className={styles.errorMsg} style={success ? { color: 'green' } : { color: 'red' }} key={index}>{err}</div>
            ))}
        </form>
    )
}

export default SignForm
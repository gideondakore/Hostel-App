import React, { ChangeEvent, FormEventHandler, useEffect, useState } from 'react'
import styles from '@/styles/Modal.module.css'
import { useRouter } from 'next/navigation';
import useStorage from '@/app/libs/useStorage';

const Modal = ({ setModal }: { setModal: (newDta: boolean) => void }) => {
    const [tempState, setTempState] = useState<boolean>(false);
    const { getItem, setItem, removeItem } = useStorage();

    const [local] = useState<string>(((): string => {
        // getItem('user_name', 'session')
        return getItem('user_name', 'local')

    }))
    const [name, setName] = useState<string>(local);
    const [gender, setGender] = useState<string>("");

    const handleClick = () => {
        const newData = !tempState;
        setTempState(newData);
        setModal(newData);
    }

    const route = useRouter()
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        route.push('/question/1');
    }

    useEffect(() => {
        setItem('user_name', name, 'local');
        setItem('user_gender', gender, 'local');
        setItem('user_name', name, 'session', 'hostel_user');
        setItem('user_gender', gender, 'session', 'hostel_user');


    }, [name, gender, setItem])


    return (
        <div className={styles.overlay}>
            <div className={styles.modalBody}>
                <div className={styles.disableClick}>
                    <button onClick={handleClick}>X</button>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.registerInputItem}>
                        <label htmlFor='name'>Enter name</label>
                        <div className={styles.inputItem}>
                            <input type='text' name='name' placeholder='Enter your name' id='name' value={name !== 'Name Required' ? name : ''} required onChange={({ target }) => setName(target?.value)} />
                            {/* <Image src="/hostelIcon.png" alt="rem icon" /> */}
                        </div>
                    </div>
                    <div className={styles.registerSelectGender}>
                        <label htmlFor='gender'>Select Gender</label>
                        <select className={styles.selectGender} id='gender' name='gender' value={gender} required onChange={({ target }) => setGender(target?.value)}>
                            <option value="" disabled>Select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className={styles.btnItem}>
                        <button type='submit' className={styles.submitBtn}>SUBMIT</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modal
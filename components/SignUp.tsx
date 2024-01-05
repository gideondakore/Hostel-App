import Image from 'next/image'
import Link from 'next/link'
import React, { FC, Suspense } from 'react'
import styles from '@/styles/Register.module.css'
import SignForm from './SignForm'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'


interface SignUpProps {
    credentials: { type: string, name: string, placeholder: string, id: string, labelText: string, continueText: string },
    handleContinueClick: (newDataOne: boolean) => void,
    handleModal: () => void,
}

const SignUp: FC<SignUpProps> = ({ credentials, handleContinueClick, handleModal }) => {

    const [success, setSuccess] = useState<boolean>(false);
    const signFormRef = useRef<HTMLDivElement | null>(null);
    const route = useRouter()


    const successInfo = (success: boolean) => {
        setSuccess(success);
    }

    const handleScrollTo = () => {
        if (signFormRef.current) {
            signFormRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    useEffect(() => {
        if (success) {
            route.push('/question/1');
        }
    }, [success, route])

    return (
        <div className={styles.registerWrapper}>

            <div className={styles.container}>
                <div className={styles.registerHeader}>
                    <Link href="/">
                        <Image src="/hostelIcon.png" alt="logo" priority={true} width={90} height={90} />
                    </Link>
                </div>
                <div className={styles.registerBody}>
                    {/* <h1>REGISTER</h1> */}
                    <div className={styles.registerLeft}>
                        <div className={styles.wowAnimation}>
                            <Image src="/hostelIcon.png" alt="wow icon" priority={true} width={120} height={80} />
                        </div>
                        <h6 className={styles.registerPara}>
                            There are <b>30+</b> hostels available
                        </h6>
                        <h6>Let&apos;s find the one for you</h6>
                        <div className={styles.registerForm}>
                            {/* <h1>register form</h1> */}
                            <div className={styles.btnItem}>
                                <button type='button' className={styles.signUpbtn} onClick={handleScrollTo}>Sign Up</button>
                                <button type='button' className={styles.loginbtn}>Login</button>
                            </div>
                        </div>
                        <div ref={signFormRef}>
                            <SignForm credentials={credentials} handleContinueClick={handleContinueClick} handleModal={handleModal} successInfo={successInfo} />
                        </div>
                    </div>
                    <div className={styles.registerRight}>
                        <Image src='/right.jpg' priority={true} alt='COHK-image' fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SignUp
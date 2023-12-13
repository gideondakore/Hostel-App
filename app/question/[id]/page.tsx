'use client'

import QuestionOne from "@/components/QuestionOne"
// import styles from '@/styles/QuestionOne.module.css'
import Image from 'next/image'
import { useStyles } from "@/components/StylesContext"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import QuestionTwo from "@/components/QuestionTwo"
import QuestionThree from "@/components/QuestionThree"
import QuestionFour from "@/components/QuestionFour"
import QuestionFive from "@/components/QuestionFive"
import useStorage from "@/app/libs/useStorage"

const Question = ({ params }: { params: { id: string } }) => {
    const styles = useStyles()
    const router = useRouter();
    const path = usePathname();
    const { getItem } = useStorage();
    const [activeStep, setActiveStep] = useState<number>(parseInt(params.id, 10));

    const handleBackClicked = () => {
        router.back();
    }

    const handleNextClick = () => {
        if (Number(params.id) > 0 && Number(params.id) < 6) {
            const slicePath = path.slice(path.lastIndexOf('/'));
            const modPath: number = (Number(params.id) + 1) % 6;
            const validatedUrl: string = `/${modPath === 0 ? modPath + 1 : modPath}`;
            const actualPath = path.replace(slicePath, validatedUrl);
            const from_localStorage_sliderVal = getItem('slider_value');

            if ((Number(from_localStorage_sliderVal) !== 0)) {
                router.push(actualPath, { scroll: true });
            } else {
                window.alert('Select a distance');
                console.log('Select a distance');
            }
        }
    }


    useEffect(() => {
        setActiveStep((Number(params.id) > 0 ? Number(params.id) - 1 : Number(params.id)) % 5)
    }, [params, path])

    return (
        <div className={styles.questionDashboardWrapper}>
            <div className={styles.questionDashboard}>
                <div className={styles.questionLeft}>
                    <Image priority={true} src='/hostel-3.webp' alt='question background' fill style={{ borderRadius: '20px', }} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    <div className={styles.questionLogo}>
                        <Image src='/hostelIcon.png' alt='logo' height={100} width={100} style={{ position: 'absolute', top: '30px', left: '30px', }} />
                        {activeStep === 0 && <p className={styles.questionPara}>Your ideal hostel is just 5 steps away.</p>}
                        {activeStep === 1 && <p className={styles.questionPara}>Services that make your stay smoooth....</p>}
                        {activeStep === 2 && <p className={styles.questionPara}>Pick out your must-haves!</p>}
                        {activeStep === 3 && <p className={styles.questionPara}>Cause some fun is definitely needed ;)</p>}
                        {activeStep === 4 && <p className={styles.questionPara}>Last but not the least...</p>}
                    </div>
                </div>
                <div className={styles.questionRight}>
                    <div className={styles.questionRightFirst}>
                        <button className={styles.backBtn} onClick={handleBackClicked}>Back</button>
                        {activeStep === 0 && <QuestionOne />}
                        {activeStep === 1 && <QuestionTwo />}
                        {activeStep === 2 && <QuestionThree />}
                        {activeStep === 3 && <QuestionFour />}
                        {activeStep === 4 && <QuestionFive />}
                    </div>
                    <div className={styles.questionFooter}>
                        <button className={styles.nextBtn} onClick={handleNextClick}>NEXT</button>
                        <div className={styles.questionSteps}>
                            <div className={activeStep === 0 ? styles.activeSteps : styles.inactiveSteps}>
                                <span>Step {activeStep + 1}</span>
                            </div>
                            <div className={activeStep === 1 ? styles.activeSteps : styles.inactiveSteps}></div>
                            <div className={activeStep === 2 ? styles.activeSteps : styles.inactiveSteps}></div>
                            <div className={activeStep === 3 ? styles.activeSteps : styles.inactiveSteps}></div>
                            <div className={activeStep === 4 ? styles.activeSteps : styles.inactiveSteps}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Question
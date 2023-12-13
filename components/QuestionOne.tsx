import React, { useEffect, useState } from 'react'
import { useStyles } from './StylesContext'
import useStorage from '@/app/libs/useStorage'

const QuestionOne = () => {
    const [userName] = useState<string>((): string => {
        if (typeof window !== 'undefined') {
            const from_localStorage = window.localStorage.getItem('user_name');
            console.log('username ', from_localStorage)
            return `${from_localStorage}`;
        }
        return ''
    })

    const [fullName, setFullName] = useState<string>('');
    const styles = useStyles();
    const { getItem, setItem, removeItem } = useStorage()

    const [local] = useState<number>((): number => {
        const from_local_session = getItem('slider_value', 'local')
        return parseInt(from_local_session, 10)
    })

    const [sliderValue, setSliderValue] = useState<number>(local);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSliderValue(parseInt(e.target.value, 10))
    }

    useEffect(() => {
        setFullName(userName)
        setItem('slider_value', `${sliderValue}`, 'session', 'user_choices');
        setItem('slider_value', `${sliderValue}`, 'local');

    }, [userName, fullName, sliderValue, setItem])

    return (
        <div>
            <p className={styles.questionDesc}>
                Hey
                {' '}
                <b className={styles.textCapitalize}>{fullName}</b>
                <br />
                Lets make your hostel finding experience Hassel free.
            </p>
            <p className={styles.question}>
                How close do you want your hostel to be to your college?
            </p>
            <div className={styles.questionInputRange}>
                <fieldset className={styles.rangeField}>
                    <input className={styles.range} type='range' min='0' max='5' name='distance' value={sliderValue} onChange={handleSliderChange} />
                    <svg role="presentation" width="100%" height="14" xmlns="http://www.w3.org/2000/svg">
                        <text className="rangePoint" x="0%" y="14" textAnchor="start">0 km</text>
                        <text className="rangePoint" x="20%" y="14" textAnchor="middle">1 km</text>
                        <text className="rangePoint" x="40%" y="14" textAnchor="middle">2 km</text>
                        <text className="rangePoint" x="60%" y="14" textAnchor="middle">3 km</text>
                        <text className="rangePoint" x="80%" y="14" textAnchor="middle">4 km</text>
                        <text className="rangePoint" x="97%" y="14" textAnchor="middle">5 km</text>
                    </svg>
                </fieldset>
            </div>
        </div>
    )
}

export default QuestionOne
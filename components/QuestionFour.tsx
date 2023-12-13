import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useStyles } from './StylesContext'
import Image from 'next/image';
import useStorage from '@/app/libs/useStorage';

const QuestionFour: React.FC<{}> = () => {
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<Array<string>>([]);
    const styles = useStyles();
    const { setItem } = useStorage()

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        if (selectedCheckboxes.includes(value)) {
            setSelectedCheckboxes((prevSelected) => prevSelected.filter((checkbox) => checkbox !== value))
        } else {
            setSelectedCheckboxes((prevSelected) => [...prevSelected, value]);
        }
    }


    useEffect(() => {
        setItem('extraFeature_array', selectedCheckboxes, 'session')
        setItem('extraFeature_array', selectedCheckboxes, 'local')

    }, [selectedCheckboxes, setItem])

    return (
        <>
            <p className={styles.question}>What extra features are important to  <br />you?</p>
            <div className={styles.amenitiesList}>
                <label className={styles.amenitiesItems}>
                    <Image src='/gymHostel.gif' alt='Giv picture of AC' fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={true} style={{ borderRadius: '10px' }} />
                    <input id='amenitiesFirst' name='gym' className={styles.checkInput} value='gym' type='checkbox' onChange={handleCheckboxChange} checked={selectedCheckboxes.includes('gym')} />
                    <span className={styles.checkSpan}>gym</span>
                </label>
                <label className={styles.amenitiesItems}>
                    <Image src='/gameHostel.gif' alt='Giv picture of AC' fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={true} style={{ borderRadius: '10px' }} />
                    <input id='amenitiesSecond' name='game' className={styles.checkInput} value='game' type='checkbox' onChange={handleCheckboxChange} checked={selectedCheckboxes.includes('game')} />
                    <span className={styles.checkSpan}>indoor game</span>
                </label>
                <label className={styles.amenitiesItems}>
                    <Image src='/partyHostel.gif' alt='Giv picture of AC' fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={true} style={{ borderRadius: '10px' }} />
                    <input id='amenitiesThird' name='party' className={styles.checkInput} value='party' type='checkbox' onChange={handleCheckboxChange} checked={selectedCheckboxes.includes('party')} />
                    <span className={styles.checkSpan}>exclusive parties</span>
                </label>
            </div>
        </>
    )
}

export default QuestionFour
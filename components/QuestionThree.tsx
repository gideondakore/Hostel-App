import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useStyles } from './StylesContext'
import Image from 'next/image';
import useStorage from '@/app/libs/useStorage';

const QuestionThree: React.FC<{}> = () => {
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<Array<string>>([]);
    const styles = useStyles();
    const { setItem } = useStorage();

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        if (selectedCheckboxes.includes(value)) {
            setSelectedCheckboxes((prevSelected) => prevSelected.filter((checkbox) => checkbox !== value))
        } else {
            setSelectedCheckboxes((prevSelected) => [...prevSelected, value]);
        }
    }


    useEffect(() => {
        setItem('facility_array', selectedCheckboxes, 'session')
        setItem('facility_array', selectedCheckboxes, 'local')

    }, [selectedCheckboxes, setItem])

    return (
        <>
            <p className={styles.question}>What facilities do you desire in your <br />Hostel?</p>
            <div className={styles.amenitiesList}>
                <label className={styles.amenitiesItems}>
                    <Image src='/tvHostel.gif' alt='Giv picture of TV' fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={true} style={{ borderRadius: '10px' }} />
                    <input id='amenitiesFirst' name='tv' className={styles.checkInput} value='tv' type='checkbox' onChange={handleCheckboxChange} checked={selectedCheckboxes.includes('tv')} />
                    <span className={styles.checkSpan}>tv</span>
                </label>
                <label className={styles.amenitiesItems}>
                    <Image src='/fridgeHostel.gif' alt='Giv picture of Fridge' fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={true} style={{ borderRadius: '10px' }} />
                    <input id='amenitiesSecond' name='fridge' className={styles.checkInput} value='fridge' type='checkbox' onChange={handleCheckboxChange} checked={selectedCheckboxes.includes('fridge')} />
                    <span className={styles.checkSpan}>fridge</span>
                </label>
                <label className={styles.amenitiesItems}>
                    <Image src='/snacksHostel.gif' alt='Giv picture of Snacks' fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={true} style={{ borderRadius: '10px' }} />
                    <input id='amenitiesThird' name='snacks' className={styles.checkInput} value='snacks' type='checkbox' onChange={handleCheckboxChange} checked={selectedCheckboxes.includes('snacks')} />
                    <span className={styles.checkSpan}>munchies</span>
                </label>
                <label className={styles.amenitiesItems}>
                    <Image src='/milkCoffeeHostel.gif' alt='Giv picture of Milk,Cofee,Tea' fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={true} style={{ borderRadius: '10px' }} />
                    <input id='amenitiesFour' name='milk_coffee' className={styles.checkInput} value='milk_coffee' type='checkbox' onChange={handleCheckboxChange} checked={selectedCheckboxes.includes('milk_coffee')} />
                    <span className={styles.checkSpan}>milk/tea/coffee</span>
                </label>
            </div>
        </>
    )
}

export default QuestionThree
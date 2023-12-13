import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useStyles } from './StylesContext'
import Image from 'next/image';
import useStorage from '@/app/libs/useStorage';

const QuestionTwo: React.FC<{}> = () => {
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
        setItem('amenity_array', selectedCheckboxes, 'session')
        setItem('amenity_array', selectedCheckboxes, 'local')

    }, [selectedCheckboxes, setItem])

    return (
        <>
            <p className={styles.question}>What amenities do you prefer in <br />your hostel?</p>
            <div className={styles.amenitiesList}>
                <label className={styles.amenitiesItems}>
                    <Image src='/acHostel.gif' alt='Giv picture of AC' fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={true} style={{ borderRadius: '10px' }} />
                    <input id='amenitiesFirst' name='ac' className={styles.checkInput} value='ac' type='checkbox' onChange={handleCheckboxChange} checked={selectedCheckboxes.includes('ac')} />
                    <span className={styles.checkSpan}>ac</span>
                </label>
                <label className={styles.amenitiesItems}>
                    <Image src='/inHouse.gif' alt='Giv picture of AC' fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={true} style={{ borderRadius: '10px' }} />
                    <input id='amenitiesSecond' name='food' className={styles.checkInput} value='food' type='checkbox' onChange={handleCheckboxChange} checked={selectedCheckboxes.includes('food')} />
                    <span className={styles.checkSpan}>In-House Mess</span>
                </label>
                <label className={styles.amenitiesItems}>
                    <Image src='/cleanHostel.gif' alt='Giv picture of AC' fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={true} style={{ borderRadius: '10px' }} />
                    <input id='amenitiesThird' name='cleaning' className={styles.checkInput} value='cleaning' type='checkbox' onChange={handleCheckboxChange} checked={selectedCheckboxes.includes('cleaning')} />
                    <span className={styles.checkSpan}>Room Cleaning</span>
                </label>
                <label className={styles.amenitiesItems}>
                    <Image src='/laundryHostel.gif' alt='Giv picture of AC' fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={true} style={{ borderRadius: '10px' }} />
                    <input id='amenitiesFour' name='laundry' className={styles.checkInput} value='laundry' type='checkbox' onChange={handleCheckboxChange} checked={selectedCheckboxes.includes('laundry')} />
                    <span className={styles.checkSpan}>laundry facility</span>
                </label>
            </div>
        </>
    )
}

export default QuestionTwo
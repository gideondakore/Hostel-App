import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useStyles } from './StylesContext'
import Image from 'next/image';
import useStorage from '@/app/libs/useStorage';

const QuestionFive: React.FC<{}> = () => {
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
        setItem('addFeatures_array', selectedCheckboxes, 'session');
    }, [selectedCheckboxes, setItem])

    return (
        <>
            <p className={styles.question}>Would you like any of the following  <br />additional features in your hostel?</p>
            <div className={styles.amenitiesList}>
                <label className={styles.amenitiesItems}>
                    <Image src='/flexHostel.gif' alt='Giv picture of man' fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={true} style={{ borderRadius: '10px' }} />
                    <input id='amenitiesFirst' name='flexible_timing' className={styles.checkInput} value='flexible_timing' type='checkbox' onChange={handleCheckboxChange} checked={selectedCheckboxes.includes('flexible_timing')} />
                    <span className={styles.checkSpan}>flexibility in timing</span>
                </label>
                <label className={styles.amenitiesItems}>
                    <Image src='/nonvegHostel.gif' alt='Giv picture of Fridge' fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={true} style={{ borderRadius: '10px' }} />
                    <input id='amenitiesSecond' name='non_veg' className={styles.checkInput} value='non_veg' type='checkbox' onChange={handleCheckboxChange} checked={selectedCheckboxes.includes('non_veg')} />
                    <span className={styles.checkSpan}>non-veg food</span>
                </label>
                <label className={styles.amenitiesItems}>
                    <Image src='/parkingHostel.gif' alt='Giv picture of Snacks' fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={true} style={{ borderRadius: '10px' }} />
                    <input id='amenitiesThird' name='parking' className={styles.checkInput} value='parking' type='checkbox' onChange={handleCheckboxChange} checked={selectedCheckboxes.includes('parking')} />
                    <span className={styles.checkSpan}>on-site parking</span>
                </label>
                <label className={styles.amenitiesItems}>
                    <Image src='/friendHostel.gif' alt='Giv picture of Milk,Cofee,Tea' fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={true} style={{ borderRadius: '10px' }} />
                    <input id='amenitiesFour' name='having_friends' className={styles.checkInput} value='having_friends' type='checkbox' onChange={handleCheckboxChange} checked={selectedCheckboxes.includes('having_friends')} />
                    <span className={styles.checkSpan}>visitor-cfriendly policy</span>
                </label>
            </div>
        </>
    )
}

export default QuestionFive
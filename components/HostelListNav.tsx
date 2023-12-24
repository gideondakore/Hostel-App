import React from 'react'
import Image from "next/image";


const HostelListNav = () => {
    return (
        <div style={{ padding: '2rem 4.5rem', border: '5px solid black', width: 'fit-content' }}>
            <Image src="/hostelIcon.png" alt="nav logo" priority={true} width={70} height={50} />
        </div>
    )
}

export default HostelListNav
'use client'
import HostelListNav from "@/components/HostelListNav";
import { Suspense, useState } from "react";
import HostelList from "@/components/HostelList";
import Loading from "../loading";


const Hostel = () => {
    const [viewMoreClick, setViewMoreClick] = useState<boolean>(false);

    const handleViewMore = () => {
        setViewMoreClick(true);
    }

    return (
        <div style={{ padding: '30px 0px' }}>
            <HostelListNav />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <p style={{ fontSize: '30px', color: 'black' }}>These Hostels match your <b>VIBES</b></p>
                {!viewMoreClick &&
                    <button style={{ height: '50%', fontSize: '20px', fontWeight: 'bold' }} onClick={handleViewMore}>
                        View More
                    </button>
                }
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', width: '90%', flexWrap: "wrap" }}>
                <Suspense fallback={<Loading />}>
                    <HostelList viewMoreClick={viewMoreClick} />
                </Suspense>
            </div>
        </div>
    );
}

export default Hostel;

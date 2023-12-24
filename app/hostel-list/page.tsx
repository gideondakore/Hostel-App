import HostelListNav from "@/components/HostelListNav";

const Hostel = () => {
    return (<>
        <HostelListNav />
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <p style={{ fontSize: '30px', color: 'black' }}>These Hostel match your <b>VIBES</b></p>
            <button style={{ height: '50%', fontSize: '20px', fontWeight: 'bold' }}>View More</button>
        </div>
    </>)
}

export default Hostel;
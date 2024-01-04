'use client';
import React from 'react'
import Image from "next/image";
import Link from "next/link";
import getHostelLists from '@/app/libs/getHostelLists';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';



const HostelList = ({ viewMoreClick }: { viewMoreClick: boolean }) => {
    const router = useRouter();
    const [hostelLists, setHostel] = useState<Array<{ _id: string, title: string, description: string, gender: string, imgSrc: string }>>();

    useEffect(() => {
        const fetch = async () => {
            try {
                const { hostelLists } = await getHostelLists();
                if (viewMoreClick) {
                    setHostel(hostelLists);
                } else {
                    setHostel(hostelLists.slice(0, 4));
                }
            } catch (error: any) {
                throw new Error("Error fetching data:", error)
            }
        };

        fetch();
        router.refresh();

    }, [viewMoreClick, router]);


    return (
        <>
            {hostelLists ? (
                hostelLists.map((hostel: { _id: string, title: string, description: string, gender: string, imgSrc: string }) => (
                    <div style={{ backgroundColor: '#dce8e0', padding: '15px', borderRadius: '10px', display: 'flex', flexDirection: 'column', width: '30%', height: '360px', gap: '5px' }} key={hostel._id}>
                        <Link href={`/hostel-details/${hostel._id}`} style={{ display: 'block', height: '180px', width: '100%' }}>
                            <Image src={hostel.imgSrc}
                                alt='hostel main image'
                                width={300}
                                height={220}
                                priority={true}
                                style={{ borderRadius: '10px', width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </Link>
                        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', justifyContent: 'space-between', alignItems: 'center', height: '72px', padding: '0px' }}>
                            <Link href={`/hostel-details/${hostel._id}`} style={{ width: 'auto', textDecoration: 'none' }}>
                                <h2 style={{ color: 'black' }}>{hostel.title}</h2>
                            </Link>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Image src={`${hostel.gender}.svg`} alt={`${hostel.gender} svg`} width={40} height={30} priority={true} />
                                <p>{hostel.gender}</p>
                            </div>
                        </div>
                        <p style={{ height: '36px', width: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', margin: '0px' }}>{hostel.description}</p>
                        <Link href={`/hostel-details/${hostel._id}`} style={{ height: '72px' }}>
                            <button style={{ width: 'fit-content', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer' }}>View More</button>
                        </Link>
                    </div>
                ))
            ) : (
                //<p>Loading Hostels</p>
                <Loading />
            )}
        </>
    )
}

export default HostelList
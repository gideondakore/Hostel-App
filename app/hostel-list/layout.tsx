import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Hostel-List',
    description: 'Hostel list',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className={inter.className} style={{ padding: '0px 4rem' }}>
            {children}
        </div>
    )
}

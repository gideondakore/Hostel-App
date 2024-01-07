import React from 'react'
import LoginForm from '@/components/LoginForm'

const Login = () => {
    return (
        <main style={{ height: '100vh', width: '100vw', backgroundColor: '#a7c9cf' }}>
            <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '40%', height: 'auto' }}>
                    <LoginForm />
                </div>
            </section>
        </main>
    )
}

export default Login
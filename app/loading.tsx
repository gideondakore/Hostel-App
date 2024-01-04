import React from 'react'
import { FadeLoader } from 'react-spinners'

const Loading = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
            <h1>Loading...</h1>
            <FadeLoader color="#36d7b7" />
        </div>
    )
}

export default Loading
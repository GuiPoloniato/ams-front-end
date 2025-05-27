import React from 'react';
import SideBar from '../../components/sideBar/sideBar';
import './style.css'

function Home() {
    return(
        <div className="body-home">
            <SideBar />
            <div className="content-home">
                <h2 className='h2-route'>Home</h2>
            </div>
        </div>
    )
}
export default Home;
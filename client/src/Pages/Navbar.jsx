import React from 'react'

function Navbar() {
    const navItems = ['Home', 'For Rent', 'For Sell', 'Forum', 'About', 'login']
    return (
        <div className='nav flex bg-[#FFFFFF29] w-[550px] h-[52px] rounded-3xl font-jost mt-10 justify-center gap-8 items-center text-[16px]'>
            {navItems.map((item) => {
                return (<div>{item}</div>)
            })}
        </div>
    )
}

export default Navbar
import React, { useState, useEffect } from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { MdPassword } from 'react-icons/md'
function page() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isUserIconVisible, setIsUserIconVisible] = useState(true);
    const [isPwdIconVisible, setIsPwdIconVisible] = useState(true);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setIsUserIconVisible(e.target.value === '');
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setIsPwdIconVisible(e.target.value === '')
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Email:', email);
        console.log('Password:', password);

        // Resetting the form fields
        setEmail('');
        setPassword('');
    };
    return (
        <>
            <main className='h-screen bg-sign'>
                <section className='bg-gradient h-screen w-screen flex flex-col justify-center align-center'>
                    <h1 className='headline center text-[46px] font-[700] not-italic mt-10'>Parakh: Sign In</h1>
                    <div className='flex flex-col self-center mt-5' suppressHydrationWarning>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Email"
                                className='w-80 placeholder:pl-5 h-14 bg-transparent border border-gray-500 focus:border-blue-500 outline-none px-4 py-2 rounded-2xl text-white p-5'
                                required
                            />
                            {isUserIconVisible && <span><BiUserCircle className='relative bottom-10 left-2 text-2xl align-center' /></span>}
                            <input
                                type="password"
                                placeholder="Password"
                                className='bg-transparent placeholder:pl-5 w-80 h-14 border border-gray-500 focus:border-blue-500 outline-none px-4 py-2 rounded-2xl text-white '
                                value={password}
                                onChange={handlePasswordChange}
                                required

                            />
                            {isPwdIconVisible && <MdPassword className='relative bottom-10 left-2 text-2xl align-center' />}
                            <button type="submit" className='text-white rounded-2xl w-80 h-14 bg-[#205BF1] button-signin'>Sign In</button>
                        </form>

                    </div>
                    <p className='mt-5 text-center text-white opacity-50'>Don't have an account? Sign up</p>
                </section>
            </main >
        </>
    )
}

export default page
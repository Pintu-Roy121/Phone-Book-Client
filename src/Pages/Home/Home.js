import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex bg-slate-300 flex-col p-8">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-200 text-base-content">
                        <li><Link to='/addcontact' className='text-2xl font-bold border border-info rounded-none'>
                            <FaPlus className='text-2xl text-green-700' />
                            Add New Contact
                        </Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;
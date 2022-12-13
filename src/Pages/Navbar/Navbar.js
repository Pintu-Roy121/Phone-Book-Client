import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaUser } from "react-icons/fa";
import { AuthContext } from '../../context/AuthProvider';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { user, Logout } = useContext(AuthContext);
    const navigate = useNavigate()

    // const handleSearch = (event) => {
    //     event.preventDefault();
    //     const search = event.target.value;
    //     console.log(search);
    // }

    const handleLogout = () => {
        Logout()
            .then(() => {
                Swal.fire(
                    'Successful',
                    'Logout',
                    'success'
                )
                navigate('/login');
                localStorage.removeItem('accessToken')
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='flex justify-between items-center px-5'>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <div className='flex gap-3 items-center'>
                        <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
                            <FaBars className='text-2xl' />
                        </label>
                        <Link to='/' className="btn flex gap-2 btn-ghost normal-case text-2xl">
                            <FaUser className='text-2xl text-blue-700' />
                            All Contacts</Link>
                    </div>

                    {/* <div className="form-control">
                        <input onChange={handleSearch} type="text" placeholder="Search" className="input w-full input-bordered" />
                    </div> */}
                </div>
            </div>
            <div>
                {
                    user?.uid ?
                        <div className='flex gap-2 items-center font-semibold'>
                            <Link>{user?.email}</Link>
                            <Link
                                onClick={handleLogout}
                                to='/login'><button className='btn btn-sm btn-error'>Logout</button></Link>
                        </div>
                        :
                        <Link to='/login'><button className='btn btn-sm btn-success'>Login</button></Link>
                }
            </div>
        </div>
    );
};

export default Navbar;
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaBirthdayCake, FaBriefcase, FaEnvelope, FaLandmark, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const ContactDetails = () => {
    const params = useParams();
    // const contact = useLoaderData()
    const [contact, setContact] = useState({})

    useEffect(() => {
        fetch(`https://address-book-server-pintu-roy121.vercel.app/contact/${params.id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setContact(data))
    }, [params.id])

    const { name, email, firstname, phonenumber, jobtitle, companyname, address, birthday, _id } = contact;
    const letter = name?.charAt(0) || firstname?.charAt(0);


    return (
        <div>
            <div className='flex justify-between items-baseline'>
                <div className='flex gap-2 items-end'>
                    <div className='bg-blue-900 rounded-full w-44 h-44 flex justify-center'>
                        <h1 className='text-9xl flex justify-center items-center font-semibold text-white'>{letter}</h1>
                    </div>
                    <p className='text-5xl font-semibold mb-5'>{name ? name : firstname}</p>
                </div>
                <Link to={`/contactEdit/${_id}`}><button className='btn btn-sm bg-blue-900 mr-10'>Edit</button></Link>
            </div>
            <hr className='border-gray-600 mt-5' />
            <div className='flex flex-col gap-5 border mt-5 w-1/2 rounded-lg p-5 border-gray-500'>
                <div className='flex items-center gap-3'>
                    <FaEnvelope className='text-xl' />
                    <p className='text-lg text-blue-600 font-semibold'>{email ? email : 'Add Email'}</p>
                </div>
                <div className='flex items-center gap-3'>
                    <FaPhoneAlt className='text-xl text-green-500' />
                    <p className='text-lg text-blue-600 font-semibold'>{phonenumber}</p>
                </div>
                <div className='flex items-center gap-3'>
                    <FaBirthdayCake className='text-xl text-red-400' />
                    <p className='text-lg text-blue-600 font-semibold'>{birthday ? birthday : 'DD/MM/YYYY'}</p>
                </div>
                <div className='flex gap-8'>
                    <div className='flex items-center gap-3'>
                        <FaLandmark className='text-lg' />
                        <p className='text-lg text-blue-600 font-semibold'>{companyname ? companyname : <span className='font-bold text-gray-600'>Add Company</span>}</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <FaBriefcase className='text-lg text-amber-800' />
                        <p className='text-lg text-blue-600 font-semibold'>{jobtitle ? jobtitle : <span className='font-bold text-gray-600'>Add JOb</span>}</p>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <FaMapMarkerAlt className='text-xl text-red-700' />
                    <p className='text-lg text-blue-600 font-semibold'>{address ? address : 'Add Address'}</p>
                </div>
            </div>
        </div>
    );
};

export default ContactDetails;
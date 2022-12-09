import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { FaBirthdayCake, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const ContactDetails = () => {
    const contact = useLoaderData()

    console.log(contact);
    const { name, email, firstname, phonenumber, birthday, _id } = contact;
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
            <div className='border mt-5 w-1/2 rounded-lg p-5 border-gray-500'>
                <div className='flex items-center gap-3'>
                    <FaEnvelope className='text-lg' />
                    <p className='text-lg text-blue-600 font-semibold'>{email ? email : 'Add Email'}</p>
                </div>
                <div className='flex items-center gap-3 my-4'>
                    <FaPhoneAlt className='text-lg text-green-500' />
                    <p className='text-lg text-blue-600 font-semibold'>{phonenumber}</p>
                </div>
                <div className='flex items-center gap-3'>
                    <FaBirthdayCake className='text-lg' />
                    <p className='text-lg text-blue-600 font-semibold'>{birthday ? birthday : 'Add Birthday'}</p>
                </div>
            </div>
        </div>
    );
};

export default ContactDetails;
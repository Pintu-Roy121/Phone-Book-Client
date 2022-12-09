import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const ContactEdit = () => {
    const [contact, setContact] = useState({});
    const [refresh, setRefresh] = useState(true)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const data = useParams();
    const navigate = useNavigate()

    const { id } = data;

    useEffect(() => {
        fetch(`https://address-book-server-pintu-roy121.vercel.app/contact/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setContact(data))
    }, [id]);

    const { address, name, useremail, birthday, companyname, email, firstname, jobtitle, lastname, phonenumber, _id } = contact;

    const onSubmit = data => {
        const updateContact = {
            address: data.address ? data.address : address,
            birthday: data.birthday ? data.birthday : birthday,
            companyname: data.companyname ? data.companyname : companyname,
            email: data.email ? data.email : email,
            name: data.name ? data.name : name,
            jobtitle: data.jobtitle ? data.jobtitle : jobtitle,
            phonenumber: data.phonenumber ? data.phonenumber : phonenumber,
            firstname,
            lastname,
            useremail
        }

        fetch(`https://address-book-server-pintu-roy121.vercel.app/singlecontact/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`

            },
            body: JSON.stringify(updateContact)
        })
            .then(res => res.json())
            .then(result => {
                if (result.modifiedCount) {
                    Swal.fire(
                        'Successful',
                        'Contact Updated',
                        'success'
                    )
                    setRefresh(!refresh);
                    navigate('/')
                }
            })
    };


    return (
        <div className='px-10'>
            <h1 className='text-3xl font-bold text-green-600 text-center my-8 underline'>Edit Your contact</h1>
            <h1 className='text-2xl font-bold text-center mt-8 '>Name: {name ? name : firstname}</h1>
            <h1 className='text-2xl font-bold text-center'> Number: {phonenumber}</h1>
            <hr className='border border-gray-800 mt-3' />
            <form onSubmit={handleSubmit(onSubmit)} className='font-semibold'>
                {/* Name details............................... */}
                {/* <div className='flex items-center gap-4'> */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-base font-semibold">Name:</span>
                    </label>
                    <input type="text"
                        defaultValue={name ? name : firstname}
                        {...register("name", {
                            // required: true,

                        })}
                        placeholder='First Name'
                        className="input input-bordered input-info w-full" />
                </div>
                {/* <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-base font-semibold">Last Name:</span>
                        </label>
                        <input type="text"
                            defaultValue={lastname}
                            {...register("lastname", {
                                // required: true,
                            })}
                            placeholder='Last Name'
                            className="input input-bordered input-info w-full" />
                    </div>
                </div> */}
                {errors.lastname && <p className='text-red-600 font-semibold mt-3'>{errors.lastname?.message}</p>}
                {errors.firstname && <p className='text-red-600 font-semibold mt-3'>{errors.firstname?.message}</p>}

                {/* Constact Number................................ */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-base font-semibold">Cotact Number:</span>
                    </label>
                    <input type="number"
                        defaultValue={phonenumber}
                        {...register("phonenumber", {
                            // required: true,
                            // required: 'phonenumber is Required'
                        })}
                        placeholder='+880'
                        className="input input-bordered input-info w-full" />
                    {/* {errors.phonenumber && <p className='text-red-600'>{errors.phonenumber?.message}</p>} */}
                </div>
                {/* Comany details..................... */}

                <div className='flex items-center gap-4'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-base font-semibold">Company Name:</span>
                        </label>
                        <input type="text"
                            defaultValue={companyname}
                            {...register("companyname", {
                                // required: true,
                            })}
                            placeholder='Company Name'
                            className="input input-bordered input-info w-full" />
                        {/* {errors.companyname && <p className='text-red-600'>{errors.companyname?.message}</p>} */}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-base font-semibold">Job Title:</span>
                        </label>
                        <input type="text"
                            defaultValue={jobtitle}
                            {...register("jobtitle", {
                                // required: true,

                            })}
                            placeholder='Job Title'
                            className="input input-bordered input-info w-full" />
                        {/* {errors.jobtitle && <p className='text-red-600'>{errors.jobtitle?.message}</p>} */}
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-base font-semibold">Address:</span>
                        </label>
                        <input type="text"
                            defaultValue={address}
                            {...register("address", {
                                // required: true,
                            })}
                            placeholder='Address'
                            className="input input-bordered input-info w-full" />
                        {/* {errors.phonenumber && <p className='text-red-600'>{errors.phonenumber?.message}</p>} */}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-base font-semibold">Email:</span>
                        </label>
                        <input type="email"
                            defaultValue={email}
                            {...register("email", {

                                // required: true,
                            })}
                            placeholder='Email'
                            className="input input-bordered input-info w-full" />
                        {/* {errors.jobtitle && <p className='text-red-600'>{errors.jobtitle?.message}</p>} */}
                    </div>
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-base font-semibold">Birthday:</span>
                    </label>
                    <input type="text"
                        defaultValue={birthday}
                        {...register("birthday", {
                            // required: true,
                        })}
                        placeholder='DD/MM/YYYY'
                        className="input input-bordered input-info w-full" />
                    {/* {errors.phonenumber && <p className='text-red-600'>{errors.phonenumber?.message}</p>} */}
                </div>

                <input type="submit" value='Save' className='btn btn-info mt-5' />
            </form>
        </div>
    );
};

export default ContactEdit;
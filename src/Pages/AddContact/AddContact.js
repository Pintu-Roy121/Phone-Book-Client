import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthProvider';

const AddContact = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        if (!user) {
            Swal.fire(
                'Opps......',
                'Please login First',
                'error'
            )
            return navigate('/login');

        }
        const contact = {
            address: data.address,
            birthday: data.birthday,
            companyname: data.companyname,
            email: data.email,
            name: data.firstname + ' ' + data.lastname,
            jobtitle: data.jobtitle,
            firstname: data.firstname,
            lastname: data.lastname,
            phonenumber: data.phonenumber,
            useremail: user?.email
        }
        fetch('https://address-book-server-pintu-roy121.vercel.app/contacts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(contact)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    Swal.fire(
                        'Successful',
                        'Contact Number added',
                        'success'
                    )
                    reset();
                    navigate('/')
                }
            })

    };

    return (
        <div className='px-10'>
            <h1 className='text-3xl font-bold text-green-600 text-center my-8 underline'>Add a New contact</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='font-semibold'>
                {/* Name details............................... */}
                <div className='flex items-center gap-4'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-base font-semibold">First Name:</span>
                        </label>
                        <input type="text"
                            {...register("firstname", {
                                required: 'firstname is Required'
                            })}
                            placeholder='First Name'
                            className="input input-bordered input-info w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-base font-semibold">Last Name:</span>
                        </label>
                        <input type="text"
                            {...register("lastname", {

                            })}
                            placeholder='Last Name'
                            className="input input-bordered input-info w-full" />
                    </div>
                </div>
                {errors.lastname && <p className='text-red-600 font-semibold mt-3'>{errors.lastname?.message}</p>}
                {errors.firstname && <p className='text-red-600 font-semibold mt-3'>{errors.firstname?.message}</p>}

                {/* Constact Number................................ */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-base font-semibold">Cotact Number:</span>
                    </label>
                    <input type="number"
                        {...register("phonenumber", {
                            required: 'phonenumber is Required'
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
                            {...register("companyname", {
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
                            {...register("jobtitle", {

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
                            {...register("address", {
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
                            {...register("email", {

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
                        {...register("birthday", {
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

export default AddContact;
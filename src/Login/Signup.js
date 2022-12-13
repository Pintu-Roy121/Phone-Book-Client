import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthProvider';
import useToken from '../hooks/useToken';

const Signup = () => {
    const { createUser } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();


    if (token) {
        navigate('/')
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        const user = {
            name,
            email
        }

        createUser(email, password)
            .then(result => {
                saveUser(user);
            })
            .catch(error => {
                setError(error.message);
            })

    }

    const saveUser = (user) => {
        fetch('https://address-book-server-pintu-roy121.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    Swal.fire(
                        'Successful',
                        'user saved',
                        'success'
                    )

                    // toast.success('User Saved successful')
                }

                setCreatedUserEmail(user?.email)
                // setCreatedUserEmail(user?.email)
            })
    }



    return (
        <div className='bg-slate-200 w-full md:w-3/4 mx-auto p-16 md:p-24 rounded-xl'>
            <h1 className='text-4xl text-center font-bold'>Sign Up</h1>
            <form onSubmit={handleSubmit} className='w-full md:w-3/4 mx-auto'>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-base font-semibold">Name:</span>
                    </label>
                    <input type="name" name='name' className="input input-bordered input-info w-full" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-base font-semibold">Email:</span>
                    </label>
                    <input type="email" name='email' className="input input-bordered input-info w-full" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-base font-semibold">Password:</span>
                    </label>
                    <input type="password" name='password' className="input input-bordered input-info w-full" required />
                </div>

                {
                    error ?
                        <p className='text-lg text-red-600 font-semibold'>{error}</p>
                        :
                        ""
                }
                <input type="submit" value='Sign up' className='btn btn-info w-full my-3' />
            </form>
            <div className='w-3/4 mx-auto'>
                <p>Already Have an Account? <Link to='/login' className='text-info hover:text-sky-600 duration-200 underline'>Log in</Link> </p>
            </div>

        </div >
    );
};

export default Signup;
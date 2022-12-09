import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthProvider';
import useToken from '../hooks/useToken';

const Login = () => {
    const { Login } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState('');
    const [token] = useToken(loginEmail);

    if (token) {
        navigate('/')
    }
    const handleLogin = (data) => {

        Login(data.email, data.password)
            .then(result => {
                Swal.fire(
                    'Successful',
                    'Login Successful',
                    'success'
                )
                setLoginEmail(result.user?.email);
                // navigate('/')
            })
            .catch(error => {
                console(error.message);
            })
    }

    // console.log(loginEmail);
    return (
        <div className='bg-slate-200 w-full md:w-3/4 mx-auto p-16 md:p-24 rounded-xl'>
            <h1 className='text-4xl text-center font-bold'>Login</h1>
            <form className='w-full md:w-3/4 mx-auto' onSubmit={handleSubmit(handleLogin)}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-base font-semibold">Email:</span>
                    </label>
                    <input type="text"
                        {...register("email", {
                            required: 'Email is Required'
                        })}
                        className="input input-bordered input-info w-full" />
                    {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-base font-semibold">Password:</span>
                    </label>
                    <input type="password"
                        {...register("password", {
                            required: 'Password is Required'
                        })}
                        className="input input-bordered input-info w-full" />
                    {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                </div>

                {/* {
                    error ?
                        <p className='text-lg text-red-600 font-semibold'>{error}</p>
                        :
                        ""
                } */}
                <input type="submit" value='Login' className='btn btn-info w-full my-5' />
            </form>
            <p className='text-center'>Do not Have an Account? <Link to='/signup' className='text-info hover:text-sky-600 duration-200 underline'>Sign Up</Link></p>

        </div >
    );
};

export default Login;
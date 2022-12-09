import React, { useContext, useEffect, useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthProvider';
// import useToken from '../../hooks/useToken';

const AllContact = () => {
    const { user, loading } = useContext(AuthContext);
    const [allContacts, setAllContacts] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const navigate = useNavigate();

    // if(!user){
    //     navigate
    // }

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/allcontacts?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setAllContacts(data);
                })
        } else {
            navigate('/')
        }
    }, [user?.email, refresh, navigate]);

    if (loading) {
        return <p>Loading.........</p>
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/contacts/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    Swal.fire(
                        'Deleted',
                        'Contact Delete Successful',
                        'success'
                    )
                    setRefresh(!refresh);
                }
            })
    }


    return (
        <div className="w-full">
            {
                allContacts.length ?
                    <h1 className='text-3xl font-bold text-green-600 text-center mb-4 underline'>All contact: {allContacts.length}</h1>
                    :
                    <h1 className='text-3xl font-bold text-green-600 text-center mb-4 underline'>No Contact Number</h1>
            }
            <table className="table w-full">

                <thead>
                    <tr>
                        <th className='text-lg font-bold'>SL</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>JobTitle & Company</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allContacts.map((contact, i) =>
                            <tr key={contact._id}>
                                <td className='text-lg font-bold'>{i + 1}</td>
                                <td className='font-bold'>{contact?.name ? contact.name : contact.firstname}</td>
                                <td>{contact.email}</td>
                                <td>{contact.phonenumber}</td>
                                <td>{contact.companyname}</td>
                                <td>
                                    <div className="dropdown dropdown-end">
                                        {/* <label tabIndex={0} className="btn m-1">Click</label> */}
                                        <FaEllipsisV tabIndex={0} />
                                        <ul tabIndex={0} className="dropdown-content text-center menu p-2 shadow bg-base-100 rounded-md px-2">
                                            <li><Link to={`/contactDetails/${contact._id}`}>Details</Link></li>
                                            <li><Link to={`/contactEdit/${contact._id}`}>Edit</Link></li>
                                            <li onClick={() => handleDelete(contact._id)}><Link>Delete</Link></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllContact;
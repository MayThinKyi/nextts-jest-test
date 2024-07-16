'use client';
import React, { ChangeEvent, useState } from 'react'
import { User } from './UserLists';

interface Props {
    onUserAdd: (data: User) => void;
}
const UserForm = ({ onUserAdd }: Props) => {
    const [fields, setFields] = useState({
        name: '', email: ''
    })
    const submitHandler = () => {
        onUserAdd(fields);
        setFields({ email: '', name: '' })
    }
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFields({ ...fields, [e.target.id]: e.target.value })
    }
    return (
        <div className='border-t border-b p-10'>
            <h1 className='text-2xl font-bold mb-3'>Add A User</h1>
            <div className="mb-3">
                <label htmlFor="name" className="me-3">Name</label>
                <input type="text" id='name' value={fields.name} onChange={changeHandler} />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="me-3">Email</label>
                <input type="text" id='email' value={fields.email} onChange={changeHandler} />
            </div>
            <button onClick={submitHandler} className="my-4 py-3 px-10 rounded-lg text-center border-2 border-slate-400">Submit</button>
        </div>
    )
}

export default UserForm

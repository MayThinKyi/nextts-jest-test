import React from 'react'

export interface User {
    name: string;
    email: string;
}

interface Props {
    users: User[]
}

const UserLists = ({ users }: Props) => {
    return (
        <div className='border-t border-b p-10'>
            <h1 className='text-2xl font-bold mb-3'>List of Users</h1>
            {users.length === 0 && <p className='text-xl font-bold text-center'>No Users...</p>}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>

                    {users.map((user, index) => {
                        return <tr key={index}>
                            <td >{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default UserLists

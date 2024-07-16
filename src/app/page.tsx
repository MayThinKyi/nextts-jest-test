'use client';
import UserForm from '@/components/UserForm'
import UserLists, { User } from '@/components/UserLists'
import React, { useState } from 'react'

const HomePage = () => {
  const [users, setUsers] = useState<User[]>([])
  const onUserAdd = (data: User) => {
    setUsers([...users, data])
  }
  return (
    <div>
      <UserForm onUserAdd={onUserAdd} />
      <UserLists users={users} />
    </div>
  )
}

export default HomePage

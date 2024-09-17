// app/signup/page.tsx
'use client'

import { useState } from 'react'
import { authService } from '@/services/auth.service'
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await authService.signUp({ email, password, name })

      if (response.status === 200) {
        // Nếu đăng ký thành công, chuyển hướng sang trang đăng nhập hoặc dashboard
        router.push('/sign-in')
      } else {
        setError('Failed to sign up')
      }
    } catch (err) {
      setError('Something went wrong')
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

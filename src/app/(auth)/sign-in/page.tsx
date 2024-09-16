'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Gọi hàm signIn của NextAuth
    const result = await signIn('credentials', {
      redirect: false, // Không chuyển hướng tự động
      email,
      password
    })

    // console.log(result)

    setLoading(false)

    // Xử lý lỗi đăng nhập nếu có
    if (result?.error) {
      setError('Invalid credentials')
      console.log('Đăng nhập thất bại', result.error)
    } else {
      console.log('Đăng nhập thành công')
      router.push('/')
    }
  }

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type='submit' disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}

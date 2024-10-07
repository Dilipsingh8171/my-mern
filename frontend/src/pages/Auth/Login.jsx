import React, { useState } from 'react'
import Layout from "../../components/Layout"
// import { toast } from 'react-toastify'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';


const Login = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault()


        await axios.post('http://localhost:8082/api/v1/auth/login', {
            email, password,
        }).then((res) => {
            if (res) {
                alert(res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(location.state || "/")
            }
        }).catch((error) => {
            console.log(error)
            toast.error('Something went wrong')
        })

    }
    return (
        <>
            <Layout>

                <div className='login'>
                    <form onSubmit={handleSubmit} className='mt-4'>
                    <h1>LOGIN FORM</h1>

                        <div className="mb-4">
                            <input type="email" className="form-control p-2" placeholder='Enter your Email'
                                value={email} onChange={(e) => setemail(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control p-2" placeholder='Enter your password'
                                value={password} onChange={(e) => setpassword(e.target.value)} required />
                        </div>
                        <div className='mb-3 text-center'>
                            <button type="button" className="btn btn-primary" onClick={() => { navigate('/forgot-password') }}>Forgot Password</button>

                        </div>

                        <div className='text-center'>
                            <button type="submit" className="btn btn-primary">Login</button>

                        </div>
                    </form>

                </div>

            </Layout>
        </>
    )
}

export default Login

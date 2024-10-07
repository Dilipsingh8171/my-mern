import React, { useState } from 'react'
import Layout from './../../components/Layout';
// import { toast } from 'react-toastify'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [answer, setAnswer] = useState()
    const navigate = useNavigate()

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault()


        await axios.post('http://localhost:8082/api/v1/auth/forgot-password', {
            email, newPassword, answer,
        }).then((res) => {
            if (res) {
                alert(res.data.message)

                navigate("/login")
            }
        }).catch((error) => {
            console.log(error)
            toast.error('Something went wrong')
        })

    }
    return (
        <Layout>
            <div className='login'>
                <h1>Reset passwrod</h1>
                <form onSubmit={handleSubmit} className='mt-4'>


                    <div className="mb-4">
                        <input type="email" className="form-control p-2" placeholder='Enter your Email'
                            value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <input type="text" className="form-control p-2" placeholder='Enter your best friend name'
                            value={answer} onChange={(e) => setAnswer(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control p-2" placeholder='Enter your newPassword'
                            value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    </div>
                    <div className='mb-3 text-center'>
                        <button type="button" className="btn btn-primary" onClick={() => {
                            navigate('/login')
                        }}>change Password</button>

                    </div>

                    <div className='text-center'>
                        <button type="submit" className="btn btn-primary">Login</button>

                    </div>
                </form>

            </div>
        </Layout>
    )
}

export default ForgotPassword

import React, { useState } from 'react'
import Layout from "../../components/Layout"
// import { toast } from 'react-toastify'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Register = () => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [phone, setphone] = useState('')
    const [address, setaddress] = useState('')
    const [answer, setanswer] = useState('')

    const navigate = useNavigate()

    // const ursl = import.meta.env.VITE_API_LOCAL

    const handleSubmit = async (e) => {
        e.preventDefault()

        await axios.post('http://localhost:8082/api/v1/auth/register', {
            name, email, password, phone, address, answer
        }).then((res) => {
            if (!res.email) {
                alert(res.data.message)
                navigate('/login')
            }
        }).catch((error) => {
            console.log(error)
            navigate(0)
            toast.error('Something went wrong')
        })

    }
    return (
        <>
            <Layout>

                <div className='register'>
                    <h1>REGISTER FORM</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder='Enter your Name'
                                value={name} onChange={(e) => setname(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <input type="email" className="form-control" placeholder='Enter your Email'
                                value={email} onChange={(e) => setemail(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" placeholder='Enter your password'
                                value={password} onChange={(e) => setpassword(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder='Enter your phone'
                                value={phone} onChange={(e) => setphone(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder='Enter your address'
                                value={address} onChange={(e) => setaddress(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder=' your best friend name'
                                value={answer} onChange={(e) => setanswer(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>

                </div>

            </Layout>
        </>
    )
}

export default Register

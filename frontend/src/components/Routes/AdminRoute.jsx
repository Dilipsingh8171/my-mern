import { useEffect, useState } from "react";
import { useAuth } from '../../context/auth'
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../../context/Spinner";

export default function AdminRoute() {
    const [ok, setOk] = useState(false)
    const [auth, setAuth] = useAuth()

    useEffect(() => {

        const AuthCheck = async () => {
            const res = await axios.get('/api/v1/auth/admin-auth')
            //  {
            //     headers: {
            //         "Authorization": auth?.token
            //     }
            // })

            if (res.data.ok) {
                setOk(true)
            } else {
                setOk(false)
            }
        }

        if (auth?.token) AuthCheck();

    }, [auth?.token])

    return ok ? <Outlet /> : <Spinner path='/dashboard' />
}
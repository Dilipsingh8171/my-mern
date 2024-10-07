import React from 'react'
import { useAuth } from '../context/auth'
import Layout from '../components/Layout'


const Home = () => {
  const [auth, setAuth] = useAuth()
  return (
    <div>
      <Layout>
        <h1>Homepage</h1>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
      </Layout>
    </div>
  )
}

export default Home

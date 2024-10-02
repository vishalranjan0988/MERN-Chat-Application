import React from 'react'
import { useEffect } from 'react'
// import { GoogleLogin } from "react-google-login"
import { gapi } from "gapi-script"
// import { googleAuth } from '../apis/auth'
import { useState } from 'react'
import { loginUser } from '../apis/auth'
import { Link, useNavigate } from 'react-router-dom'
// import { BsEmojiLaughing, BsEmojiExpressionless } from "react-icons/bs"
import { toast } from 'react-toastify';
import { validUser } from '../apis/auth'
const defaultData = {
  email: "",
  password: ""
}
function Login() {
  const [formData, setFormData] = useState(defaultData)
  const [isLoading, setIsLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const pageRoute = useNavigate()
  // const googleSuccess = async (res) => {
  //   if (res?.profileObj) {
  //     console.log(res.profileObj)
  //     setIsLoading(true)
  //     const response = await googleAuth({ tokenId: res.tokenId })
  //     setIsLoading(false)

  //     console.log("response :" + res)
  //     if (response.data.token) {
  //       localStorage.setItem("userToken", response.data.token)
  //       pageRoute("/chats")

  //     }
  //   }
  // }
  // const googleFailure = (error) => {
  //   // toast.error("Something went Wrong.Try Again!")
  // }
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const formSubmit = async (e) => {
    e.preventDefault()
    if (formData.email.includes("@") && formData.password.length > 6) {
      setIsLoading(true)
      const { data } = await loginUser(formData)
      if (data?.token) {
        localStorage.setItem("userToken", data.token)
        toast.success("Succesfully Login!")
        setIsLoading(false)
        pageRoute("/chats")
      }
      else {
        setIsLoading(false)
        toast.error("Invalid Credentials!")
        setFormData({ ...formData, password: "" })
      }
    }
    else {
      setIsLoading(false)
      toast.warning("Provide valid Credentials!")
      setFormData(defaultData)

    }
  }
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
    const isValid = async () => {
      const data = await validUser()
      if (data?.user) {
        window.location.href = "/chats"
      }

    }
    isValid()
  }, [])
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={formSubmit}>
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input onChange={handleOnChange} name="email" type="text" placeholder='Email' value={formData.email} required id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input onChange={handleOnChange} type={showPass ? "text" : "password"} name="password" value={formData.password} required id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                      
                  </div>
                  
                  <button type="submit" className="w-full bg-blue-700 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <Link className='text-[rgba(0,195,154,1)] underline' to="/register">Sign up</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>

    </>
  )
}

export default Login
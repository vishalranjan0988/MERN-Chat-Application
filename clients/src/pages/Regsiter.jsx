import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin } from "react-google-login"
import { gapi } from "gapi-script"
import { useEffect } from 'react'
import { googleAuth, registerUser } from '../apis/auth'
import { useState } from 'react'
// import { BsEmojiLaughing, BsEmojiExpressionless } from "react-icons/bs"
import { toast } from 'react-toastify';
import { validUser } from '../apis/auth'
const defaultData = {
  firstname: "",
  lastname: "",
  email: "",
  password: ""
}
function Regsiter() {
  const [formData, setFormData] = useState(defaultData)
  const [isLoading, setIsLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const pageRoute = useNavigate()
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (formData.email.includes("@") && formData.password.length > 6) {
      const { data } = await registerUser(formData)
      if (data?.token) {
        localStorage.setItem("userToken", data.token)
        toast.success("Succesfully Registered😍")
        setIsLoading(false)
        pageRoute("/chats")

      }
      else {
        setIsLoading(false)
        toast.error("Invalid Credentials!")
      }
    }
    else {
      setIsLoading(false)
      toast.warning("Provide valid Credentials!")
      setFormData({ ...formData, password: "" })
    }

  }

  const googleSuccess = async (res) => {
    if (res?.profileObj) {
      setIsLoading(true)
      const response = await googleAuth({ tokenId: res.tokenId })
      setIsLoading(false)
      if (response.data.token) {
        localStorage.setItem("userToken", response.data.token)
        pageRoute("/chats")
      }
    }
  }
  const googleFailure = (error) => {
    toast.error("Something Went Wrong.Try Agian!")
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
    <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Register
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={handleOnSubmit}>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                      <div className="flex">
                      <input onChange={handleOnChange} type="text" name="firstname" placeholder='First Name' value={formData.firstname} required  id="email" class="bg-gray-50 border mr-2 w-1/2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      <input onChange={handleOnChange} type="text" name="lastname" placeholder='Last Name' value={formData.lastname} required id="email" class="bg-gray-50 border w-1/2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      </div>
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input onChange={handleOnChange} type="email" name="email" placeholder="Email" value={formData.email} required id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input onChange={handleOnChange} type={showPass ? "text" : "password"} name="password" value={formData.password} required id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  </div>
                  
                  
                  <button type="submit" class="w-full bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account?  <Link className='text-[rgba(0,195,154,1)] underline' to="/login">Sign in</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>

    </>
  )
}

export default Regsiter
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CancelIcon from '@mui/icons-material/Cancel'
import axios from "axios"
import { useRef, useState } from "react"
import "./login.css"
import Swal from 'sweetalert2' //Sweet alert


const Login = ({ setShowLogin, setCurrentUsername,myStorage }) =>{
  const [error, setError] = useState(false)
  const usernameRef = useRef()
  const passwordRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    }
    try {
        const res = await axios.post("http://localhost:8800/api/user/login", user)
        setCurrentUsername(res.data.username)
        myStorage.setItem('user', res.data.username)
        setShowLogin(false)
        const currentUsername = myStorage.getItem("user")
        
        //Sweet alert for success login
        Swal.fire({
          toast: true,
          text: `Hello ${currentUsername}!`,
          timer: 4000, 
          timerProgressBar: true,
          position: "top",
          showConfirmButton: false
      })
    } catch (err) {
      setError(true)
    }
  }

  return (
    <div className="loginContainer">
      <div className="logo">
        <LocationOnIcon className="logoIcon" />
        <span>Map-Explore</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input autoFocus placeholder="username" ref={usernameRef} />
        <input
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="loginBtn" type="submit">
          Login
        </button>
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <CancelIcon className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  )
}
export default Login
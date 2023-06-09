import { Link } from 'react-router-dom';
import Registeryuzu from '../../public/assets/register-yuzu.png';
import LOGO from '../../public/burgeranime.png';
import Axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');

  const [_, setCookie] = useCookies(['acc_tokens']);

  const handleSubmit = (e) => {
    e.preventDefault();
    const serverURL = 'https://burgeranimeserver.vercel.app';

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }

    // Check for strange or invalid names
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      setError('Invalid name');
      return;
    }

    Axios.post(`${serverURL}/createuser`, { name, email, pwd })
      .then((res) => {
        if (res.data.ok !== 0) {
          setCookie('acc_tokens', res.data.token);
          window.localStorage.setItem('token', res.data.token);
          console.log(res.data);
          window.location.href = '/';
        } else {
          setError(res.data.message);
        }
      })
      .catch((error) => {
        console.error('Error registering:', error);
        setError('An error occurred. Please try again later.');
      });
  };

  return (
    <>
      <div className="hero min-h-screen mt-16 absolute">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <Link to="/">
              <h1 className="text-5xl font-bold">
                <img src={LOGO} alt="Burger Anime" width={100} className="ml-auto" />
              </h1>
            </Link>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-[#343136ab]">
            <img src={Registeryuzu} alt="" width={100} className="ml-[80%] mt-[-8%]" />
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username <i className="text-xs text-yellow-500">( Your Public Name in Burger Anime )</i></span>
                  </label>
                  <input type="text" required placeholder="Name" className="input input-bordered bg-[#000000ab]" onChange={(e) => { setName(e.target.value); }} />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" required placeholder="email" className="input input-bordered bg-[#000000ab]" onChange={(e) => { setEmail(e.target.value); }} />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="password" required placeholder="password" className="input input-bordered bg-[#000000ab]" onChange={(e) => { setPwd(e.target.value); }} />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                  </label>
                </div>
                {error && <div className="text-red-500 mt-4">{error}</div>}
                <div className="form-control mt-6">
                  <p className="text-xs text-center p-5 text-slate-500">
                    By creating an account you're agreeing to our Terms & Privacy Policy, and you confirm that you are at least 16 years of age.
                  </p>
                  <button className="btn text-black hover:text-white hover:bg-green-600 bg-yellow-500">Create Account</button>
                </div>
              </form>
            </div>
            <div className="text-center p-10">
              <p>
                Already have an account?{' '}
                <span className="text-yellow-500">
                  <Link to="/login">LOG IN</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;

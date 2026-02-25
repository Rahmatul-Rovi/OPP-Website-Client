import React, { useContext, useState } from 'react';
import { AuthContext } from '../Providers/AuthProviders';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import axios from 'axios';

const Login = () => {

    const { signIn, createUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const saveUserToDb = async (user) => {

        if (!user?.email) return;

        const userInfo = {
            name: user.displayName || "No Name",
            email: user.email,
            role: "user"
        };

        try {
            await axios.post("http://localhost:5000/users", userInfo);
        } catch (error) {
            console.error("DB Save Error:", error);
        }
    };

    // After login role check & redirect
    const redirectByRole = async (email) => {
        try {
            const res = await axios.get("http://localhost:5000/users");
            const currentUser = res.data.find(u => u.email === email);

            if (currentUser?.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/profile");
            }
        } catch (error) {
            console.error("Role fetch error:", error);
            navigate("/");
        }
    };

    // Email/Password Login
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const result = await signIn(email, password);

            await saveUserToDb(result.user);

            await redirectByRole(result.user.email);

            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                timer: 1500,
                showConfirmButton: false
            });

        } catch (error) {

            if (error.code === 'auth/user-not-found') {

                try {
                    const result = await createUser(email, password);

                    await saveUserToDb(result.user);

                    await redirectByRole(result.user.email);

                    Swal.fire({
                        icon: 'success',
                        title: 'Account Created',
                        timer: 1500
                    });

                } catch (err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Account Creation Failed',
                        text: err.message
                    });
                }

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Error',
                    text: error.message
                });
            }
        }
    };

    // Google Login
    const handleGoogleLogin = async () => {

        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);

            await saveUserToDb(result.user);

            await redirectByRole(result.user.email);

            Swal.fire({
                icon: 'success',
                title: 'Google Login Successful',
                timer: 1500
            });

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Google Login Failed',
                text: error.message
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-[450px] bg-white p-10 rounded-[40px] shadow-2xl border">

                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <HiOutlineLockClosed className="text-white text-3xl" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase">
                        Terminal Access
                    </h2>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">

                    <div className="relative">
                        <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                        <input
                            type="email"
                            required
                            placeholder="EMAIL ADDRESS"
                            className="w-full pl-12 pr-6 py-4 bg-slate-100 rounded-2xl text-xs font-bold outline-none"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                        <input
                            type="password"
                            required
                            placeholder="PASSWORD"
                            className="w-full pl-12 pr-6 py-4 bg-slate-100 rounded-2xl text-xs font-bold outline-none"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest">
                        Login Now
                    </button>
                </form>

                <div className="my-8 text-center text-xs font-bold text-slate-400">
                    OR
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full py-4 bg-white border text-slate-900 rounded-2xl font-black text-xs uppercase flex items-center justify-center gap-3"
                >
                    <FcGoogle className="text-xl" />
                    Continue With Google
                </button>

            </div>
        </div>
    );
};

export default Login;
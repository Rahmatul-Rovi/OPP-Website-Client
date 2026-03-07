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
        };

        try {
            // User DB te save koro (Backend handle korbe jodi user agei thake)
            await axios.post("https://opp-server.vercel.app/users", userInfo);
        } catch (error) {
            console.error("DB Save Error:", error);
        }
    };

    // After login role check & redirect logic
    const redirectByRole = async (email) => {
        try {
            const res = await axios.get("https://opp-server.vercel.app/users");
            const currentUser = res.data.find(u => u.email === email);

            if (currentUser) {
                // ✅ LOCAL STORAGE E ROLE SAVE KORA (Refresh fix er jonno)
                localStorage.setItem("user-role", currentUser.role);
                localStorage.setItem("user", JSON.stringify(currentUser));

                if (currentUser.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/profile");
                }
            } else {
                navigate("/");
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
            // Simple Account Creation if not found (Tomar logic tai rakhlam)
            if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
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
                    Swal.fire({ icon: 'error', title: 'Error', text: err.message });
                }
            } else {
                Swal.fire({ icon: 'error', title: 'Login Error', text: error.message });
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
                timer: 1500,
                showConfirmButton: false
            });
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Google Login Failed', text: error.message });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
            <div className="w-full max-w-[450px] bg-white p-10 rounded-[40px] shadow-2xl border border-slate-100">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                        <HiOutlineLockClosed className="text-white text-3xl" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
                        Terminal Access
                    </h2>
                    <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-widest">Authorized Personnel Only</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                        <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                        <input
                            type="email"
                            required
                            placeholder="EMAIL ADDRESS"
                            className="w-full pl-12 pr-6 py-4 bg-slate-100 rounded-2xl text-[11px] font-bold outline-none focus:ring-2 ring-slate-900 transition-all uppercase"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                        <input
                            type="password"
                            required
                            placeholder="PASSWORD"
                            className="w-full pl-12 pr-6 py-4 bg-slate-100 rounded-2xl text-[11px] font-bold outline-none focus:ring-2 ring-slate-900 transition-all uppercase"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[2px] hover:bg-black transition-all shadow-lg active:scale-95">
                        Login Now
                    </button>
                </form>

                <div className="my-8 flex items-center gap-4 text-[10px] font-black text-slate-300">
                    <div className="h-[1px] bg-slate-100 flex-grow"></div>
                    OR
                    <div className="h-[1px] bg-slate-100 flex-grow"></div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full py-4 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl font-black text-[11px] uppercase flex items-center justify-center gap-3 hover:bg-slate-50 transition-all active:scale-95"
                >
                    <FcGoogle className="text-xl" />
                    Continue With Google
                </button>
            </div>
        </div>
    );
};

export default Login;
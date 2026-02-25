import React, { useContext, useState } from 'react';
import { AuthContext } from '../Providers/AuthProviders';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import auth from '../firebase/firebase.config';

const Login = () => {
    const { signIn, createUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Agey check korbe user login korte pare kina
            await signIn(email, password);
            Swal.fire({ icon: 'success', title: 'Welcome Back!', timer: 1500, showConfirmButton: false });
            navigate('/');
        } catch (error) {
            // Jodi user na thake, tobe automatic account khule login koraye dibe
            if (error.code === 'auth/user-not-found') {
                try {
                    await createUser(email, password);
                    Swal.fire({ icon: 'success', title: 'Account Created & Logged In!', timer: 1500 });
                    navigate('/');
                } catch (err) {
                    Swal.fire({ icon: 'error', title: 'Login Failed', text: err.message });
                }
            } else {
                Swal.fire({ icon: 'error', title: 'Error', text: error.message });
            }
        }
    };

    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(() => {
                Swal.fire({ icon: 'success', title: 'Signed in with Google', timer: 1500 });
                navigate('/');
            })
            .catch(err => Swal.fire({ icon: 'error', title: 'Google Login Failed', text: err.message }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-[450px] bg-white/80 backdrop-blur-xl p-10 rounded-[40px] shadow-2xl shadow-slate-200 border border-white">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                        <HiOutlineLockClosed className="text-white text-3xl" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Terminal Access</h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[3px] mt-2">One Point Plus POS</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="relative">
                        <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                        <input 
                            type="email" required placeholder="EMAIL ADDRESS"
                            className="w-full pl-12 pr-6 py-4 bg-slate-100/50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-slate-900 transition-all outline-none"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                        <input 
                            type="password" required placeholder="PASSWORD"
                            className="w-full pl-12 pr-6 py-4 bg-slate-100/50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-slate-900 transition-all outline-none"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-black transition-all active:scale-95">
                        Login Now
                    </button>
                </form>

                <div className="relative my-10">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                    <div className="relative flex justify-center text-[10px] uppercase font-black text-slate-400 bg-white px-4">Or Access via</div>
                </div>

                <button 
                    onClick={handleGoogleLogin}
                    className="w-full py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-300 transition-all active:scale-95"
                >
                    <FcGoogle className="text-xl" /> Continue With Google
                </button>
            </div>
        </div>
    );
};

export default Login;
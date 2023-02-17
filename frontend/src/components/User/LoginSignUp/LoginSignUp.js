import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FaceIcon from '@material-ui/icons/Face';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import './LoginSignUp.css';
import Profile from '../../../assets/images/Profile.png';
import { login, register, clearErrors } from '../../../actions/userAction';
import Loading from '../../layout/Loading/Loading';

const LoginSignUp = ({ history }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {
        error,
        loading,
        isAuthenticated
    } = useSelector(state => state.user);

    const switcherTab = useRef(null);
    const loginTab = useRef(null);
    const registerTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState(Profile);


    const { name, email, password } = user;

    const switchTabs = (e, tab) => {
        if (tab === 'login') {
            switcherTab.current.classList.add('shift-to-neutral');
            switcherTab.current.classList.remove('shift-to-right');

            registerTab.current.classList.remove('shift-to-neutral-form');
            loginTab.current.classList.remove('shift-to-left');
        }
        if (tab === 'register') {
            switcherTab.current.classList.add('shift-to-right');
            switcherTab.current.classList.remove('shift-to-neutral');

            registerTab.current.classList.add('shift-to-neutral-form');
            loginTab.current.classList.add('shift-to-left');
        }
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();


        myForm.set('name', name);
        myForm.set('email', email);
        myForm.set('password', password);
        myForm.set('avatar', avatar);

        dispatch(register(myForm));
    }

    const handleChangeRegisterData = (e) => {
        if (e.target.value === 'avatar') {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            history.push('/account');
        }
    }, [alert, dispatch, error, history, isAuthenticated])


    return (
        <>
            {loading
                ? <Loading />
                : <div className="login-container">
                    <div className="login-box">
                        <div>
                            <div className="login-toggle">
                                <p onClick={e => switchTabs(e, 'login')}>LOGIN</p>
                                <p onClick={e => switchTabs(e, 'register')}>REGISTER</p>
                            </div>
                            <button className='switcher-tab' ref={switcherTab}></button>
                        </div>
                        <form class='login-form' ref={loginTab} onSubmit={handleLoginSubmit}>
                            <div>
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    placeholder='Email'
                                    required
                                    value={loginEmail}
                                    onChange={e => setLoginEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <LockOpenIcon />
                                <input
                                    type="password"
                                    placeholder='Password'
                                    required
                                    value={loginPassword}
                                    onChange={e => setLoginPassword(e.target.value)}
                                />
                            </div>
                            <Link to='/password/forgot'>Forgot Password ?</Link>
                            <input type="submit" value='Login' className='login-btn' />
                        </form>
                        <form
                            className="signup-form"
                            ref={registerTab}
                            encType="multipart/form-data"
                            onSubmit={handleRegisterSubmit}
                        >
                            <div className="signup-name">
                                <FaceIcon />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={handleChangeRegisterData}
                                />
                            </div>
                            <div className="signup-email">
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={handleChangeRegisterData}
                                />
                            </div>
                            <div className="signup-password">
                                <LockOpenIcon />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    name="password"
                                    value={password}
                                    onChange={handleChangeRegisterData}
                                />
                            </div>

                            <div id="register-image">
                                <img src={avatarPreview} alt="Avatar Preview" />
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={handleChangeRegisterData}
                                />
                            </div>
                            <input type="submit" value="Register" className="signup-btn" />
                        </form>
                    </div>
                </div>
            }
        </>
    );
};

export default LoginSignUp;
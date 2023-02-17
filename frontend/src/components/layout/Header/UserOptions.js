import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import { Dashboard, Person, ExitToApp, ListAlt } from '@material-ui/icons';
import { Backdrop } from '@material-ui/core'
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';

import './Header.css';
import profilePng from '../../../assets/images/Profile.png';
import { logout } from '../../../actions/userAction';

const UserOptions = ({ user }) => {

    const [open, setOpen] = useState(false);
    const history = useHistory();
    const alert = useAlert();
    const dispatch = useDispatch();

    const options = [
        { icon: <ListAlt />, name: 'Orders', func: orders },
        { icon: <Person />, name: 'Profile', func: account },
        { icon: <ExitToApp />, name: 'Logout', func: logoutUser },
    ];

    if (user.role === 'admin') {
        options.unshift({
            icon: <Dashboard />,
            name: 'Dasboard',
            func: dasboard
        })
    }

    function dasboard() {
        history.push('/dasboard');
    };

    function orders() {
        history.push('/orders');
    };

    function account() {
        history.push('/account');
    };

    function logoutUser() {
        dispatch(logout());
        alert.success('Logout Successfully');
    };

    return (
        <>
            <Backdrop open={open} style={{ zIndex: '10' }} />
            <SpeedDial
                className='speed-dial'
                style={{ zIndex: '11' }}
                ariaLabel='SpeedDial tooltip example'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction='down'

                icon={
                    <img
                        className='speed-dial-icon'
                        src={user.avatar.url ? user.avatar.url : profilePng}
                        alt='Profile'
                    />
                }
            >
                {options.map((item, index) => (
                    <SpeedDialAction
                        key={index}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                    />
                ))}

            </SpeedDial>
        </>
    );
};

export default UserOptions;
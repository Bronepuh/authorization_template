import React, { useEffect, useState } from "react";

import reactLogo from '../../assets/react.svg';
import viteLogo from '../../assets/vite.svg';

import styles from './login-page.module.scss';
import { authStore } from "../../entities/auth/store/authStore";
import { userStore } from "../../entities/user/store/userStore";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const navigate = useNavigate();

  const { login, isAuth } = authStore();
  const { me } = userStore();

  const [modalData, setModalData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (isAuth && me) {
      navigate('/');
    }
  }, [isAuth, me, navigate])


  const handleChangeEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setModalData({ ...modalData, email: evt.target.value })
  }

  const handleChangePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setModalData({ ...modalData, password: evt.target.value })
  }

  const handleLogin = async () => {
    const user = {
      email: modalData.email,
      password: modalData.password
    };

    login(user);
  }

  const handleRegistrationLinkClick = () => {
    navigate('/registration');
  }

  return (
    <div className={styles.maiWrapper}>
      <div className={styles.logoWrapper}>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1>Vite + React</h1>
      </div>
      <div className={styles.formWrapper}>
        <div className={styles.formTitle}>Авторизация</div>
        <div className={styles.form}>
          <input className={styles.formInput} type="text" onChange={handleChangeEmail} />
          <input className={styles.formInput} type="text" onChange={handleChangePassword} />
          <button className={styles.submitButton} title='button' onClick={handleLogin}>send</button>
          <div className={styles.registrationLinkWrapper} onClick={handleRegistrationLinkClick}>
            регистрация
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
import React, { useState } from "react";

import reactLogo from '../../assets/react.svg';
import viteLogo from '../../assets/vite.svg';

import styles from './registration-page.module.scss';
import { authStore } from "../../entities/auth/store/authStore";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const { registration } = authStore();
  
  const navigate = useNavigate();
  const [modalData, setModalData] = useState({
    email: '',
    password: ''
  });

  const handleChangeEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setModalData({ ...modalData, email: evt.target.value })
  }

  const handleChangePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setModalData({ ...modalData, password: evt.target.value })
  }

  const handleRegistration = async () => {
    const user = {
      email: modalData.email,
      password: modalData.password
    };

    const request = await registration(user);
    if(request) {
      console.log(request.message);
    }
  }

  const handleLoginLinkClick = () => {
    navigate('/login');
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
        <div className={styles.formTitle}>Регистрация</div>
        <div className={styles.form}>
          <input className={styles.formInput} type="text" onChange={handleChangeEmail} />
          <input className={styles.formInput} type="text" onChange={handleChangePassword} />
          <button className={styles.submitButton} title='button' onClick={handleRegistration}>Зарегистрироваться</button>
          <div className={styles.loginLinkWrapper} onClick={handleLoginLinkClick}>
            авторизация
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationPage
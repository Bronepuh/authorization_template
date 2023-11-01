import { useMemo, useState } from "react";

import styles from './main-page.module.scss';
import { authStore } from "../../entities/auth/store/authStore";
import { userStore } from "../../entities/user/store/userStore";
import { useNavigate } from "react-router-dom";
import { apiInstance } from "../../shared/api/base";

interface IUser {
  email: string
}

const MainPage = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const { logout, isAuth } = authStore();
  const { me, fetchMe } = userStore();
  const accessToken = localStorage.getItem('accessToken');

  useMemo(() => {
    if (accessToken && !isAuth) {
      fetchMe(accessToken)
    }
  }, [accessToken, isAuth, fetchMe])


  const handleLogout = async () => {
    logout();
  }

  const handleLoginLink = async () => {
    navigate('/login');
  }

  const handleFetchUsers = async () => {
    const response = await apiInstance.get('http://localhost/api/users');

    if (response) {
      const data = await response.data;
      setUsers(data[0])
    }
  }

  return (
    <div className={styles.maiWrapper}>
      <div className={styles.isAuthInfo}>{isAuth ? `Вы авторизованы как: ${me?.email}` : `Вы не авторизованы`}</div>
      <ul className={styles.usersList}>
        {isAuth && users.map((item: IUser, idx) => {
          return (
            <li className={styles.usersItem} key={idx}>{item.email}1</li>
          )
        })}
      </ul>
      <button className={styles.submitButton} title='button' onClick={handleFetchUsers}>fetch users</button>
      {isAuth &&

        <button className={styles.submitButton} title='button' onClick={handleLogout}>logout</button>
      }
      {!isAuth &&

        <button className={styles.submitButton} title='button' onClick={handleLoginLink}>login</button>
      }

    </div>
  )
}

export default MainPage
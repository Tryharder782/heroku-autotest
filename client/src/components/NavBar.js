import React, { useContext, useEffect } from 'react';
import { Button, Image, Navbar, } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import loginIco from '../assets/loginIco.svg'
import { TESTS_ROUTE } from '../utils/consts';
import { Context } from '..';
import { check } from '../http/userAPI';
import { observer } from 'mobx-react-lite';

const NavBar = observer(() => {
  const navigate = useNavigate()
  const { user } = useContext(Context)
  useEffect (() => {
    check().then(data => {
			user.setUser(data)
			user.setIsAuth(true)
		})
  },[])
  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    localStorage.setItem('token', '')
    navigate(TESTS_ROUTE)
  }
  return (
    <Navbar bg="dark" variant="dark" >
      <Container>
        <Navbar.Brand ><NavLink to={'/tests'} className='text-decoration-none text-light'> AutoTestKG</NavLink></Navbar.Brand>
        <Nav className="m-auto w-25 d-flex justify-content-between">
          <NavLink to={'/tests'} className='text-decoration-none text-light'>Тесты</NavLink>
          <NavLink to={'/contacts'} className='text-decoration-none text-light'>Контакты</NavLink>
          <NavLink to={'/aboutUs'} className='text-decoration-none text-light'>О нас</NavLink>
        </Nav>
        <Nav className='ml-auto'>
          {user.isAuth &&
            <div >
              <Button variant='transparent' className='text-white' onClick={() => { logOut() }}>выйти </Button>
              <Button variant='transparent' onClick={() => navigate('/profile')}><Image src={loginIco} /></Button>
            </div>}

          {!user.isAuth &&
            <Button variant='transparent' className='text-white' onClick={() => navigate('/login')}>войти</Button>}
        </Nav>
      </Container>
    </Navbar>
  );
})

export default NavBar;
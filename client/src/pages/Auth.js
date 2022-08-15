import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { login, registration } from '../http/userAPI';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, TESTS_ROUTE } from '../utils/consts';

const Auth = observer(() => {
	const { user } = useContext(Context)
	const location = useLocation()
	const navigate = useNavigate()
	const isLogin = location.pathname === LOGIN_ROUTE
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [firstName, setfirstName] = useState('')
	const [lastName, setlastName] = useState('')
	const [birthYear, setbirthYear] = useState('')

	const click = async () => {
		try {
			let data
			if (isLogin) {
				data = await login(email, password)
			} 
			else {
				data = await registration(email, password, firstName, lastName, birthYear)
			}
			user.setUser(data)
			user.setIsAuth(true)
			navigate(TESTS_ROUTE)
		} catch (e) {
			alert(e.response.data.message)
		}
	}



	return (
		<div>
			<Container
				className='d-flex justify-content-center align-items-center'
				style={{ height: window.innerHeight - 54 }}
			>
				<Card style={{ width: 600 }} className='p-5'>
					<h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
					<Form className='d-flex flex-column'>
						<Form.Control
							className='mt-3'
							placeholder='Введите ваш email'
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
						<Form.Control
							className='mt-3'
							placeholder='Введите ваш пароль'
							value={password}
							type='password'
							onChange={e => setPassword(e.target.value)}
						/>
						{!isLogin && <div >
							<Form.Control
								className='mt-3'
								placeholder='Ваше имя'
								value={firstName}
								onChange={e => setfirstName(e.target.value)}
							/>
							<Form.Control
								className='mt-3'
								placeholder='Ваша фамилия'
								value={lastName}
								onChange={e => setlastName(e.target.value)}
							/>
							<Form.Control
								className='mt-3'
								placeholder='Ваш год рождения'
								value={birthYear}
								onChange={e => setbirthYear(e.target.value)}
							/>
						</div>}
						<Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
							{isLogin ?
								<div className='w-auto'>
									Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся</NavLink>
								</div>
								:
								<div className='w-auto'>
									Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войди</NavLink>
								</div>
							}
							<Button variant='outline-success' className='w-auto' onClick={() => click()}>{isLogin ? "Войти" : "Регистрация"}</Button>
						</Row>
					</Form>
				</Card>
			</Container>
		</div>
	);
});

export default Auth;
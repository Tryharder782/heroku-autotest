import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import { check } from '../http/userAPI';
import { PROFILE_ROUTE } from '../utils/consts';

const MainTestResult = () => {
	
	const navigate = useNavigate()
	
	const adminPassword = "49415375Aa"
	const rightAnswers = JSON.parse(localStorage.getItem('rightAnswers'))
	const wrongAnswers = JSON.parse(localStorage.getItem('wrongAnswers')) || 0
	const { user } = useContext(Context)
	const [password, setPassword] = useState('')

	const callback = () => {
		if (password === adminPassword){
			localStorage.removeItem('rightAnswers')
			localStorage.removeItem('wrongAnswers')
			localStorage.removeItem('userAnswers')
			localStorage.removeItem('questionNumbers')
			localStorage.removeItem('testIsStarted')
			localStorage.removeItem('testEnded')
			navigate(PROFILE_ROUTE)
		}
		else {
			alert('неправильный пароль')
		}
	}
	
	useEffect(() => {
		try {
			check().then(data => {
				user.setUser(data)
				user.setIsAuth(true)
			})
		} catch (e) {
			alert(e.response.data.message)
		}
	}, [])

	return (
		<Container className='mt-3 text-center'>
			<div>
				<h1 className='text-center'>ТЕСТ ЗАВЕРШЁН</h1>
				<h3 className='text-center'>Ваши результаты:</h3>
				<br />
				<br />
				<br />
				<div className='col-md-5 m-auto d-flex justify-content-between'><h5>правильных ответов:</h5> <h5>{rightAnswers}</h5></div>
				<div className='col-md-5 m-auto d-flex justify-content-between'><h5>неправильных ответов:</h5> <h5>{wrongAnswers}</h5></div>
				<br />
				<br />
				<div className='text-center'>выйти можно только с помощью администратора </div>
				<br />
				<Form className='col-md-6 m-auto'>
					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Пароль</Form.Label>
						<Form.Control type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />
					</Form.Group>
					<Button variant="primary" onClick={() => {
						if (password === adminPassword) {
							callback()
						}
						else {
							alert('неправильный пароль')
						}
					}}>
						выход
					</Button>
				</Form>
			</div>
		</Container>
	);
};

export default MainTestResult;
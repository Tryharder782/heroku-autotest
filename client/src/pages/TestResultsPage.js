import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import {check} from '../http/userAPI'
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { createTestResults } from '../http/TestsAPI';
import { useNavigate } from 'react-router-dom';
import { TESTS_ROUTE } from '../utils/consts';

const TestResults = observer(() => {
	const {user} = useContext(Context)
	const navigate = useNavigate()
	const adminPassword = '49415375Aa'
	const [password, setPassword] = useState('')
	const rightAnswers = JSON.parse(localStorage.getItem('userAnswers')).filter(a => a.correct === true).length
	const wrongAnswers = JSON.parse(localStorage.getItem('userAnswers')).filter(a => a.correct === false).length
	const testId = Number(localStorage.getItem('testId'))
	const performance = Number(Math.ceil(rightAnswers/(rightAnswers+wrongAnswers)*100))
	useEffect(()=> {
		check().then(data => {
			user.setUser(data)
			user.setIsAuth(true)
		})
	},[testId])
	const userResultId = user.user.id
	console.log(userResultId);
	const callback = async () => {
		try {
		await createTestResults({rightAnswers, wrongAnswers, testId, performance, userResultId})
		.then(data => {
			navigate(TESTS_ROUTE)
			localStorage.removeItem('testId')
			localStorage.removeItem('userAnswers')})
		} catch (e) {
			alert (e.response.data.message)
		}
	}
	return (
		<Container className='mt-5'>
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
				<div className='text-center'>выйти можно только с помощью администратора {user.user.email} </div>
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
});
//localStorage.clear()														//очищаем локальное хранилище

export default TestResults;
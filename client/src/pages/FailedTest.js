import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PROFILE_ROUTE } from '../utils/consts';

const FailedTest = () => {

	const adminPassword = "49415375Aa"
	const navigate = useNavigate()
	

	const [password, setPassword] = useState('')

	const callback = async () => {
			navigate(PROFILE_ROUTE)
			localStorage.removeItem('rightAnswers')
			localStorage.removeItem('wrongAnswers')
			localStorage.removeItem('userAnswers')
			localStorage.removeItem('questionNumbers')
			localStorage.removeItem('testIsStarted')
			localStorage.removeItem('testEnded')
	}
	return (
		<Container className='mt-3 text-center'>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<h1>Тест завершён!</h1>
			<h4>к сожалению, вы допустили 2 ошибки (или у вас закончилось время) и не смогли пройти тестирование.</h4>
			<h5>Чтобы закрыть это окно, позовите администратора.</h5>
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
		</Container>
	);
};

export default FailedTest;
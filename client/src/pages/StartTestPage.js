import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MAIN_TEST_FAILED, MAIN_TEST_ROUTE, TESTS_ROUTE } from '../utils/consts';

const StartTestPage = () => {

	const navigate = useNavigate()

	const startTest = () => {
		if (JSON.parse(localStorage.getItem('wrongAnswers')) >= 3 || localStorage.getItem("testEnded") !== null) {
			navigate(MAIN_TEST_FAILED)
		}
		else {
			navigate(MAIN_TEST_ROUTE)
			setTimeout(() =>{
				// Get a reference to the last interval + 1
				const interval_id = window.setInterval(function () { }, Number.MAX_SAFE_INTEGER);

				// Clear any timeout/interval up to that id
				for (let i = 1; i < interval_id; i++) {
					window.clearInterval(i);
				}
				localStorage.setItem('testEnded', true)
				navigate(MAIN_TEST_FAILED)
			},1200000)
		}
}
	
	
	return (
		<Container className='mt-5 text-center'>
			<h1>
				Начать тест
			</h1>
			<hr />
			<h4 className='mt-4 mb-4'>
				На весь тест будет дано 20 минут, всего будет 20 вопросов
			</h4> 
			<hr />
			<h4 className='mt-4 mb-4'>
				Допускается максимум 2 ошибки. При неправильном ответе на вопросы 2 раза, тест будет считаться проваленным
			</h4>
			<hr />
			<h4 className='mt-4 mb-4'>
				Если вы готовы начать, нажмите "начать тест"
			</h4>
			<Button variant='outline-success' className='mt-5' onClick={startTest}> НАЧАТЬ ТЕСТ</Button>
		</Container>
	);
};

export default StartTestPage;
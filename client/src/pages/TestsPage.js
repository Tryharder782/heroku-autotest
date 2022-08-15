import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Container, Image, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import adMock from '../assets/adMock.png'
import testMock from '../assets/questionMock.png'
import TestsCard from '../components/TestsCard';
import { fetchAllTests } from '../http/TestsAPI';
import { check } from '../http/userAPI';
import { QUESTIONS_ROUTE, TESTS_ROUTE } from '../utils/consts';



const TestsPage = observer(() => {


	
	const { test } = useContext(Context)
	const { user } = useContext(Context)
	useEffect(()=> {
		check().then(data => {
			user.setUser(data)
			user.setIsAuth(true)
		})
		fetchAllTests().then(data => {
			test.setTests(data.sort((a, b) => (a.id > b.id) ? 1 : -1))
		})
	},[test])
	const navigate = useNavigate()

	return (
		<Container className='mt-3'>
			<div className="d-flex justify-content-between">
				<Image src={adMock} />
				<Image src={testMock} />
				<Image src={adMock} />
			</div>
			<h2 className='text-center mt-3'>Тесты</h2>
			<hr/>
			<Row>
				{test.tests.map(t =>
				<div 
					className="mt-3 col-md-6 text-decoration-none"
					style={{cursor: "pointer"}} 
					key={t.id}
					onClick={() => {
						if (user.isAuth) {
							navigate(TESTS_ROUTE + t.id + QUESTIONS_ROUTE + '1')
						}
						else {
							alert('Сперва войдите в систему')
						}
					}}
				>
					<TestsCard
						test={t}
					/>
					</div>
				)}

			</Row>
		</Container>
	);
});

export default TestsPage;
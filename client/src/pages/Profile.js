import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Button, Col, Container, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import { check } from '../http/userAPI';
import { ADMIN_ROUTE, MAIN_TEST_ROUTE, START_TEST_ROUTE, TESTS_ROUTE } from '../utils/consts';

const Profile = observer(() => {
	const { user } = useContext(Context)
	const navigate = useNavigate()
	useEffect(() => {
		check().then(data => {
			user.setUser(data)
			user.setIsAuth(true)
		})
	}, [])
	console.log(user.user.profilePicture)
	return (
		<Container className='d-flex justify-content-between mt-3'>
			<Col className='col-md-4'>
				<Image width={300} height={300} className='d-block m-auto' src={process.env.REACT_APP_API_URL + "/" + user.user.profilePicture} />
				<div className='d-flex justify-content-between' style={{ marginTop: 100 }}>
					<Button
						variant='outline-success'
						onClick={() => navigate(START_TEST_ROUTE)}
					>
						Перейти к тесту(20 вопросов)
					</Button>
					{user.user.role==="ADMIN" && <Button
						variant='outline-dark'
						onClick={() => navigate(ADMIN_ROUTE)}
						className='ms-3'
						
					>
						Админ панель
					</Button>}
				</div>
			</Col>
			<div className='col-md-8 text-center'>
				<h3 style={{ marginTop: 100 }}>ИНФО</h3>
				<p style={{ marginTop: 70, marginBottom: 0 }}>Имя</p>
				<div>
					<div className='bg-white m-auto align-items-center ' style={{ width: 300, height: 40, borderRadius: 26 }}><p className='m-0 mt-1 pt-2 '>{user.user.firstName}</p></div>
				</div>
				<p className='mt-3 mb-0'>Фамилия</p>
				<div>
					<div className='bg-white m-auto align-items-center ' style={{ width: 300, height: 40, borderRadius: 26 }}><p className='m-0 mt-1 pt-2 '>{user.user.lastName}</p></div>
				</div>
				<p className='mt-3 mb-0'>Возраст</p>
				<div>
					<div className='bg-white m-auto align-items-center ' style={{ width: 300, height: 40, borderRadius: 26 }}><p className='m-0 mt-1 pt-2 '>{Math.floor(Date.now() / 1000 / 3600 / 24 / 365 + 1970 - user.user.birthYear)}</p></div>
				</div>
			</div>
		</Container>
	);
});

export default Profile;
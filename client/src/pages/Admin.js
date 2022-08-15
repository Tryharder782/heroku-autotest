import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import AddTestPicture from '../components/AddTestPicture';
import CreateChoices from '../components/CreateChoices';
import CreateTest from '../components/CreateTest'
const Admin = () => {
	const [testVisible, setTestVisible] = useState(false)
	const [testPictureVisible, setTestPictureVisible] = useState(false)
	const [choicesVisible, setChoicesVisible] = useState(false)
	return (
		<Container className='d-flex flex-column'>
			<Button
				variant={'outline-dark'}
				className='mt-4 p-2'
				onClick={() => setTestVisible(true)}
			>
				Добавить тест
			</Button>
			<Button
				variant={'outline-dark'}
				className='mt-4 p-2'
				onClick={() => setTestPictureVisible(true)}
			>
				Добавить картинку к вопросу
			</Button>
			<Button
				variant={'outline-dark'}
				className='mt-4 p-2'
				onClick={() => setChoicesVisible(true)}
			>
				Добавить варианты
			</Button>
			<CreateTest show={testVisible} onHide={() => setTestVisible(false)}></CreateTest>
			<AddTestPicture show={testPictureVisible} onHide={() => setTestPictureVisible(false)}></AddTestPicture>
			<CreateChoices show={choicesVisible} onHide={() => setChoicesVisible(false)}></CreateChoices>
		</Container>
	);
};

export default Admin;
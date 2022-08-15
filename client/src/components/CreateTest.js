import React, { useState } from 'react';
import { createTest } from '../http/TestsAPI';
import { observer } from 'mobx-react-lite'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

const CreateTest = observer(({ show, onHide }) => {



	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [questions, setQuestions] = useState([])

	// const addChoice = (id) => {
	// 	console.log(id);
	// 	if (!choices[id]){
	// 		let choicesCopy= JSON.parse(JSON.stringify(choices))
	// 		choicesCopy.push([{text: '', uid: Date.now()}])
	// 		setChoices(choicesCopy)
	// 	}
	// 	else if (choices[id]){
	// 		let choicesCopy= JSON.parse(JSON.stringify(choices))
	// 		choicesCopy[id].push({text: '', uid: Date.now()})
	// 		setChoices(choicesCopy)
	// 	}
	// }


	const addQuestion = () => {
		setQuestions([...questions, { title: '', description: '', correctAns: '', uid: Date.now() }])
	}

	const deleteQuestion = (uid) => {
		setQuestions(questions.filter(i => i.uid !== uid))
	}
	const changeQuestion = (key, value, uid) => {
		setQuestions(questions.map(i => i.uid === uid ? { ...i, [key]: value } : i))
	}
	const addTest = () => {
		try{
		const formData = new FormData()
		formData.append('title', title)
		formData.append('description',description )
		formData.append('questions', JSON.stringify(questions))
		createTest(formData).then(data => {
			setTitle('')
			setDescription('')
			setQuestions([])
			onHide()
		})} catch (e) {
			alert(e.resposne.data.message)
		}
	}
	console.log(questions);
	return (
		<Modal
			show={show}
			onHide={onHide}
			size="lg"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Добавить новый тест
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Control
					value={title}
					placeholder={'Введите заголовок теста'}
					onChange={e => setTitle(e.target.value)}
				/>
				<br />
				<Form.Control
					value={description}
					placeholder={'Введите описание теста (необязательно)'}
					onChange={e => setDescription(e.target.value)}
				/>
				<Button
					className='mt-3'
					variant='outline-dark'
					onClick={addQuestion}
				>
					Добавить новый вопрос
				</Button>
				{questions.map(i =>
					<Row className='mt-3' key={i.uid}>
						<Col md={4}>
							<Form.Control
								placeholder='Введите заголовок вопроса'
								value={i.title}
								onChange={(e) => changeQuestion('title', e.target.value, i.uid)}
							/>
						</Col>
						<Col md={4}>
							<Form.Control
								placeholder='Введите описание вопроса'
								value={i.description}
								onChange={(e) => changeQuestion('description', e.target.value, i.uid)}
							/>
						</Col>
						<Col md={2}>
							<Form.Control
								placeholder='Ответ'
								value={i.correctAns}
								onChange={(e) => changeQuestion('correctAns', Number(e.target.value), i.uid)}
							/>
						</Col>
						<Col md={2}>
							<Button variant='outline-danger' onClick={() => deleteQuestion(i.uid)}>Удалить</Button>
						</Col>
					</Row>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
				<Button variant='outline-success' onClick={addTest}>Добавить</Button>
			</Modal.Footer>
		</Modal>
	);
});

export default CreateTest;
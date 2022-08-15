import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { createChoice } from '../http/TestsAPI';

const CreateChoices = observer(({ show, onHide }) => {
	const [questionId, setQuestionId] = useState('')
	const [choices, setChoices] = useState([])

	const missingNumbers = (givenNumbers,count) => {
		let a = givenNumbers,
			missing = []

		for (let i = 1; i <= count; i++) {
			if (a.indexOf(i) === -1) {
				missing.push(i)
			}
		}
		console.log(missing)
		return missing
	}

	const addChoice = () => {
		if (choices.length < 5) {
			setChoices([...choices, { text: '', number: missingNumbers(choices.map((i) => i.number),5)[0], uid: Date.now() }].sort((a, b) => (a.number > b.number) ? 1 : -1))
		}
	}
	console.log(choices.map((i,index) => index+1));
	const deleteChoice = (uid) => {
		setChoices(choices.filter(i => i.uid !== uid))
	}
	const changeChoice = (key, value, uid) => {
		setChoices(choices.map(i => i.uid === uid ? { ...i, [key]: value } : i))
	}

	const addChoices = () => {
		try {
			for (let i = 0; i < choices.length; i++) {
				createChoice({ ...choices[i], questionId : Number(questionId) })
			}
			// onHide()
		} catch (e) {
			alert(e.resposne.data.message)
		}
	}
	console.log(choices);

	return (
		<Modal
			show={show}
			onHide={onHide}
			size="lg"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Добавить новые варианты
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Control
					value={questionId}
					placeholder={'Введите id вопроса (обязательно)'}
					type={"number"}
					onChange={e => setQuestionId(e.target.value)}
				/>
				<Button
					className='mt-3'
					variant='outline-dark'
					onClick={addChoice}
				>
					Добавить новый вариант
				</Button>
				{choices.map(i =>
					<Row className='mt-3' key={i.uid}>
						<Col md={9}>
							<div className='d-flex align-items-center'>{i.number}
								<Form.Control
									placeholder='Введите текст варианта'
									value={i.text}
									className='ms-2'
									onChange={(e) => changeChoice('text', e.target.value, i.uid)}
								/>
							</div>
						</Col>
						<Col md={3}>
							<Button variant='outline-danger' onClick={() => deleteChoice(i.uid)}>Удалить</Button>
						</Col>
					</Row>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
				<Button variant='outline-success' onClick={addChoices}>Добавить</Button>
			</Modal.Footer>
		</Modal>
	);
});

export default CreateChoices;
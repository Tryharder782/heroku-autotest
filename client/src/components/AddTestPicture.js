import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { updateQuestion } from '../http/TestsAPI';

const AddTestPicture = observer(({show,onHide}) => {
	const [file, setFile] = useState(null)
	const [number, setNumber] = useState('')
	const [testId, setTestId] = useState('')

	
	const selectFile = e => {
		setFile(e.target.files[0]);
	}
	const addPicture = () => {
		try{
			const formData = new FormData()
			formData.append('picture', file)
			formData.append('number', Number(number))
			formData.append('testId', Number(testId))
			updateQuestion(formData).then(data => {
				// setNumber('')
				// setTestId('')
				// onHide()
			})} catch (e) {
				alert(e.resposne.data.message)
			}
	}

	return (
		<Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить картинку к вопросу
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
		  <Form.Control

					value={testId}
					type='number'
					placeholder={'Введите id теста'}
					onChange={e => setTestId(e.target.value)}
				/>
		  <Form.Control
		  			className='mt-3'
					type='number'
					value={number}
					placeholder={'Введите номер вопроса'}
					onChange={e => setNumber(e.target.value)}
				/>
          <Form.Control
				className='mt-3'
				type='file'
				onChange={selectFile}
			/>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
        <Button variant='outline-success' onClick={addPicture}>Добавить</Button>
      </Modal.Footer>
    </Modal>
	);
});

export default AddTestPicture;
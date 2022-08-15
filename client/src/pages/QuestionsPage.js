import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import adMock from '../assets/adMock.png'
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { fetchByTestQuestion, fetchExactTest } from '../http/TestsAPI';
import { QUESTIONS_ROUTE, TESTS_ROUTE, RESULTS_ROUTE } from '../utils/consts';
import Choice1 from '../components/Choice1';
import Choice2 from '../components/Choice2';

const QuestionsPage = observer(() => {

	let { tId } = useParams()
	let { qId } = useParams()

	const navigate = useNavigate()


	const [userAnswers, setUserAnswers] = useState([])
	
	const onChoiceClick = (c) => {													//при выборе варианта
		if (chosenAns === 0) {
			setChosenAns(c.number)
			localStorage.setItem('userAnswers', JSON.stringify([...userAnswers, { questionNumber: Number(qId), userAnswer: c.number, correct: c.number === correctAns }]))
			let answers = JSON.parse(localStorage.getItem('userAnswers'))
			setUserAnswers(answers)
		}
		localStorage.setItem('testId', Number(tId))
	}
	const nextQuestion = () => {														//при переходе на следующий вопрос
		if (chosenAns === 0) {															//ЕСЛИ вариант не выбран
			alert('Выберите ответ')
		}
		else {																				//ЕСЛИ вариант выбран
			updateCounter(chosenAns)													//обновляем счётчик правильных ответов
			if (userAnswers.length === test.questions.length) {				//ЕСЛИ отвечены все вопросы
				navigate(RESULTS_ROUTE)													//перенаправляем на страницу с результатами
			}
			else {
				navigate(TESTS_ROUTE + tId + QUESTIONS_ROUTE + (Number(qId) + 1))		//ЕСЛИ отвечены не все вопросы
			}
		}
	}
	
	const [wrongAnswers, setWrongAnswers] = useState(0)
	const [question, setQuestion] = useState({ choices: [] })
	const [test, setTest] = useState({ questions: [] })
	const [chosenAns, setChosenAns] = useState(0)
	const [counter, setCounter] = useState(0)
	let correctAns = question.correctAns

	const updateCounter = (ans) => {													//обновляем счётчик правильных ответов
		if (ans === correctAns) {
			setCounter(counter + 1)
		}
	}
	useEffect(() => {																		//при перезагрузке страницы:
		
		fetchByTestQuestion(tId, qId).then(data => { setQuestion(data) }) //Загружаем конкретный вопрос (с вариантами)
		fetchExactTest(tId).then(data => setTest(data))							//загружаем конкретный тест (с вопросами, чтобы итерировавться по ним)
		setChosenAns(0)																	//сбрасываем выбранный вариант
		const answers = JSON.parse(localStorage.getItem('userAnswers'))	//загружаем из локального хранилища ответы пользователя
		if (answers) {
			setUserAnswers(answers)
			if (answers.find(a => a.questionNumber === Number(qId))) {
				setChosenAns(answers.find(a => a.questionNumber === Number(qId)).userAnswer)
			}
			else {
				setChosenAns(0)
			}
		}
	}, [qId, tId])

	return (
		<Container className='mt-3'>
			<div>
				{/* блок с картинками */}
				<div className="d-flex justify-content-between">
					<Image src={adMock} />
					<Image height={350} src={process.env.REACT_APP_API_URL + '/' + question.picture} />
					<Image src={adMock} />
				</div>
				{/* блок с текстом */}
				<h2>Вопрос #{qId}</h2>
				Правильных ответов:{counter}
				<br />
				Ваш ответ:{chosenAns}

				{/* навигатор по вопросам (итерируемся) */}
				<div>
					{test.questions.sort((a, b) => (a.number > b.number) ? 1 : -1).map(q =>
						<Button
							key={q.number}
							variant='outline-dark'
							className={q.number === qId ? 'bg-dark me-1 text-white' : userAnswers.filter(a => a.questionNumber === q.number).length > 0 ? 'bg-success me-1 text-white' : 'me-1'}
							onClick={() =>
								navigate(TESTS_ROUTE + tId + QUESTIONS_ROUTE + q.number)}
						>
							{q.number}
						</Button>)}
				</div>

				<Row >

					{/* Варианты после ответа */}
					{chosenAns !== 0 && question.choices.map(c =>
						<Col md={6} key={c.id}>
							<Choice2
								choice={c}
								chosenAns={chosenAns}
								isCorrectAns={correctAns === c.number}
								className={true}
							/>
						</Col>)}

					{/* Варианты до ответа */}
					{chosenAns === 0 && question.choices.sort((a, b) => (a.number > b.number) ? 1 : -1).map(c =>
						<Col md={6} key={c.id} onClick={() => { onChoiceClick(c) }}>
							<Choice1 choice={c} className={false} />
						</Col>)}

				</Row>

				<hr />
				{/* блок с кнопками */}
				<div className='d-flex justify-content-end'>
					{/* кнопка перехода */}
					<Button variant='outline-dark' className='me-3' onClick={() => {
						if (Number(qId) === test.questions.length && userAnswers.length !== test.questions.length) {
							alert('ответьте на все вопросы')
						}
						else {nextQuestion()}
					}}>
						{userAnswers.length === test.questions.length ? "Закончить тест" : Number(qId)=== test.questions.length ? 'ответьте на все вопросы' : "Следующий вопрос"}
					</Button>
					
				</div>

			</div>
		</Container>
	);
});

					// {/* кнопка пропустить */}
					// <Button variant='outline-dark' className='' onClick={() => { navigate(TESTS_ROUTE + tId + QUESTIONS_ROUTE + (Number(qId) + 1)) }}>
					// 	пропустить
					// </Button>
export default QuestionsPage;
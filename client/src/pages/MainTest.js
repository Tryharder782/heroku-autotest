import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import adMock from '../assets/adMock.png'
import Choice1 from '../components/Choice1';
import Choice2 from '../components/Choice2';
import { fetchExactQuestion } from '../http/TestsAPI';
import { MAIN_TEST_FAILED, MAIN_TEST_RESULTS_ROUTE } from '../utils/consts';

const MainTest = observer(() => {

	const navigate = useNavigate()


	let questionNumbers = []
	let questions = []
	let testIsStarted = null
	let startDate
	const [currentQuestion, setCurrentQuestion] = useState(questionNumbers[0])
	const [chosenAns, setChosenAns] = useState(0)
	const [rightAnswers, setRightAnswers] = useState(0)
	const [wrongAnswers, setWrongAnswers] = useState(0)
	const [userAnswers, setUserAnswers] = useState([])
	const [timer, setTimer] = useState()
	const [question, setQuestion] = useState({

		picture: 'questionMock.png',
		choices: [
			{ number: 1 },
			{ number: 3 },
			{ number: 2 },
			{ number: 4 },
		]
	})


	let myTimer


	const setMyTimer = () => {
		myTimer = setInterval(timerHandler, 1000)
	}
	const timerHandler = () => {
		console.log('timer set');
		setTimer(1200 - (Date.now() - startDate) / 1000)
	}




	// обработчик нажатия на вариант ответа
	const onChoiceClick = (c) => {
		console.log('chosen', c.number, question.correctAns);
		localStorage.setItem('userAnswers', JSON.stringify([...userAnswers, { questionNumber: currentQuestion, userAnswer: c.number, correct: c.number === question.correctAns }]))
		let answers = JSON.parse(localStorage.getItem('userAnswers'))
		setUserAnswers(answers)


		if (c.number === question.correctAns) {
			setRightAnswers(rightAnswers + 1)
			localStorage.setItem('rightAnswers', JSON.stringify(rightAnswers + 1))
		}
		else if (c.number !== question.correctAns && wrongAnswers < 2) {
			setWrongAnswers(wrongAnswers + 1)
			localStorage.setItem('wrongAnswers', JSON.stringify(wrongAnswers + 1))
		}
		console.log('sheesh');
		setChosenAns(c.number)
	}

	// обраотчик нажатия на кнопку "следующий вопрос"
	const onNextQClick = () => {
		let missingNumberss = missingNumbers(questionNumbers, userAnswers.map(a => a.questionNumber))
		if (chosenAns === 0) {
			alert('выберите вариант ответа или нажмите кнопку "пропустить"')
		}
		else if (userAnswers.length === questionNumbers.length) {					//ЕСЛИ отвечены все вопросы
			localStorage.setItem('testEnded', true)
			// Get a reference to the last interval + 1
			const interval_id = window.setInterval(function () { }, Number.MAX_SAFE_INTEGER);

			// Clear any timeout/interval up to that id
			for (let i = 1; i < interval_id; i++) {
				window.clearInterval(i);
			}
			navigate(MAIN_TEST_RESULTS_ROUTE)													//перенаправляем на страницу с результатами
			
		}
		else if (questionNumbers.indexOf(currentQuestion) === 19) {
			setCurrentQuestion(missingNumberss[0])
		}
		else {
			setCurrentQuestion(missingNumberss[missingNumberss.indexOf(currentQuestion) + 1])
			if (wrongAnswers >= 2) {
				// Get a reference to the last interval + 1
				const interval_id = window.setInterval(function () { }, Number.MAX_SAFE_INTEGER);

				// Clear any timeout/interval up to that id
				for (let i = 1; i < interval_id; i++) {
					window.clearInterval(i);
				}
				navigate(MAIN_TEST_FAILED)
			}
			setCurrentQuestion(questionNumbers[questionNumbers.indexOf(currentQuestion) + 1])
			setChosenAns(0)
		}
	}



	//обработчик кнопки "пропустить"
	const onSkipClick = () => {
		if (chosenAns === 0) {
			let missingNumberss = missingNumbers(questionNumbers, userAnswers.map(a => a.questionNumber))
			console.log(missingNumberss);
			if (wrongAnswers >= 2) {
				// Get a reference to the last interval + 1
				const interval_id = window.setInterval(function () { }, Number.MAX_SAFE_INTEGER);

				// Clear any timeout/interval up to that id
				for (let i = 1; i < interval_id; i++) {
					window.clearInterval(i);
				}
				navigate(MAIN_TEST_FAILED)
			}
			else if (questionNumbers.indexOf(currentQuestion) === 19) {
				setCurrentQuestion(missingNumberss[0])
			} else {
				setCurrentQuestion(missingNumberss[missingNumberss.indexOf(currentQuestion) + 1])
			}
			setChosenAns(0)
		}

	}


	// функция, возвращающая недостающие числа из массива
	const missingNumbers = (givenNumbers, currentNumbers) => {
		return givenNumbers.filter(x => !currentNumbers.includes(x))
	}

	console.log();

	// Если тест только запустился, стейт списка вопросов теста заплняется и запоминается, пока не очитсится хранилище
	questionNumbers = JSON.parse(localStorage.getItem('questionNumbers'))
	if (questionNumbers === null) {
		questionNumbers = []
		for (let i = 0; i < 20; i++) {
			const randomNumbers = () => {
				const newNumb = Math.floor(Math.random() * 60 + 1)
				if (questionNumbers.find(q => q === newNumb) === undefined) {
					questionNumbers.push(newNumb)
				} else {
					randomNumbers()
				}
			}
			randomNumbers()
		}
		localStorage.setItem('questionNumbers', JSON.stringify(questionNumbers))
	}


	// Если тест только запустился, стейт начала теста меняется и запоминается, пока не очитсится хранилище
	testIsStarted = JSON.parse(localStorage.getItem('testIsStarted'))
	if (testIsStarted === null) {
		startDate = Date.now()
		setMyTimer()
		testIsStarted = 5
		console.log(testIsStarted);
		localStorage.setItem('testIsStarted', JSON.stringify(testIsStarted))
	}

	// обновка вопроса при переходе
	useEffect(() => {
		fetchExactQuestion(currentQuestion).then(data => {
			setQuestion(data); console.log("question fetched", currentQuestion)
		})

		const answers = JSON.parse(localStorage.getItem('userAnswers'))	//загружаем из локального хранилища ответы пользователя
		if (answers) {
			setUserAnswers(answers)
			console.log('sheesh');
			if (answers.find(a => a.questionNumber === currentQuestion)) {
				setChosenAns(answers.find(a => a.questionNumber === currentQuestion).userAnswer)
			}
			else {
				setChosenAns(0)
			}
		}

	}, [currentQuestion, chosenAns])

	// проверка начался тест или нет
	useEffect(() => {

		if (JSON.parse(localStorage.getItem('wrongAnswers')) !== null) {
			setWrongAnswers(JSON.parse(localStorage.getItem('wrongAnswers')))
		}

		if (JSON.parse(localStorage.getItem('rightAnswers')) !== null) {
			setWrongAnswers(JSON.parse(localStorage.getItem('rightAnswers')))
		}



		testIsStarted = JSON.parse(localStorage.getItem('testIsStarted'))
		console.log(testIsStarted);
		if (testIsStarted === 5) {
			setCurrentQuestion(questionNumbers[0])
			localStorage.setItem('testIsStarted', JSON.stringify(testIsStarted))
		}
	}, [])

	console.log('ans-dQ', userAnswers.map(a => a.questionNumber));
	console.log('Qnumb-s', questionNumbers);
	console.log('localWrAns', wrongAnswers);
	console.log('missing numbers', missingNumbers(questionNumbers, userAnswers.map(a => a.questionNumber)));
	console.log('storageWrAns', JSON.parse(localStorage.getItem('wrongAnswers')));





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
				<h2>Вопрос #{questionNumbers.indexOf(currentQuestion) + 1}</h2>
				Неправильных ответов:{wrongAnswers} <br />
				Правильный ответ:{question.correctAns} <br />
				Времени осталось:{Math.floor(timer / 60)}:{Math.floor(timer % 60)}
				<br />
				<Row >

					{/* Варианты после ответа */}
					{chosenAns !== 0 && question.choices.sort((a, b) => (a.number > b.number) ? 1 : -1).map(c =>
						<Col md={6} key={c.id}>
							<Choice2
								choice={c}
								chosenAns={chosenAns}
								isCorrectAns={question.correctAns === c.number}
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
					<Button variant='outline-dark' onClick={onSkipClick} className='me-4'>Пропустить</Button>
					<Button variant='outline-dark' onClick={onNextQClick}>Следующий вопрос</Button>
				</div>

			</div>
		</Container>
	);
});

export default MainTest;
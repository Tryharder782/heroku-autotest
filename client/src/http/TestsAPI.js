import {$authHost} from '../http/index'

export const createTestResults = async(testResults) => {
	const {data} = await $authHost.post('/api/userResults/', testResults)
	return data
}
export const updateQuestion = async(question) => {
	const {data} = await $authHost.put('/api/questions/', question)
	return data
}
export const createChoice = async(choice) => {
	const {data} = await $authHost.post('/api/choices/', choice)
	return data
}
export const createTest = async(test) => {
	const {data} = await $authHost.post('/api/tests/', test)
	return data
}
export const createQuestion = async(question) => {
	const {data} = await $authHost.post('api/questions/', question)
	return data
}

export const fetchAllTests = async() => {
	const {data} = await $authHost.get('/api/tests/')
	return data
}
export const fetchExactTest = async(id) => {
	const {data} = await $authHost.get('/api/tests/' + id)
	return data
}
export const fetchByTestQuestion = async(tId,qId) => {
	const {data} = await $authHost.get('/api/questions/byTest/'+ tId+ '/' + qId)
	return data
}
export const fetchExactQuestion = async(qId) => {
	const {data} = await $authHost.get('/api/questions/exact/' + qId)
	return data
}
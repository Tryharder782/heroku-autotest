import {makeAutoObservable} from 'mobx'

export default class TestStore {
	constructor() {
		this._tests = [
			{id: "1" , title : "test 1", description: "desc for test 1"},
			{id: "2" , title : "test 1", description: "desc for test 1"},
			{id: "3" , title : "test 1", description: "desc for test 1"},
			{id: "4" , title : "test 1", description: "desc for test 1"},
			{id: "5" , title : "test 1", description: "desc for test 1"},
			{id: "6" , title : "test 1", description: "desc for test 1"},
			{id: "7" , title : "test 1", description: "desc for test 1"},
		]
		this._rightAnswers = [0]
		this._wrongAnswers = [0]
		makeAutoObservable(this)
	}
	setTests(tests) {
		this._tests = tests
	}
	setRightAnswers(answer) {
		this._rightAnswers.push(answer)
	}
	setWrongAnswers(answer) {
		this._wrongAnswers.push(answer)
	}

	get tests() {
		return this._tests
	}
	get rightAnswers() {
		return this._rightAnswers
	}
	get wrongAnswers() {
		return this._wrongAnswers
	}
}
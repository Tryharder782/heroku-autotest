import Admin from "./pages/Admin"
import Profile from "./pages/Profile"
import TestResults from "./pages/TestResultsPage"
import QuestionsPage from "./pages/QuestionsPage"
import Auth from "./pages/Auth"
import TestsPage from "./pages/TestsPage"
import { ADMIN_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, QUESTIONS_ROUTE, REGISTRATION_ROUTE, RESULTS_ROUTE, TESTS_ROUTE } from "./utils/consts"


export const authRoutes = [
	{
		path : ADMIN_ROUTE,
		Component : <Admin />
	},
	{
		path : PROFILE_ROUTE,
		Component : <Profile />
	},
	{
		path : TESTS_ROUTE + ":tId" + QUESTIONS_ROUTE + ":qId",
		Component : <QuestionsPage />
	},
	{
		path : REGISTRATION_ROUTE,
		Component : <Auth />
	},
	{
		path : RESULTS_ROUTE,
		Component : <TestResults />
	},
]

export const publicRoutes = [
	{
		path : TESTS_ROUTE,
		Component : <TestsPage />
	},
	{
		path : LOGIN_ROUTE,
		Component : <Auth />
	},
]
import Prod from "./Production";

const url = Prod ? "https://xpense-backend.onrender.com/api" : "";

export default {
	// authentication API's
	Register: `${url}/auth/register`,
	Login: `${url}/auth/login`,

	// Expense API's
	createExpense: `${url}/expense/createExpense`,
	getExpense: `${url}/expense/getExpenses`,
    getExpenseById: `${url}/expense/expense/getExpenseById`,
	getRecentExpenses: `${url}/expense/recentExpenses`,
	weeklyExpenses: `${url}/expense/weeklyExpenses`,
	monthlyExpenses: `${url}/expense/monthlyExpenses`,

	//Budget API's
	createBudget: `${url}/budget/createBudget`,
	getBudgets: `${url}/budget/getBudgets`,
	getBudgetCategories: `${url}/budget/getBudgetCategory/expenses`, //
};

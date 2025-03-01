import Plan from "../assets/svg/BusinessPlan.svg";
import Piggy from "../assets/svg/Piggy.svg";
import Investment from "../assets/svg/Investment.svg";

export const Slides = [
	{
		id: 1,
		heading: "Gain total control of your money",
		subHeading: "Become your own money manager and make every cent count",
		images: <Investment />,
	},
	{
		id: 2,
		heading: "Know where your money goes",
		subHeading:
			"Track your transaction easily, with categories and financial report ",
		images: <Piggy width={400} height={300} />,
	},
	{
		id: 3,
		heading: "Planning Ahead",
		subHeading: "Setup your budget for each category so you in control",
		images: <Plan />,
	},
];
export const CardData = [
	{
		amount: 200,
		item: "Netflix",
		date: "12/05/2022",
		category: "Electronics",
	},
	{
		amount: 500,
		item: "Groceries",
		date: "11/05/2022",
		category: "Groceries",
	},
	{
		amount: 300,
		item: "Salary",
		date: "10/05/2022",
		category: "Salary",
	},
	{
		amount: 150,
		item: "Petrol",
		date: "09/05/2022",
		category: "Fuel",
	},
	{
		amount: 400,
		item: "Books",
		date: "08/05/2022",
		category: "Books",
	},
	{
		amount: 700,
		item: "Transportation",
		date: "07/05/2022",
		category: "Transportation",
	},
	{
		amount: 250,
		item: "Health Insurance",
		date: "06/05/2022",
		category: "Health Insurance",
	},
	{
		amount: 900,
		item: "Travel",
		date: "05/05/2022",
		category: "Travel",
	},
	{
		amount: 600,
		item: "Gifts",
		date: "04/05/2022",
		category: "Gifts",
	},
	{
		amount: 800,
		item: "Miscellaneous",
		date: "03/05/2022",
		category: "Miscellaneous",
	},
	{
		amount: 1200,
		item: "Emergency Fund",
		date: "02/05/2022",
		category: "Emergency Fund",
	},
];


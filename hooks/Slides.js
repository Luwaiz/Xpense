import Plan from "../assets/svg/BusinessPlan.svg";
import Piggy from "../assets/svg/Piggy.svg";
import Investment from "../assets/svg/Investment.svg";

export default [
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

import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

const Main = () => {
  
	const[index,setIndex] = useState(1);
	const handleClick = () => {
		setIndex((prev) => prev + 1);
	}

	let navigate = useNavigate();
	const logoutRoute = () => {
		navigate("/logout");
	}

	return (
	<div>
		<h1> Hello Team Pilot!</h1>
		<p>You are logged in to the home page!</p>	
		<p> Value of Index is: {index} </p>
		<button onClick={handleClick}> Increase Index </button>

		<button onClick={logoutRoute}>Logout!</button>
	</div>
  )
}

export default Main


// Import React, useState, useEffect, and axios
import React, { useState, useEffect } from "react";
import axios from "axios";

// Import navigation for redirecting the user to other pages
import { Link, useNavigate } from "react-router-dom";

// Import toastify for showing the API response messages
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaThumbsUp } from "react-icons/fa";
// Define the Home component
const Home = () => {
	// Define the state variable for the users data
	const [users, setUsers] = useState([]);

	// Define the state variable for the user authentication status
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	// Define the navigate function for redirection
	const navigate = useNavigate();

	// Define the useEffect hook for fetching the users data from the API
	useEffect(() => {
		// Define the async function for getting the data
		const getData = async () => {
			// Send a get request to the API endpoint
			try {
				const response = await axios.get(
					"http://127.0.0.1:8000/api/getallusers"
				);

				// If the response is successful, set the users state with the data
				if (response.status === 200) {
					setUsers(response.data.data);
				}
			} catch (error) {
				// If the response is an error, log the error message
				console.error(error.message);
			}
		};

		// Call the async function
		getData();
	}, []);

	// Define the useEffect hook for checking the user authentication status
	useEffect(() => {
		// Get the token from the local storage
		const token = localStorage.getItem("token");

		// If the token is found, set the isAuthenticated state to true
		if (token) {
			setIsAuthenticated(true);
		} else {
			// If the token is not found, set the isAuthenticated state to false
			setIsAuthenticated(false);
		}
	}, []);

	// Define the handleLike function for liking a user
	const handleLike = async (userId, profilePictureId) => {
		// Get the token from the local storage
		const token = localStorage.getItem("token");

		// If the token is not found, redirect the user to the login page
		if (!token) {
			navigate("/login");
			return;
		}

		// Create a config object with the token in the header
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		// Create a data object with the user id and profile picture id
		const data = {
			user_id: userId,
			profile_picture_id: profilePictureId,
		};

		// Send a post request to the like API endpoint with the data and config
		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/like",
				data,
				config
			);

			// If the response is successful, show a success message and update the users state with the new total likes
			if (response.status === 201) {
				// Show the success message in the toast
				toast.success(response.data.message);

				// Find the index of the user in the users array
				const index = users.findIndex((user) => user.id === userId);

				// Make a copy of the users array
				const newUsers = [...users];

				// Increment the total likes of the user in the copy
				newUsers[index].total_likes++;

				// Set the users state with the copy
				setUsers(newUsers);
			}
		} catch (error) {
			// If the response is an error, show an error message
			// Show the error message in the toast
			toast.error(error.response.data.message);
		}
	};

	// Define the handleLogout function for logging out the user
	const handleLogout = () => {
		// Remove the token from the local storage
		localStorage.removeItem("token");

		// Set the isAuthenticated state to false
		setIsAuthenticated(false);

		// Show a success message in the toast
		toast.success("You have logged out successfully");

		// Redirect the user to the login page after 3 seconds
		setTimeout(() => {
			navigate("/login");
		}, 3000);
	};

	// Return the JSX code for the home page
	return (
		<div className="home bg-gray-100 min-h-screen">
			<div className="container mx-auto px-4 py-8">
				<div className="flex items-center justify-between mb-4">
					<h1 className="text-4xl font-bold text-orange-600">LinkTok</h1>
					<div className="flex space-x-4">
						{isAuthenticated ? (
							// If the user is authenticated, show the logout button
							<button
								onClick={handleLogout}
								className="bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600">
								Logout
							</button>
						) : (
							// If the user is not authenticated, show the register and login buttons
							<>
								<Link
									to="/registration"
									className="bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600">
									Register
								</Link>

								<Link
									to="/login"
									className="bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600">
									Login
								</Link>
							</>
						)}
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{users.map((user) => (
						<div
							key={user.id}
							className="border border-slate-100 rounded-lg overflow-hidden">
							<img
								src={user.image_link}
								className="object-cover w-full h-96 mb-4"
								alt={user.username}
							/>
							<div className="p-4">
								<p className="mb-4 text-2xl font-bold text-gray-800">
									{user.username}
								</p>
								<p className="mb-4 text-lg text-gray-500">{user.email}</p>
								<p className="mb-4 text-lg text-gray-500">
									interests: {user.interests}
								</p>
								<p className="mb-4 text-lg text-gray-500">
									Total likes: {user.total_likes}
								</p>
								<button
									onClick={() => handleLike(user.id, user.profile_picture_id)}
									className="flex  bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600">
									<FaThumbsUp className="mt-1" />
									<span className="material-icons ml-2 align-top">Like</span>
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

// Export the Home component
export default Home;

// Import React, useState, useEffect, and axios
import React, { useState, useEffect } from "react";
import axios from "axios";

// Import toastify for showing the API response messages
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import navigation for redirecting the user to the home page
import { Link, useNavigate } from "react-router-dom";

//importing image
import image from "../images/pic.png";

// Define the Register component
const Register = () => {
	// Define the state variables for the form inputs
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [profilePicture, setProfilePicture] = useState(null);
	const [interests, setInterests] = useState("");

	// Define the navigate function for redirection
	const navigate = useNavigate();

	// Define the handleSubmit function for submitting the form data
	const handleSubmit = async (e) => {
		// Prevent the default behavior of the form
		e.preventDefault();

		// Create a new FormData object to store the form data
		const formData = new FormData();
		formData.append("username", username);
		formData.append("email", email);
		formData.append("password", password);
		formData.append("password_confirmation", confirmPassword);
		formData.append("profile_picture", profilePicture);
		formData.append("interests", interests);

		// Send a post request to the API endpoint with the form data
		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/register",
				formData
			);

			// If the response is successful, show a success message and save the token in the local storage
			if (response.status === 201) {
				// Show the success message in the toast
				toast.success(response.data.message);

				localStorage.setItem("token", response.data.token);

				// Redirect the user to the home page after 3 seconds
				setTimeout(() => {
					navigate("/");
				}, 3000);
			}
		} catch (error) {
			// If the response is an error, show an error message
			// Show the error message in the toast
			toast.error(error.response.data.message);
		}
	};

	// Return the JSX code for the registration form
	return (
		<div className="register flex flex-col items-center justify-center min-h-auto bg-gray-100">
			<div className="flex flex-wrap">
				<form
					onSubmit={handleSubmit}
					className="w-96 bg-white p-8 rounded-lg shadow-lg ">
					<h1 className="text-4xl font-bold text-orange-600 mb-8">Register</h1>

					<div className="form-group mb-3">
						<label
							htmlFor="username"
							className="block text-gray-700 font-medium">
							Username
						</label>
						<input
							type="text"
							id="username"
							name="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
						/>
					</div>
					<div className="form-group mb-3">
						<label
							htmlFor="email"
							className="block text-gray-700 font-medium">
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
						/>
					</div>
					<div className="form-group mb-3">
						<label
							htmlFor="password"
							className="block text-gray-700 font-medium">
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
						/>
					</div>
					<div className="form-group mb-3">
						<label
							htmlFor="confirmPassword"
							className="block text-gray-700 font-medium">
							Confirm Password
						</label>
						<input
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
						/>
					</div>
					<div className="form-group mb-3">
						<label
							htmlFor="profilePicture"
							className="block text-gray-700 font-medium">
							Profile Picture
						</label>
						<input
							type="file"
							id="profilePicture"
							name="profilePicture"
							accept="image/*"
							onChange={(e) => setProfilePicture(e.target.files[0])}
							required
							className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
						/>
					</div>
					<div className="form-group mb-3">
						<label
							htmlFor="interests"
							className="block text-gray-700 font-medium">
							Interests
						</label>
						<input
							type="text"
							id="interests"
							name="interests"
							value={interests}
							onChange={(e) => setInterests(e.target.value)}
							className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600">
						Register
					</button>
					<h1 className="text-base font-semibold text-black mt-8">
						already have an account?
						<Link
							to="/login"
							className="text-orange-600 hover:text-zinc-950 ">
							login
						</Link>
					</h1>
				</form>
				<ToastContainer />
				<div className="w-full md:w-1/2">
					<img
						src={image}
						alt="Image"
						className="object-cover w-full h-full"
					/>
				</div>
			</div>
		</div>
	);
};

// Export the Register component
export default Register;

// src/components/PasswordResetForm.js
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const ChangePassword = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		// token: "", // Remove this or use it for some purpose
		old_password: "",
		new_password: "",
		new_password_confirmation: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
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
			}, // Add a closing curly brace here
		};
		try {
			// Check if the old password and the new password are the same
			if (formData.old_password === formData.new_password) {
				toast.error("The new password cannot be the same as the old password.");
				return;
			}
			// Check if the new password and the new password confirmation match
			if (formData.new_password !== formData.new_password_confirmation) {
				toast.error("The new password and the confirmation do not match.");
				return;
			}
			const response = await axios.post(
				"http://127.0.0.1:8000/api/reset",
				formData,
				config
			);
			toast.success(response.data.message);
			setTimeout(() => {
				navigate("/"); // Redirect to the home page after 2 seconds
			}, 2000);
			// Reset form fields or redirect to another page
			setFormData({
				old_password: "",
				new_password: "",
				new_password_confirmation: "",
			}); // Clear the formData state
			// navigate("/home"); // Redirect to another route
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	return (
		// Use a flex container with column direction and center alignment
		<div className="password-reset-form flex flex-col  items-center">
			{/* // Use a large heading with a orange color and a margin */}
			<h2 className="text-4xl text-orange-600 m-4">Password Reset</h2>
			{/* // Use a form element with a max width, a margin, and a text center alignment */}
			<form
				onSubmit={handleSubmit}
				className="max-w-md m-4 text-center">
				{/* // Use a grid container with one column and a gap for the form groups */}
				<div className="grid grid-cols-1 gap-4">
					{/* // Use a flex container with column direction and start alignment for each form group */}
					<div className="form-group flex flex-col items-start">
						{/* // Use a label element with a bold font, a dark gray color, and a margin */}
						<label
							htmlFor="old_password"
							className="font-bold text-gray-700 m-1">
							Old Password
						</label>
						{/* // Use an input element with a border, a padding, a rounded corner, a shadow, and a focus ring */}
						<input
							type="password"
							id="old_password"
							name="old_password"
							value={formData.old_password}
							onChange={handleChange}
							required
							className="border border-gray-300 p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400"
						/>
					</div>

					<div className="form-group flex flex-col items-start">
						<label
							htmlFor="new_password"
							className="font-bold text-gray-700 m-1">
							New Password
						</label>
						<input
							type="password"
							id="new_password"
							name="new_password"
							value={formData.new_password}
							onChange={handleChange}
							required
							minLength={6}
							className="border border-gray-300 p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400"
						/>
					</div>
					<div className="form-group flex flex-col items-start">
						<label
							htmlFor="new_password_confirmation"
							className="font-bold text-gray-700 m-1">
							Confirm New Password
						</label>
						<input
							type="password"
							id="new_password_confirmation"
							name="new_password_confirmation"
							value={formData.new_password_confirmation}
							onChange={handleChange}
							required
							minLength={6}
							className="border border-gray-300 p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400"
						/>
					</div>
				</div>
				{/* // Use a div element with a flex container and a center alignment for the button */}
				<div className="flex justify-center">
					{/* // Use a button element with a orange background, a white text, a padding, a rounded corner, a shadow, and a hover effect */}
					<button
						type="submit"
						className="bg-orange-600 text-white p-2 rounded-lg shadow-md hover:bg-orange-700 mt-5">
						Reset Password
					</button>
				</div>
			</form>
			<h1 className="text-lg">
				back to home{" "}
				<Link
					to="/"
					className="text-orange-600">
					Home
				</Link>
			</h1>
			<ToastContainer />
		</div>
	);
};

export default ChangePassword;

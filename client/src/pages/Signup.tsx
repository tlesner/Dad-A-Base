import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
	const [formState, setFormState] = useState({
		username: '',
		email: '',
		password: '',
	});
	const [addUser, { error, data }] = useMutation(ADD_USER);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		
		setFormState({
			...formState,
			[name]: value,
		});
	};

	const handleFormSubmit = async (event: FormEvent) => {
		event.preventDefault();

		console.log('form state: ', { ...formState });
		try {
			const { data } = await addUser({
				variables: { input: { ...formState } },
			});

			console.log('Data: ', data);
			console.log('Data.addUser.token: ', data.addUser.token);

			Auth.login(data.addUser.token);
		} catch (e: any) {
			// console.error(e);
			console.error(
				'Error adding user:',
				e.graphQLErrors || e.networkError || e
			);
		}
	};

	return (
		<main className="flex-row justify-center mb-4">
			<div className="col-12 col-lg-10">
				<div className="card">
					<h4 className="card-header bg-dark text-light p-2">
						Sign Up
					</h4>
					<div className="card-body">
						{data ? (
							<p>
								Success! You may now head{' '}
								<Link to="/">back to the homepage.</Link>
							</p>
						) : (
							<form onSubmit={handleFormSubmit}>
								<input
									className="form-input"
									placeholder="Your username"
									name="username"
									type="text"
									value={formState.username}
									onChange={handleChange}
								/>
								<input
									className="form-input"
									placeholder="Your email"
									name="email"
									type="email"
									value={formState.email}
									onChange={handleChange}
								/>
								<input
									className="form-input"
									placeholder="******"
									name="password"
									type="password"
									value={formState.password}
									onChange={handleChange}
								/>
								<button
									className="btn btn-block btn-primary"
									style={{ cursor: 'pointer' }}
									type="submit">
									Submit
								</button>
							</form>
						)}

						{error && (
							<div className="my-3 p-3 bg-danger text-white">
								{error.message}
							</div>
						)}
					</div>
				</div>
			</div>
		</main>
	);
};

export default Signup;

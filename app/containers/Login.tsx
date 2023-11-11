'use client';

// @packages
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';

// @scripts
import useLogin from 'app/hooks/useLogin';

// @components
import Header from 'app/components/Header';
import Form, { TInput } from 'app/components/Form';

//@types
import { IFormInputLogin } from 'app/types/auth';

// @styles
import styles from 'app/styles/views/login.module.scss';

const Login = () => {
	const { onLogin } = useLogin();
	const [rememberMe, setRememberMe] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { isValid },
	} = useForm<IFormInputLogin>();

	const onSubmit: SubmitHandler<IFormInputLogin> = (data) => {
		onLogin({ ...data, rememberMe });
	};

	const handleCheck: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setRememberMe(e.target.checked);
	};

	const INPUTS = [
		{
			autoComplete: 'email',
			id: 'email',
			required: true,
			placeholder: 'Email',
			register: register('email', { required: true }),
			type: 'email',
		},
		{
			autoComplete: 'current-password',
			id: 'password',
			required: true,
			placeholder: 'Password',
			register: register('password', { required: true }),
			type: 'password',
		},
	] as TInput[];

	return (
		<>
			<Header />
			<section className={styles.login}>
				<section className={styles['login__container']}>
					<h2>Log In</h2>
					<Form inputs={INPUTS} onSubmit={handleSubmit(onSubmit)} isValid={isValid} button='Login' />
					<div className={styles['login__container--remember-me']}>
						<label htmlFor='cbox1'>
							<input name='rememberMe' type='checkbox' id='cbox1' value={rememberMe.toString()} onChange={handleCheck} />
							Remember me
						</label>
						<a href='/'>Forgot password?</a>
					</div>
					<p className={styles['login__container--register']}>
						Doesn't have an account?
						<br />
						<Link href='/signup'>Sign up!</Link>
					</p>
				</section>
			</section>
		</>
	);
};

export default Login;

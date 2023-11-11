'use client';

// @packages
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// @scripts
import ErrorMessage from 'app/components/ErrorMessage';
import useSignUp from 'app/hooks/useSignUp';

// @components
import Header from 'app/components/Header';
import Form, { TInput } from 'app/components/Form';

//@types
import { IFormInputSignUp } from 'app/types/auth';

// @styles
import styles from 'app/styles/views/signup.module.scss';

const schema = yup
	.object({
		name: yup.string().required('Name is required'),
		email: yup.string().email().required('Email is required'),
		password: yup
			.string()
			.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?!.*\s).{8,16}$/, {
				message:
					'Password must be between 8 and 16 characters long, contain at least one number, one lowercase letter, one uppercase letter and one special character.',
			})
			.required('Password is required'),
		passwordConfirmation: yup
			.string()
			.oneOf([yup.ref('password'), null], 'Passwords must match')
			.required('Password confirmation is required'),
	})
	.required();

const Signup = () => {
	const { onSignUp } = useSignUp();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });

	const onSubmit: SubmitHandler<IFormInputSignUp> = (data) => {
		onSignUp(data);
	};

	const INPUTS = [
		{
			autoComplete: 'name',
			id: 'name',
			placeholder: 'Name',
			register: register('name'),
			type: 'text',
		},
		{
			autoComplete: 'email',
			placeholder: 'Email',
			id: 'email',
			register: register('email'),
			type: 'email',
		},
		{
			autoComplete: 'new-password',
			id: 'password',
			placeholder: 'Password',
			register: register('password'),
			type: 'password',
		},
		{
			autoComplete: 'new-password',
			id: 'passwordConfirmation',
			placeholder: 'Confirm Password',
			register: register('passwordConfirmation'),
			type: 'password',
		},
	] as TInput[];

	return (
		<>
			<Header />
			<section className={styles.register}>
				<section className={styles['register__container']}>
					<h2>Sign up</h2>
					<Form inputs={INPUTS} button='Sign up' onSubmit={handleSubmit(onSubmit)} errors={errors} />
					<p className={styles['register__container--login']}>
						Already have an account?
						<br />
						<Link href='/login'>Log in!</Link>
					</p>
				</section>
			</section>
		</>
	);
};

export default Signup;

// @packages
import { Fragment } from 'react';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';

// @components
import ErrorMessage from 'app/components/ErrorMessage';
import Input from 'app/components/Input';

// @styles
import styles from 'app/styles/components/form.module.scss';

// @types
import { IFormInputLogin, IFormInputSignUp } from 'app/types/auth';

export type TInput = {
	autoComplete?: string;
	id: string;
	name: string;
	placeholder?: string;
	register?: UseFormRegisterReturn;
	required?: boolean;
	type: React.AllHTMLAttributes<HTMLInputElement>['type'];
};

interface IFormProps extends React.HTMLProps<HTMLFormElement> {
	inputs: TInput[];
	button?: string;
	isValid?: boolean;
	errors?: FieldErrors<IFormInputSignUp | IFormInputLogin>;
}

const Form: React.FC<IFormProps> = (props) => {
	const { inputs, button, isValid = true, errors = {}, ...rest } = props;

	return (
		<form className={styles.form} {...rest}>
			{inputs.length > 0
				? inputs.map((input) => {
						return (
							<Fragment key={input.id}>
								<Input
									aria-label={input.id}
									autoComplete={input.autoComplete || 'off'}
									id={input.id}
									placeholder={input.placeholder}
									required={input.required || false}
									type={input.type}
									register={input.register}
								/>
								<ErrorMessage isShown={errors[input?.id]}>{errors[input?.id]?.message || ''}</ErrorMessage>
							</Fragment>
						);
				  })
				: null}
			<button disabled={!isValid} type='submit' className={styles.button}>
				{button || 'Submit'}
			</button>
		</form>
	);
};

export default Form;

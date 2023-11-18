// @packages
import { UseFormRegisterReturn } from 'react-hook-form';

// @types
export interface IInputProps extends React.HTMLProps<HTMLInputElement> {
	register?: UseFormRegisterReturn;
}

// @styles
import styles from 'app/styles/components/input.module.scss';

const Input: React.FC<IInputProps> = (props) => {
	const { register, ...rest } = props;
	return <input className={styles.input} {...rest} {...register} />;
};

export default Input;

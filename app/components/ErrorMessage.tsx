// @packages
import clsx from 'clsx';

// @styles
import styles from 'app/styles/components/errorMessage.module.scss';

type TErrorProps = {
	isShown?: boolean;
	children?: React.ReactNode;
};

const ErrorMessage: React.FC<TErrorProps> = (props) => {
	const { isShown, children } = props;

	return <span className={clsx(styles.error, { [styles.show]: isShown })}>{children}</span>;
};

export default ErrorMessage;

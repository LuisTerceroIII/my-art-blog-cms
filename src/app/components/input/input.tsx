import React from 'react';
import styles from './input.module.css';

interface InputProps {
	label: string;
	name: string;
	type?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, name, type, value, onChange }) => {
	return (
		<div className={styles.input}>
			<label htmlFor={name} className={styles.label}>{label}</label>
			{type === "textarea" ?
				<textarea
					id={name}
					name={name}
					className={styles.textarea}
					onChange={onChange}
					value={value}
				/> :
				<input
					id={name}
					name={name}
					type={type || 'text'}
					value={value}
					onChange={onChange}
					className={styles.inputField}
				/>
			}
		</div>
	);
};

export default Input;

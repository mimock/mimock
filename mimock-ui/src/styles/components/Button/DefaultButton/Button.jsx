import React from 'react';
import PropTypes from 'prop-types';
import { ButtonContainer } from './Button.style';
import { ButtonData } from '../ButtonData';

function Button({ variant, label }) {
	const { color, background } = getVariant(variant);

	return (
		<ButtonContainer data-testid='button' color={color} background={background}>
			{label}
		</ButtonContainer>
	);
}

function getVariant(variant) {
	return !variant ? ButtonData.DEFAULT_BUTTON : ButtonData[variant];
}

Button.propTypes = {
	label: PropTypes.string.isRequired,
	variant: PropTypes.string,
};

export default Button;

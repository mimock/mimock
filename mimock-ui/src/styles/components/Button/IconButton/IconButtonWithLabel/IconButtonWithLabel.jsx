import React from 'react';
import PropTypes from 'prop-types';
import { IconButtonData } from '../../ButtonData';
import { IconButtonWithLabelContainer } from './IconButtonWithLabel.style';
import { AiFillCopy, AiOutlineCheck } from 'react-icons/ai';
import { BiTrash, BiPlusMedical } from 'react-icons/bi';
import CloseIcon from '../CloseIcon';

function IconButtonWithLabel({ label, variant }) {
	const { color, background } = getVariant(variant);

	return (
		<IconButtonWithLabelContainer
			data-testid='icon-button-with-label'
			color={color}
			background={background}
		>
			{getIcon(variant)}
			{label}
		</IconButtonWithLabelContainer>
	);
}

function getVariant(variant) {
	return !variant ? IconButtonData.DEFAULT_BUTTON : IconButtonData[variant];
}

function getIcon(variant) {
	switch (variant) {
		case 'CLEAR_BUTTON':
			return <CloseIcon />;
		case 'DELETE_BUTTON':
			return <BiTrash />;
		case 'ADD_BUTTON':
			return <BiPlusMedical />;
		case 'COPY_BUTTON':
			return <AiFillCopy />;
		default:
			return <AiOutlineCheck />;
	}
}

IconButtonWithLabel.propTypes = {
	label: PropTypes.string.isRequired,
	variant: PropTypes.string,
};

export default IconButtonWithLabel;
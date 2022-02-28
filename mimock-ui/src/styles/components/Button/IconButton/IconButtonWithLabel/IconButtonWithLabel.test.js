import React from 'react';
import { render } from '@testing-library/react';
import IconButtonWithLabel from './IconButtonWithLabel';

describe('Button', () => {
	let tree;

	it('should render add Button', async () => {
		tree = await render(
			<IconButtonWithLabel
				background={'bg-green-300'}
				color={'text-lime-700'}
				label='Add'
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('icon-button-with-label')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render clear Button', async () => {
		tree = await render(
			<IconButtonWithLabel
				background={'bg-red-300'}
				color={'text-red-800'}
				label='Clear'
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('icon-button-with-label')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render delete Button', async () => {
		tree = await render(
			<IconButtonWithLabel
				background={'bg-red-600'}
				color={'text-white'}
				label='Delete'
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('icon-button-with-label')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render copy Button', async () => {
		tree = await render(
			<IconButtonWithLabel
				background={'bg-blue-600'}
				color={'text-white'}
				label='Copy'
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('icon-button-with-label')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render default Button when variant is null', async () => {
		tree = await render(<IconButtonWithLabel label='Default' />);

		const { getByTestId, container } = tree;

		expect(getByTestId('icon-button-with-label')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
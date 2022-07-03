import React, { useEffect, useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';
import { VscListFlat, VscCode } from 'react-icons/vsc';
import { TextInput } from 'styles';
import { useRecoilState } from 'recoil';
import queryString from 'query-string';
import { ButtonVariants } from 'styles/Button';
import newMockFieldsAtom from 'atoms/newMockFieldsAtom';
import {
	QueryParamsWrapper,
	InputContainer,
	AddIcon,
	DeleteIcon,
	ActionToolTip,
	NoQueryParam,
	NoQueryParamLabel,
	QueryParamTextWrapper,
	QueryParamText,
	SaveQueryParamButton,
} from './QueryParam.style';

export default function QueryParam() {
	const [inputIndex, setInputIndex] = useState([]);
	const [counter, setCounter] = useState(0);
	const [inputState, setInputState] = useState({});
	const [viewMode, setViewMode] = useState('text');
	const [queryParamValue, setQueryParamValue] = useState('');
	const [mockData, setMockData] = useRecoilState(newMockFieldsAtom);

	useEffect(() => {
		if (mockData.queryParams) {
			setQueryParamValue(mockData.queryParams);
		}
	}, [mockData.queryParams]);

	useEffect(() => {
		const queryParams = queryString.parse(queryParamValue);
		const keys = Object.keys(queryParams);

		if (queryParamValue === '=') {
			setQueryParamValue('');
		}

		if (queryParams && keys.length) {
			const indices = keys.map((key, idx) => idx);
			setInputIndex(indices);
			setCounter(keys.length);

			const inputStates = {};
			indices.forEach((idx) => {
				inputStates[`queryParam_${idx}_key`] = keys[idx];
				inputStates[`queryParam_${idx}_value`] = queryParams[keys[idx]];
			});

			setInputState(inputStates);
		} else {
			setInputIndex([0]);
			setCounter(1);
			setInputState({
				[`queryParam_${0}_key`]: '',
				[`queryParam_${0}_value`]: '',
			});
		}
	}, [queryParamValue]);

	const buildQueryParams = () => {
		let paramObject = {};
		inputIndex.forEach((idx) => {
			paramObject[inputState[`queryParam_${idx}_key`]] =
				inputState[`queryParam_${idx}_value`];
		});

		setQueryParamValue(queryString.stringify(paramObject));
	};

	const input = (index) => {
		return (
			<InputContainer key={`queryParamContainer-${index}`}>
				<TextInput
					name={`queryParam_${index}_key`}
					dataTestId={`queryParam_${index}_key`}
					placeHolder='key'
					value={inputState[`queryParam_${index}_key`]}
					onChange={(e) => {
						setInputState({
							...inputState,
							[`queryParam_${index}_key`]: e.target.value,
						});
					}}
				/>
				<TextInput
					name={`queryParam_${index}_value`}
					dataTestId={`queryParam_${index}_value`}
					placeHolder='value'
					value={inputState[`queryParam_${index}_value`]}
					onChange={(e) => {
						setInputState({
							...inputState,
							[`queryParam_${index}_value`]: e.target.value,
						});
					}}
				/>
				<ActionToolTip
					data-testid={`remove-param-tooltip-${index}`}
					key={'tooltip-remove'}
					title={'Remove param'}
					arrow
				>
					<IconButton
						onClick={() => {
							removeInput(index);
						}}
					>
						<DeleteIcon />
					</IconButton>
				</ActionToolTip>
			</InputContainer>
		);
	};

	const addInput = () => {
		setInputIndex([...inputIndex, counter]);
		setCounter(counter + 1);
		setInputState({
			...inputState,
			[`queryParam.[${counter}].key`]: '',
			[`queryParam.[${counter}].value`]: '',
		});
	};

	const removeInput = (index) => {
		const newInputIndex = inputIndex.filter((i) => i !== index);
		setInputIndex(newInputIndex);
		setCounter(counter - 1);

		let tempInputValues = inputState;
		delete tempInputValues[`queryParam_${index}_key`];
		delete tempInputValues[`queryParam_${index}_value`];

		setInputState(tempInputValues);
	};

	const saveQueryParams = (e) => {
		e.preventDefault();

		let paramObject = {};
		inputIndex.forEach((idx) => {
			paramObject[inputState[`queryParam_${idx}_key`]] =
				inputState[`queryParam_${idx}_value`];
		});
		setMockData({
			...mockData,
			queryParams: queryString.stringify(paramObject),
		});
	};

	return (
		<QueryParamsWrapper
			data-testid='query-param-form'
			onSubmit={saveQueryParams}
		>
			<ToggleButtonGroup
				value={viewMode}
				color='primary'
				data-testid='view-mode'
				exclusive
				onChange={(e, mode) => {
					if (mode !== null) {
						buildQueryParams();
						setViewMode(viewMode === 'text' ? 'code' : 'text');
					}
				}}
			>
				<ToggleButton data-testid='view-mode-text' value='text'>
					<VscListFlat />
				</ToggleButton>
				<If condition={inputIndex && inputIndex.length !== 0}>
					<ToggleButton data-testid='view-mode-code' value='code'>
						<VscCode />
					</ToggleButton>
				</If>
			</ToggleButtonGroup>
			<If condition={viewMode === 'text'}>
				<ActionToolTip
					data-testid='add-param-button'
					key={'tooltip-add'}
					title={'Add new query param'}
					arrow
				>
					<IconButton
						onClick={() => {
							addInput();
						}}
					>
						<AddIcon />
					</IconButton>
				</ActionToolTip>
			</If>
			<If condition={inputIndex.length === 0}>
				<NoQueryParam data-testid='no-query-param'>
					<NoQueryParamLabel>No query params added yet</NoQueryParamLabel>
				</NoQueryParam>
			</If>
			<Choose>
				<When condition={viewMode === 'text'}>
					<For each='index' index='idx' of={inputIndex}>
						{input(index)}
					</For>
				</When>
				<Otherwise>
					<If condition={inputIndex.length !== 0}>
						<QueryParamTextWrapper data-testid='query-param-text'>
							<QueryParamText
								type='text'
								data-testid='query-param-text-input'
								placeholder='Enter query params'
								value={queryParamValue}
								onChange={(e) => {
									setQueryParamValue(e.target.value);
								}}
							></QueryParamText>
						</QueryParamTextWrapper>
					</If>
				</Otherwise>
			</Choose>
			<If condition={inputIndex.length !== 0}>
				<SaveQueryParamButton
					type='submit'
					dataTestid='save-queryParam-button'
					variant={ButtonVariants.BlueButton}
					label='Save'
					width='w-1/4'
				/>
			</If>
		</QueryParamsWrapper>
	);
}

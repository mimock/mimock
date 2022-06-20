import React, { useState } from 'react';
import {
	DetailContentViewerContainer,
	NavTabsContainer,
	NavTab,
	NavTabLink,
	NavTabContent,
} from './DetailContentViewer.style';
import PropTypes from 'prop-types';
import GeneralPane from './GeneralPane';
import RequestPane from './RequestPane';
import ResponsePane from './ResponsePane';
import {
	FaInfoCircle,
	FaArrowCircleUp,
	FaArrowCircleDown,
} from 'react-icons/fa';
import { constants } from './constants';

function DetailContentViewer({ mock }) {
	// #region Defaults
	const { testIds, ids, labels, additionalStyles } = constants;
	// #endregion

	// #region States
	const [showGeneralPane, setShowGeneralPane] = useState(true);
	const [showRequestPane, setShowRequestPane] = useState(false);
	const [showResponsePane, setShowResponsePane] = useState(false);
	// #endregion

	// #region Handler functions
	const handleTabHeaderClick = (e) => {
		const currentTarget = e.target.id;
		switch (currentTarget) {
			case 'general-pane':
				setShowGeneralPane(true);
				setShowRequestPane(false);
				setShowResponsePane(false);
				break;
			case 'request-pane':
				setShowGeneralPane(false);
				setShowRequestPane(true);
				setShowResponsePane(false);
				break;
			case 'response-pane':
				setShowGeneralPane(false);
				setShowRequestPane(false);
				setShowResponsePane(true);
				break;
			default:
				break;
		}
	};
	// #endregion

	return (
		<DetailContentViewerContainer
			data-testid={testIds.detailContentViewerSection}
		>
			<NavTabsContainer>
				<NavTab>
					<NavTabLink
						id={ids.generalPane}
						data-testid={testIds.generalPane}
						className={
							showGeneralPane
								? additionalStyles.active
								: additionalStyles.normal
						}
						onClick={handleTabHeaderClick}
					>
						<FaInfoCircle /> {labels.generalPane}
					</NavTabLink>
				</NavTab>
				<NavTab>
					<NavTabLink
						id={ids.requestPane}
						data-testid={testIds.requestPane}
						className={
							showRequestPane
								? additionalStyles.active
								: additionalStyles.normal
						}
						onClick={handleTabHeaderClick}
					>
						<FaArrowCircleUp /> {labels.requestPane}
					</NavTabLink>
				</NavTab>
				<NavTab>
					<NavTabLink
						id={ids.responsePane}
						data-testid={testIds.responsePane}
						className={
							showResponsePane
								? additionalStyles.active
								: additionalStyles.normal
						}
						onClick={handleTabHeaderClick}
					>
						<FaArrowCircleDown />
						{labels.responsePane}
					</NavTabLink>
				</NavTab>
			</NavTabsContainer>
			<NavTabContent data-testid={testIds.tabContentContainer}>
				<If condition={showGeneralPane}>
					<GeneralPane
						uniqueId={mock.id}
						mockName={mock.mockName}
						description={mock.description}
						entityStatus={mock.entityStatus.status}
						httpMethod={mock.httpMethod.method}
						route={mock.route}
						queryParams={mock.queryParams}
						statusCode={mock.statusCode}
						createdBy={mock.createdBy}
						createdAt={mock.createdAt}
						modifiedBy={mock.modifiedBy}
						updatedAt={mock.updatedAt}
					/>
				</If>
				<If condition={showRequestPane}>
					<RequestPane
						requestHeader={JSON.stringify(mock.requestHeaders.requestHeader)}
						matchExact={mock.requestHeaders.matchExact.toString()}
						requestBody={JSON.stringify(mock.requestBodiesForMock.requestBody)}
						requestBodyType={
							mock.requestBodiesForMock.requestBodyType.requestBodyType
						}
					/>
				</If>
				<If condition={showResponsePane}>
					<ResponsePane
						responseHeader={JSON.stringify(mock.responseHeaders.responseHeader)}
						contentType={mock.responseContentType.contentType}
						responseBody={mock.textualResponse.responseBody}
					/>
				</If>
			</NavTabContent>
		</DetailContentViewerContainer>
	);
}

DetailContentViewer.propTypes = {
	mock: PropTypes.object.isRequired,
};

export default DetailContentViewer;

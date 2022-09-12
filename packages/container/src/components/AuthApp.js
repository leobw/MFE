import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default ({ onSignIn }) => {
	const ref = useRef(null);
	const history = useHistory();

	// FIXME: When reloading the page on pricing, it doesn't go back to / but display home
	useEffect(() => {
		const { onParentNavigate } = mount(ref.current, {
			initialPath: history.location.pathname,
			onNavigate:	({ pathname: nextPathName }) => {
				const { pathname } = history.location;
				if(pathname !== nextPathName)
					history.push(nextPathName);
			},
			onSignIn
		});

		history.listen(onParentNavigate);
	},[]);

	return <div ref={ref}/>;
}
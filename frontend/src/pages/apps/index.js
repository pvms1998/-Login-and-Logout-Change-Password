import React, { Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Loading from '../../components/loading'

export default function Root(props) {
	const { routes } = props
	return (
		<Suspense fallback={<Loading />}>
			<Switch>
				{routes &&
					routes.map(route => (
						<Route
							key={route.label}
							{...route}
							component={props1 => {
								const MyComponent = React.lazy(() =>
									import(`../${route.component}`)
								)
								return (
									
									<MyComponent
										{...props}
										{...props1}
										{...route}
										routes={route.routes}
									/>
								)
							}}
						/>
					))}
				<Redirect to="/home" />
			</Switch>
		</Suspense>
	)
}

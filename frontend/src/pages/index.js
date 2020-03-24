import React, { Suspense, useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { routes } from '../routes'
import login from './login'
import { UserProvider } from '../configs/context'
import LayoutDesign from './layout'
import Loading from '../components/loading'

function Root() {
    const [isAuth, setAuth] = useState(!!window.localStorage.getItem('access-token'))
    return (
        <UserProvider value={setAuth} >
            <Suspense fallback={<Loading />} >
                <BrowserRouter>
                    <Switch>
                        {routes &&
                            routes.map(route =>
                                route.private ? (
                                <Route
                                    key={route.label}
                                    {...route}
                                    component={props1 => {
                                        const MyComponent = React.lazy(() =>
                                            import(`./${route.component}`)
                                        )
                                        return (isAuth) ? (
                                            <LayoutDesign>
                                                <MyComponent {...props1} {...route} />
                                            </LayoutDesign>
                                        ) : ( 
                                                <Redirect to ='/login' />
                                            )
                                    }}
                                />) : (
                                    <Route
									key={route.label}
									{...route}
									component={props1 => {
										const MyComponent = React.lazy(() =>
											import(`./${route.component}`)
										)
										return !isAuth ? (
											<MyComponent {...props1} {...route} />
										) : (
											<Redirect to="/home" />
										)
									}}
								/>
                                )
                            )}
                    </Switch>
                </BrowserRouter>
            </Suspense>
        </UserProvider>
    )
}
export default Root
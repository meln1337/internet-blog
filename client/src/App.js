import React, { Fragment, useEffect } from 'react'
import useRoutes from './routes'
import { connect } from 'react-redux'
import { isAuthThunk, setUserAC } from './redux/actions'

const mapStateToProps = ({ authReducer }) => ({
	isAuth: authReducer.user
})

const mapDispatchToProps = dispatch => ({
	setUser: isAuthByToken => dispatch(setUserAC(isAuthByToken)),
	checkAuth: () => dispatch(isAuthThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(({ checkAuth, setUser, isAuth }) => {
	const isAuthByToken = !!localStorage.getItem('token')
	useEffect(() => {
		setUser(isAuthByToken)
		checkAuth()
	}, [])

	const routes = useRoutes({ isAuth })

	return (
	<Fragment>
		{ routes }
	</Fragment>
)})
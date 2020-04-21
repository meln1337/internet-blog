import React from 'react'
import { Menu } from 'antd'
import { NavLink, useLocation, } from 'react-router-dom'
import { connect } from 'react-redux'
import { setShowModalAC, setShowModalAuthAC, logoutThunk } from '../redux/actions'
import Register from './Register'
import Auth from './Auth'
import SearchForPosts from './SearchForPosts'

const { SubMenu } = Menu

const mapDispatchToProps = dispatch => ({
    setShowModal: () => dispatch(setShowModalAC()),
    setShowModalAuth: () => dispatch(setShowModalAuthAC()),
    logout: () => dispatch(logoutThunk())
})

export default connect(null, mapDispatchToProps)(({ isAuth, setShowModal, setShowModalAuth, logout }) => {
    const { pathname } = useLocation()
    return (
    <header style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        <Menu mode="horizontal" style={{ marginRight: 30, marginBottom: 30 }}>
            <Menu.Item key="blog" className={pathname === '/' && 'ant-menu-item-selected'}><NavLink to="/">Blog</NavLink></Menu.Item>
            <SubMenu title="Articles" className={pathname.split('/')[1] === 'categories' && 'ant-menu-submenu-open ant-menu-submenu-selected'}>
                <Menu.ItemGroup title="Categories of articles">
                    <Menu.Item key="react"><NavLink to="/categories/React">React</NavLink></Menu.Item>
                    <Menu.Item key="angular"><NavLink to="/categories/Angular">Angular</NavLink></Menu.Item>
                    <Menu.Item key="vue"><NavLink to="/categories/Vue">Vue</NavLink></Menu.Item>
                    <Menu.Item key="svelte"><NavLink to="/categories/Svelte">Svelte</NavLink></Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>
            {isAuth && <Menu.Item key="create an article"><NavLink to="/create">Create an article</NavLink></Menu.Item>}
            {isAuth && <Menu.Item key="logout" onClick={logout}>Logout</Menu.Item>}
            {!isAuth && <Menu.Item key="signUp" onClick={setShowModal}>Sign up</Menu.Item>}
            {!isAuth && <Menu.Item key="signIn" onClick={setShowModalAuth}>Sign in</Menu.Item>}
        </Menu>
        <SearchForPosts />
        <Register />
        <Auth />
    </header>
)})
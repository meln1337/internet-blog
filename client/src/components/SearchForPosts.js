import React, { useState, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { Input, Drawer, Card } from 'antd'
import { connect } from 'react-redux'
import { searchPostsByNameThunk } from '../redux/actions'

const { Search } = Input
const { Meta } = Card

const mapStateToProps = ({ postReducer }) => ({
    posts: postReducer.postsByName
})

const mapDispatchToProps = dispatch => ({
    setPostsByName: name => dispatch(searchPostsByNameThunk({ name }))
})

export default connect(mapStateToProps, mapDispatchToProps)(({ setPostsByName, posts }) => {
    const [form, setForm] = useState('')
    const [visible, setVisible] = useState(false)

    const onChange = e => {
        setForm(e.target.value)
    }

    const onSearch = () => {
        if (form !== '') {
            setPostsByName(form)
            setVisible(true)
        }
    }

    const onClose = () => {
        setVisible(false)
    }

    return (
        <Fragment>
            <Search
                placeholder="Type name of post"
                style={{ width: 500, marginBottom: 30, padding: '0 30px' }}
                enterButton
                value={form}
                onChange={onChange}
                onSearch={onSearch}
            />
            <Drawer
                title="Result of the query"
                placement="right"
                closable
                onClose={onClose}
                visible={visible}
                width={300}
            >
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    {posts.map(post => (
                        <NavLink to={`/posts/${post._id}`} onClick={() => setVisible(false)}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={post.img} />}
                                style={{ marginBottom: 30 }}
                            >
                                <Meta title={post.title} description="www.instagram.com" />
                            </Card>
                        </NavLink>
                    ))}
                </div>
            </Drawer>
        </Fragment>
    )
})
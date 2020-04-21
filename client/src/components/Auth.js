import React from 'react'
import { Modal, Form, Input, Button } from 'antd'
import { connect } from 'react-redux'
import { setShowModalNegativeAuthAC, signInThunk } from '../redux/actions'
import { useState } from 'react'

const mapStateToProps = ({ modalReducer }) => ({
    showModalAuth: modalReducer.showModalAuth
})

const mapDispatchToProps = dispatch => ({
    setShowModalNegativeAuth: () => dispatch(setShowModalNegativeAuthAC()),
    signIn: form => dispatch(signInThunk(form))
})

export default connect(mapStateToProps, mapDispatchToProps)(({ setShowModalNegativeAuth, showModalAuth, signIn }) => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const changeHandler = e => {
        setForm({...form, [e.target.id.split('_')[1]]: e.target.value})
        console.log(form[e.target.id.split('_')[1]])
    }

    return (
    <Modal
        title="Sign in"
        visible={showModalAuth}
        onOk={setShowModalNegativeAuth}
        onCancel={setShowModalNegativeAuth}
    >
        <Form
            name="basic"
            initialValues={{
                remember: true,
            }}
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}
                value={changeHandler}
                onChange={changeHandler}
            >
                <Input type="email" />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                value={changeHandler}
                onChange={changeHandler}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit" onClick={signIn.bind(this, form)}>
                    Submit
        </Button>
            </Form.Item>
        </Form>
    </Modal>
)})
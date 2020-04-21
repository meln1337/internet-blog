import React from 'react'
import { Modal, Form, Input, Button, Alert } from 'antd'
import { connect } from 'react-redux'
import { setShowModalNegativeAC, signUpThunk } from '../redux/actions'
import { useState } from 'react'

const mapStateToProps = ({ modalReducer }) => ({
    showModal: modalReducer.showModal,
    errors: modalReducer.errors
})

const mapDispatchToProps = dispatch => ({
    setShowModalNegative: () => dispatch(setShowModalNegativeAC()),
    signup: form => dispatch(signUpThunk(form))
})

export default connect(mapStateToProps, mapDispatchToProps)(({ setShowModalNegative, showModal, signup }) => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })

    const changeHandler = e => {
        setForm({ ...form, [e.target.id.split('_')[1]]: e.target.value })
        console.log(form[e.target.id.split('_')[1]])
    }

    return (
        <Modal
            title="Sign up"
            visible={showModal}
            onOk={setShowModalNegative}
            onCancel={setShowModalNegative}
        >
            <Form
                name="basic"
                initialValues={{
                    remember: true,
                }}
            >
                <Form.Item
                    label="Username"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                    value={form.name}
                    onChange={changeHandler}
                >
                    <Input />
                </Form.Item>

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
                    <Button type="primary" htmlType="submit" onClick={signup.bind(this, form)}>
                        Submit
        </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
})
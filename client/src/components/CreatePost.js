import React, { useState } from 'react'
import { Form, Input, Button, } from 'antd'
import axios from 'axios'

export default () => {
    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('')
    const [uploadedFile, setUploadedFile] = useState({})

    console.log(file)

    const onChange = e => {
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
    }

    const onSubmit = async e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            const { fileName, filePath } = response.data

            setUploadedFile({ fileName, filePath })
        } catch (err) {
            if (err.response.status === 500) {
                console.log('There was a problem with the server')
            } else {
                console.log(err.response.data.msg)
            }
        }
    }

    return (
        <div className="container">
            <Form name="nest-messages" style={{ marginTop: 30 }}>
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="title" 
                    label="Text"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <input type="file" onChange={onChange} />
                    <button type="button" onClick={onSubmit}>Upload</button>
                    {JSON.stringify(uploadedFile) !== '{}' && <img src={uploadedFile.filePath} alt="" style={{ width: 240, height: 240 }} />}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
        </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
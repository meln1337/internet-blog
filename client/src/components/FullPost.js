import React, { useState } from 'react'
import { PageHeader, Button, Descriptions, Typography, Comment, Form, Avatar } from 'antd'
import TextArea from 'antd/lib/input/TextArea';

const { Paragraph } = Typography

const Editor = ({ onChange, onSubmit, submitting, value, user }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary" disabled={user}>
                Add Comment
        </Button>
        </Form.Item>
    </div>
);

export default ({ title, text, timestamps, authorId, img, user, authorName, comments, addComment, postId, userId }) => {
    debugger
    const [form, setForm] = useState('')

    const onAddComment = () => {
        addComment({ text: form, postId, authorId: userId })
        setForm('')
    }

    return (
        <div className="container">
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={title}
                extra={user?.id === authorId && <Button key="3">Edit</Button>}
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="Creation Time">{new Date(timestamps).toLocaleDateString()}</Descriptions.Item>
                    <Descriptions.Item label="Author">{authorName}</Descriptions.Item>
                </Descriptions>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '30px 0' }}>
                    <img src={img} alt="example" style={{ width: 200 }} />
                </div>
                <Paragraph>{text}</Paragraph>
                <Comment content={
                    <Editor
                        onChange={e => setForm(e.target.value)}
                        value={user ? form : 'You need to be authorizated to comment the post'}
                        isAuth={user}
                        onSubmit={onAddComment}
                    />

                }
                    avatar={
                        <Avatar
                            src={user?.profilePicture ? user?.profilePicture : 'https://vectorified.com/images/avatar-icon-png-9.jpg'}
                            alt="Han Solo"
                        />
                    }
                />
                {comments?.map(comment => ( 
                    <Comment
                        author={comment.authorId}
                        avatar={user?.profilePicture ? user?.profilePicture : 'https://vectorified.com/images/avatar-icon-png-9.jpg'}
                        content={comment.text}
                        datetime={new Date(comment.timestamps).toLocaleDateString()}
                    />
                ))}
            </PageHeader>
        </div>
    )
}
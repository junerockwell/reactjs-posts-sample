import { useEffect, useState } from "react";
import { getCommentsByPostId, addOneComment } from "../api/commentsApi";
import CommentCard from "./CommentCard";
import { Form, Button, Spinner, Alert } from "react-bootstrap";

export default function CommentSection({ id }) {
    const [comments, setComments] = useState(null);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState(null);
    const [loadingNewComment, setLoadingNewComment] = useState(false);

    useEffect(() => {
        getCommentsData();
    }, []);

    async function getCommentsData() {
        try {
            const commentsData = await getCommentsByPostId(id);
            setComments(commentsData);
            setLoading(false);
        } catch(e) {
            setErrors(e);
            setLoading(false);
        }
    }

    async function submitNewComment() {
        try {
            setLoadingNewComment(true);
            const res = await addOneComment({
                postId: id,
                name: "Placeholder Name", // Should come from user session
                email: "placeholder_email@mailme.com", // Should come from user session
                body: newComment,
            });
            const temp = [...comments];
            temp.unshift(res);
            setComments(temp);
            setLoadingNewComment(false);
        } catch(e) {
            setErrors(e);
            setLoadingNewComment(false);
        }
    }

    function disableSubmitBtn() {
        return !newComment || newComment?.trim() === null || loadingNewComment;
    }

    if (errors) return (
        <Alert variant="danger">
            <Alert.Heading>Error</Alert.Heading>
            <p>{errors}</p>
        </Alert>
    );
    if (!comments || loading) return (<Spinner animation="border" />);
    if (comments.length <= 0) return null;
    return (
        <section className="comment-section">
            <h5>Comments</h5>
            <Form>
                <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Add a comment</Form.Label>
                    <Form.Control as="textarea" rows={3} onChange={e => setNewComment(e.target.value)}/>
                </Form.Group>
                <Button 
                    onClick={submitNewComment} 
                    type="button" 
                    variant="primary" 
                    size="sm" 
                    disabled={disableSubmitBtn()}>
                        {loadingNewComment ? <Spinner animation="border" size="sm"/> : `Submit`}
                </Button>
            </Form>
            {comments.map((comment, index) => (
                <CommentCard attrs={comment} key={index} />
            ))}
        </section>
    );
}

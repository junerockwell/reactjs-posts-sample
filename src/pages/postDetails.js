import { useEffect, useState } from "react";
import { getPostDetailById } from "../api/postsApi";
import CommentSection from "../components/CommentSection";
import { Spinner, Alert } from "react-bootstrap";
import AuthorLink from "../components/AuthorLink";
import "../styles/PostDetails.page.scss";

export default function PostDetails(props) {
    console.log("PostDetails() ", props)
    const [post, setPost] = useState(null);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(true);

    const { id } = props?.match?.params;

    useEffect(() => {
        getPostData();
    }, []);

    async function getPostData() {
        try {
            const postData = await getPostDetailById(id);
            setPost(postData);
            setLoading(false);
        } catch(e) {
            setErrors(e);
            setLoading(false);
        }
    }
    
    if (errors) return (
        <Alert variant="danger">
            <Alert.Heading>Error</Alert.Heading>
            <p>{errors}</p>
        </Alert>
    );
    if (!post || loading) return (<Spinner animation="border" />);
    if (Object.keys(post).length <= 0) return null;
    return (
        <div>
            <h1>{post.title}</h1>
            <AuthorLink userId={post.userId} postId={id} />
            <p>{post.body}</p>
            <CommentSection id={id}/>
        </div>
    );
}

import { useEffect, useState } from "react";
import { getAllPosts } from "../api/postsApi";
import PostCard from "../components/PostCard";
import { Spinner, Alert } from "react-bootstrap";

export default function PostsLists() {
    const [posts, setPosts] = useState(null);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            const data = await getAllPosts();
            setPosts(data);
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
    if (!posts || loading) return (<Spinner animation="border" />);
    if (posts.length <= 0) return null;
    return (
        <div>
            <h1>Posts List</h1>
            <div>
                {posts.map((post, index) => (
                    <PostCard attrs={post} key={index} />
                ))}
            </div>
        </div>
    );
}

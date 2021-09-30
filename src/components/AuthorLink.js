import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserById } from "../api/usersApi";
import { Spinner, Alert } from "react-bootstrap";

export default function AuthorLink({ userId, postId }) {
    const [author, setAuthor] = useState(null);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAuthor();
    }, []);

    async function getAuthor() {
        try {
            const res = await getUserById(userId);
            setAuthor(res);
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
    if (!author || loading) return (<><Spinner animation="grow" variant="secondary" size="sm" /><Spinner animation="grow" variant="secondary" size="sm" /><Spinner animation="grow" variant="secondary" size="sm" /></>)
    if (Object.keys(author).length <= 0) return null;
    return (
        <p>Written by: <Link to={`/details/${postId}/author/${userId}`}>{author.name}</Link></p>
    );
}

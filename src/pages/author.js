import { useEffect, useState } from "react";
import { getUserById } from "../api/usersApi";
import { Spinner, Alert } from "react-bootstrap";

export default function Author(props) {
    const [author, setAuthor] = useState(null);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(true);

    const { userId } = props?.match?.params;

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
    return (<div>
            <h1>{author.name}</h1>
            <p><b>username:</b> {author.username}</p>
            <p><b>email:</b> {author.email}</p>
            <p><b>website:</b> {author.website}</p>
        </div>
    );
}

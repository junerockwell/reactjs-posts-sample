import { Button, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { truncateString } from "../lib/truncateString";
import "../styles/PostCard.component.scss";

export default function Post({ attrs }) {
    const { title, id, body } = attrs;

    return (
        <Card className="post-card">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {truncateString(body, 100)}
                </Card.Text>
                <LinkContainer to={`details/${id}`}>
                    <Button variant="primary" >Read More</Button>
                </LinkContainer>
            </Card.Body>
        </Card>
    );
}

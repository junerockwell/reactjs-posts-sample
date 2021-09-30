import { useState } from "react";
import { truncateString } from "../lib/modifyStrings";
import { Button, Card } from "react-bootstrap";
import "../styles/CommentCard.component.scss";

export default function Comment({ attrs }) {
    const { name, email, body } = attrs;
    const [truncateText, setTruncateText] = useState(true);

    function renderCommentBody() {
        return truncateText ? truncateString(body, 50) : body;
    }

    function toggleTruncateText() {
        setTruncateText(!truncateText);
    }

    return (
        <Card className="comment-card">
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <p>{email}</p>
                <Card.Text onClick={toggleTruncateText}>
                    {renderCommentBody()}   
                </Card.Text>
                <Button onClick={toggleTruncateText} variant="secondary" size="sm">{truncateText ? `Read More` : `Read Less`}</Button>
            </Card.Body>
        </Card>
    );
}

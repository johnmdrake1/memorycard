import React from 'react';
import { Card } from 'react-bootstrap';



//Result Card component, 3 will be rendered on the results page. Future functionality may be added for just one at a time
function ResultCard({ title, content }) {
    return (
        <Card className='mb-3 border-0 shadow-sm' style={{ backgroundColor: '#1a1a1a', color: '#00ff00' }}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {Array.isArray(content) ? (
                        <ul>
                            {content.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    ) : (
                        content
                    )}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ResultCard;
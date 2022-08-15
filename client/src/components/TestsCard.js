import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import testImage from '../assets/testImage.png'
import { observer } from 'mobx-react-lite';
const TestsCard = ({test}) => {
	return (
		<Card>
			<Card.Body className='text-center text-black  d-flex align align-items-center'>
				<Col md={3} className='d-flex'>
					<Image className='align-self-start' src={testImage} />
				</Col>
				<Col md={9}>
					<Card.Title>{test.title}</Card.Title>
					<Card.Text>{test.description}</Card.Text>
				</Col>
			</Card.Body>
		</Card>
	);
};

export default TestsCard;
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Card } from 'react-bootstrap';

const Choice2 = observer((choice) => {
	let className = 'mt-3'
	if (choice.className===true && choice.isCorrectAns){
		className +=' bg-success'
	}
	else {
		className +=' bg-danger'
	}
	return (
		<Card className={className} style={{cursor:'pointer'}}>
			<Card.Body className='text-center text-black align-items-center'>
				<Card.Text>{choice.choice.number}</Card.Text>
			</Card.Body>
		</Card>
	);
});

export default Choice2;
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Card } from 'react-bootstrap';

const Choice1 = observer((choice) => {
	let className = 'mt-3'
	return (
		<Card className={className} style={{cursor:'pointer'}}>
			<Card.Body className='text-center text-black align-items-center'>
				<Card.Text>{choice.choice.number}</Card.Text> 
				  {/* choice.choice.text - было */}
			</Card.Body>
		</Card>
	);
});

export default Choice1;
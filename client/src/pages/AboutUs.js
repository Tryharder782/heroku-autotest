import React from 'react';
import { Container } from 'react-bootstrap';

const AboutUs = () => {
	return (
		<Container className='mt-3'>
			(О нас)
			<div className='float-end'>
			<h2 className='text-center'>мы на карте</h2>
			<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2606.279917133725!2d74.5875163534614!3d42.84223109190462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389ec9dee3f33e5f%3A0xd55e9afe5ea02704!2z0JDQstGC0L7RiNC60L7Qu9CwINCR0LjRiNC60LXQutGB0LrQsNGPINCg0KLQqCDQntCh0KLQng!5e0!3m2!1sru!2skg!4v1659060426313!5m2!1sru!2skg" width="450" height="300" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></div>
		</Container>
	);
};

export default AboutUs;
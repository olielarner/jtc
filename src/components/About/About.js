import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const About = () => {
	useGSAP(() => {
		gsap.to('.about-header', {
			scrollTrigger: {
				trigger: '.about-section',
				toggleActions: 'restart pause reverse pause',
				start: 'center-=200 center',
			}, // start animation when ".box" enters the viewport
			opacity: 1,
			y: 20,
			duration: 1,
		});
	});

	return (
		<div className="min-h-screen about-section">
			<div className="container flex flex-col items-center py-32 mx-auto text-white font-letterGoth">
				<h2 className="font-bold uppercase opacity-0 about-header text-7xl -bottom-7">
					About
				</h2>
			</div>
		</div>
	);
};

export default About;

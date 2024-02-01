import React from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const Loading = () => {
	useGSAP(() => {
		const tl = gsap.timeline({ repeat: -1, yoyo: true });
		tl.to('.loading-char', {
			bottom: '30px',
			opacity: 1,
			yoyo: true,
			stagger: {
				each: 0.1,
				ease: 'power2.out',
			},
		});
	});

	return (
		<div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-white">
			<div className="wrapper">
				<p className="text-3xl loading font-letterGoth">
					<span className="relative bottom-0 loading-char">L</span>
					<span className="relative bottom-0 loading-char">o</span>
					<span className="relative bottom-0 loading-char">a</span>
					<span className="relative bottom-0 loading-char">d</span>
					<span className="relative bottom-0 loading-char">i</span>
					<span className="relative bottom-0 loading-char">n</span>
					<span className="relative bottom-0 loading-char">g</span>
				</p>
			</div>
		</div>
	);
};

export default Loading;

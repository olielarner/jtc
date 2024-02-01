import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import classNames from 'classnames';

const Ticker = (data) => {
	const { skillSet, direction } = data;
	const ticker = useRef();
	useGSAP(() => {
		gsap.utils.toArray('.ticker').forEach(function (el, index) {
			const tickerLeft = ticker.current.querySelector('.skill-ticker-left');
			const tickerRight = ticker.current.querySelector('.skill-ticker-right');

			if (tickerLeft !== null) {
				const ttll = gsap.timeline();

				ttll
					.to(tickerLeft, {
						left: '-500px',
						ease: 'none',
					})
					.reverse();

				ScrollTrigger.create({
					animation: ttll,
					trigger: tickerLeft,
					start: 'center bottom',
					markers: false,
					end: 'center top',
					scrub: true,
				});
			}

			if (tickerRight !== null) {
				const ttlr = gsap.timeline();

				ttlr
					.to(tickerRight, {
						right: '-500px',
						ease: 'none',
					})
					.reverse();

				ScrollTrigger.create({
					animation: ttlr,
					trigger: tickerRight,
					start: 'center bottom',
					end: 'center+=500 top',
					scrub: true,
				});
			}
		});
	});

	return (
		<div
			className="relative flex items-center w-full h-20 py-10 overflow-hidden ticker"
			ref={ticker}
		>
			{skillSet === 'creative' && (
				<div
					className={classNames(
						'text-4xl text-white uppercase skill-ticker font-letterGoth whitespace-nowrap absolute h-auto',
						{ 'skill-ticker-left left-0': direction === 'left' },
						{ 'skill-ticker-right right-0': direction === 'right' }
					)}
				>
					CREATIVE DIRECTION + DESIGN + ANIMATION + 2D + 3D + LIVE ACTION +
					CREATIVE DIRECTION + DESIGN + ANIMATION + 2D + 3D + LIVE ACTION +
					CREATIVE DIRECTION + DESIGN + ANIMATION + 2D + 3D + LIVE ACTION +
					CREATIVE DIRECTION + DESIGN + ANIMATION + 2D + 3D + LIVE ACTION +
					CREATIVE DIRECTION + DESIGN + ANIMATION + 2D + 3D + LIVE ACTION
				</div>
			)}

			{skillSet === 'problems' && (
				<div
					className={classNames(
						'text-4xl text-white uppercase skill-ticker font-letterGoth absolute h-auto whitespace-nowrap',
						{ 'skill-ticker-left left-0': direction === 'left' },
						{ 'skill-ticker-right right-0': direction === 'right' }
					)}
				>
					PROBLEM SOLVING + IDEATION + PITCH DECKS + SCRIPTS + BUDGET PLANNING +
					COLABERATION + PROBLEM SOLVING + IDEATION + PITCH DECKS + SCRIPTS +
					BUDGET PLANNING + COLABERATION + PROBLEM SOLVING + IDEATION + PITCH
					DECKS + SCRIPTS + BUDGET PLANNING + COLABERATION + PROBLEM SOLVING +
					IDEATION + PITCH DECKS + SCRIPTS + BUDGET PLANNING + COLABERATION +
				</div>
			)}
		</div>
	);
};

export default Ticker;

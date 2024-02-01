import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

const Hero = (data) => {
	const { heroHeader, heroBackgroundVideo } = data.hero;

	useGSAP(() => {
		gsap.registerPlugin(ScrollTrigger);

		const header = '.hero-header';
		const subOne = '.sub-one';
		const subTwo = '.sub-two';
		const tl = gsap.timeline();

		let mm = gsap.matchMedia(),
			breakPoint = 800;

		mm.add(
			{
				// set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
				isDesktop: `(min-width: ${breakPoint}px)`,
				isMobile: `(max-width: ${breakPoint - 1}px)`,
				reduceMotion: '(prefers-reduced-motion: reduce)',
			},
			(context) => {
				// context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
				let { isDesktop, isMobile, reduceMotion } = context.conditions;

				const htl = gsap.timeline();
				htl.to(
					'.header-cont',
					{
						height: isDesktop ? '99px' : '80px',
					},
					'<0'
				);

				htl.to(
					'.hero-header',
					{
						marginTop: isDesktop ? '40px' : '20px',
						fontSize: '20px',
						marginBottom: '14px',
					},
					'<0'
				);
				htl.to(
					'.sub-titles',
					{
						opacity: 0,
					},
					'<0'
				);

				ScrollTrigger.create({
					animation: htl,
					trigger: '.hero',
					start: 'top top',
					end: 'bottom top',
					pin: true,
					scrub: true,
				});

				return () => {
					// optionally return a cleanup function that will be called when none of the conditions match anymore (after having matched)
					// it'll automatically call context.revert() - do NOT do that here . Only put custom cleanup code here.
				};
			}
		);

		tl.to('.header-cont', {
			left: '0%',
			duration: '0.5',
		});
		tl.to(
			subOne,
			{
				top: 0,
				duration: '0.5',
			},
			1
		);
		tl.to(
			subTwo,
			{
				top: 0,
				duration: '0.5',
			},
			'>+=0.5'
		);
		tl.to(
			header,
			{
				top: 0,
				duration: '0.5',
			},
			'>+=0.5'
		);
	});

	return (
		<div>
			<div className="fixed flex z-10 flex-col self-start justify-center w-full h-[150px] xl:h-[200px] overflow-visible bg-black left-full header-cont">
				<div className="container relative mx-auto overflow-x-visible overflow-y-hidden px-7 xl:px-0">
					{heroHeader !== null && (
						<h1 className="relative text-3xl font-bold tracking-tighter text-white uppercase xl:text-6xl font-letterGoth hero-header">
							{heroHeader}
						</h1>
					)}

					<p className="relative mt-3 overflow-hidden text-xl font-normal text-white xl:text-4xl xl:mt-7 sub-titles font-letterGoth">
						<span className="relative left-0 uppercase sub-one top-16">
							Designer +{' '}
						</span>
						<span className="relative left-0 uppercase sub-two top-16">
							Director +
						</span>
					</p>
				</div>
			</div>
			<div className="relative flex items-center w-full h-[calc(100vh-100px)] xl:min-h-screen hero">
				<div className="absolute top-0 left-0 flex w-full h-[calc(100vh-100px)] xl:h-screen overflow-hidden hero-bg-image">
					{heroBackgroundVideo !== null && (
						<video className="object-cover w-screen" autoPlay loop muted>
							<source
								src={heroBackgroundVideo.node.mediaItemUrl}
								type="video/mp4"
							/>
						</video>
					)}
				</div>
			</div>
		</div>
	);
};

export default Hero;

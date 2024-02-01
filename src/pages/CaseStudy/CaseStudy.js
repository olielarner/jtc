import React, { useState, useRef } from 'react';
import { useQuery, gql } from '@apollo/client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import Loading from '../../components/Loading/Loading';

const POST_QUERY = gql`
	query NewQuery($slug: String = "") {
		postBy(slug: $slug) {
			id
			caseStudy {
				development {
					devImage {
						image {
							node {
								mediaItemUrl
								sourceUrl(size: MEDIUM_LARGE)
							}
						}
						description
					}
				}
				client
				finalDesigns {
					finalDesignImage {
						description
						image {
							node {
								mediaItemUrl
								sourceUrl(size: LARGE)
							}
						}
					}
				}
				credits {
					name
					role
				}
				mainVideo {
					node {
						mediaItemUrl
					}
				}
				projectName
				storyboard {
					storyboardImage {
						image {
							node {
								mediaItemUrl
								sourceUrl(size: LARGE)
							}
						}
						description
					}
				}
				year
				projectType
				synopsis
			}
		}
	}
`;

const CaseStudy = (slug) => {
	const [sbLoaded, setSbLoaded] = useState(false);
	const [devLoaded, setDevLoaded] = useState(false);
	const [finalLoaded, setFinalLoaded] = useState(false);

	const cs = useRef();
	const devCont = useRef();

	useGSAP(() => {
		if (sbLoaded && devLoaded && finalLoaded) {
			const hero = cs.current.querySelector('.case-study-hero-vid');

			gsap.registerPlugin(ScrollTrigger);

			const htl = gsap.timeline();
			htl.to(hero, {
				height: '0vh',
				ease: 'none',
			});
			htl.to('.synopsis', {
				height: 'auto',
			});
			htl.to(
				'.projct-title',
				{
					height: '0px',
					paddingTop: '0px',
					paddingBottom: '0px',
				},
				'<0'
			);

			ScrollTrigger.create({
				animation: htl,
				trigger: '.case-study-hero',
				start: 'top top',
				end: 'bottom top',
				pin: true,
				scrub: 1,
			});

			const sbfade = gsap.timeline();
			const sb = cs.current.querySelectorAll('.sb-image');
			sbfade.to(sb, {
				height: '700px',
				ease: 'linear',
				duration: 0.8,
				stagger: {
					each: 0.8,
					ease: 'none',
				},
			});
			ScrollTrigger.create({
				animation: sbfade,
				trigger: '.storyboard',
				start: 'top top',
				end: 'bottom top',
				pin: true,
				scrub: true,
			});

			const devfade = gsap.timeline();

			const dev = devCont.current.querySelectorAll('.dev-image');
			devfade.to(dev, {
				top: '0px',
				opacity: 1,
				duration: 0.1,
				stagger: {
					each: 0.1,
					ease: 'none',
				},
			});

			ScrollTrigger.create({
				animation: devfade,
				trigger: '.development',
				start: 'top-=400 top',
				end: 'bottom bottom',
				markers: false,
				scrub: true,
			});

			const final =
				cs.current.querySelectorAll('.final-designs')[0].offsetWidth;
			console.log(final);
			let sections = gsap.utils.toArray('.fd-image');
			if (document.querySelector('.final-designs').offsetWidth !== null) {
				gsap.to(sections, {
					xPercent: -100 * (sections.length - 1),
					ease: 'none',
					scrollTrigger: {
						trigger: '.final-designs',
						pin: true,
						scrub: 1,
						snap: 1 / (sections.length - 1),
						end: () => '+=' + final,
					},
				});
			}
		}
	}, [sbLoaded, devLoaded, finalLoaded]);

	const { loading, error, data } = useQuery(POST_QUERY, {
		variables: slug,
	});
	if (loading) return <Loading />;
	if (error) return <p>Error : {error.message}</p>;

	const {
		mainVideo,
		projectName,
		year,
		client,
		projectType,
		synopsis,
		storyboard,
		development,
		finalDesigns,
		credits,
	} = data.postBy.caseStudy;

	return (
		<div className="" ref={cs}>
			<div className="relative h-screen bg-black case-study-hero">
				<div className="absolute top-0 left-0 w-full h-full overflow-hidden case-study-hero-vid">
					{mainVideo !== null && (
						<video
							className="object-cover w-screen h-screen"
							autoPlay
							loop
							muted
						>
							<source src={mainVideo.node.mediaItemUrl} type="video/mp4" />
						</video>
					)}
				</div>
				<div className="absolute bottom-0 w-full py-8 overflow-hidden text-white bg-black projct-title font-letterGoth">
					<div className="container px-6 mx-auto xl:px-0">
						<h1 className="mb-3 text-2xl font-bold text-white xl:text-5xl">
							<span className="italic font-normal ">{client}</span> -{' '}
							{projectName}
						</h1>
						<p className="text-xl ">
							{year} - {} - Creative Direction. Design. Animation.
						</p>
					</div>
				</div>
				<div className="relative px-6 xl:py-10 top-10 xl:top-1/4">
					<div className="container h-0 mx-auto overflow-hidden synopsis">
						<p className="mb-5 text-center text-white font-letterGoth">
							SYNOPSIS
						</p>
						<p className="text-sm text-white xl:text-base font-letterGoth">
							{synopsis}
						</p>
					</div>
				</div>
			</div>
			{!loading && credits.length && (
				<div className="relative w-full credits">
					<div className="container px-6 mx-auto xl:px-0 py-9 xl:py-20">
						<h2 className="mb-4 text-3xl text-center uppercase font-letterGoth">
							Credits
						</h2>
						<ul className="border-t-[1px] border-t-black">
							{credits.map((credit, i) => {
								return (
									<li
										className="w-full flex py-2 border-b-[1px] border-b-black justify-between font-letterGoth uppercase"
										key={i}
									>
										<span className="text-xl font-bold">{credit.name}</span>{' '}
										<span className="text-base font-light">{credit.role}</span>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			)}

			{!loading && storyboard.storyboardImage.length && (
				<div className="relative w-full h-screen storyboard py-14">
					<div className="container flex flex-col justify-center h-full mx-auto xl:block ">
						<div className="pb-16 case-study-header-container">
							<h2 className="px-6 text-3xl text-black uppercase xl:px-0 font-letterGoth">
								Storyboard
							</h2>
						</div>
						<div className="relative w-full h-[300px] xl:h-[700px]">
							{storyboard.storyboardImage.map((item, key) => {
								if (!sbLoaded) {
									setSbLoaded(true);
								}
								if (key === 0) {
									return (
										<div
											key={key}
											className="absolute flex justify-center w-full overflow-hidden sb-image"
										>
											{item.image !== null && (
												<img
													src={item.image.node.sourceUrl}
													alt=""
													className="h-[300px] xl:h-[700px]"
												/>
											)}
										</div>
									);
								} else {
									return (
										<div
											key={key}
											className="absolute flex justify-center w-full h-0 overflow-hidden sb-image"
										>
											{item.image !== null && (
												<img
													src={item.image.node.sourceUrl}
													alt=""
													className="h-[300px] xl:h-[700px]"
												/>
											)}
										</div>
									);
								}
							})}
						</div>
					</div>
				</div>
			)}
			{development.devImage.length && (
				<div
					className="relative w-full bg-black development dev-images py-14"
					ref={devCont}
				>
					<div className="container px-6 pb-16 mx-auto xl:px-0 case-study-header-container">
						<h2 className="text-3xl text-white uppercase font-letterGoth">
							Development
						</h2>
					</div>
					<div className="relative flex flex-wrap w-full">
						{!loading &&
							development.devImage.map((item, key) => {
								if (!devLoaded) {
									setDevLoaded(true);
								}

								return (
									<div
										key={key}
										className="relative w-full xl:w-1/3 flex h-[420px] opacity-0 top-11 dev-image"
									>
										{item.image !== null && (
											<img
												src={item.image.node.sourceUrl}
												alt=""
												className="object-cover w-full"
											/>
										)}
									</div>
								);
							})}
					</div>
				</div>
			)}
			{finalDesigns.finalDesignImage.length && (
				<div className="relative w-full min-h-screen bg-black py-14">
					<div className="container pb-16 mx-auto case-study-header-container">
						<h2 className="text-3xl text-white uppercase font-letterGoth">
							Final Designs
						</h2>
					</div>
					<div className="relative flex w-full h-screen overflow-hidden final-designs">
						{!loading &&
							finalDesigns.finalDesignImage.map((item, key) => {
								if (!finalLoaded) {
									setFinalLoaded(true);
								}
								return (
									<div key={key} className="relative min-w-[100vw] fd-image">
										{item.image !== null && (
											<img
												className="object-cover w-full h-full"
												src={item.image.node.sourceUrl}
												alt=""
											/>
										)}
									</div>
								);
							})}
					</div>
				</div>
			)}
		</div>
	);
};

export default CaseStudy;

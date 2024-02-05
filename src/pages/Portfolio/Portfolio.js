import React, { useState, useRef } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import Loading from '../../components/Loading/Loading';

const PORTFOLIO_QUERY = gql`
	query PortfolioQuery {
		posts(first: 9999) {
			edges {
				node {
					id
					featuredImage {
						node {
							mediaItemUrl
							sourceUrl(size: MEDIUM_LARGE)
						}
					}
					uri
					caseStudy {
						client
						projectName
						year
					}
				}
			}
		}
		themeOptions {
			contactInfo {
				portfolioBgVideo {
					node {
						mediaItemUrl
					}
				}
			}
		}
	}
`;

const Portfolio = () => {
	const [loaded, setLoaded] = useState(false);

	const port = useRef();

	useGSAP(() => {
		if (loaded) {
			gsap.registerPlugin(ScrollTrigger);

			const portfade = gsap.timeline();

			const link = port.current.querySelectorAll('.port-link');
			portfade.to(link, {
				top: '0px',
				opacity: 1,
				skewX: 0,
				duration: 0.1,
				stagger: {
					each: 0.1,
					ease: 'none',
				},
			});

			ScrollTrigger.create({
				animation: portfade,
				trigger: '.portfolio',
				start: 'top-=400 top',
				end: 'bottom bottom',
				markers: false,
				scrub: true,
			});

			const ttll = gsap.timeline();

			ttll
				.to('.skill-ticker', {
					left: '-500px',
					ease: 'none',
				})
				.reverse();

			ScrollTrigger.create({
				animation: ttll,
				trigger: '.skill-ticker',
				start: 'center bottom',
				markers: false,
				end: 'center top',
				scrub: true,
			});

			let ports = gsap.utils
				.toArray('.port-link')
				.forEach(function (el, index) {
					const fadeUpText = gsap.timeline({ paused: true });
					const text = el.querySelector('.port-text');
					fadeUpText.to(text, {
						opacity: 1,
						bottom: '0px',
						duration: 0.2,
						ease: 'none',
					});
					el.addEventListener('mouseenter', () => fadeUpText.play());
					el.addEventListener('mouseleave', () => fadeUpText.reverse());
				});
			console.log(ports);
		}
	}, [loaded]);

	const { loading, error, data } = useQuery(PORTFOLIO_QUERY);
	if (loading) return <Loading />;
	if (error) return <p>Error : {error.message}</p>;

	const { portfolioBgVideo } = data.themeOptions.contactInfo;

	return (
		<div className="w-full overflow-hidden bg-black" ref={port}>
			<div className="relative flex flex-col justify-end w-full h-screen ">
				{portfolioBgVideo !== null && (
					<video className="object-cover w-screen h-screen" autoPlay loop muted>
						<source src={portfolioBgVideo.node.mediaItemUrl} type="video/mp4" />
					</video>
				)}

				<div className="container px-6 mx-auto xl:px-0">
					<h1 className="pt-8 pb-6 text-4xl font-normal tracking-tighter text-white xl:text-6xl font-letterGoth ">
						Portfolio
					</h1>
				</div>
				<div className="relative flex items-center w-full h-20 py-8 overflow-hidden ticker">
					<div className="absolute left-0 h-auto text-xl text-white uppercase xl:text-4xl skill-ticker font-letterGoth whitespace-nowrap">
						CREATIVE DIRECTION + DESIGN + ANIMATION + 2D + 3D + LIVE ACTION +
						PROBLEM SOLVING + IDEATION + PITCH DECKS + SCRIPTS + BUDGET PLANNING
						+ CREATIVE DIRECTION + DESIGN + ANIMATION + 2D + 3D + LIVE ACTION +
						COLABERATION + PROBLEM SOLVING + IDEATION + PITCH DECKS + SCRIPTS +
						CREATIVE DIRECTION + DESIGN + ANIMATION + 2D + 3D + LIVE ACTION +
						BUDGET PLANNING + COLABERATION + PROBLEM SOLVING + IDEATION + PITCH
						CREATIVE DIRECTION + DESIGN + ANIMATION + 2D + 3D + LIVE ACTION +
						DECKS + SCRIPTS + BUDGET PLANNING + COLABERATION + PROBLEM SOLVING +
						CREATIVE DIRECTION + DESIGN + ANIMATION + 2D + 3D + LIVE ACTION
						IDEATION + PITCH DECKS + SCRIPTS + BUDGET PLANNING + COLABERATION +
					</div>
				</div>
			</div>

			<div className="flex flex-wrap w-full portfolio">
				{!loading &&
					data.posts.edges.map((item, key) => {
						const { client, projectName, year } = item.node.caseStudy;
						if (!loaded) {
							setLoaded(true);
						}
						if (item.node.featuredImage !== null) {
							return (
								<Link
									to={item.node.uri}
									key={key}
									className="flex relative top-8 opacity-0 w-1/2 xl:w-1/3 h-[280px] xl:h-[380px] skew-x-6 port-link overflow-hidden"
								>
									<img
										className="object-cover w-full"
										src={item.node.featuredImage.node.sourceUrl}
										alt=""
									/>
									{client !== null && projectName !== null && year !== null && (
										<div className="absolute w-full text-white bg-black opacity-0 port-text -bottom-8 p-7 font-letterGoth">
											<p className="font-semibold ">{client}</p>
											<p>
												{projectName} - {year}
											</p>
										</div>
									)}
								</Link>
							);
						} else {
							return (
								<Link
									to={item.node.uri}
									key={key}
									className="flex relative top-8 opacity-0 w-1/2 xl:w-1/3 h-[280px] xl:h-[380px] skew-x-6 port-link overflow-hidden"
								>
									<img
										className="object-cover w-full"
										src="images/no-feat.jpg"
										alt=""
									/>
									{client !== null && projectName !== null && year !== null && (
										<div className="absolute w-full text-white bg-black opacity-0 port-text -bottom-8 p-7 font-letterGoth">
											<p>{client}</p>
											<p>
												{projectName} - {year}
											</p>
										</div>
									)}
								</Link>
							);
						}
					})}
			</div>
		</div>
	);
};

export default Portfolio;

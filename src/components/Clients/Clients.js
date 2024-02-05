import React, { useState, useRef } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

const CLIENT_QUERY = gql`
	query ClientQuery {
		posts(first: 9999) {
			edges {
				node {
					id
					caseStudy {
						client
						fieldGroupName
						projectName
						year
					}
					uri
					title(format: RENDERED)
				}
			}
		}
	}
`;

const Clients = () => {
	const [loaded, setLoaded] = useState(false);
	const client = useRef({});
	useGSAP(() => {
		gsap.registerPlugin(ScrollTrigger);

		const clfade = gsap.timeline();

		clfade.to('.client-link', {
			bottom: '0px',
			opacity: 1,
			duration: 0.3,
			stagger: {
				each: 0.3,
				ease: 'none',
			},
		});

		ScrollTrigger.create({
			animation: clfade,
			trigger: '.clients',
			start: 'center bottom',
			end: 'center center',
			scrub: true,
		});
	}, [loaded, client]);

	const { loading, data } = useQuery(CLIENT_QUERY);
	if (loading) return '';
	return (
		<div className="relative block w-full py-14 xl:py-52 clients">
			<div className="w-full text-left break-all">
				{!loading &&
					data.posts.edges.map((item, i) => {
						if (!loaded) {
							setLoaded(true);
						}
						return (
							<Link
								className=" hover:text-blue-500 hover:bg-white text-2xl xl:text-[85px] relative client-link opacity-0 -bottom-7 leading-tight font-bold text-white uppercase font-letterGoth"
								key={i}
								to={item.node.uri}
							>
								{' ' + item.node.title} .
							</Link>
						);
					})}
			</div>
		</div>
	);
};

export default Clients;

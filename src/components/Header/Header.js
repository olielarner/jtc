import React, { useState, useRef } from 'react';
import { useQuery, gql } from '@apollo/client';
import { compose } from 'react-recompose';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';

const NAV_QUERY = gql`
	query NavQuery {
		menuItems(where: { location: MENU_1 }) {
			edges {
				node {
					id
					uri
					label
				}
			}
		}
		themeOptions {
			contactInfo {
				emailAddress
				telephoneNumber
				instagramIcon {
					node {
						altText
						mediaItemUrl
					}
				}
				instagramLink
				linkedinIcon {
					node {
						altText
						mediaItemUrl
					}
				}
				linkedinLink
				resumeFile {
					node {
						mediaItemUrl
					}
				}
			}
		}
	}
`;

const Header = (logo) => {
	const header = useRef();
	const [menuOpen, setMenuOpen] = useState(false);
	const [loaded, setLoaded] = useState(false);

	useGSAP(() => {
		if (loaded === true) {
			const burgerButton = header.current.querySelector('.burger-button');
			const topLine = header.current.querySelector('.top-line');
			const middleLine = header.current.querySelector('.middle-line');
			const bottomLine = header.current.querySelector('.bottom-line');
			const navMenu = header.current.querySelector('.nav-menu');
			const navItem = header.current.querySelectorAll('.nav-link-item');
			const cross = gsap.timeline({ paused: true });
			const ntl = gsap.timeline({ paused: true });

			const menuControl = (e) => {
				cross.reversed(!cross.reversed());
				ntl.reversed(!ntl.reversed());
			};

			burgerButton.addEventListener('click', menuControl);
			gsap.utils.toArray(navItem).forEach(function (el, index) {
				el.addEventListener('click', menuControl);
			});
			ntl
				.to(navMenu, {
					duration: 1,
					ease: 'power3.out',
					left: '0%',
				})
				.reverse();
			ntl
				.to(
					navItem,
					{
						bottom: '0px',
						opacity: 1,
						stagger: {
							each: 0.2,
							ease: 'power2.out',
						},
					},
					'0.5>'
				)
				.reverse();

			cross
				.to(
					topLine,
					{
						duration: 0.5,
						ease: 'power3.inOut',
						rotation: 45,
						top: '8px',
					},
					'0'
				)
				.reverse();
			cross
				.to(
					middleLine,
					{
						duration: 0.5,
						ease: 'power3.inOut',
						rotation: -45,
					},
					'0'
				)
				.reverse();
			cross
				.to(
					bottomLine,
					{
						duration: 0.5,
						opacity: 0,
					},
					'0'
				)
				.reverse();
		}
	}, [loaded, header, menuOpen]);

	function openMenu() {
		setMenuOpen(!menuOpen);
	}
	const { loading, error, data } = useQuery(NAV_QUERY);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	const {
		emailAddress,
		telephoneNumber,
		instagramIcon,
		instagramLink,
		linkedinIcon,
		linkedinLink,
	} = data.themeOptions.contactInfo;

	return (
		<div
			className="fixed top-0 left-0 z-40 flex items-center w-full h-20 xl:h-24 header"
			ref={header}
		>
			{logo && (
				<div className="w-full text-center">
					<a
						href="/"
						className={'font-bold font-letterGoth text-' + logo.color}
					>
						JTC
					</a>
				</div>
			)}

			<div
				className={`absolute z-10 w-[40px] h-[40px] xl:w-[50px] xl:h-[50px] flex flex-col justify-center items-center bg-white rounded-full burger-button right-5 xl:right-10 ${
					menuOpen ? 'active' : ''
				}`}
			>
				<div className="burger-button-line w-6 xl:w-7 h-[2px] bg-black mb-[6px] top-line  relative"></div>
				<div className="burger-button-line w-6 xl:w-7 h-[2px] bg-black mb-[6px] middle-line relative"></div>
				<div className="burger-button-line w-6 xl:w-7 h-[2px] bg-black bottom-line relative"></div>
			</div>
			<div className="fixed top-0 flex flex-col w-screen h-screen bg-white xl:flex-row left-full nav-menu">
				<div className="flex flex-col justify-center w-full h-[70%] xl:h-full p-8 text-white bg-black xl:p-20 xl:w-1/2">
					<ul>
						{!loading &&
							data.menuItems.edges.map((item, i) => {
								if (!loaded) {
									setLoaded(true);
								}
								return (
									<li
										className="relative mb-3 text-3xl font-medium opacity-0 xl:mb-6 xl:text-6xl font-letterGoth nav-link-item -bottom-7"
										key={i}
									>
										<Link to={item.node.uri} onClick={openMenu}>
											{item.node.label}
										</Link>
									</li>
								);
							})}
					</ul>
				</div>

				<div className="w-full h-[30%] xl:h-full p-8 xl:w-1/2 xl:p-20 ">
					{!loading && (
						<div className="flex flex-col justify-center h-full">
							<div className="flex flex-col contact-details">
								{emailAddress !== null && (
									<a
										className="mb-3 text-2xl font-medium xl:mb-6 xl:text-6xl font-letterGoth"
										href={'mailto:' + emailAddress}
									>
										{emailAddress}
									</a>
								)}
								{telephoneNumber !== null && (
									<a
										className="mb-4 text-2xl font-medium xl:mb-6 xl:text-6xl font-letterGoth"
										href={'tel:' + telephoneNumber}
									>
										{telephoneNumber}
									</a>
								)}
							</div>

							<div className="flex socials">
								{instagramIcon !== null && instagramIcon !== undefined && (
									<a href={instagramLink}>
										<img
											className="w-6 mr-6 xl:w-8 xl:mr-8"
											src={instagramIcon.node.mediaItemUrl}
											alt={instagramIcon.node.altText}
										/>
									</a>
								)}
								{linkedinIcon !== null && linkedinIcon !== undefined && (
									<a href={linkedinLink}>
										<img
											className="w-7 xl:w-9"
											src={linkedinIcon.node.mediaItemUrl}
											alt={linkedinIcon.node.altText}
										/>
									</a>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default compose(Header);

import React from 'react';
import { useQuery, gql } from '@apollo/client';

const NAV_QUERY = gql`
	query NavQuery {
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

const Footer = () => {
	const { loading, error, data } = useQuery(NAV_QUERY);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	const {
		emailAddress,
		telephoneNumber,
		resumeFile,
		instagramIcon,
		instagramLink,
		linkedinIcon,
		linkedinLink,
	} = data.themeOptions.contactInfo;

	return (
		<div className="w-full py-10 bg-white px-7 xl:py-20">
			<div className="container mx-auto font-letterGoth">
				{!loading && (
					<div className="flex flex-col justify-center h-full">
						<div className="flex flex-col justify-between mb-12 xl:flex-row contact-details">
							{emailAddress !== null && (
								<a
									className="text-xl font-medium xl:text-4xl font-letterGoth"
									href={'mailto:' + emailAddress}
								>
									{emailAddress}
								</a>
							)}
							{telephoneNumber !== null && (
								<>
									<p className="text-xl font-medium xl:text-4xl font-letterGoth">
										+
									</p>
									<a
										className="text-xl font-medium xl:text-4xl font-letterGoth"
										href={'tel:' + telephoneNumber}
									>
										{telephoneNumber}
									</a>
								</>
							)}

							{resumeFile !== null && (
								<>
									<p className="text-xl font-medium xl:text-4xl font-letterGoth">
										+
									</p>
									<a
										className="text-xl font-medium xl:text-4xl font-letterGoth"
										href={resumeFile}
									>
										Resume
									</a>
								</>
							)}
						</div>

						<div className="flex socials">
							{instagramIcon !== null && (
								<a href={instagramLink}>
									<img
										className="w-8 mr-8"
										src={instagramIcon.node.mediaItemUrl}
										alt={instagramIcon.node.altText}
									/>
								</a>
							)}
							{linkedinIcon !== null && (
								<a href={linkedinLink}>
									<img
										className=" w-9"
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
	);
};

export default Footer;

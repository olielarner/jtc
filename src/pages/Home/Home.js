import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Hero from '../../components/Hero/Hero';
import Clients from '../../components/Clients/Clients';
import Ticker from '../../components/Ticker/Ticker';
import About from '../../components/About/About';
import Loading from '../../components/Loading/Loading';

const PAGE_QUERY = gql`
	query PageQuery {
		pageBy(uri: "home") {
			id
			homePage {
				hero {
					heroBackgroundVideo {
						node {
							mediaItemUrl
						}
					}
					heroHeader
				}
			}
		}
	}
`;

const Home = () => {
	const { loading, error, data } = useQuery(PAGE_QUERY);
	if (loading) return <Loading />;
	if (error) return <p>Error : {error.message}</p>;

	const { hero } = data.pageBy.homePage;

	return (
		<div id="smooth-wrapper" className="w-full overflow-hidden bg-black ">
			<div id="smooth-content">
				<Hero hero={hero} loading={loading} />
				<Ticker skillSet="creative" direction="left" />
				<Clients />
				<Ticker skillSet="problems" direction="right" />
				<About />
			</div>
		</div>
	);
};

export default Home;

import {
	BrowserRouter,
	Routes,
	Route,
	Link,
	useParams,
} from 'react-router-dom';
import AnimatedCursor from 'react-animated-cursor';
import Home from '../pages/Home/Home';
import CaseStudy from '../pages/CaseStudy/CaseStudy';
import Footer from './Footer/Footer';
import Portfolio from '../pages/Portfolio/Portfolio';
import Header from './Header/Header';

function BlogPost() {
	let { slug } = useParams();
	return (
		<div>
			<CaseStudy slug={slug} />
		</div>
	);
}

function App() {
	return (
		<BrowserRouter>
			<Header />
			<AnimatedCursor clickables={['a', '.burger-button']} />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/case-study/:slug" element={<BlogPost />} />
				<Route exact path="/portfolio" element={<Portfolio />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;

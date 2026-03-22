import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { Contact } from './pages/Contact';

function App() {
	return (
		<Router>
			<Navigation />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/favorites" element={<Favorites />} />
				<Route path="/contact" element={<Contact />} />
			</Routes>
		</Router>
	);
}

export default App;

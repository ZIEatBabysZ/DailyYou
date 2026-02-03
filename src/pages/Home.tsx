import type { FunctionComponent } from "../common/types";
import { useState, useEffect } from "react";
import { FaWhatsapp, FaTwitter, FaSms, FaTelegram, FaEnvelope, FaCopy, FaShareAlt, FaHeart } from "react-icons/fa";
import { Navigation } from '../components/Navigation';
import { useThemeStore } from '../store/themeStore';

export const Home: FunctionComponent = () => {
	const [quote, setQuote] = useState<string>("");
	const [author, setAuthor] = useState<string>("");
	const [fade, setFade] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [toast, setToast] = useState<string>("");
	const { darkMode } = useThemeStore();

	// Local quotes collection - no API needed
	const quotes = [
		// Motivation & Success
		{ content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
		{ content: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
		{ content: "Stay hungry, stay foolish.", author: "Steve Jobs" },
		{ content: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
		{ content: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
		{ content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
		{ content: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
		{ content: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },

		// Life & Philosophy
		{ content: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
		{ content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
		{ content: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
		{ content: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
		{ content: "The only thing we have to fear is fear itself.", author: "Franklin D. Roosevelt" },
		{ content: "Life is 10% what happens to us and 90% how we react to it.", author: "Charles R. Swindoll" },
		{ content: "The unexamined life is not worth living.", author: "Socrates" },

		// Wisdom & Growth
		{ content: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
		{ content: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
		{ content: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", author: "Albert Einstein" },
		{ content: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi" },
		{ content: "The mind is everything. What you think you become.", author: "Buddha" },
		{ content: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },

		// Courage & Action
		{ content: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison" },
		{ content: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
		{ content: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
		{ content: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
		{ content: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },

		// Creativity & Dreams
		{ content: "Imagination is more important than knowledge.", author: "Albert Einstein" },
		{ content: "Logic will get you from A to B. Imagination will take you everywhere.", author: "Albert Einstein" },
		{ content: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
		{ content: "All our dreams can come true, if we have the courage to pursue them.", author: "Walt Disney" },
		{ content: "Creativity is intelligence having fun.", author: "Albert Einstein" },
	];

	const getRandomQuote = () => {
		setFade(true);
		const randomIndex = Math.floor(Math.random() * quotes.length);
		const randomQuote = quotes[randomIndex]!;
		setTimeout(() => {
			setQuote(randomQuote.content);
			setAuthor(randomQuote.author);
			setFade(false);
		}, 500);
	};

	useEffect(() => {
		getRandomQuote();
	}, []);

	const copyQuote = () => {
		navigator.clipboard.writeText(`"${quote}" - ${author}`).then(() => {
			setToast("Quote copied to clipboard!");
			setTimeout(() => setToast(""), 3000);
		});
	};

	const openShareModal = () => {
		setIsModalOpen(true);
	};

	const closeShareModal = () => {
		setIsModalOpen(false);
	};

	const shareOnPlatform = (platform: string) => {
		const text = `"${quote}" - ${author}`;
		const encodedText = encodeURIComponent(text);

		let url = "";
		switch (platform) {
			case "whatsapp":
				url = `https://wa.me/?text=${encodedText}`;
				break;
			case "twitter":
				url = `https://twitter.com/intent/tweet?text=${encodedText}`;
				break;
			case "sms":
				url = `sms:?body=${encodedText}`;
				break;
			case "telegram":
				url = `https://t.me/share/url?url=${encodedText}`;
				break;
			case "email":
				url = `mailto:?subject=Quote&body=${encodedText}`;
				break;
			default:
				break;
		}

		window.open(url, "_blank");
		closeShareModal();
	};

	const saveToFavorites = () => {
		const newFavorite = { quote, author };
		const existingFavorites = JSON.parse(localStorage.getItem('favorites') || '[]') as Array<{ quote: string; author: string }>;
		const isAlreadySaved = existingFavorites.some(
			(fav) =>
				fav.quote === quote && fav.author === author
		);

		if (!isAlreadySaved) {
			const updatedFavorites = [...existingFavorites, newFavorite];
			localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
			setToast('Quote added to favorites!');
			setTimeout(() => setToast(''), 3000);
		} else {
			setToast('Quote already in favorites!');
			setTimeout(() => setToast(''), 3000);
		}
	};

	return (
		<div className={`${darkMode ? "bg-black text-white" : "bg-white text-black"} w-screen h-screen flex flex-col justify-center items-center p-4 transition-colors duration-500`}>
			<Navigation />
			<div className={`max-w-md text-center transition-opacity duration-500 ${fade ? "opacity-0" : "opacity-100"}`}>
				<p className="text-3xl font-light mb-4">{quote}</p>
				<p className="text-gray-500 text-xl mb-8">{author.toLowerCase()}</p>
			</div>
			<div className="absolute bottom-4 left-4">
				<button
					type="button"
					className="text-gray-500 text-sm hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
					onClick={getRandomQuote}
				>
					tap for more
				</button>
			</div>
			<div className="absolute bottom-4 right-4 flex space-x-4">
				<button type="button" onClick={saveToFavorites} className="text-sm hover:scale-110 transition-transform" aria-label="Favorilere ekle">
					<FaHeart />
				</button>
				<button type="button" onClick={copyQuote} className="text-sm hover:scale-110 transition-transform" aria-label="Kopyala">
					<FaCopy />
				</button>
				<button type="button" onClick={openShareModal} className="text-sm hover:scale-110 transition-transform" aria-label="Paylaş">
					<FaShareAlt />
				</button>
			</div>

			{isModalOpen && (
				<div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-500 z-50">
					<div className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"} p-6 rounded-lg shadow-xl text-center w-80 transform transition-transform duration-500 scale-100`}>
						<h2 className="text-lg font-semibold mb-4">Share with:</h2>
						<div className="flex justify-around mb-4">
							<button type="button" onClick={() => shareOnPlatform("whatsapp")} className="flex flex-col items-center hover:scale-110 transition-transform">
								<FaWhatsapp className="text-2xl mb-1" />
								<span className="text-sm">WhatsApp</span>
							</button>
							<button type="button" onClick={() => shareOnPlatform("telegram")} className="flex flex-col items-center hover:scale-110 transition-transform">
								<FaTelegram className="text-2xl mb-1" />
								<span className="text-sm">Telegram</span>
							</button>
							<button type="button" onClick={() => shareOnPlatform("twitter")} className="flex flex-col items-center hover:scale-110 transition-transform">
								<FaTwitter className="text-2xl mb-1" />
								<span className="text-sm">Twitter</span>
							</button>
							<button type="button" onClick={() => shareOnPlatform("email")} className="flex flex-col items-center hover:scale-110 transition-transform">
								<FaEnvelope className="text-2xl mb-1" />
								<span className="text-sm">E-mail</span>
							</button>
							<button type="button" onClick={() => shareOnPlatform("sms")} className="flex flex-col items-center hover:scale-110 transition-transform">
								<FaSms className="text-2xl mb-1" />
								<span className="text-sm">Message</span>
							</button>
						</div>
						<button type="button" onClick={closeShareModal} className="text-sm text-gray-500 hover:text-gray-700">
							Close
						</button>
					</div>
				</div>
			)}

			{toast && (
				<div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
					{toast}
				</div>
			)}
		</div>
	);
};

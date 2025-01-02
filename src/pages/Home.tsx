import type { FunctionComponent } from "../common/types";
import { useState, useEffect } from "react";
import { FaWhatsapp, FaTwitter, FaSms, FaTelegram, FaEnvelope, FaMoon, FaSun, FaCopy, FaShareAlt, FaHeart } from "react-icons/fa";
import { Navigation } from '../components/Navigation.tsx';

export const Home = (): FunctionComponent => {
	const [quote, setQuote] = useState<string>("");
	const [author, setAuthor] = useState<string>("");
	const [darkMode, setDarkMode] = useState<boolean>(false);
	const [fade, setFade] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [toast, setToast] = useState<string>("");

	const fetchRandomQuote = async (): Promise<void> => {
		try {
			setFade(true);
			const response = await fetch("https://api.realinspire.tech/v1/quotes/random");
			const data = await response.json();
			if (Array.isArray(data) && data.length > 0) {
				const randomQuote = data[0];
				setTimeout(() => {
					setQuote(randomQuote.content);
					setAuthor(randomQuote.author);
					setFade(false);
				}, 500);
			} else {
				setQuote("No quotes available.");
				setAuthor("");
				setFade(false);
			}
		} catch (error) {
			console.error("Error fetching quote:", error);
			setQuote("An error occurred while fetching the quote.");
			setAuthor("");
			setFade(false);
		}
	};

	useEffect(() => {
		fetchRandomQuote();
	}, []);


	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};

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
		const existingFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
		const isAlreadySaved = existingFavorites.some(
			(fav: { quote: string; author: string }) => 
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
			<Navigation darkMode={darkMode} />
			<div className="absolute top-4 left-4 text-lg font-bold">
				DailyYou
			</div>
			<div className={`max-w-md text-center transition-opacity duration-500 ${fade ? "opacity-0" : "opacity-100"}`}>
				<p className="text-3xl font-light mb-4">{quote}</p>
				<p className="text-gray-500 text-xl mb-8">{author.toLowerCase()}</p>
			</div>
			<div className="absolute bottom-4 left-4">
				<button
					type="button"
					className="text-gray-500 text-sm"
					onClick={fetchRandomQuote}
				>
					tap for more
				</button>
			</div>
			<div className="absolute bottom-4 right-4 flex space-x-4">
				<button onClick={toggleDarkMode} className="text-sm">
					{darkMode ? <FaSun /> : <FaMoon />}
				</button>
				<button onClick={saveToFavorites} className="text-sm">
					<FaHeart />
				</button>
				<button onClick={copyQuote} className="text-sm">
					<FaCopy />
				</button>
				<button onClick={openShareModal} className="text-sm">
					<FaShareAlt />
				</button>
			</div>

			{isModalOpen && (
				<div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-500">
					<div className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"} p-6 rounded-lg shadow-xl text-center w-80 transform transition-transform duration-500 scale-100`}>
						<h2 className="text-lg font-semibold mb-4">Share with:</h2>
						<div className="flex justify-around mb-4">
							<button onClick={() => shareOnPlatform("whatsapp")} className="flex flex-col items-center">
								<FaWhatsapp className="text-2xl mb-1" />
								<span className="text-sm">WhatsApp</span>
							</button>
							<button onClick={() => shareOnPlatform("telegram")} className="flex flex-col items-center">
								<FaTelegram className="text-2xl mb-1" />
								<span className="text-sm">Telegram</span>
							</button>
							<button onClick={() => shareOnPlatform("twitter")} className="flex flex-col items-center">
								<FaTwitter className="text-2xl mb-1" />
								<span className="text-sm">Twitter</span>
							</button>
							<button onClick={() => shareOnPlatform("email")} className="flex flex-col items-center">
								<FaEnvelope className="text-2xl mb-1" />
								<span className="text-sm">E-mail</span>
							</button>
							<button onClick={() => shareOnPlatform("sms")} className="flex flex-col items-center">
								<FaSms className="text-2xl mb-1" />
								<span className="text-sm">Message</span>
							</button>
						</div>
						<button onClick={closeShareModal} className="text-sm text-gray-500">
							Close
						</button>
					</div>
				</div>
			)}

			{toast && (
				<div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
					{toast}
				</div>
			)}

			
		</div>
	);
};


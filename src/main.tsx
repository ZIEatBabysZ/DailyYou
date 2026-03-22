import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/tailwind.css";
import './common/i18n'

const root = ReactDOM.createRoot(document.querySelector("#root") as Element);
root.render(
	<React.StrictMode>
		<React.Suspense fallback="loading">
			<App />
		</React.Suspense>
	</React.StrictMode>
);

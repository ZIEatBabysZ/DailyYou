# DailyYou

A modern React application for daily inspiration, habit tracking, and personal growth. Built with TypeScript, Vite, and a comprehensive tech stack for scalability and developer experience.

## 🌟 Features

- **Daily Inspirational Quotes** - Get motivated with curated quotes and authors
- **Dark/Light Mode** - Toggle between themes for comfortable viewing
- **Quote Management** - Save favorites, copy, and share quotes across platforms
- **Social Sharing** - Share inspiration via WhatsApp, Telegram, Twitter, Email, and SMS
- **Responsive Design** - Optimized for all devices with Tailwind CSS
- **Internationalization** - Multi-language support with i18next
- **Data Visualization** - Rich charts and graphs for tracking progress

## 🚀 Quick Start

```bash
# Clone the repository
git clone <your-repo-url>
cd DailyYou

# Install dependencies
pnpm install

# Run setup script (initializes git hooks and installs playwright)
pnpm run setup

# Start development server
pnpm run dev
```

Visit `http://localhost:5173` to see your application running.

## 🛠️ Tech Stack

### Core Framework
- **[React 18.3.1](https://react.dev)** - Modern UI library with hooks and concurrent features
- **[TypeScript 5.5.4](https://typescriptlang.org)** - Type safety and enhanced developer experience
- **[Vite 5.4.2](https://vitejs.dev)** - Lightning-fast build tool and dev server

### Routing & State Management
- **[TanStack Router](https://tanstack.com/router/v1)** - Type-safe routing with file-based routing
- **[TanStack Query](https://tanstack.com/query/latest)** - Powerful data fetching and caching
- **[Zustand](https://zustand-demo.pmnd.rs)** - Lightweight state management

### UI & Styling
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[HeadlessUI](https://headlessui.com)** - Unstyled, accessible UI components
- **[Heroicons](https://heroicons.com)** - Beautiful hand-crafted SVG icons
- **[React Icons](https://react-icons.github.io/react-icons/)** - Popular icon libraries

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com)** - Performant forms with minimal re-renders
- **[Zod](https://zod.dev)** - TypeScript-first schema validation

### Data Visualization
- **[Nivo](https://nivo.rocks)** - Rich set of dataviz components built on D3
  - Line charts for progress tracking
  - Bar charts for habit completion rates
  - Pie charts for time distribution

### Development Tools
- **[Storybook](https://storybook.js.org)** - Tool for building UI components in isolation
- **[ESLint](https://eslint.org)** - Code linting with TypeScript support
- **[Prettier](https://prettier.io)** - Opinionated code formatting

## 📁 Project Structure

```
src/
├── assets/          # Static assets (images, fonts, etc.)
├── common/          # Shared utilities, types, and configurations
├── components/      # Reusable UI components
│   ├── charts/      # Data visualization components
│   ├── forms/       # Form-related components
│   ├── layout/      # Layout components (headers, sidebars, etc.)
│   ├── ui/          # Basic UI components (buttons, inputs, etc.)
│   └── utils/       # Utility components including dev tools
├── features/        # Feature-specific modules
├── hooks/          # Custom React hooks
├── pages/          # Page components (Home, etc.)
├── routes/         # TanStack Router route definitions
├── store/          # Zustand store definitions
└── styles/         # Global styles and Tailwind imports
```

## 🧪 Testing

### Unit Tests
```bash
# Run unit tests
pnpm run test:unit

# Run with coverage
pnpm run test:unit:coverage
```

### End-to-End Tests
```bash
# Run E2E tests
pnpm run test:e2e

# View test reports
pnpm run test:e2e:report
```

### All Tests
```bash
pnpm run test
```

## 📊 Development Tools & DevTools

The project includes several development tools to enhance the development experience:

- **TanStack Query Devtools** - Server state debugging (bottom left corner)
- **TanStack Router Devtools** - Routing inspection (bottom right corner)
- **TanStack Table Devtools** - Table state visualization
- **React Hook Form Devtools** - Form debugging (pink clipboard icon)
- **Zustand DevTools** - State management debugging via Redux DevTools

All devtools are automatically excluded from production builds.

## 🎨 Storybook

Develop and test components in isolation:

```bash
# Start Storybook dev server
pnpm run storybook

# Build Storybook for production
pnpm run storybook:build
```

## 🏗️ Building & Deployment

### Local Build
```bash
# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

### Docker Deployment
```bash
# Build the project
pnpm run build

# Build Docker image
docker build . -t dailyou

# Run container
docker run -p 8080:80 dailyou
```

The application will be available at `http://localhost:8080`.

## 🌍 Internationalization

The project supports multiple languages using i18next:

- Automatic language detection
- Browser language preference support
- Easy addition of new locales
- Namespace organization for translations

## ⚙️ Configuration Files

| File | Purpose |
|------|---------|
| [`vite.config.ts`](vite.config.ts) | Vite build configuration |
| [`tailwind.config.js`](tailwind.config.js) | Tailwind CSS customization |
| [`eslint.config.js`](eslint.config.js) | ESLint rules and plugins |
| [`prettier.config.js`](prettier.config.js) | Code formatting preferences |
| [`tsconfig.json`](tsconfig.json) | TypeScript compiler options |
| [`playwright.config.ts`](playwright.config.ts) | E2E testing configuration |

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm run dev` | Start development server |
| `pnpm run build` | Build for production |
| `pnpm run preview` | Preview production build |
| `pnpm run test` | Run all tests |
| `pnpm run test:unit` | Run unit tests only |
| `pnpm run test:e2e` | Run E2E tests only |
| `pnpm run lint` | Run ESLint |
| `pnpm run lint:fix` | Fix ESLint issues |
| `pnpm run format` | Format code with Prettier |
| `pnpm run storybook` | Start Storybook |
| `pnpm run setup` | Initialize project setup |

## 🔧 Code Quality & Git Hooks

The project includes automated code quality tools:

- **Husky** - Git hooks for automated checks
- **Commitizen** - Interactive commit message creation
- **Commitlint** - Enforce conventional commit messages
- **ESLint** - Static code analysis
- **Prettier** - Consistent code formatting

Commit messages follow the [Conventional Commits](https://conventionalcommits.org/) specification.

## 🎯 Key Features Implementation

### Quote Management
- Random quote fetching with author attribution
- Favorite quotes storage
- Copy to clipboard functionality
- Social platform sharing

### Theme Support
- Light/dark mode toggle
- Persistent theme preference
- Smooth transitions between themes

### Social Sharing
- WhatsApp, Telegram, Twitter integration
- Email and SMS sharing options
- Custom share modal with platform selection

## 📦 Requirements

- **Node.js 18+**
- **pnpm** (recommended) or npm/yarn
- **Modern browser** with ES2020 support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following the code style
4. Run tests: `pnpm run test`
5. Commit using conventional commits: `git commit`
6. Push to your branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built on top of the excellent [Vite React Boilerplate](https://github.com/RicardoValdovinos/vite-react-boilerplate)
- Inspired by the need for daily motivation and habit tracking
- Thanks to the open-source community for the amazing tools and libraries

---

**DailyYou** - Start each day with inspiration and track your journey to personal growth! 🌱
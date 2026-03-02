# Chastity Virtual Museum

A chic, simple, and beautiful online virtual museum application powered by the [Europeana API](https://pro.europeana.eu/page/apis). This project allows users to browse through high-quality masterpieces, view detailed artwork metadata, and explore various art eras and artists in an elegant, responsive interface.

## ✨ Features

- **Chic & Minimalist UI:** Modern aesthetics using glassmorphism effects, soft shadows, and clean typography.
- **Europeana API Integration:** Search and discover thousands of artworks, filtering by specific categories.
- **Infinite Scroll:** Seamless browsing experience with automatic fetching of next artwork batches.
- **Artwork Detail View:** Detailed modal presenting high-resolution images, creator, year, museum provider, and more.
- **"View on Source" Integration:** Direct links to the original museum or data provider's website.
- **Responsive Design:** Optimized for both desktop and mobile viewing.

## 🛠 Tech Stack

- **Frontend:** React, HTML, Vanilla CSS (Design Tokens & Glassmorphism)
- **Libraries:**
  - `axios` for API requests
  - `framer-motion` for smooth UI animations
  - `lucide-react` for beautiful, modern icons
- **Build Tool:** Vite
- **Deployment:** GitHub Pages (via GitHub Actions)

## 🚀 Live Demo

Experience the virtual museum here: [Chastity Virtual Museum](https://berkawaii.github.io/chastityWeb/)

## 💻 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Berkawaii/chastityWeb.git
   cd chastityWeb
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   - Create a `.env` file in the root of the project.
   - Obtain an API key from [Europeana](https://pro.europeana.eu/page/get-api).
   - Add your key to the `.env` file:
     ```env
     VITE_EUROPEANA_API_KEY=your_api_key_here
     ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

## 📦 Deployment

This project is configured to automatically build and deploy to GitHub Pages using GitHub Actions whenever a push is made to the `main` branch.

To manually deploy from your local machine:
```bash
npm run deploy
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

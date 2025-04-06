# 🎮 GameVault

GameVault is a fully responsive, modern web application built with React that lets users explore and discover a vast collection of video games  GameVault provides game listings with search, filters, pagination, detailed pages, user authentication, and bookmarking capabilities.

Live Link: https://gamevault-0f8m.onrender.com <!-- Optional: Replace with your own banner -->

---

## 🚀 Features

- 🔍 **Search & Filter** games by name, genre, platform, and more
- 📃 **Paginated** game listings for smooth navigation
- 🎮 **Game Details Page** with screenshots, descriptions, release dates, ratings, and platforms
- ❤️ **Bookmarking System** – Save your favorite games to your profile
- 🔐 **User Authentication** using [Clerk](https://clerk.dev)
- 📱 **Fully Responsive Design** across all screen sizes
- ⚛️ State management with **Redux Toolkit**

---

## 🛠️ Tech Stack

- **Frontend:** React, React-Bootstrap, Bootstrap, Vanilla CSS
- **Authentication:** Clerk
- **State Management:** Redux Toolkit
- **API:** [RAWG Video Games Database](https://rawg.io/apidocs)

---


## 🔧 Setup Instructions

1. **Clone the repository**
   ```bash
    git clone https://github.com/deepanshi-jn/GameVault.git
    cd GameVault
   ```

2. **Install dependencies**
  ```bash
   npm install
  ```

3. **Create a .env file and add your Clerk and RAWG API keys:**
```bash
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
   VITE_RAWG_API_KEY=your_rawg_key
```

4. **Run the app**
```bash
   npm run dev
```


📂 Folder Structure

src/
├── components/
├── pages/
├── redux/
├── services/
├── styles/
├── App.jsx
├── main.jsx
└── ...

🙌 Acknowledgements:

RAWG API

Clerk

React-Bootstrap

Redux Toolkit

📬 Contact
Have feedback or want to contribute? Feel free to reach out!

💼 GitHub: deepanshi-jn,

📧 Email: deepanshijain1211@gmail.com


🎮 GameVault
Your go-to platform for exploring, managing, and discussing the best games out there.

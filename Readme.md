# Ricesource 🖥️🎨

A community-driven platform for Linux desktop customization enthusiasts.

## 📝 Table of Contents

- [Description](#description)
- [Features](#key-features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Description

Ricesource is a beautifully crafted web application designed for Linux enthusiasts to share and discover unique desktop customizations, commonly known as "rice." With Ricesource, users can effortlessly upload their personalized rice configurations and share them with the community.

## 🚀 Key Features

- **Upload and Share**: Showcase your custom Linux desktop setups by uploading your rice configurations. Inspire others with your creativity and unique style.
- **Discover and Download**: Browse through a diverse collection of rice shared by other users. Find the perfect setup that matches your taste and download it to apply on your own Linux system.
- **Community Driven**: Engage with a vibrant community of Linux users who are passionate about desktop customization. Exchange ideas, tips, and tricks to enhance your Linux experience.

## 💻 Tech Stack

- **Backend**:
  - Node.js
  - Express.js
  - Supabase (Database)
- **Frontend**:
  - [To be specified]
- **Authentication**:
  - JWT (JSON Web Tokens)
- **Deployment**:
  - [To be specified]

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js 18.18 or later
- Supabase account
- Git

## 🔧 Installation

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/ricesource.git
   cd ricesource
   ```

2. Install backend dependencies

   ```bash
   cd Backend_3
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the `Backend_3` directory with the following variables:
   ```
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_api_key
   JWT_SECRET=your_jwt_secret
   ```

## 🏃 Running the Project

### Backend

1. Start the backend server in development mode (with hot-reload):

   ```bash
   cd Backend_3
   node src/index.js
   ```

2. The backend server will be available at `http://localhost:5000`

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies and start the development server:

   ```bash
   npm install
   npm run dev
   ```

3. The frontend will be available at `http://localhost:3000` (or another available port)

## 📂 Project Structure

```
ricesource/
│
├── Backend_3/                  # Backend server
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Custom middleware
│   │   ├── docs/              # API documentation
│   │   └── index.js           # Application entry point
│   ├── package.json
│   └── .env
│
├── frontend/                  # Frontend application
│   ├── app/                    # Next.js app directory
│   │   ├── dashboardAdmin/     # Admin dashboard pages
│   │   ├── login/              # User login page
│   │   ├── loginAdmin/         # Admin login page
│   │   ├── register/           # User registration
│   │   ├── ricesource/         # Main application pages
│   │   │   ├── about/          # About page
│   │   │   ├── bookmark/       # Bookmark functionality
│   │   │   ├── explore/        # Explore rice configurations
│   │   │   ├── manage/         # Rice management
│   │   │   └── rice/           # Rice configuration pages
│   │   └── ...
│   │
│   ├── actions/               # Server actions
│   │   ├── adminSettings.ts
│   │   ├── auth.ts
│   │   ├── bookmark.ts
│   │   ├── comment.ts
│   │   └── ...
│   │
│   ├── components/            # Reusable UI components
│   │   ├── admin/             # Admin components
│   │   ├── ui/                # UI components
│   │   └── ...
│   │
│   ├── lib/                   # Utility functions
│   ├── public/                # Static files
│   └── ...
│
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Join Ricesource today and transform your Linux desktop into a work of art!** 🐧✨

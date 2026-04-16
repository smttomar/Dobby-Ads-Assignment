# 🚀 Full Stack Drive (File Management System)

A modern **Google Drive-like file management system** built with a full-stack architecture using **React, Node.js, MongoDB, and Cloudinary**.

👉 Live Demo: https://dobby-ads-assignment-psi.vercel.app  
👉 Backend API: https://dobby-ads-assignment-1pry.onrender.com  
👉 GitHub: https://github.com/smttomar

---

## ✨ Features

### 🔐 Authentication

- User Registration & Login
- JWT-based authentication
- Protected routes (Dashboard access control)

### 📁 Folder Management

- Create nested folders
- Breadcrumb navigation
- Folder size calculation

### 🖼️ File Upload System

- Upload images to Cloudinary
- View files inside folders
- Image preview modal (with blur + animation)

### 🎨 UI/UX (Premium Level)

- Google Drive inspired UI
- Collapsible sidebar
- Loading spinners (login, upload, logout)
- Toast notifications (react-hot-toast)
- Smooth animations & hover effects

### ⚡ Performance & Deployment

- Cloudinary for scalable file storage
- Deployed on Vercel (frontend) & Render (backend)
- Optimized API structure

---

## 🛠️ Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- React Router
- Axios
- React Hot Toast
- Lucide Icons

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer + Cloudinary

### Deployment

- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)
- Cloudinary (File Storage)

---

## 📂 Project Structure

```
project-root/
│
├── frontend/         # React App (Vite)
│   ├── src/
│   └── components/
│
├── backend/          # Node.js API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/smttomar
cd your-project
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
```

Run backend:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌍 Environment Variables

### Backend

- MONGO_URI
- JWT_SECRET
- CLOUD_NAME
- CLOUD_API_KEY
- CLOUD_API_SECRET

---

## 📸 Screenshots

![alt text](image.png)

---

## 🧠 Key Learnings

- Handling **file uploads in production (Cloudinary)**
- Solving **deployment issues (Vercel routing + Render storage)**
- Implementing **protected routes & auth flow**
- Building **scalable full-stack architecture**
- Improving **UX with loaders, toasts, and animations**

---

## 🚀 Future Improvements

- File delete & rename
- Drag & drop upload
- File sharing via link
- Search & filter system
- Dark mode 🌙

---

## 👨‍💻 Author

**Chandra Pratap Singh**  
🔗 GitHub: https://github.com/smttomar

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!

---

# MarketPlace - miniOLX Platform

A full-stack marketplace application built with React, Node.js, Express, and MongoDB. Users can list products, browse categories, and manage their marketplace listings.

## 🚀 Features

- **User Authentication** - Registration, login with validation
- **Product Management** - Create, read, update, delete product listings
- **Category Browsing** - Filter by Electronics, Vehicles, Furniture, etc.
- **Wishlist System** - Save favorite products with heart toggle
- **Seller Information** - View seller details on product pages
- **Responsive Design** - Mobile-first with Tailwind CSS

## 🛠️ Tech Stack

**Frontend:** React 18, React Router, Tailwind CSS, Material Symbols
**Backend:** Node.js, Express.js, MongoDB, Mongoose, CORS
**Tools:** Nodemon, Git

## 📁 Project Structure

```
miniOLX1.0/
├── backend/
│   ├── controllers/     # Business logic
│   ├── models/         # Database schemas
│   ├── routes/        # API endpoints
│   └── index.js       # Server entry
├── frontend/
│   ├── src/Pages/     # React components
│   ├── src/Layout/    # Layout components
│   └── public/        # Static assets
└── README.md
```

## 🔧 Quick Start

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone & Install**

   ```bash
   git clone <repository-url>
   cd miniOLX1.0

   # Backend
   cd backend && npm install

   # Frontend
   cd ../frontend && npm install
   ```

2. **Setup Database**

   ```bash
   # Create database
   mongosh
   use miniOLX
   ```

3. **Start Development**

   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start

   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

4. **Access Application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8010

## 🔌 API Endpoints

**Users:** `GET|POST /user`, `GET /user/:id`
**Products:** `GET|POST /product`, `GET|PATCH|DELETE /product/:id`, `GET /product/category/:category`
**Wishlist:** `POST|DELETE /wishlist`, `GET /wishlist/has`, `GET /wishlist`

## 🔮 Future Enhancements

- JWT Authentication
- Image Upload
- Real-time Chat
- Payment Integration
- Advanced Search
- Mobile App

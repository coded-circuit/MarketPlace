# MarketPlace - miniOLX Platform

A full-stack marketplace application built with React, Node.js, Express, and MongoDB. Users can list products, browse categories, and manage their marketplace listings.

## 🚀 Features

### Core Functionality

- **User Authentication & Registration** - Secure user accounts with validation
- **Product Management** - Create, read, update, and delete product listings
- **Category-based Browsing** - Filter products by categories (Electronics, Vehicles, Furniture, etc.)
- **Wishlist System** - Save favorite products with heart icon toggle
- **Seller Information** - View seller details on product pages
- **Responsive Design** - Mobile-first approach with Tailwind CSS

### Product Features

- **Image Support** - Product images with placeholder integration
- **Location-based Listings** - Products show seller location
- **Price Display** - Clear pricing with currency formatting
- **Search & Filter** - Location and product search functionality
- **Breadcrumb Navigation** - Easy navigation between categories and products

### User Experience

- **Real-time Validation** - Password matching, form validation
- **Interactive UI** - Hover effects, loading states, error handling
- **Professional Design** - Clean, modern interface with consistent styling
- **Category Filtering** - Dynamic product filtering with active states

## 🛠️ Tech Stack

### Frontend

- **React 18** - Component-based UI
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Material Symbols** - Icon library
- **JavaScript ES6+** - Modern JavaScript features

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing

### Development Tools

- **Nodemon** - Auto-restart development server
- **Git** - Version control

## 📁 Project Structure

```
miniOLX1.0/
├── backend/
│   ├── controllers/
│   │   └── user.js          # User authentication logic
│   ├── models/
│   │   ├── user.js          # User schema
│   │   ├── product.js       # Product schema
│   │   └── wishlist.js      # Wishlist schema
│   ├── routes/
│   │   ├── user.js          # User routes
│   │   ├── product.js       # Product routes
│   │   └── wishlist.js      # Wishlist routes
│   ├── connection.js        # Database connection
│   └── index.js             # Server entry point
├── frontend/
│   ├── src/
│   │   ├── Pages/
│   │   │   ├── Dashboard.jsx    # Product listing page
│   │   │   ├── Product.jsx       # Product detail page
│   │   │   ├── Register.jsx      # User registration
│   │   │   ├── Login.jsx         # User login
│   │   │   └── Sell.jsx          # Product creation
│   │   ├── Layout/
│   │   │   └── RootLayout.jsx    # Main layout component
│   │   ├── App.js               # Router configuration
│   │   └── index.js             # React entry point
│   └── public/
└── README.md
```

## 🗄️ Database Schema

### User Model

```javascript
{
  name: String (required),
  username: String (required, unique),
  email: String (required, unique, lowercase),
  password: String (required),
  phone: Number (required),
  location: String (required),
  created_at: Date
}
```

### Product Model

```javascript
{
  title: String (required),
  description: String (required),
  price: Number (required, min: 0),
  category: String (required, lowercase),
  img_url: String,
  seller_id: ObjectId (ref: 'User'),
  location: String (required),
  is_sold: Boolean (default: false),
  created_at: Date,
  updated_at: Date
}
```

### Wishlist Model

```javascript
{
  user_id: ObjectId (ref: 'User'),
  product_id: ObjectId (ref: 'Product'),
  seller_id: ObjectId (ref: 'User'),
  created_at: Date
}
```

## 🔌 API Endpoints

### User Routes (`/user`)

- `GET /` - Fetch all users
- `GET /:id` - Fetch user by ID
- `POST /` - Create new user

### Product Routes (`/product`)

- `GET /` - Fetch all products
- `POST /` - Create new product
- `GET /:id` - Fetch product by ID (with seller population)
- `PATCH /:id` - Update product
- `DELETE /:id` - Delete product
- `GET /category/:category` - Fetch products by category

### Wishlist Routes (`/wishlist`)

- `POST /` - Add to wishlist
- `DELETE /` - Remove from wishlist
- `GET /has` - Check if product is in wishlist
- `GET /` - Fetch user's wishlist (with populated data)

## 🔧 Local Development Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd miniOLX1.0
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up MongoDB**

   - Install MongoDB locally or use MongoDB Atlas
   - Create a database named `miniOLX`
   - Update connection string in `backend/connection.js` if needed

5. **Configure environment variables**

   ```bash
   # Backend (.env)
   MONGODB_URI=mongodb://localhost:27017/miniOLX
   PORT=8010

   # Frontend (.env)
   REACT_APP_API_BASE_URL=http://localhost:8010
   ```

6. **Start the development servers**

   **Terminal 1 - Backend:**

   ```bash
   cd backend
   npm start
   # or
   nodemon index.js
   ```

   **Terminal 2 - Frontend:**

   ```bash
   cd frontend
   npm start
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8010

### Database Setup

```bash
# Connect to MongoDB
mongosh

# Use the database
use miniOLX

# Create a test user (optional)
db.users.insertOne({
  name: "Test User",
  username: "testuser",
  email: "test@example.com",
  password: "password123",
  phone: 9876543210,
  location: "Test City"
})
```

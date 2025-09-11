# API Contract Documentation
**Foody Restaurant API - Complete Collection**

## Base URL
```
https://be-restaurant-app-for-mentee-b6yxog5fk.vercel.app
```

## Response Format
All API responses follow this standard format:
```json
{
  "success": boolean,
  "message": string,
  "data": object | array | null,
  "errors": object | null
}
```

## Authentication
- **Type**: Bearer Token (JWT)
- **Header**: `Authorization: Bearer {jwt_token}`
- **Token obtained from**: Login endpoint

---

## 📝 Authentication Endpoints

### 1. Register User
**POST** `/api/auth/register`

**Headers:**
- `Content-Type: application/json`
- `Accept: application/json`

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, email format)",
  "phone": "string (required)",
  "password": "string (required, min 8 chars)",
  "confirmPassword": "string (required, must match password)"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "phone": "string"
    }
  }
}
```

### 2. Login User
**POST** `/api/auth/login`

**Headers:**
- `Content-Type: application/json`
- `Accept: application/json`

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "string (JWT token)",
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "phone": "string",
      "role": "customer | admin | staff"
    }
  }
}
```

### 3. Get Profile
**GET** `/api/auth/profile`

**Headers:**
- `Accept: application/json`
- `Authorization: Bearer {jwt_token}`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "role": "string",
    "avatar": "string | null"
  }
}
```

### 4. Update Profile
**PUT** `/api/auth/profile`

**Headers:**
- `Content-Type: application/json`
- `Accept: application/json`
- `Authorization: Bearer {jwt_token}`

**Request Body (Name & Phone Update):**
```json
{
  "name": "string (optional)",
  "phone": "string (optional)"
}
```

**Request Body (Password Change):**
```json
{
  "currentPassword": "string (required)",
  "newPassword": "string (required, min 8 chars)"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string"
  }
}
```

---

## 🏪 Restaurant Endpoints

### 1. Get All Restaurants (with filters)
**GET** `/api/resto`

**Headers:**
- `Accept: application/json`

**Query Parameters:**
- `location` (string, optional): Filter by location
- `priceMin` (number, optional): Minimum price filter
- `priceMax` (number, optional): Maximum price filter
- `rating` (number, optional): Minimum rating filter (1-5)
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 10)

**Example:**
```
GET /api/resto?location=Jakarta&priceMin=10000&priceMax=50000&rating=4&page=1&limit=10
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "restaurants": [
      {
        "id": "number",
        "name": "string",
        "description": "string",
        "location": "string",
        "rating": "number",
        "priceRange": "string",
        "image": "string",
        "isOpen": "boolean"
      }
    ],
    "pagination": {
      "page": "number",
      "limit": "number",
      "total": "number",
      "totalPages": "number"
    }
  }
}
```

### 2. Get Recommended Restaurants
**GET** `/api/resto/recommended`

**Headers:**
- `Accept: application/json`
- `Authorization: Bearer {jwt_token}`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "restaurants": [
      {
        "id": "number",
        "name": "string",
        "description": "string",
        "location": "string",
        "rating": "number",
        "priceRange": "string",
        "image": "string"
      }
    ]
  }
}
```

### 3. Get Restaurant Detail
**GET** `/api/resto/{id}`

**Headers:**
- `Accept: application/json`

**Path Parameters:**
- `id` (number, required): Restaurant ID

**Query Parameters:**
- `limitMenu` (number, optional): Limit number of menus returned
- `limitReview` (number, optional): Limit number of reviews returned

**Example:**
```
GET /api/resto/25?limitMenu=5&limitReview=3
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "restaurant": {
      "id": "number",
      "name": "string",
      "description": "string",
      "location": "string",
      "rating": "number",
      "priceRange": "string",
      "image": "string",
      "isOpen": "boolean",
      "menus": [
        {
          "id": "number",
          "name": "string",
          "description": "string",
          "price": "number",
          "image": "string",
          "category": "string"
        }
      ],
      "reviews": [
        {
          "id": "number",
          "star": "number",
          "comment": "string",
          "user": {
            "name": "string"
          },
          "createdAt": "string"
        }
      ]
    }
  }
}
```

---

## 🛒 Cart Management Endpoints

### 1. Add to Cart
**POST** `/api/cart`

**Headers:**
- `Content-Type: application/json`
- `Accept: application/json`
- `Authorization: Bearer {jwt_token}`

**Request Body:**
```json
{
  "restaurantId": "number (required)",
  "menuId": "number (required)",
  "quantity": "number (required, min 1)"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Item added to cart",
  "data": {
    "cartItem": {
      "id": "number",
      "menuId": "number",
      "quantity": "number",
      "itemTotal": "number",
      "menu": {
        "name": "string",
        "price": "number"
      }
    }
  }
}
```

### 2. Get Cart
**GET** `/api/cart`

**Headers:**
- `Accept: application/json`
- `Authorization: Bearer {jwt_token}`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "cart": [
      {
        "id": "number",
        "menuId": "number",
        "quantity": "number",
        "itemTotal": "number",
        "menu": {
          "name": "string",
          "price": "number",
          "image": "string"
        },
        "restaurant": {
          "id": "number",
          "name": "string"
        }
      }
    ],
    "summary": {
      "totalItems": "number",
      "totalPrice": "number"
    }
  }
}
```

### 3. Update Cart Item Quantity
**PUT** `/api/cart/{cartItemId}`

**Headers:**
- `Content-Type: application/json`
- `Accept: application/json`
- `Authorization: Bearer {jwt_token}`

**Path Parameters:**
- `cartItemId` (number, required): Cart item ID

**Request Body:**
```json
{
  "quantity": "number (required, min 1)"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Cart item updated",
  "data": {
    "cartItem": {
      "id": "number",
      "quantity": "number",
      "itemTotal": "number"
    }
  }
}
```

### 4. Remove Cart Item
**DELETE** `/api/cart/{cartItemId}`

**Headers:**
- `Accept: application/json`
- `Authorization: Bearer {jwt_token}`

**Path Parameters:**
- `cartItemId` (number, required): Cart item ID

**Response (200):**
```json
{
  "success": true,
  "message": "Cart item removed successfully"
}
```

### 5. Clear Entire Cart
**DELETE** `/api/cart`

**Headers:**
- `Accept: application/json`
- `Authorization: Bearer {jwt_token}`

**Response (200):**
```json
{
  "success": true,
  "message": "Cart cleared successfully"
}
```

---

## 📋 Order Endpoints

### 1. Create Order (Checkout)
**POST** `/api/order/checkout`

**Headers:**
- `Content-Type: application/json`
- `Accept: application/json`
- `Authorization: Bearer {jwt_token}`

**Request Body:**
```json
{
  "deliveryAddress": "string (required)",
  "paymentMethod": "string (required: credit_card, debit_card, cash, e_wallet)",
  "notes": "string (optional)"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "transactionId": "string",
    "orderId": "number",
    "totalAmount": "number",
    "paymentMethod": "string",
    "deliveryAddress": "string",
    "status": "preparing"
  }
}
```

### 2. Get My Orders (with status filter)
**GET** `/api/order/my-order`

**Headers:**
- `Accept: application/json`
- `Authorization: Bearer {jwt_token}`

**Query Parameters:**
- `status` (string, optional): Filter by order status
  - Values: `preparing`, `on_the_way`, `delivered`, `done`, `cancelled`
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 10)

**Example:**
```
GET /api/order/my-order?status=preparing&page=1&limit=10
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "number",
        "transactionId": "string",
        "status": "string",
        "totalAmount": "number",
        "deliveryAddress": "string",
        "paymentMethod": "string",
        "notes": "string",
        "createdAt": "string",
        "restaurant": {
          "name": "string",
          "location": "string"
        },
        "items": [
          {
            "menuName": "string",
            "quantity": "number",
            "price": "number"
          }
        ]
      }
    ],
    "pagination": {
      "page": "number",
      "limit": "number",
      "total": "number",
      "totalPages": "number"
    }
  }
}
```

### 3. Update Order Status
**PUT** `/api/order/{orderId}/status`

**Headers:**
- `Content-Type: application/json`
- `Accept: application/json`
- `Authorization: Bearer {jwt_token}`

**Path Parameters:**
- `orderId` (number, required): Order ID

**Request Body:**
```json
{
  "status": "string (required: preparing, on_the_way, delivered, done, cancelled)"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Order status updated",
  "data": {
    "order": {
      "id": "number",
      "status": "string",
      "updatedAt": "string"
    }
  }
}
```

---

## ⭐ Review Endpoints

### 1. Create Review
**POST** `/api/review`

**Headers:**
- `Content-Type: application/json`
- `Accept: application/json`
- `Authorization: Bearer {jwt_token}`

**Request Body:**
```json
{
  "transactionId": "string (required)",
  "restaurantId": "number (required)",
  "star": "number (required, 1-5)",
  "comment": "string (required)"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Review created successfully",
  "data": {
    "review": {
      "id": "number",
      "star": "number",
      "comment": "string",
      "transactionId": "string",
      "restaurantId": "number",
      "createdAt": "string"
    }
  }
}
```

### 2. Get Restaurant Reviews
**GET** `/api/review/restaurant/{restaurantId}`

**Headers:**
- `Accept: application/json`
- `Authorization: Bearer {jwt_token}`

**Path Parameters:**
- `restaurantId` (number, required): Restaurant ID

**Query Parameters:**
- `rating` (number, optional): Filter by specific rating (1-5)
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 10)

**Example:**
```
GET /api/review/restaurant/25?rating=5&page=1&limit=10
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": "number",
        "star": "number",
        "comment": "string",
        "createdAt": "string",
        "user": {
          "name": "string",
          "avatar": "string"
        }
      }
    ],
    "pagination": {
      "page": "number",
      "limit": "number",
      "total": "number",
      "totalPages": "number"
    },
    "summary": {
      "averageRating": "number",
      "totalReviews": "number",
      "ratingDistribution": {
        "5": "number",
        "4": "number",
        "3": "number",
        "2": "number",
        "1": "number"
      }
    }
  }
}
```

### 3. Get My Reviews
**GET** `/api/review/my-reviews`

**Headers:**
- `Accept: application/json`
- `Authorization: Bearer {jwt_token}`

**Query Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 10)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": "number",
        "star": "number",
        "comment": "string",
        "createdAt": "string",
        "restaurant": {
          "name": "string",
          "image": "string"
        }
      }
    ],
    "pagination": {
      "page": "number",
      "limit": "number",
      "total": "number",
      "totalPages": "number"
    },
    "summary": {
      "totalReviews": "number",
      "averageRating": "number"
    }
  }
}
```

### 4. Update Review
**PUT** `/api/review/{reviewId}`

**Headers:**
- `Content-Type: application/json`
- `Accept: application/json`
- `Authorization: Bearer {jwt_token}`

**Path Parameters:**
- `reviewId` (number, required): Review ID

**Request Body:**
```json
{
  "star": "number (required, 1-5)",
  "comment": "string (required)"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Review updated successfully",
  "data": {
    "review": {
      "id": "number",
      "star": "number",
      "comment": "string",
      "updatedAt": "string"
    }
  }
}
```

### 5. Delete Review
**DELETE** `/api/review/{reviewId}`

**Headers:**
- `Accept: application/json`
- `Authorization: Bearer {jwt_token}`

**Path Parameters:**
- `reviewId` (number, required): Review ID

**Response (200):**
```json
{
  "success": true,
  "message": "Review deleted successfully"
}
```

---

## 🔍 Health Check Endpoints

### 1. Health Check
**GET** `/health`

**Headers:**
- `Accept: application/json`

**Response (200):**
```json
{
  "success": true,
  "message": "API is healthy",
  "timestamp": "string"
}
```

### 2. Simple Test
**GET** `/test`

**Headers:**
- `Accept: application/json`

**Response (200):**
```json
{
  "success": true,
  "message": "Test endpoint working"
}
```

---

## 📊 Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request data |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource not found |
| 422 | Unprocessable Entity - Validation errors |
| 500 | Internal Server Error - Server error |

## 🔒 Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "errors": {
    "field": ["Validation error message"]
  }
}
```

## 📋 Order Status Flow

```
preparing → on_the_way → delivered → done
     ↓
  cancelled (can be set from any status)
```

## 💳 Payment Methods

- `credit_card`
- `debit_card`
- `cash`
- `e_wallet`

## 🔑 User Roles

- `customer` - Regular app user
- `admin` - System administrator
- `staff` - Restaurant staff

---

## 📝 Notes

1. All timestamps are in ISO 8601 format
2. All monetary values are in Indonesian Rupiah (IDR)
3. Rating values are integers from 1 to 5
4. JWT tokens should be stored securely and included in Authorization header
5. API responses include global validation for response time (<5000ms) and JSON content type
6. Environment variables are used for dynamic values (transaction IDs, cart item IDs, etc.)

## 🧪 Testing

This API collection includes comprehensive test scripts for:
- Response validation
- Status code verification
- Data structure validation
- Automatic token management
- Dynamic variable storage for chained requests

Use the provided Postman collection for complete API testing workflow.

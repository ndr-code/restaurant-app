# Restaurant App 🍽️

Modern restaurant discovery and ordering application built with React, TypeScript, and Redux Toolkit.

## ✨ Features

- 🔐 **Authentication System** - Login, register, profile management
- 🏪 **Restaurant Discovery** - Browse restaurants with advanced filters
- 🛒 **Shopping Cart** - Add, update, remove items with real-time calculations
- 📦 **Order Management** - Place orders, track status, order history
- ⭐ **Review System** - Rate and review restaurants and orders
- 🎨 **Modern UI** - Responsive design with Tailwind CSS
- 📱 **Mobile-First** - Optimized for all device sizes
- 🔄 **State Management** - Redux Toolkit for scalable state management

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Design System
- **State Management**: Redux Toolkit + React Redux
- **Build Tool**: Vite with HMR
- **Code Quality**: ESLint + TypeScript strict mode

## 📁 Project Structure

```
restaurant-app/
├── public/               # Static assets
├── src/
│   ├── store/           # Redux store configuration
│   │   ├── slices/      # Redux slices (auth, restaurant, cart, order, review)
│   │   ├── hooks.ts     # Custom typed hooks
│   │   └── index.ts     # Store configuration
│   ├── types/           # TypeScript type definitions
│   ├── examples/        # Usage examples
│   ├── assets/          # Images and icons
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles + design system
├── REDUX_SETUP.md      # Detailed Redux documentation
└── APICONTRACT.md      # API contract specification
```

## 🛠️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd restaurant-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Development

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### VS Code Settings
The project includes VS Code workspace settings to hide unnecessary files:
- `node_modules/`
- `dist/`
- Various config files
- Log files

## 🎨 Design System

The application implements a comprehensive design system with:

### Typography
- **Primary Font**: Nunito (Google Fonts)
- **Font Sizes**: 12px to 48px with consistent scale
- **Font Weights**: Light (300) to Black (900)

### Colors
- **Primary**: Blue palette (#1e40af to #dbeafe)
- **Secondary**: Slate palette (#0f172a to #f8fafc)
- **Success**: Green palette (#166534 to #dcfce7)
- **Warning**: Yellow palette (#a16207 to #fefce8)
- **Error**: Red palette (#dc2626 to #fef2f2)

### Spacing & Layout
- **Consistent spacing scale**: 2px to 192px
- **Grid system**: 12-column responsive grid
- **Breakpoints**: Mobile-first responsive design

## 🔄 State Management

The application uses Redux Toolkit for state management with the following slices:

### Auth Slice
- User authentication
- Profile management
- Token persistence

### Restaurant Slice
- Restaurant discovery
- Filtering and search
- Restaurant details

### Cart Slice
- Shopping cart management
- Item quantity updates
- Price calculations

### Order Slice
- Order creation (checkout)
- Order history
- Status tracking

### Review Slice
- Restaurant reviews
- User review management
- Rating system

**📚 For detailed Redux documentation, see [REDUX_SETUP.md](./REDUX_SETUP.md)**

## 🌐 API Integration

The application is designed to work with a REST API. All endpoints are documented in `APICONTRACT.md`.

### Key Features:
- Type-safe API calls
- Automatic token management
- Error handling
- Loading states
- Pagination support

## 🧪 Testing

The codebase is structured for easy testing:

- **Pure reducers** for unit testing
- **Async thunks** for integration testing
- **Component testing** with mocked Redux store
- **Type safety** prevents runtime errors

## 📱 Responsive Design

- **Mobile-first** approach
- **Flexible layouts** with CSS Grid and Flexbox
- **Touch-friendly** interface
- **Performance optimized** for mobile devices

## 🔐 Security

- **Token-based authentication**
- **Secure token storage**
- **Protected routes**
- **Input validation**
- **XSS protection**

## 🚀 Performance

- **Code splitting** with lazy loading
- **Optimized bundle size**
- **Efficient re-renders** with Redux selectors
- **Image optimization**
- **Fast refresh** during development

## 🔮 Future Enhancements

- [ ] Offline support with Redux Persist
- [ ] Real-time updates with WebSocket
- [ ] Push notifications
- [ ] Advanced search with Elasticsearch
- [ ] Geolocation integration
- [ ] Social login integration
- [ ] Dark mode support
- [ ] PWA capabilities

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

For questions or support, please open an issue in the repository.

---

**Happy coding! 🚀**

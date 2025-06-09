

# TravelTrucks – Camper Rental Web Application

This project is a frontend web application for **TravelTrucks**, a company that rents out campers. The application allows users to browse, filter, and book campers using a clean and modern user interface.

## 🚀 Features

- **Home Page** with a call-to-action and stylish banner
- **Catalog Page** with a list of available campers
- **Advanced Filtering** (by location, vehicle type, and amenities)
- **Pagination** and “Load More” button
- **Favorites**: Add campers to favorites (saved in localStorage)
- **Camper Details Page**: Full information, image gallery, reviews, and booking form
- **Responsive Design** (main focus on desktop)
- **Redux** for global state management
- **React Router** for routing
- **Axios** for API requests
- **Tailwind CSS** for styling
- **Loader** for async operations and error handling

## 📦 Technologies

- React (Vite)
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS

## 🛠 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/traveltrucks.git
cd traveltrucks
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open in browser

Go to `travel-trucks-rent-app.vercel.app/`.

## 🌐 API

- The application uses a ready-made backend API:  
  [`https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers`](https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers)

- **Endpoints:**
  - `GET /campers` — Get all campers (with filter params: `location`, `form`, amenities, etc.)
  - `GET /campers/:id` — Get camper details by ID

## 📝 Project Structure

```
src/
  components/      # Reusable React components
  pages/           # Page components (Home, Catalog, Camper details)
  redux/           # Redux slices and store
  services/        # API client
  shared/          # Icons, Logo, shared UI
  App.jsx
  main.jsx
tailwind.config.js
```

## 🖼 Design

- UI/UX follows the provided Figma/mockup (desktop-first).
- Main colors and spacing are managed via Tailwind CSS and CSS variables.

## ⚡ Deployment

The project can be easily deployed to [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/).

## 🧩 Scripts

- `npm run dev` — start development server
- `npm run build` — build for production
- `npm run preview` — preview production build

## 📃 License

This project is for educational/demo purposes.

---

**Created with ❤️ for learning and portfolio.**


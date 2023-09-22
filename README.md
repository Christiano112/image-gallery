# Image Gallery Project

This is a simple Image Gallery project with a Drag and Drop Feature built using Next.js, Tailwind CSS, and other libraries. It allows you to view and interact with a collection of images fetched from an external source. This README provides instructions on how to set up and run the project locally.

## Prerequisites

Before running the project, ensure you have the following dependencies installed on your system:

- Node.js: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

## Getting Started

Follow these steps to get the project up and running on your local machine:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/image-gallery.git
   ```

2. Navigate to the project directory:

   ```bash
   cd image-gallery
   ```

3. Install project dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the project root directory and add your environment variables. You can use the following template as a starting point:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=<Your Supabase URL>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<Your Supabase Anonymous Key>
   NEXT_PUBLIC_UNSPLASH_KEY=<Your Unsplash Access Key>
   ```

   Replace `<Your Supabase URL>`, `<Your Supabase Anonymous Key>` and `<Your Unsplash Access Key>` with your Supabase project's URL and anonymous key and Unsplash access key.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open your browser and visit `http://localhost:3000` to access the Image Gallery.

## Available Scripts

In the project directory, you can run the following scripts:

- `npm run dev`: Starts the development server and runs the application in development mode.

- `npm run build`: Builds the production-ready application for deployment.

- `npm start`: Starts the production server to serve the built application.

- `npm run lint`: Lints the project using ESLint.

- `npm run format`: Formats the project code using Prettier.

## Dependencies

Here are the main dependencies used in this project:

- Next.js: A React framework for building server-rendered web applications.

- Tailwind CSS: A utility-first CSS framework for building responsive and efficient web designs.

- Supabase: A cloud database service that provides authentication, real-time data, and more.

- React Hook Form: A library for managing forms in React.

- React Icons: A library of popular icon packs as React components.

- React Toastify: A notification library for displaying toast messages.

- Yup: A schema validation library.

## Acknowledgments

- Images sourced from [Unsplash](https://unsplash.com).

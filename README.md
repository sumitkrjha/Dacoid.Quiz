# Interactive Quiz Platform

## Overview

The **Interactive Quiz Platform** is a web application designed to allow users to attempt quizzes, get instant feedback, and track their progress. The platform is built using **React.js**, **Vite**, **Tailwind CSS**, and **IndexedDB** to store quiz history. This platform supports multiple quiz attempts, timers, and a scoreboard to track user performance. Additionally, users can view their attempt history for further analysis.
### Live at [here](https://quiz-sumit.netlify.app)

## Screen Shots
### Landing Page
![landing](https://github.com/user-attachments/assets/5e7c42e5-e0e1-4aef-b1c4-7d0a227a151a)

### Quiz
![Quiz](https://github.com/user-attachments/assets/d2f46859-2e38-40ee-bef5-a58cf0cca949)

### Game History
![History](https://github.com/user-attachments/assets/28e6a87b-23b9-4cbf-904b-fc6ffaf74e1d)

## Features

### Quiz Creation & Management

- **Display quiz questions:** A list of quiz questions will be displayed to users.
- **Multiple attempts allowed:** Users can take the quiz multiple times and get fresh results each time.
- **Attempt History:** Users can view their quiz attempt history for tracking progress over time.

### User Interaction

- **Instant Feedback:** Users receive instant feedback after selecting answers.
- **Timer-based Quizzes:** Each question has a 30-second timer, adding a level of challenge and urgency to the quiz.

### Progress Tracking

- **Scoreboard:** After completing a quiz, users will see their final score and performance statistics.

### Bonus Challenges

- **IndexedDB Integration:** Quiz attempt history is saved locally in the browser using IndexedDB for offline data persistence.

### Deployment

- **Deployed Application:** The quiz platform is deployed on **Netlify**, and can be accessed [here](https://quiz-sumit.netlify.app).
- **Local Setup:** If you wish to run the application locally, follow the setup instructions below.

## How to Run Locally

### Prerequisites

- **Node.js**: Make sure you have **Node.js** installed. You can download it from [here](https://nodejs.org/).
- **Git**: Ensure you have **Git** installed to clone the repository.

### Steps

1. **Clone the Repository**

   Open your terminal/command prompt and run the following command to clone the repo:

   ```bash
   git clone https://github.com/sumitkrjha/Dacoid.Quiz
   ```

2. **Install Dependencies**

   Navigate to the project folder and install the required dependencies:

   ```bash
   cd Dacoid.Quiz
   npm install
   ```

3. **Run the Application**

   Start the development server by running:

   ```bash
   npm run dev
   ```

   The application will be accessible at `http://localhost:3000`.

### Build the Application for Production

To create a production build of the app, run:

```bash
npm run build
```

This will bundle the application into static files ready for deployment.

## Technologies Used

- **React.js** for building the user interface.
- **Vite** for fast build and development server.
- **Tailwind CSS** for responsive and customizable styling.
- **IndexedDB** for storing quiz attempt history locally in the browser.
- **Vercel** or **Netlify** for hosting and deployment.

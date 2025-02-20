import { useState, useEffect } from "react";
import { Card, CardContent } from "../component/Card";
import { Button } from "../component/Button";

const questions = [
  {
    id: 1,
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    answer: "Mercury",
  },
  {
    id: 2,
    question:
      "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: "Queue",
  },
  {
    id: 3,
    question:
      "Which of the following is primarily used for structuring web pages?",
    options: ["Python", "Java", "HTML", "C++"],
    answer: "HTML",
  },
  {
    id: 4,
    question: "Which chemical symbol stands for Gold?",
    options: ["Au", "Gd", "Ag", "Pt"],
    answer: "Au",
  },
  {
    id: 5,
    question:
      "Which of these processes is not typically involved in refining petroleum?",
    options: [
      "Fractional distillation",
      "Cracking",
      "Polymerization",
      "Filtration",
    ],
    answer: "Filtration",
  },
];

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [attemptHistory, setAttemptHistory] = useState(() => {
    const history = localStorage.getItem("quizHistory");
    return history ? JSON.parse(history) : [];
  });

  useEffect(() => {
    if (timeLeft === 0) handleNextQuestion();
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === questions[currentQuestion].answer) setScore(score + 1);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setTimeLeft(30);
    } else {
      setShowScore(true);
      const updatedHistory = [
        ...attemptHistory,
        { date: new Date().toLocaleString(), score },
      ];
      setAttemptHistory(updatedHistory);
      localStorage.setItem("quizHistory", JSON.stringify(updatedHistory));
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setShowScore(false);
    setTimeLeft(30);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-4">
      {!showScore ? (
        <Card>
          <CardContent>
            <h2 className="text-xl font-bold mb-4">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <p className="text-gray-600">Time Left: {timeLeft}s</p>
            <p className="text-lg mb-2">
              {questions[currentQuestion].question}
            </p>
            <div className="grid gap-2 mt-4">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  className={`${
                    selectedOption === option
                      ? option === questions[currentQuestion].answer
                        ? "bg-green-200 border-green-500"
                        : "bg-red-200 border-red-500"
                      : "bg-gray-50"
                  }`}
                  onClick={() => handleOptionClick(option)}
                  disabled={selectedOption !== null}
                >
                  {option}
                </Button>
              ))}
            </div>
            <div className="flex justify-between items-center mt-6">
              <Button onClick={handleNextQuestion} disabled={!selectedOption}>
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">
              Your Score: {score} / {questions.length}
            </h2>
            <Button className="mt-4" onClick={handleRestart}>
              Try Again
            </Button>
            <div className="mt-6 text-left">
              <h3 className="font-semibold">Attempt History:</h3>
              <ul className="list-disc ml-6 mt-2">
                {attemptHistory.map((attempt, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    Attempt {index + 1}: {attempt.score}/{questions.length} on{" "}
                    {attempt.date}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Quiz;

import { useState, useEffect } from "react";
import { Card, CardContent } from "../component/Card";
import { Button } from "../component/Button";
import { Link, useNavigate } from "react-router-dom";
import { saveAttempt, getAttempts } from "../utils/indexedDB"; //

const questions = [
  {
    id: 1,
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    answer: "Mercury",
    type: "mcq",
  },
  {
    id: 2,
    question: "Which data structure organizes items in FIFO manner?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: "Queue",
    type: "mcq",
  },
  {
    id: 3,
    question:
      "Which of the following is primarily used for structuring web pages?",
    options: ["Python", "Java", "HTML", "C++"],
    answer: "HTML",
    type: "mcq",
  },
  {
    id: 4,
    question: "Which chemical symbol stands for Gold?",
    options: ["Au", "Gd", "Ag", "Pt"],
    answer: "Au",
    type: "mcq",
  },
  {
    id: 5,
    question: "Which process is not involved in refining petroleum?",
    options: [
      "Fractional distillation",
      "Cracking",
      "Polymerization",
      "Filtration",
    ],
    answer: "Filtration",
    type: "mcq",
  },
  {
    id: 6,
    question: "What is the value of 12 + 28?",
    answer: "40",
    type: "numeric",
  },
  {
    id: 7,
    question: "How many states are there in the United States?",
    answer: "50",
    type: "numeric",
  },
  {
    id: 8,
    question: "In which year was the Declaration of Independence signed?",
    answer: "1776",
    type: "numeric",
  },
  {
    id: 9,
    question: "What is the value of pi rounded to the nearest integer?",
    answer: "3",
    type: "numeric",
  },
  {
    id: 10,
    question:
      "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
    answer: "120",
    type: "numeric",
  },
];

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [numericAnswer, setNumericAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (showScore) {
      getAttempts().then(setHistory);
    }
  }, [showScore]);

  useEffect(() => {
    if (showScore) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, showScore]);

  useEffect(() => {
    if (timeLeft === 0 && !submitted) {
      handleSubmit();
      setTimeout(() => handleNextQuestion(), 1000);
    }
  }, [timeLeft, submitted]);

  const handleSubmit = () => {
    setSubmitted(true);
    const currentQ = questions[currentQuestion];

    if (currentQ.type === "mcq" && selectedOption === currentQ.answer)
      setScore((s) => s + 1);
    if (currentQ.type === "numeric" && numericAnswer.trim() === currentQ.answer)
      setScore((s) => s + 1);
  };

  const handleNextQuestion = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      resetStates();
    } else {
      setShowScore(true);
      setScore((prevScore) => {
        const attempt = { date: new Date().toLocaleString(), score: prevScore };
        saveAttempt(attempt);
        return prevScore;
      });
    }
  };

  const handleEndGame = async () => {
    if (!showScore)
      await saveAttempt({ date: new Date().toLocaleString(), score });
    navigate("/");
  };

  const resetStates = () => {
    setSelectedOption(null);
    setNumericAnswer("");
    setSubmitted(false);
    setTimeLeft(30);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
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

            {/* 📝 Numeric Input */}
            {questions[currentQuestion].type === "numeric" && (
              <>
                <input
                  type="number"
                  value={numericAnswer}
                  onChange={(e) => setNumericAnswer(e.target.value)}
                  disabled={submitted}
                  className={`w-full p-2 rounded-xl border-2 ${
                    submitted
                      ? numericAnswer === questions[currentQuestion].answer
                        ? "border-green-500"
                        : "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {submitted && (
                  <p
                    className={`mt-2 font-semibold ${
                      numericAnswer === questions[currentQuestion].answer
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    Correct Answer: {questions[currentQuestion].answer}
                  </p>
                )}
              </>
            )}

            {/* 🖱️ MCQ Options */}
            {questions[currentQuestion].type === "mcq" && (
              <div className="grid gap-2 mt-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => setSelectedOption(option)}
                    disabled={submitted}
                    className={`hover:scale-105 border-2 ${
                      selectedOption === option
                        ? "border-blue-500 bg-blue-200" // Highlight selected option
                        : "border-gray-300 bg-gray-50"
                    } ${
                      submitted
                        ? option === questions[currentQuestion].answer
                          ? "border-green-500 bg-green-200" // Correct answer
                          : selectedOption === option
                          ? "border-red-500 bg-red-200" // Wrong answer
                          : "bg-gray-50"
                        : ""
                    }`}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}

            {/* 🚀 Buttons */}
            <div className="flex justify-between items-center mt-6">
              <Button
                onClick={handleSubmit}
                disabled={
                  submitted ||
                  (!selectedOption &&
                    questions[currentQuestion].type === "mcq") ||
                  (questions[currentQuestion].type === "numeric" &&
                    !numericAnswer)
                }
                className={`border-2 bg-blue-500 text-white ${
                  submitted
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-blue-600"
                }`}
              >
                Submit
              </Button>
              <Button
                onClick={handleNextQuestion}
                disabled={!submitted}
                className={`border-2 ${
                  submitted
                    ? "bg-green-500 text-white"
                    : "cursor-not-allowed border-gray-500"
                }`}
              >
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
            <h3 className="text-lg font-bold mt-4">Previous Attempts:</h3>
            <ul className="mt-2 text-gray-600">
              {history.map((attempt, index) => (
                <li key={index} className="border-b py-1">
                  Attempt {index + 1}: {attempt.score}/{questions.length} on{" "}
                  {attempt.date}
                </li>
              ))}
            </ul>
            <Button
              className="mt-4 bg-purple-500 text-white"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      <button
        onClick={handleEndGame}
        className="border-2 h-11 w-32 mt-2 border-red-500 rounded-full text-xl font-semibold text-red-700 hover:bg-red-500 hover:text-white"
      >
        End Game
      </button>
    </div>
  );
}

export default Quiz;

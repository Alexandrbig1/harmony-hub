import { useState } from "react";
import { useAuth } from "@/hooks";
import questionsData from "@/data/questions.json";
import { toast } from "react-toastify";
import { commonToastOptions } from "../../helpers/toastOptions";
import {
	MusicHubWrapper,
	QuestionWrapper,
	StepCounter,
	QuestionText,
	AnswerInput,
	NextButton,
	MusicFormWrapper,
	MusicTextWrapper,
	MusicTitle,
	RedirectButton,
	ResetButton,
	ButtonWrapper,
	MusicHubEffectBg,
} from "./MusicHub.styled";

function Playlist() {
	const { user } = useAuth();
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answers, setAnswers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [redirectUrl, setRedirectUrl] = useState("");

	const handleAnswerChange = (e) => {
		const newAnswers = [...answers];
		newAnswers[currentQuestion] = e.target.value;
		setAnswers(newAnswers);
	};

	const handleNextQuestion = () => {
		if (loading) return;

		if (currentQuestion < questionsData.length - 1) {
			setCurrentQuestion(currentQuestion + 1);
			return;
		}

		setLoading(true);
		toast.info(
			"Processing your ringtone, please wait...",
			commonToastOptions
		);

		fetch(
			`${
				import.meta.env.APP_API_URL
			}/api/generate?prompt=${encodeURIComponent(answers.join(". "))}`,
			{
				method: "GET",
				redirect: "follow",
				headers: {
					"ngrok-skip-browser-warning": "69420",
				},
			}
		)
			.then((response) => {
				const contentType = response.headers.get("content-type");
				if (
					response.ok &&
					contentType &&
					contentType.includes("application/json")
				) {
					return response.json();
				} else {
					return response.text().then((errorText) => {
						throw new Error("Failed to generate the playlist.");
					});
				}
			})
			.then((data) => {
				toast.success(
					"Your personalized playlist is ready!",
					commonToastOptions
				);
				setRedirectUrl(data.url);
			})
			.catch((error) => {
				toast.error(
					"An error occurred. Please try again later.",
					commonToastOptions
				);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const handleReset = () => {
		setCurrentQuestion(0);
		setAnswers([]);
		setRedirectUrl("");
	};

	const { question, example } = questionsData[currentQuestion];

	return (
		<MusicHubWrapper>
			<MusicTextWrapper>
				<MusicHubEffectBg />
				<MusicTitle>Hello, {user.name}!</MusicTitle>

				<MusicFormWrapper>
					<StepCounter>
						{currentQuestion + 1} of {questionsData.length}
					</StepCounter>
					<QuestionWrapper>
						<QuestionText>{question}</QuestionText>
						<AnswerInput
							type="text"
							value={answers[currentQuestion] || ""}
							onChange={handleAnswerChange}
							placeholder={
								example ? example : "Type your answer here"
							}
						/>
					</QuestionWrapper>
					<ButtonWrapper>
						<NextButton
							onClick={handleNextQuestion}
							disabled={loading}
						>
							{loading
								? "Generating..."
								: currentQuestion === questionsData.length - 1
								? "Generate"
								: "Next"}
						</NextButton>
						<ResetButton onClick={handleReset}>Reset</ResetButton>
					</ButtonWrapper>
					{redirectUrl && (
						<RedirectButton
							onClick={() => window.open(redirectUrl, "_blank")}
						>
							Go to Your Ringtone
						</RedirectButton>
					)}
				</MusicFormWrapper>
			</MusicTextWrapper>
		</MusicHubWrapper>
	);
}

export default Playlist;

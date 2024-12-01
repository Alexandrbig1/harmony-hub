// import { useState } from "react";
// import { useAuth } from "@/hooks";
// import questionsData from "@/data/questions.json";
// import { toast } from "react-toastify";
// import { commonToastOptions } from "../../helpers/toastOptions";
// import {
// 	MusicHubWrapper,
// 	QuestionWrapper,
// 	StepCounter,
// 	QuestionText,
// 	AnswerInput,
// 	NextButton,
// 	MusicFormWrapper,
// 	MusicTextWrapper,
// 	MusicTitle,
// 	RedirectButton,
// 	ResetButton,
// 	ButtonWrapper,
// 	MusicHubEffectBg,
// } from "./MusicHub.styled";

// function Playlist() {
// 	const { user } = useAuth();
// 	const [currentQuestion, setCurrentQuestion] = useState(0);
// 	const [answers, setAnswers] = useState([]);
// 	const [loading, setLoading] = useState(false);
// 	const [redirectUrl, setRedirectUrl] = useState("");

// 	const handleAnswerChange = (e) => {
// 		const newAnswers = [...answers];
// 		newAnswers[currentQuestion] = e.target.value;
// 		setAnswers(newAnswers);
// 	};

// 	const handleNextQuestion = () => {
// 		if (loading) return;

// 		if (currentQuestion < questionsData.length - 1) {
// 			setCurrentQuestion(currentQuestion + 1);
// 			return;
// 		}

// 		setLoading(true);
// 		toast.info(
// 			"Processing your ringtone, please wait...",
// 			commonToastOptions
// 		);

// 		fetch(
// 			`${
// 				import.meta.env.APP_API_URL
// 			}/api/generate?prompt=${encodeURIComponent(answers.join(". "))}`,
// 			{
// 				method: "GET",
// 				redirect: "follow",
// 				headers: {
// 					"ngrok-skip-browser-warning": "69420",
// 				},
// 			}
// 		)
// 			.then((response) => {
// 				const contentType = response.headers.get("content-type");
// 				if (
// 					response.ok &&
// 					contentType &&
// 					contentType.includes("application/json")
// 				) {
// 					return response.json();
// 				} else {
// 					return response.text().then((errorText) => {
// 						throw new Error("Failed to generate the playlist.");
// 					});
// 				}
// 			})
// 			.then((data) => {
// 				toast.success(
// 					"Your personalized playlist is ready!",
// 					commonToastOptions
// 				);
// 				setRedirectUrl(data.url);
// 			})
// 			.catch((error) => {
// 				toast.error(
// 					"An error occurred. Please try again later.",
// 					commonToastOptions
// 				);
// 			})
// 			.finally(() => {
// 				setLoading(false);
// 			});
// 	};

// 	const handleReset = () => {
// 		setCurrentQuestion(0);
// 		setAnswers([]);
// 		setRedirectUrl("");
// 	};

// 	const { question, example } = questionsData[currentQuestion];

// 	return (
// 		<MusicHubWrapper>
// 			<MusicTextWrapper>
// 				<MusicHubEffectBg />
// 				<MusicTitle>Hello, {user.name}!</MusicTitle>

// 				<MusicFormWrapper>
// 					<StepCounter>
// 						{currentQuestion + 1} of {questionsData.length}
// 					</StepCounter>
// 					<QuestionWrapper>
// 						<QuestionText>{question}</QuestionText>
// 						<AnswerInput
// 							type="text"
// 							value={answers[currentQuestion] || ""}
// 							onChange={handleAnswerChange}
// 							placeholder={
// 								example ? example : "Type your answer here"
// 							}
// 						/>
// 					</QuestionWrapper>
// 					<ButtonWrapper>
// 						<NextButton
// 							onClick={handleNextQuestion}
// 							disabled={loading}
// 						>
// 							{loading
// 								? "Generating..."
// 								: currentQuestion === questionsData.length - 1
// 								? "Generate"
// 								: "Next"}
// 						</NextButton>
// 						<ResetButton onClick={handleReset}>Reset</ResetButton>
// 					</ButtonWrapper>
// 					{redirectUrl && (
// 						<RedirectButton
// 							onClick={() => window.open(redirectUrl, "_blank")}
// 						>
// 							Go to Your Ringtone
// 						</RedirectButton>
// 					)}
// 				</MusicFormWrapper>
// 			</MusicTextWrapper>
// 		</MusicHubWrapper>
// 	);
// }

// export default Playlist;

// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useAuth } from "@/hooks";
// import questionsData from "@/data/questions.json";
// import { toast } from "react-toastify";
// import { commonToastOptions } from "../../helpers/toastOptions";
// import { generateRingtone } from "../../redux/ringtone/operations";
// import {
// 	selectIsGenerating,
// 	selectGeneratedUrl,
// 	//   selectRingtoneError
// } from "../../redux/ringtone/selectors";
// import { clearRingtone } from "../../redux/ringtone/slice";
// import {
// 	MusicHubWrapper,
// 	QuestionWrapper,
// 	StepCounter,
// 	QuestionText,
// 	AnswerInput,
// 	NextButton,
// 	MusicFormWrapper,
// 	MusicTextWrapper,
// 	MusicTitle,
// 	RedirectButton,
// 	ResetButton,
// 	ButtonWrapper,
// 	MusicHubEffectBg,
// } from "./MusicHub.styled";

// function Playlist() {
// 	const dispatch = useDispatch();
// 	const { user, isLoggedIn } = useAuth();
// 	const [currentQuestion, setCurrentQuestion] = useState(0);
// 	const [answers, setAnswers] = useState([]);

// 	const isGenerating = useSelector(selectIsGenerating);
// 	const generatedUrl = useSelector(selectGeneratedUrl);
// 	//   const error = useSelector(selectRingtoneError);

// 	const handleAnswerChange = (e) => {
// 		const newAnswers = [...answers];
// 		newAnswers[currentQuestion] = e.target.value;
// 		setAnswers(newAnswers);
// 	};

// 	// Update the handleNextQuestion function in your MusicHub component
// 	const handleNextQuestion = async () => {
// 		if (isGenerating) return;

// 		if (currentQuestion < questionsData.length - 1) {
// 			console.log("Moving to next question:", currentQuestion + 1);
// 			console.log("Current answers:", answers);
// 			setCurrentQuestion(currentQuestion + 1);
// 			return;
// 		}

// 		if (!isLoggedIn) {
// 			console.log("User not logged in, showing error");
// 			toast.error(
// 				"Please sign in to generate a ringtone",
// 				commonToastOptions
// 			);
// 			return;
// 		}

// 		const ringtoneData = {
// 			caller: answers[0],
// 			instrument: answers[1],
// 			genre: answers[2],
// 			popStar: answers[3],
// 			vibe: answers[4],
// 		};

// 		console.log(
// 			"Submitting ringtone generation request with data:",
// 			ringtoneData
// 		);

// 		toast.info(
// 			"Processing your ringtone, please wait...",
// 			commonToastOptions
// 		);

// 		const result = await dispatch(generateRingtone(ringtoneData));
// 		console.log("Ringtone generation result:", result);

// 		if (result.error) {
// 			console.error("Ringtone generation failed:", result.error);
// 		}
// 	};

// 	const handleReset = () => {
// 		setCurrentQuestion(0);
// 		setAnswers([]);
// 		dispatch(clearRingtone());
// 	};

// 	const { question, example } = questionsData[currentQuestion];

// 	return (
// 		<MusicHubWrapper>
// 			<MusicTextWrapper>
// 				<MusicHubEffectBg />
// 				<MusicTitle>Hello, {user?.name || "Guest"}!</MusicTitle>

// 				<MusicFormWrapper>
// 					<StepCounter>
// 						{currentQuestion + 1} of {questionsData.length}
// 					</StepCounter>
// 					<QuestionWrapper>
// 						<QuestionText>{question}</QuestionText>
// 						<AnswerInput
// 							type="text"
// 							value={answers[currentQuestion] || ""}
// 							onChange={handleAnswerChange}
// 							placeholder={
// 								example ? example : "Type your answer here"
// 							}
// 							required
// 						/>
// 					</QuestionWrapper>
// 					<ButtonWrapper>
// 						<NextButton
// 							onClick={handleNextQuestion}
// 							disabled={
// 								isGenerating ||
// 								!answers[currentQuestion] ||
// 								!isLoggedIn
// 							}
// 						>
// 							{isGenerating
// 								? "Generating..."
// 								: currentQuestion === questionsData.length - 1
// 								? "Generate Ringtone"
// 								: "Next"}
// 						</NextButton>
// 						<ResetButton onClick={handleReset}>Reset</ResetButton>
// 					</ButtonWrapper>
// 					{generatedUrl && (
// 						<RedirectButton
// 							onClick={() => window.open(generatedUrl, "_blank")}
// 						>
// 							Listen to Your Ringtone
// 						</RedirectButton>
// 					)}
// 				</MusicFormWrapper>
// 			</MusicTextWrapper>
// 		</MusicHubWrapper>
// 	);
// }

// export default Playlist;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/hooks";
import questionsData from "@/data/questions.json";
import { toast } from "react-toastify";
import { commonToastOptions } from "../../helpers/toastOptions";
import { generateRingtone } from "../../redux/ringtone/operations";
import {
	selectIsGenerating,
	selectGeneratedUrl,
	//   selectRingtoneError
} from "../../redux/ringtone/selectors";
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
	const dispatch = useDispatch();
	const { user, isLoggedIn } = useAuth();
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answers, setAnswers] = useState([]);

	const isGenerating = useSelector(selectIsGenerating);
	const generatedUrl = useSelector(selectGeneratedUrl);
	//   const error = useSelector(selectRingtoneError);

	const handleAnswerChange = (e) => {
		const newAnswers = [...answers];
		newAnswers[currentQuestion] = e.target.value;
		setAnswers(newAnswers);
	};

	const handleNextQuestion = async () => {
		if (isGenerating) return;

		if (currentQuestion < questionsData.length - 1) {
			setCurrentQuestion(currentQuestion + 1);
			return;
		}

		if (!isLoggedIn) {
			toast.error(
				"Please sign in to generate a ringtone",
				commonToastOptions
			);
			return;
		}

		const ringtoneData = {
			caller: answers[0],
			instrument: answers[1],
			genre: answers[2],
			popStar: answers[3],
			vibe: answers[4],
		};

		console.log("Generating ringtone with data:", ringtoneData);

		toast.info(
			"Processing your ringtone, please wait...",
			commonToastOptions
		);

		const result = await dispatch(generateRingtone(ringtoneData));
		console.log("Generation result:", result);

		if (result.error) {
			console.error("Generation failed:", result.error);
			return;
		}

		toast.success(
			"Your ringtone is ready to download!",
			commonToastOptions
		);
	};

	const handleDownload = async () => {
		if (!generatedUrl) return;

		try {
			// Create a hidden anchor element
			const link = document.createElement("a");
			link.href = generatedUrl;
			link.download = `ringtone-${Date.now()}.mp3`; // Default filename
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (error) {
			console.error("Download error:", error);
			toast.error("Failed to download ringtone", commonToastOptions);
		}
	};

	const handleReset = () => {
		setCurrentQuestion(0);
		setAnswers([]);
	};

	const { question, example } = questionsData[currentQuestion];

	return (
		<MusicHubWrapper>
			<MusicTextWrapper>
				<MusicHubEffectBg />
				<MusicTitle>Hello, {user?.name || "Guest"}!</MusicTitle>

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
							required
						/>
					</QuestionWrapper>
					<ButtonWrapper>
						<NextButton
							onClick={handleNextQuestion}
							disabled={
								isGenerating ||
								!answers[currentQuestion] ||
								!isLoggedIn
							}
						>
							{isGenerating
								? "Generating..."
								: currentQuestion === questionsData.length - 1
								? "Generate Ringtone"
								: "Next"}
						</NextButton>
						<ResetButton onClick={handleReset}>Reset</ResetButton>
					</ButtonWrapper>
					{generatedUrl && (
						<RedirectButton onClick={handleDownload}>
							Download Ringtone
						</RedirectButton>
					)}
				</MusicFormWrapper>
			</MusicTextWrapper>
		</MusicHubWrapper>
	);
}

export default Playlist;

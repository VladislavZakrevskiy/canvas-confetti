import { CreateTypes } from "canvas-confetti";
import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { Confetti } from "..";

const canvasStyles: CSSProperties = {
	position: "fixed",
	pointerEvents: "none",
	width: "100%",
	height: "100%",
	top: 0,
	left: 0,
};

function getAnimationSettings(angle: number, originX: number) {
	return {
		particleCount: 3,
		angle,
		spread: 55,
		origin: { x: originX },
		colors: ["#bb0000", "#ffffff"],
	};
}

export function Parad() {
	const refAnimationInstance = useRef<CreateTypes | null>(null);
	const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

	const getInstance = useCallback((instance: CreateTypes | null) => {
		refAnimationInstance.current = instance;
	}, []);

	const nextTickAnimation = useCallback(() => {
		if (refAnimationInstance.current) {
			refAnimationInstance.current(getAnimationSettings(60, 0));
			refAnimationInstance.current(getAnimationSettings(120, 1));
		}
	}, []);

	const startAnimation = useCallback(() => {
		if (!intervalId) {
			setIntervalId(setInterval(nextTickAnimation, 16));
		}
	}, [nextTickAnimation, intervalId]);

	const pauseAnimation = useCallback(() => {
		clearInterval(intervalId ?? 0);
		setIntervalId(null);
	}, [intervalId]);

	const stopAnimation = useCallback(() => {
		clearInterval(intervalId ?? 0);
		setIntervalId(null);
		refAnimationInstance.current && refAnimationInstance.current.reset();
	}, [intervalId]);

	useEffect(() => {
		return () => {
			clearInterval(intervalId ?? 0);
		};
	}, [intervalId]);

	return (
		<>
			<div>
				<button onClick={startAnimation}>Start</button>
				<button onClick={pauseAnimation}>Pause</button>
				<button onClick={stopAnimation}>Stop</button>
			</div>
			<Confetti refConfetti={getInstance} style={canvasStyles} />
		</>
	);
}

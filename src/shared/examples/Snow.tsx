import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { Confetti } from "..";
import { CreateTypes, Options } from "canvas-confetti";

const canvasStyles: CSSProperties = {
	position: "fixed",
	pointerEvents: "none",
	width: "100%",
	height: "100%",
	top: 0,
	left: 0,
};

function randomInRange(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

function getAnimationSettings(): Options {
	return {
		particleCount: 1,
		startVelocity: 0,
		ticks: 200,
		gravity: 0.3,
		origin: {
			x: Math.random(),
			y: Math.random() * 0.999 - 0.2,
		},
		colors: ["#ffffff"],
		shapes: ["circle"],
		scalar: randomInRange(0.4, 2.5),
	};
}

export function Snow() {
	const refAnimationInstance = useRef<CreateTypes | null>(null);
	const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>();

	const getInstance = useCallback((instance: CreateTypes | null) => {
		refAnimationInstance.current = instance;
	}, []);

	const nextTickAnimation = useCallback(() => {
		if (refAnimationInstance.current) {
			refAnimationInstance.current(getAnimationSettings());
			refAnimationInstance.current(getAnimationSettings());
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

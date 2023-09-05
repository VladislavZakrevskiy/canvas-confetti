import { useCallback, useEffect, useRef, useState } from "react";
import { Confetti } from "..";
import { CreateTypes } from "canvas-confetti";
import { CSSProperties } from 'react';

function randomInRange(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

const canvasStyles: CSSProperties = {
	position: "fixed",
	pointerEvents: "none",
	width: "100%",
	height: "100%",
	top: 0,
	left: 0,
};

function getAnimationSettings(originXA: number, originXB: number) {
	return {
		startVelocity: 30,
		spread: 360,
		ticks: 60,
		zIndex: 0,
		particleCount: 150,
		origin: {
			x: randomInRange(originXA, originXB),
			y: Math.random() - 0.2,
		},
	};
}

export function Fireworks() {
	const refAnimationInstance = useRef<CreateTypes | null>(null);
	const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

	const getInstance = useCallback((instance: CreateTypes | null) => {
		refAnimationInstance.current = instance;
	}, []);

	const nextTickAnimation = useCallback(() => {
		if (refAnimationInstance.current) {
			refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
			refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
		}
	}, []);

	const startAnimation = useCallback(() => {
		if (!intervalId) {
			setIntervalId(setInterval(nextTickAnimation, 400));
		}
	}, [intervalId, nextTickAnimation]);

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

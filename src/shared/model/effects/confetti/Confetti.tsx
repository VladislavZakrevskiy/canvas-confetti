// import { FC, useRef, CSSProperties, useState, useEffect, useCallback } from "react";
// import canvasConfetti, { CreateTypes, GlobalOptions, Options } from "canvas-confetti";

// export interface Props extends Options, GlobalOptions {
// 	fire?: boolean;
// 	reset?: boolean;
// 	width?: string | number;
// 	height?: string | number;
// 	className?: string;
// 	style?: CSSProperties;
// 	refConfetti?: (confetti: CreateTypes | null) => void;
// 	onDecay?: () => void;
// 	onFire?: () => void;
// 	onReset?: () => void;
// }

// export const Confetti: FC<Props> = (props) => {
// 	const {
// 		height = 200,
// 		width = 200,
// 		className,
// 		onReset,
// 		onDecay,
// 		onFire,
// 		style,
// 		fire,
// 		reset,
// 		refConfetti,
// 		resize,
// 		useWorker,
// 	} = props;
// 	const [confetti, setConfetti] = useState<CreateTypes | null>(null);
// 	const canvasRef = useRef(null);

// 	const fireConfetti = useCallback(() => {
// 		if (!confetti) {
// 			return;
// 		}

// 		onFire && onFire();

// 		const promise = confetti(props);

// 		promise &&
// 			promise.then(() => {
// 				onDecay && onDecay();
// 			});
// 	}, [confetti, onDecay, onFire, props]);

// 	const resetConfetti = useCallback(() => {
// 		if (!confetti) {
// 			return;
// 		}

// 		confetti.reset();

// 		onReset && onReset();
// 	}, [confetti, onReset]);

// 	useEffect(() => {
// 		if (!canvasRef.current) {
// 			return;
// 		}

// 		const globalOptions: GlobalOptions = {
// 			resize: typeof resize === "undefined" ? true : resize,
// 			useWorker: typeof useWorker === "undefined" ? true : useWorker,
// 		};

// 		setConfetti(canvasConfetti.create(canvasRef.current, globalOptions));
// 		refConfetti && refConfetti(confetti);

// 		return () => refConfetti && refConfetti(null);
// 	}, []);

// 	useEffect(() => {
// 		if (fire) {
// 			fireConfetti();
// 		}
// 		if (reset) {
// 			resetConfetti();
// 		}
// 	}, [fire, reset]);

// 	return (
// 		<canvas ref={canvasRef} style={style} width={width} height={height} className={className} />
// 	);
// };

import canvasConfetti, { CreateTypes, GlobalOptions, Options } from "canvas-confetti";
import React, { CSSProperties, RefObject } from "react";

export interface IProps extends Options, GlobalOptions {
	fire?: any;
	reset?: any;
	width?: string | number;
	height?: string | number;
	className?: string;
	style?: CSSProperties;
	refConfetti?: (confetti: CreateTypes | null) => void;
	onDecay?: () => void;
	onFire?: () => void;
	onReset?: () => void;
}

export class Confetti extends React.Component<IProps> {
	private refCanvas: RefObject<HTMLCanvasElement>;

	private confetti: CreateTypes | null;

	constructor(props: IProps) {
		super(props);
		this.refCanvas = React.createRef();
		this.confetti = null;
	}

	componentDidMount() {
		if (!this.refCanvas.current) {
			return;
		}

		const { resize, useWorker } = this.props;
		const globalOptions: GlobalOptions = {
			resize: typeof resize === "undefined" ? true : resize,
			useWorker: typeof useWorker === "undefined" ? true : useWorker,
		};

		this.confetti = canvasConfetti.create(this.refCanvas.current, globalOptions);
		this.setRefConfetti();
	}

	componentDidUpdate(prevProps: Readonly<IProps>) {
		const { fire, reset } = this.props;
		const isFireTrue = !!fire;
		const isFireChanged = fire !== prevProps.fire;

		if (isFireTrue && isFireChanged) {
			this.fireConfetti();
		}

		const isResetTrue = !!reset;
		const isResetChanged = reset !== prevProps.reset;

		if (isResetTrue && isResetChanged) {
			this.resetConfetti();
		}
	}

	componentWillUnmount() {
		this.unsetRefConfetti();
	}

	private setRefConfetti() {
		const { refConfetti } = this.props;

		refConfetti && refConfetti(this.confetti);
	}

	private unsetRefConfetti() {
		const { refConfetti } = this.props;

		refConfetti && refConfetti(null);
	}

	private fireConfetti() {
		if (!this.confetti) {
			return;
		}

		const {
			onFire,
			onDecay,
			onReset,
			className,
			style,
			width,
			height,
			refConfetti,
			fire,
			reset,
			...confettiProps
		} = this.props;

		onFire && onFire();

		const promise = this.confetti(confettiProps);

		promise &&
			promise.then(() => {
				onDecay && onDecay();
			});
	}

	private resetConfetti() {
		if (!this.confetti) {
			return;
		}

		this.confetti.reset();

		const { onReset } = this.props;

		onReset && onReset();
	}

	render() {
		const { style, className, width, height } = this.props;
		return (
			<canvas
				ref={this.refCanvas}
				style={style}
				className={className}
				width={width}
				height={height}
			/>
		);
	}
}

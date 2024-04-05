import React, { useState, useEffect, useRef } from 'react';

export default function useMicrophoneComponent() {
	const [audioData, setAudioData] = useState<Uint8Array | null>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animationRef = useRef<number>();

	const drawVisualizer = (ctx: CanvasRenderingContext2D, dataArray: Uint8Array) => {
		const width = ctx.canvas.width;
		const height = ctx.canvas.height;
		const barWidth = width / dataArray.length;

		ctx.clearRect(0, 0, width, height);

		dataArray.forEach((value, index) => {
			const x = index * barWidth;
			const y = height - value;
			ctx.fillStyle = 'rgb(0, 0, ' + value + ')';
			ctx.fillRect(x, y, barWidth, value);
		});
	};

	const visualizeAudio = (analyser: AnalyserNode) => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const bufferLength = analyser.frequencyBinCount;
		const dataArray = new Uint8Array(bufferLength);

		const draw = () => {
			analyser.getByteFrequencyData(dataArray);
			setAudioData(dataArray.slice());
			drawVisualizer(ctx, dataArray);
			animationRef.current = requestAnimationFrame(draw);
		};

		draw();
	};

	const setupMicrophone = async () => {
		try {
			const audioContext = new window.AudioContext();
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const analyser = audioContext.createAnalyser();
			analyser.fftSize = 2048;
			const microphoneSource = audioContext.createMediaStreamSource(stream);
			microphoneSource.connect(analyser);

			visualizeAudio(analyser);
		} catch (error) {
			console.error('Error accessing microphone:', error);
		}
	};

	const stopMicrophone = async () => {
		if (animationRef.current) {
			cancelAnimationFrame(animationRef.current);
			setAudioData(null);
		}
	};

	useEffect(() => {
		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, []);

	return {
		canvas: <canvas ref={canvasRef} id='audioVisualizer' className='h-full w-full' />,
		setupMicrophone,
		audioData,
		stopMicrophone,
	};
}

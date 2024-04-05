export const detectAvailableMicrophones = async () => {
	try {
		const devices = await navigator.mediaDevices.enumerateDevices();
		const microphones = devices.filter((device) => device.kind === 'audioinput');

		return microphones.map((mic) => ({
			deviceId: mic.deviceId,
			label: mic.label || 'Microphone', // Use 'Microphone' if label is not available
		}));
	} catch (error) {
		console.error('Error detecting available microphones:', error);
		return [];
	}
};

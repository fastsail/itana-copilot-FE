export const getDeviceName = async () => {
	try {
		const devices = await navigator.mediaDevices.enumerateDevices();
		return devices
			? devices?.[0].label.replace('Microphone', '').replace('(Built-in)', '').replace('Default -', '')
			: 'Unknown Device';
	} catch (error) {
		console.error('Error getting device name:', error);
		return 'Unknown Device';
	}
};

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import useClickOutside from '@/hooks/useClickOutside';
import { button_styles } from '@/constants/global.const';
import { PauseCircleIcon, Copy, Check, Mic } from 'lucide-react';

// Type declaration for webkitSpeechRecognition
declare global {
    interface Window {
        webkitSpeechRecognition: any;
    }
}

const Transcript = () => {
    const [showPause, setShowPause] = useState(false);
    const [toggleOption, setToggleOption] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [transcriptsWithTimestamps, setTranscriptsWithTimestamps] = useState<{ text: string, timestamp: string }[]>([]);
    const [isRecording, setIsRecording] = useState<boolean>(true);
    const pauseRef = useClickOutside({ callback: () => setShowPause(false) });
    const ws = useRef<WebSocket | null>(null);
    let recognition: any;

    useEffect(() => {
        startRecording(); // Start recording when component mounts
        const socket = new WebSocket('ws://https://whisper-app-sbmzuuqa7a-uc.a.run.app');

        socket.onopen = () => {
            //console.log("WebSocket connected");
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const timestamp = getCurrentTime(); // Calculate timestamp
            setTranscriptsWithTimestamps(prevTranscripts => [...prevTranscripts, { text: data.transcription, timestamp }]);
        };

        return () => {
            socket.close();
            if (recognition) {
                recognition.stop();
            }
        };
    }, []);

    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const startRecording = () => {
        //console.log("Start Recording Initialized")
        setToggleOption(false);
        setIsPaused(false);
        setIsRecording(true);
        recognition = new window.webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    const timestamp = getCurrentTime(); // Calculate timestamp
                    setTranscriptsWithTimestamps(prevTranscripts => [...prevTranscripts, { text: event.results[i][0].transcript, timestamp }]);
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            setIsRecording(false);
        };

        recognition.onend = () => {
            setIsRecording(false);
        };

        recognition.start();
    };

    const stopRecording = () => {
        recognition = new window.webkitSpeechRecognition();
        setIsRecording(false);
        if (recognition) {
          //console.log("Stopping Recording");
          recognition.stop();
          // Add a timeout to ensure audio capture stops before UI update
          setTimeout(() => {
            setIsRecording(false);
          }, 100); // Adjust timeout value if needed (in milliseconds)
        }
      };

    const handleCopyTranscript = () => {
        setToggleOption(false)
        //console.log("Copy Transcript Clicked")
        let formattedTranscript = "";
        for (const transcript of transcriptsWithTimestamps) {
          formattedTranscript += `${transcript.timestamp}\n${transcript.text}\n`;
        }
        navigator.clipboard.writeText(formattedTranscript)
          .then(() => {
            //console.log("Transcript copied to clipboard");
          })
          .catch((err) => {
            //console.error("Failed to copy transcript:", err);
          });
      };
      

    const handleGenerateNotes = async () => {
        // Your code for generating notes
        setToggleOption(false)
        stopRecording();
        //console.log("Handle Note Generation")
    };

    const handlePauseResumeConsultation = () => {
        //console.log("Pause Consultation Button Clicked");
        stopRecording();
        setIsPaused(true);
        setToggleOption(false)
    };

    //console.log('Transcriptions with timestamps:', transcriptsWithTimestamps);
    // console.log("isPaused State", isPaused)
    // console.log("toggleOption:", toggleOption)
    // console.log("isRecording:",isRecording)

    return (
        <div className="h-full overflow-y-auto">
            {/* Your transcript rendering code */}
            {transcriptsWithTimestamps.map((transcript, index) => {
                if (!transcript.text.trim()) return null; // Skip empty transcriptions
                return(
                <div key={index} style={{ marginBottom: '10px' }}>
                    <div className='text-xs md:text-sm font-light text-slate-500'>{transcript.timestamp}</div>
                    <input
                        type="text"
                        value={transcript.text}
                        onChange={(e) => {
                            const newTranscripts = [...transcriptsWithTimestamps];
                            newTranscripts[index] = { ...newTranscripts[index], text: e.target.value };
                            setTranscriptsWithTimestamps(newTranscripts);
                        }}
                        className='text-xs md:text-sm font-light text-slate-600'
                        style={{ width: '100%', padding: '5px 5px 5px 0px', marginBottom: '5px' }}
                    />
                </div>
                );
            })}

            <div className="flex items-center gap-[1px] bottom-24 fixed right-8 ml-4">
                {/* Dropdown Options */}
                {toggleOption && (
                    <div ref={pauseRef}>
                        <button
                            onClick={isPaused && !isRecording ? handleCopyTranscript : handlePauseResumeConsultation}
                            type="button"
                            className={`${button_styles} flex-row align-center items-center absolute text-sm right-0 font-light flex gap-2 items-center justify-center w-max px-6 -top-[110%] bg-[#36A477] h-[48px] rounded-md`}
                        >
                            {isPaused && !isRecording ? <Copy color="white" /> : <PauseCircleIcon color="white" />}
                            <span className="text-white text-xs md:text-sm">
                                {isPaused && !isRecording ? "Copy Transcript" : "Pause Consultation"}
                            </span>
                        </button>
                    </div>
                 )}

                {/* Finish and generate note button */}
                <button
                onClick={() => {
                    if (!isPaused) {
                    handleGenerateNotes();
                    } else {
                    startRecording();
                    }
                }}
                type="button"
                className={`${button_styles} bg-[#36A477] text-xs md:text-sm font-light text-white h-[48px] py-3 rounded-l-md flex items-center gap-2 px-8`}
                >
                {!isPaused ? <Check color="white" /> : <Mic color="white" />}
                <span>{ !isPaused ? 'Finish and generate notes' : 'Resume Consultation'}</span>
                </button>


                {/* Dropdown Button */}
                <button
                    onClick={() => setToggleOption(!toggleOption)}
                    type="button"
                    className={`${button_styles} bg-[#36A477] text-sm font-light text-white py-3 h-[48px] rounded-r-md flex items-center gap-2 px-8`}
                >
                    <span className={`transition-all`}>
                        
                            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.3538 1.35378L6.35378 6.35378C6.30735 6.40027 6.2522 6.43715 6.1915 6.46231C6.13081 6.48748 6.06574 6.50043 6.00003 6.50043C5.93433 6.50043 5.86926 6.48748 5.80856 6.46231C5.74786 6.43715 5.69272 6.40027 5.64628 6.35378L0.646284 1.35378C0.552464 1.25996 0.499756 1.13272 0.499756 1.00003C0.499756 0.867352 0.552464 0.740104 0.646284 0.646284C0.740104 0.552463 0.867352 0.499756 1.00003 0.499756C1.13272 0.499756 1.25996 0.552463 1.35378 0.646284L6.00003 5.29316L10.6463 0.646284C10.6927 0.599829 10.7479 0.562978 10.8086 0.537837C10.8693 0.512696 10.9343 0.499756 11 0.499756C11.0657 0.499756 11.1308 0.512696 11.1915 0.537837C11.2522 0.562978 11.3073 0.599829 11.3538 0.646284C11.4002 0.692739 11.4371 0.747889 11.4622 0.808586C11.4874 0.869282 11.5003 0.934336 11.5003 1.00003C11.5003 1.06573 11.4874 1.13079 11.4622 1.19148C11.4371 1.25218 11.4002 1.30733 11.3538 1.35378Z"
                                    fill="white"
                                />
                            </svg>
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Transcript;

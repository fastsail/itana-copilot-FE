import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEncounterStore } from '@/app/zustand/useEncounterState';
import { createBasicEncounter } from '@/app/(Home)/_utils/encounterUtils';
import { processChunks } from '../_libs/processChunks';
import { useDashboardStateChange } from '@/app/zustand/useDashboardStateChange';
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
    const [isLoading, setIsLoading] = useState(false);
    const [toggleOption, setToggleOption] = useState(false);
    const [showTemplateNotes, setShowTemplateNotes] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [transcriptsWithTimestamps, setTranscriptsWithTimestamps] = useState<{ text: string, timestamp: string }[]>([]);
    const [isRecording, setIsRecording] = useState<boolean>(true);
    const [template, setTemplate] = useState<string>("Patient: Hi, I'm here today because of a headache I've been having.\n\nDoctor: Uh-huh, and how long have you been experiencing this headache?\n\nPatient: It's been about a month now.\n\nDoctor: Okay, and can you describe the headache for me? Is it constant or does it come and go?\n\nPatient: It's pretty much there all the time, a dull ache mostly, but sometimes it throbs a bit.\n\nDoctor: I see. Have you noticed anything that seems to trigger the headaches, or make them worse?\n\nPatient: Well, I did recently change my medication, so I don't know if that could be related?\n\nDoctor: Interesting. Can you tell me more about the medication you changed?\n\nPatient: Sure, it was for [mention the condition], and I switched from [old medication] to [new medication] about a month ago.\n\nDoctor: Right, and have you experienced any other side effects besides the headaches?\n\nPatient: Now that you mention it, I do feel more tired than usual.\n\nDoctor: Okay, that's good to know. Let's make a note of that. Is there any history of headaches in your family?\n\nPatient: Not that I can recall.\n\nDoctor: Alright. We can look into the medication change as a possible cause, but a good next step would be to review your past medical history. Do you have any allergies or any other ongoing medical conditions?\n\nPatient: No allergies, but I do have [mention any conditions].\n\nDoctor: Understood. Anything else you think might be relevant to your headaches?\n\nPatient: I don't think so, no.\n\nDoctor: Excellent. We'll gather this information and my assistant will look into the new medication you mentioned. In the meantime, is there anything over-the-counter you've been taking for the headaches?\n\nPatient: I've been trying some pain relievers, but they haven't really helped much."); //
    const { encounter, setEncounter, addTranscript, setCompletedNoteGenerations } = useEncounterStore()
    const pauseRef = useClickOutside({ callback: () => setShowPause(false) });
    const ws = useRef<WebSocket | null>(null);
    let recognition: any;
   // console.log(encounter)

    const {
        setActiveView,
    } = useDashboardStateChange();

    useEffect(() => {
        startRecording(); // Start recording when component mounts
        const socket = new WebSocket('wss://https://whisper-app-sbmzuuqa7a-uc.a.run.app');
    
        socket.onopen = () => {
            //console.log("WebSocket connected");
        };
    
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const timestamp = getCurrentTime(); // Calculate timestamp
            if (data.transcription.trim() !== '') {
                setTranscriptsWithTimestamps(prevTranscripts => [...prevTranscripts, { text: data.transcription, timestamp }]);
                if (encounter) {
                    addTranscript(data.transcription, timestamp);
                } else {
                    setEncounter(createBasicEncounter()); // Initialize encounter if it's null
                    addTranscript(data.transcription, timestamp);
                }
            }
        };
    
        return () => {
            socket.close();
            if (recognition) {
                recognition.stop();
            }
        };
    }, [recognition, encounter, addTranscript, setEncounter]);
    

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
        console.log('CLICKED GENERATE NOTES')
        setToggleOption(false)
        stopRecording();
        setIsLoading(true); // Set loading state to true
		// Build the transcript string
        let transcriptString = "";
        for (const transcript of transcriptsWithTimestamps) {
          transcriptString += transcript.text + "\n"; // Add line breaks between transcripts
        }
      
        // Set the userMessage with the built transcript string
        const userMessage = transcriptString;
        //console.log("USER MESSAGE",userMessage);
      
        // Set maxTokens
        const maxTokens = 240;
      
        try {
        const response = await axios.get(`/api/llama_api?user_message=${userMessage}&max_tokens=${maxTokens}`);
        console.log('data:', response.data);
        const processedData = processChunks(response.data);
        console.log("PROCESSED DATA: ", processedData);
        setCompletedNoteGenerations(processedData);
        setActiveView('Note') // Assuming this sets the active view to 'Note'// Reset loading state after response is received
        setIsLoading(false);
        } catch (error) {
        console.error('Error fetching note:', error);
        }
      };

    const handlePauseResumeConsultation = () => {
        //console.log("Pause Consultation Button Clicked");
        stopRecording();
        setIsPaused(true);
        setToggleOption(false)
    };

    const handleGenerateNotesFromTemplate = async () => {
        if (!template.trim()) {
            alert("Please enter a template."); // Add validation for the template
            return;
        }
        stopRecording();
        // Set maxTokens
        const maxTokens = 240;

        stopRecording();
        setIsLoading(true);

        try {
            // Use the provided template
            //console.log(template)
            const response = await axios.get(`/api/llama_api?user_message=${template}&max_tokens=${maxTokens}`);
            const processedData = processChunks(response.data);
            setCompletedNoteGenerations(processedData);
            setActiveView('Note');
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching note:', error);
        }
    };

    // Function to toggle visibility of template notes
    const toggleTemplateNotes = () => {
        setShowTemplateNotes(!showTemplateNotes);
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

            {/* Option to generate notes from a template */}
            <div className="flex w-full items-center justify-between p-4">
                {showTemplateNotes && (
                    <div className="p-4 w-[70%]">
                        {/* Render your template notes here */}
                        <textarea
                            value={template}
                            onChange={(e) => setTemplate(e.target.value)}
                            placeholder="Enter template..."
                            className="w-full h-32 px-4 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 resize-none"
                        />
                    </div>
                )}
                <div className='flex-row items-center justify-center'>
                    <button
                        onClick={toggleTemplateNotes}
                        className="px-4 py-2 mt-3 ml-4 text-sm font-medium text-white bg-[#36A477] rounded-md hover:bg-[#36A4A7]-600 focus:outline-none focus:bg-[#36A4A7]-600"
                    >
                        {showTemplateNotes ? "Hide Template" : "Show Template"}
                    </button>
                    <button
                        onClick={handleGenerateNotesFromTemplate}
                        className="px-4 py-2 mt-3 ml-4 text-sm font-medium text-white bg-[#36A477] rounded-md hover:bg-[#36A4A7]-600 focus:outline-none focus:bg-[#36A4A7]-600"
                    >
                        Generate Notes from Template
                    </button>
                </div>
                
            </div>

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
                        if (!isPaused && !isLoading) { // Add isLoading check
                            handleGenerateNotes();
                        } else {
                            startRecording();
                        }
                    }}
                    type="button"
                    className={`${button_styles} bg-[#36A477] text-xs md:text-sm font-light text-white h-[48px] py-3 rounded-l-md flex items-center gap-2 px-8`}
                    style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }} // Disable button click when loading
                >
                    {isLoading ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    ) : !isPaused ? (
                        <Check color="white" />
                    ) : (
                        <Mic color="white" />
                    )}
                    <span>{isLoading ? 'Loading...' : !isPaused ? 'Finish and generate notes' : 'Resume Consultation'}</span>
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

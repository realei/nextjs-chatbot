import React, { useEffect, useRef } from 'react';

export default function ChatComponent(props) {
    const { websocketRef, previousStep, triggerNextStep } = props;

    useEffect(() => {
        websocketRef.current.onopen = function() {
            // Send user's input to WebSocket API
            websocketRef.current.send(JSON.stringify({ message: previousStep.message }));
        };

        websocketRef.current.onmessage = function(event) {
            let data = JSON.parse(event.data);
            let message = data.message;

            // Trigger the next step using the output from the WebSocket API
            triggerNextStep({ value: message, trigger: 'nextStepId' });
        };
    }, []); // Note that the dependency array is empty because we only want to execute this once when the component mounts

    useEffect(() => {
        if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
          websocketRef.current.send(JSON.stringify({ message: previousStep.message }));
        }
      }, [previousStep]);

    return null; // This component doesn't need to render anything
}

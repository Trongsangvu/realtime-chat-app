import { useCallback, useEffect, useState } from "react";

/**
 * Mute / hide the local mic and camera by toggling the tracks' `enabled`
 * flag. Peers receive the same tracks, so this takes effect for them too.
 */
export const useMediaToggles = (stream?: MediaStream) => {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  useEffect(() => {
    stream?.getAudioTracks().forEach((t) => (t.enabled = micOn));
    stream?.getVideoTracks().forEach((t) => (t.enabled = camOn));
  }, [stream, micOn, camOn]);

  const toggleMic = useCallback(() => setMicOn((v) => !v), []);
  const toggleCam = useCallback(() => setCamOn((v) => !v), []);

  return { micOn, camOn, toggleMic, toggleCam };
};

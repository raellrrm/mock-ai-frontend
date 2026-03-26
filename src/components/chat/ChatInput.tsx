'use client';

import { useAudioRecorder } from '@/hooks/AudioRecorder';
import { Mic, SendHorizontal, Square, Trash2 } from 'lucide-react';
import { useState, KeyboardEvent } from 'react';


interface ChatInputProps {
  onSendMessage?: (content: string, type: 'text' | 'audio', audioBlob?: Blob) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [text, setText] = useState('');

  const { 
    isRecording, 
    recordingTime, 
    startRecording, 
    stopRecording, 
    cancelRecording 
  } = useAudioRecorder();

  const handleSendText = () => {
    if (!text.trim() || !onSendMessage) return;
    onSendMessage(text, 'text');
    setText(''); 
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendText();
    }
  };

  const handleStopAudio = async () => {
    const audioBlob = await stopRecording();
    if (audioBlob && onSendMessage) {
      onSendMessage('Mensagem de Áudio', 'audio', audioBlob);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <footer className="shrink-0 bg-slate-50 px-4 sm:px-6 pb-4 pt-2">
      <div className={`relative flex items-center rounded-full border bg-white px-4 py-2 shadow-inner transition-colors duration-300
        ${isRecording ? 'border-red-300 shadow-red-100/50' : 'border-slate-200 shadow-slate-100/50'}
      `}>
        
        {isRecording ? (
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 animate-pulse rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
              <span className="font-mono text-sm font-medium text-red-600 tabular-nums">
                {formatTime(recordingTime)}
              </span>
              <span className="text-sm text-slate-500 ml-2 hidden sm:inline">Gravando resposta...</span>
            </div>
            
            <button 
              onClick={cancelRecording}
              className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-red-500 mr-2"
              title="Cancelar gravação"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <input 
            type="text" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Responda por texto ou use o microfone..." 
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
        )}

        <div className="flex items-center gap-2 shrink-0 border-l border-slate-100 pl-3">
          {!isRecording && (
            <button 
              onClick={handleSendText}
              disabled={!text.trim()}
              className={`cursor-pointer flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                text.trim() ? 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200' : 'bg-slate-100 text-slate-400'
              }`}
            >
              <SendHorizontal className="h-4 w-4" />
            </button>
          )}
          
          <button 
            onClick={isRecording ? handleStopAudio : startRecording}
            className={`cursor-pointer flex h-10 w-10 items-center justify-center rounded-full text-white shadow-lg transition-all active:scale-95 ${
              isRecording 
                ? 'bg-red-500 shadow-red-500/30 hover:bg-red-600 animate-pulse' 
                : 'bg-indigo-600 shadow-indigo-500/30 hover:bg-indigo-700'
            }`}
          >
            {isRecording ? <Square className="h-4 w-4 fill-current" /> : <Mic className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </footer>
  );
}
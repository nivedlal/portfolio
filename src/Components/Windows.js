import React, { useState, useEffect, useRef } from 'react';

const wordList = [
  'ACCOUNT', 'ACCURATE', 'ACRES', 'ACROSS', 'ACT', 'ACTION', 'ACTIVE', 'ACTIVITY', 'ACTUAL', 'ACTUALLY',
  'ADVANTAGE', 'AFTER', 'AGENT', 'AGREE', 'AHEAD', 'ALERT', 'ALWAYS', 'AMOUNT', 'ANALYZE', 'ANCIENT',
  'ANIMAL', 'ANSWER', 'APPEAL', 'APPLE', 'ARGUE', 'ASSIST', 'ATOMIC', 'AWARD', 'BASIC', 'BATTERY',
  'BEAUTY', 'BELIEVE', 'BIRTHDAY', 'BORDER', 'BRAIN', 'BRAVE', 'CALCULATE', 'CAPACITY', 'CAPITAL', 'CAUSE',
  'CENTRAL', 'CIRCLE', 'CLEAN', 'CLEAR', 'COMBAT', 'COMPLETE', 'CONCERN', 'CONSTRUCT', 'CONTROL', 'COOK',
  'CORRECT', 'COSTUME', 'COUNTRY', 'CREATIVE', 'CURRENT', 'CYCLE', 'DAILY', 'DEFEND', 'DEFINE', 'DELIVER',
  'DESIGN', 'DISASTER', 'DOCTOR', 'DONATE', 'DYNAMIC', 'EFFECT', 'ENEMY', 'ENTIRE', 'ESSENCE', 'EXAMPLE',
  'EXCITED', 'EXCELLENT', 'EXIST', 'EXTEND', 'FASHION', 'FINAL', 'FINISH', 'FIRE', 'FOOD', 'FORCE',
  'FRIEND', 'GATHER', 'GIFT', 'GLOBAL', 'HARMONY', 'HAVE', 'HERO', 'HONEST', 'IMPACT', 'INCOME',
  'INCREASE', 'INFLUENCE', 'INTERACT', 'INVENT', 'ITEM', 'JUDGEMENT', 'JOURNEY', 'JUMP', 'KING', 'KNOWLEDGE',
  'LEADER', 'LEARN', 'LIMIT', 'LITERATURE', 'MAGIC', 'MOMENT', 'MOTIVATE', 'MUSCLE', 'NATURE', 'NIGHT',
  'NOBLE', 'NURTURE', 'OBJECT', 'OFFER', 'OPTION', 'ORDINARY', 'ORGANIC', 'ORIGIN', 'OUTCOME', 'PASSION',
  'PEACE', 'PERFECT', 'PERSIST', 'PEOPLE', 'PICK', 'PLAN', 'PRIORITY', 'PRIZE', 'PROJECT', 'PROMISE',
  'QUALITY', 'QUESTION', 'REACT', 'REALITY', 'RESEARCH', 'RESULT', 'REWARD', 'SCALE', 'SCHOOL', 'SECOND',
  'SECURE', 'SENSE', 'SERVICE', 'SIMPLE', 'SING', 'SOLUTION', 'SPEED', 'STABILITY', 'STAR', 'STORY',
  'SUCCESS', 'SURVEY', 'SYSTEM', 'TALENT', 'TASTE', 'TERMINAL', 'THINK', 'TOTAL', 'TRAFFIC', 'TRANSLATE',
  'TRUST', 'TYPE', 'VALUE', 'VISION', 'VOLUME', 'WEALTH', 'WIN', 'WORLD', 'WORK', 'XENON', 'YOUTH', 'ZEAL'
];

function Windows() {
  const [commandHistory, setCommandHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [finalScore, setFinalScore] = useState(null); 
  const [gameStarted, setGameStarted] = useState(false);
  const [theme, setTheme] = useState('dark');
  const gameIntervalRef = useRef(null);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setUserInput(inputValue);
    if (isGameRunning && inputValue.toUpperCase() === currentWord) {
      setScore(prevScore => prevScore + 1); 
      setUserInput(''); 
      generateRandomWord();
    }
  };
  const generateRandomWord = () => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrentWord(randomWord);
  };
  const startTypingGame = () => {
    setIsGameRunning(true);
    setScore(0);
    setFinalScore(null);
    setTimeLeft(60); 
    setGameStarted(true);
    generateRandomWord(); 
    gameIntervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          clearInterval(gameIntervalRef.current);
          setIsGameRunning(false);
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
  const handleInputSubmit = (e) => {
    if (isGameRunning) return; 
    if (e.key === 'Enter') {
      const command = userInput.trim().toLowerCase();
      if (command === 'hello') {
        setCommandHistory([...commandHistory, 'Available commands: HELLO, TYPE, LIGHT, DARK, CLEAR']);
      } else if (command === 'clear') {
        setCommandHistory([]);
        setScore(0);
        setTimeLeft(60);
        setFinalScore(null); 
        setGameStarted(false);
      } else if (command === 'type' && !isGameRunning) {
        startTypingGame(); 
      }  else if (command === 'light') {
        setTheme('light'); 
        setCommandHistory([...commandHistory, 'Switched to light theme']);
      } else if (command === 'dark') {
        setTheme('dark'); 
        setCommandHistory([...commandHistory, 'Switched to dark theme']);
      } else {
        setCommandHistory([
          ...commandHistory,
          <span className="text-red-500" key={command}>Unknown command: {command}</span>
        ]);
      }
      setUserInput('');
    }
  };
  useEffect(() => {
    if (!isGameRunning && gameStarted && finalScore === null ) {
      setFinalScore(score);
      setCommandHistory([...commandHistory, `Game Over! Final score: ${score}`]);
    }
  }, [isGameRunning, score, finalScore, commandHistory, gameStarted]);

  return (
    <div className={`border bg-opacity-80 bg-clip-padding backdrop-filter backdrop-blur-sm ${theme === 'dark' ? 'bg-gray-900 border-gray-800 text-green-500' : 'bg-gray-300 border-gray-400 text-green-600'} font-mono text-base p-6 w-full md:w-3/4 mx-auto shadow-lg rounded-md relative overflow-hidden roboto-mono`}>
      <div className={`absolute top-0 left-0 right-0 h-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-400'} px-2 flex justify-between items-center`}>
        <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'} text-sm`}>Terminal</div>
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
        </div>
      </div>
      <div className="mt-6 text-lg h-60 overflow-y-auto" ref={terminalRef}>
        <p>Type <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>HELLO</span> to see the full list of commands</p>
        {commandHistory.map((cmd, idx) => (
          <div key={idx}>{cmd}</div>
        ))}
        {isGameRunning && (
          <div>
            <p>Time left: {timeLeft}s</p>
            <p>Score: {score}</p>
            <p>Word to type: <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{currentWord}</span></p>
            <p>Your input: <span className={`${theme === 'dark' ? 'text-yellow-500' : 'text-yellow-600'}`}>{userInput}</span></p>
          </div>
        )}
      </div>
      <div className="mt-4">
        <div className="flex gap-2">
          <span>C:\Users\Guest{">"}</span>
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleInputSubmit}
            className={`${theme === 'dark' ? 'text-green-500' : 'text-green-700'} bg-transparent border-none outline-none flex-grow w-full`}
            autoFocus
            placeholder="Type here"
          />
        </div>
      </div>
    </div>
  );
}

export default Windows;
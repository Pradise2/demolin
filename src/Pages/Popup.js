import React, { useState, useEffect, useCallback } from 'react';
import logo from './logo.png';
import facebook from './facebook.png'
import youtube from './youtube.png'
import twitter from './twitter.png'
import axios from 'axios';
import telegram  from './telegram.png';
import frame from './Frame.png'

const Popup = ({ onClose }) => {
  const [specialTask, setSpecialTask] = useState([]);
  const [userData, setUserData] = useState({ TasksStatus: {}, TasksComplete: {} });
  const [userId, setUserId] = useState('001');
  const [taskFilter, setTaskFilter] = useState('new');
  const [showRCTasks, setShowRCTasks] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showGoButton, setShowGoButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingTask, setLoadingTask] = useState(null);

  const taskLogos = {
    '1': youtube,
    '2': facebook,
    '3': logo,
    '4': twitter,
    '5': youtube,
    '6': youtube,
    '7': youtube,
    '8': youtube,
    '9': youtube,
    '10': youtube,
    '11': telegram,
    '12': twitter,
    '14': youtube,
    '15': youtube,
    '16': youtube
  };

  const initializeUserId = useCallback(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const { WebApp } = window.Telegram;
      WebApp.expand();
      const user = WebApp.initDataUnsafe?.user;
      if (user) {
        setUserId(user.id);
     } else {
        console.error('User data is not available.');
      }
    } else {
      console.error('Telegram WebApp script is not loaded.');
    }
  }, []);

  useEffect(() => {
    initializeUserId();
  }, [initializeUserId]);


  useEffect(() => { 
    const fetchSpecialTaskData = async () => {
      try {
        const response = await axios.get(`https://lunarapp.thelunarcoin.com/backend/api/bonustask/${userId}`);
        const special = response.data;
        setSpecialTask(special);
      } catch (error) {
        console.error('Error fetching special task data:', error);
        setError('Error fetching special task data');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchSpecialTaskData();
   }
  }, [userId]);

  const saveUserData = useCallback(async () => {
    if (userId && userData) {
      try {  
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
  }, [userId, userData]);
  useEffect(() => {
    window.addEventListener('beforeunload', saveUserData);
    const saveInterval = setInterval(saveUserData, 10000);

    return () => {
      window.removeEventListener('beforeunload', saveUserData);
      clearInterval(saveInterval);
      saveUserData();
    };
  }, [saveUserData]);

  
  const handleStartClick = async (userId, taskId, link) => {
    setLoadingTask(taskId);
    console.log('Start button clicked for taskId:', taskId);
    
    window.open(link, '_blank');
    
    try {
      await axios.put('https://lunarapp.thelunarcoin.com/backend/api/specialtask/update', {
        userId,
        taskId,
      });
     
  
      setTimeout(() => {
        setLoadingTask(null);
  
        // Update the specific task's status to "claim"
        setSpecialTask(prevTasks => prevTasks.map(task => 
          task.taskId === taskId ? { ...task, status: 'complete' } : task
        ));
        
   }, 20000);
    } catch (error) {
      console.error('Error starting task:', error);
      setLoadingTask(null);
    }
  };


  const filteredTasks = specialTask.filter(task => {
    const taskStatus = task.status
    if (taskFilter === 'completed') {
      return taskStatus === 'complete';
    } else {
      return taskStatus !== 'complete';
    }
  });


  return (
    <div className="backdrop-blur-sm  min-h-screen bg-hy bg-opacity-10 flex items-center justify-center fixed inset-0 z-50">
      <div className="bg-card rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-primary">
            LunarCoin <span className="text-gold-500">★</span>
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-white">
            ✖
          </button>
        </div>
        <div className="mb-4">
        <img
  src={frame}
  alt="LunarCoin Frame"
  className="rounded-lg h-[270px] w-full"
/>
        </div>
       <p className="text-muted-foreground mb-2">
          Create your Data Avatar and click Memecoin generator in ForU app & connect Wallet in Blum to be eligible for
          future airdrop from ForU.
        </p>

        <div className="relative flex justify-center w-full mt-4">
                <button 
            className={`py-2 bg-opacity-70 text-center text-sm w-full rounded-2xl ${taskFilter === 'new' ? 'bg-white text-black' : 'bg-zinc-950 text-zinc-400'}`}
            onClick={() => setTaskFilter('new')}
          > 
            New
          </button>
          <button 
            className={`bg-opacity-70 py-2 text-center text-sm w-full rounded-2xl ${taskFilter === 'completed' ? 'bg-white text-black' : 'bg-zinc-950 text-zinc-400'}`}
            onClick={() => setTaskFilter('completed')}
          >
            Completed
          </button>
        </div>

  <div className="relative mt-6 space-y-4">
          {filteredTasks.length === 0 && taskFilter === 'completed' && (
            <div>No completed tasks yet.</div>
          )}
        {filteredTasks.length > 0 ? (
  filteredTasks.map((task) => {
    const taskStatus = task.status;
   
    // Determine the logo based on task status
    const taskLogo = taskStatus === 'complete' ? logo : taskLogos[task.taskId] || ''; 

    return (
      <div key={task.id} className="bg-sinc bg-opacity-10 p-4 rounded-xl flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className='bg-hy rounded-3xl'>
            <img aria-hidden="true" alt="task-icon" src={taskLogo} className="m-2 w-6 h-6" />
          </div>
          <div className='flex text-left flex-col'>
            <p className="font-bold text-white">{task.title}</p>
            <p className="text-golden-moon font-semibold">{task.reward} LAR</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {taskStatus === 'start' && (
            <button 
            onClick={() => handleStartClick(task.userId, task.taskId, task.linkz)}
            className="bg-golden-moon text-white py-2 px-4 rounded-xl"
              disabled={loadingTask === task.taskId}
            >
              {loadingTask === task.taskId ? (
                <div className="spinner-border spinner-border-sm"></div>
              ) : (
                'Start'
              )}
            </button>
          )}
         
          {taskStatus === 'completed' && (
            <button 
              className="bg-golden-moon text-white py-2 px-4 rounded-xl"
              disabled
            >
              Completed
            </button>
          )}
        </div>
      </div>
    )
  })
) : (
  <div>No special tasks available.</div>
)}

        </div>
        <div className="flex flex-row justify-between items-center">
          <input
            type="text"
            id="referralName"
            name="Wallet Address"
            className="border bg-da w-full p-1 rounded-lg"
            placeholder="Wallet Address"
          />
          <button className="bg-primary text-primary-foreground hover:bg-primary/80 py-1 px-3 rounded-md">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;

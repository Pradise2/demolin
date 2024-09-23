import React from 'react';

const Popup = ({ onClose }) => {
  return (
    <div className="backdrop-blur-sm bg-zinc  flex items-center justify-center fixed inset-0 z-50">
      <div className="bg-card rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-primary">
            LunarCoin <span className="text-purple-500">★</span>
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-white">
            ✖
          </button>
        </div>
        <div className="mb-4">
          <img
            src="https://placehold.co/400x200?text=ForU+AI+Quest"
            alt="ForU AI Quest"
            className="rounded-lg w-full"
          />
        </div>
        <h3 className="text-lg font-medium text-primary">ForU AI Quest 1/2</h3>
        <p className="text-muted-foreground mb-4">
          Create your Data Avatar and click Memecoin generator in ForU app & connect Wallet in Blum to be eligible for
          future airdrop from ForU.
        </p>
        <div className=''>
          <button className="text-left w-full py-2 rounded-md">Youtube</button>
          <button className="text-left w-full py-2 rounded-md">Twitter</button>
          <button className="text-left w-full py-2 rounded-md">Facebook</button>
          <button className="text-left w-full py-2 rounded-md mb-4">Telegram</button>
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

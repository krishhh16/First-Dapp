import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const App = () => {
  const [mood, setMood] = useState('');
  const [displayMood, setDisplayMood] = useState('');
  let MoodContract:any;

  useEffect(() => {
    const MoodContractAddress = "0x6F94E02D9Ad85F40ccb35ACAAbEec8A085B5032B";
    const MoodContractABI: any[] = [
      // ...ABI array as before
    ];

    const provider = new ethers.BrowserProvider(window.ethereum, "sepolia");

    provider.send("eth_requestAccounts", []).then(() => {
      provider.listAccounts().then((accounts:any) => {
        const signer = provider.getSigner(accounts[0]);
        MoodContract = new ethers.Contract(
          MoodContractAddress,
          MoodContractABI,
          signer
        );
      });
    });
  }, []);

  const handleGetMood = async () => {
    const currentMood = await MoodContract.getMood();
    setDisplayMood(`Your Mood: ${currentMood}`);
    console.log(currentMood);
  }

  const handleSetMood = async () => {
    await MoodContract.setMood(mood);
  }

  return (
    <div>
      <h1>This is my dApp!</h1>
      <p>Here we can set or get the mood:</p>
      <label htmlFor="mood">Input Mood:</label> <br />
      <input type="text" id="mood" value={mood} onChange={e => setMood(e.target.value)} />

      <button onClick={handleGetMood}>Get Mood</button>
      <button onClick={handleSetMood}>Set Mood</button>
      <p>{displayMood}</p>
    </div>
  );
};

export default App;

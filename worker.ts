let minute, second;

onmessage = (e) => {
  const interval = setInterval(() => {
    minute = Math.floor(
      ((e.data - Date.now()) % (1000 * 60 * 60)) / (1000 * 60)
    );
    second = Math.floor(((e.data - Date.now()) % (1000 * 60)) / 1000);

    if (minute === 0 && second === 0) {
      postMessage([minute, second]);
      clearInterval(interval);
    }

    postMessage([minute, second]);
  }, 1000);
};

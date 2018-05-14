
module.exports = {
  delayPromise(duration) {
    return (...args) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(...args);
        }, duration)
      });
    };
  }
};
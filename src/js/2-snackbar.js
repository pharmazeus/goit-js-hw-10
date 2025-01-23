import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
//
const formJs = document.querySelector('form');
//
iziToast.info({
  title: 'Hello',
  message: 'Welcome!',
});
//
const handleSubmit = event => {
  //get state of radio btn and delay
  event.preventDefault();
  const delay = Number(event.target.elements.delay.value);
  const state = event.target.elements.state.value;
  //Validation
  if (isNaN(delay) || delay <= 0) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a valid delay greater than 0',
    });
    return;
  }
  //create promise
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
  promise
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
};

formJs.addEventListener('submit', handleSubmit);

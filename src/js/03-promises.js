import Notiflix from 'notiflix';

const form = document.querySelector(".form");

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay)
  })
};

function handleSubmit(evt) {
  evt.preventDefault();

  
  const delay = +evt.target.elements.delay.value;
  const step = +evt.target.elements.step.value;
  const amount = +evt.target.elements.amount.value;

  for (let i = 1; i <= amount; i += 1){
    createPromise(i, delay + (i - 1) * step )
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.warning(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
};

form.addEventListener('submit', handleSubmit);



import './assets/style.css';


const { MODE } = import.meta.env;

if (MODE === 'react') {
  import('../react/run');
} else {
  import('./run');
}


import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './common/store';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    {/* <EngineProvider reduxStore={store}> */}
    <App />
    {/* </EngineProvider> */}
  </Provider>,
);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.on('test', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
window.electron.ipcRenderer.sendMessage('test', ['fucking test']);

// This one
window.electron.engineIpc
  .getSettings()
  .then((e) => console.log(e))
  .catch((e) => e);

// window.electron.engineIpc.connect(1);
window.electron.ipcRenderer.on('main:log', (e) => {
  // console.log(e);
});

window.electron.engineIpc.getStationLiveData().then((e) => console.log(e))

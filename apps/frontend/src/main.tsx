import {StrictMode, Suspense} from 'react';
import * as ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import App from './app/app';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <StrictMode>
        <Suspense fallback={<h2><span role={'img'} aria-label={'Whirlpool'}>🌀</span> Loading...</h2>}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Suspense>
    </StrictMode>
);

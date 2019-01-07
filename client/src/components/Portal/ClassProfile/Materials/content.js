import Letter1 from './Letter1';
import Letter2 from './Letter2';
import Letter3 from './Letter3';
import Information from './Information';

const content = [
    {
        name: 'General Information',
        component: Information,
        path: 'information'
    },
    {
        name: 'Letter 1',
        component: Letter1,
        path: 'letter-1'
    },
    {
        name: 'Letter 2',
        component: Letter2,
        path: 'letter-2'
    },
    {
        name: 'Letter 3',
        component: Letter3,
        path: 'letter-3'
    }
];

export default content;

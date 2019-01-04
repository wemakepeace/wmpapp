import Letter1 from './Letter1';
import Letter2 from './Letter2';
import Letter3 from './Letter3';
import Information from './Information';

const content = [
    {
        name: 'General Information',
        component: Information,
        route: 'information'
    },
    {
        name: 'Letter 1',
        component: Letter1,
        route: 'letter-1'
    },
    {
        name: 'Letter 2',
        component: Letter2,
        route: 'letter-2'
    },
    {
        name: 'Letter 3',
        component: Letter3,
        route: 'letter-3'
    }
];

export default content;

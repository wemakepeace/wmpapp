import Progress from './Progress';
import ClassForm from './Class';
import Materials from './Materials';
import ExchangeDetails from './ExchangeDetails';

const content = [
    {
        name: 'Progress',
        component: Progress,
        path: 'progress'
    },
    {
        name: 'Exchange Details',
        component: ExchangeDetails,
        path: 'exchange-details'
    },
    {
        name: 'Class Profile',
        component: ClassForm,
        path: 'class-profile'
    },
    {
        name: 'Materials',
        component: Materials,
        path: 'materials',
        defaultChildRoute: 'information'
    }
];

export default content;

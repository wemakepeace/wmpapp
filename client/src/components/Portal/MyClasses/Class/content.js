import Progress from './Progress';
import ClassForms from './ClassForms';
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
        component: ClassForms,
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

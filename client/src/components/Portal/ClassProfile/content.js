import Overview from '../Overview';
import Class from '../Class';
import Teacher from '../Teacher';
import Materials from '../Materials';
import Support from '../Support';
import ExchangeDetails from '../ExchangeDetails';

const content = [
    {
        name: 'Progress',
        component: ExchangeDetails,
        path: 'progress'
    },
    {
        name: 'Exchange Details',
        component: ExchangeDetails,
        path: 'exchange-details'
    },
    {
        name: 'Class Profile',
        component: Class,
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

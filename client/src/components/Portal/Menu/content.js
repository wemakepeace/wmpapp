import Overview from '../Overview';
import Class from '../Class';
import Teacher from '../Teacher';
import Materials from '../Materials';
import Support from '../Support';
import ExchangeDetails from '../ExchangeDetails';

const content = [
    {
        name: 'Overview',
        component: Overview,
        route: 'overview'
    },
    {
        name: 'Exchange Details',
        component: ExchangeDetails,
        route: 'exchange-details'
    },
    {
        name: 'Teacher Profile',
        component: Teacher,
        route: 'teacher-profile'
    },
    {
        name: 'Class Profile',
        component: Class,
        route: 'class-profile'
    },
    {
        name: 'Materials',
        component: Materials,
        route: 'materials',
        defaultChildRoute: 'instructions'
    },
    {
        name: 'Support',
        component: Support,
        route: 'support'
    }
];

export default content;

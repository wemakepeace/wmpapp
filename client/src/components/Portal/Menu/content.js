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
        name: 'Class Profile',
        component: Class,
        route: 'class-profile'
    },
    {
        name: 'Teacher Profile',
        component: Teacher,
        route: 'teacher-profile'
    },
    {
        name: 'Materials',
        component: Materials,
        route: 'materials',
        defaultChildRoute: 'information'
    },
    {
        name: 'Support',
        component: Support,
        route: 'support'
    }
];

export default content;

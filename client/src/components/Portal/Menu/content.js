import Overview from '../Overview';
import Class from '../Class';
import Teacher from '../Teacher';
import Materials from '../Materials';
import Support from '../Support';
import ExchangeDetails from '../ExchangeDetails';

const mainMenuContent = [
    {
        name: 'Overview',
        component: Overview,
        route: 'overview',
        shouldDisplayAlways: true
    },
    {
        name: 'Teacher Profile',
        component: Teacher,
        route: 'teacher-profile',
        shouldDisplayAlways: true
    },
    {
        name: 'Support',
        component: Support,
        route: 'support',
        shouldDisplayAlways: true
    }
];

const classMenuContent = [
    {
        name: 'Exchange Details',
        component: ExchangeDetails,
        route: 'exchange-details',
        shouldDisplayAlways: false
    },
    {
        name: 'Class Profile',
        component: Class,
        route: 'class-profile',
        shouldDisplayAlways: false
    },
    {
        name: 'Materials',
        component: Materials,
        route: 'materials',
        defaultChildRoute: 'information',
        shouldDisplayAlways: false
    }
];

export default { mainMenuContent, classMenuContent };

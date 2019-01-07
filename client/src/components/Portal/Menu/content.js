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
        path: 'overview',
        shouldDisplayAlways: true
    },
    {
        name: 'Teacher Profile',
        component: Teacher,
        path: 'teacher-profile',
        shouldDisplayAlways: true
    },
    {
        name: 'Support',
        component: Support,
        path: 'support',
        shouldDisplayAlways: true
    }
];

const classMenuContent = [
    {
        name: 'Exchange Details',
        component: ExchangeDetails,
        path: 'exchange-details',
        shouldDisplayAlways: false
    },
    {
        name: 'Class Profile',
        component: Class,
        path: 'class-profile',
        shouldDisplayAlways: false
    },
    {
        name: 'Materials',
        component: Materials,
        path: 'materials',
        defaultChildRoute: 'information',
        shouldDisplayAlways: false
    }
];

export default { mainMenuContent, classMenuContent };

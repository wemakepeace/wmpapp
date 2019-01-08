import MyClasses from '../MyClasses';
import ClassForms from '../MyClasses/Class/ClassForms';
import Teacher from '../Teacher';
import Support from '../Support';
import AboutProgram from '../AboutProgram';

const mainMenuContent = [
    {
        name: 'My Classes',
        component: MyClasses,
        path: 'my-classes',
        defaultChildRoute: 'progress',
    },
    {
        name: 'Teacher Profile',
        component: Teacher,
        path: 'teacher-profile',
    },
    {
        name: 'About the Program',
        component: AboutProgram,
        path: 'about-program',
    },
    {
        name: 'Support',
        component: Support,
        path: 'support',
    },
    {
        name: 'Register New Class',
        component: ClassForms,
        path: 'new-class',
        hidden: true
    }

];



export default { mainMenuContent };

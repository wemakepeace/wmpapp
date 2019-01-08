import MyClasses from '../MyClasses';
import ClassForm from '../MyClasses/ClassProfile/Class';
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
        name: 'About the Program',
        component: AboutProgram,
        path: 'about-program',
    },
    {
        name: 'Teacher Profile',
        component: Teacher,
        path: 'teacher-profile',
    },
    {
        name: 'Support',
        component: Support,
        path: 'support',
    },
    {
        name: 'Register New Class',
        component: ClassForm,
        path: 'new-class',
        hidden: true
    }

];



export default { mainMenuContent };

import { BsFillPeopleFill, BsBriefcase } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { ApiOutlined, PlayCircleOutlined } from '@ant-design/icons';

const routesConfigAdmin = [
    {
        id: 'dashboard',
        title: 'القيادة',
        messageId: 'sidebar.dashboard',
        type: 'group',
        children: [
            {
                id: 'administration.listMembres',
                title: 'قائمة المشتركين',
                messageId: 'sidebar.administration.listMembres',
                icon: <BsFillPeopleFill />,
                path: '/list-membres',
            },
            {
                id: 'schoolyear.technicalcards',
                title: 'البطاقات التقنية/النشاطات',
                messageId: 'sidebar.schoolyear.technicalcards',
                icon: <BsBriefcase />,
                path: '/technical-cards-administration',
            },
            {
                id: 'administration.popups',
                title: 'الإعلانات',
                messageId: 'sidebar.administration.popups',
                icon: <PlayCircleOutlined />,
                path: '/Pop-up',
            },
            {
                id: 'settings',
                title: 'إعدادات الإرشاد',
                messageId: 'sidebar.settings',
                icon: <AiOutlineSetting />,
                type: 'collapse',
                children: [
                    {
                        id: 'settings.shedsettings',
                        title: 'جدول الإرشاد',
                        messageId: 'sidebar.settings.shedsettings',
                        icon: <BsBriefcase />,
                        path: '/shed-settings',
                    },
                    {
                        id: 'settings.TCE002',
                        title: 'سكريبت TCE002',
                        messageId: 'sidebar.settings.TCE002',
                        icon: <ApiOutlined />,
                        path: '/scripts-settings/TCE002',
                    },
                    ,
                    {
                        id: 'settings.TCO001',
                        title: 'سكريبت TCO001',
                        messageId: 'sidebar.settings.TCO001',
                        icon: <ApiOutlined />,
                        path: '/scripts-settings/TCO001',
                    },
                ],
            },
        ]
    }]

export default routesConfigAdmin;
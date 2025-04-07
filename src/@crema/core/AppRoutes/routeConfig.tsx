import React from 'react';
import { HiOutlineAcademicCap, HiOutlineChartSquareBar } from 'react-icons/hi';
import {
  RiBarChart2Line,
  RiCustomerService2Line,
  RiDashboardLine,
  RiShieldUserLine,
  RiTodoLine,
} from 'react-icons/ri';
import {
  BiBookReader,
  BiCartAlt,
  BiDollar,
  BiErrorCircle,
  BiRss,
  BiTask,
} from 'react-icons/bi';
import {
  MdInvertColors,
  MdOutlineAnalytics,
  MdOutlineContactPhone,
  MdOutlineContactSupport,
  MdOutlineDns,
  MdOutlineManageAccounts,
  MdTimeline,
} from 'react-icons/md';
import {
  BsBriefcase,
  BsCart4,
  BsChatDots,
  BsCurrencyBitcoin,
  BsQuestionDiamond,
  BsBarChart,
} from 'react-icons/bs';
import {
  FaRegCalendarAlt,
  FaRegHospital,
  FaRegImages,
  FaRegListAlt,
} from 'react-icons/fa';
import { CgAttachment, CgFeed, CgUserList } from 'react-icons/cg';
import { FiMail, FiMap, FiUsers } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { DiHtml5Multimedia } from 'react-icons/di';
import { RoutePermittedRole } from '@crema/constants/AppEnums';
import { GrUserAdmin } from 'react-icons/gr';
import { TbFileInvoice } from 'react-icons/tb';

const routesConfig = [
  {
    id: 'dashboard',
    title: 'القيادة',
    messageId: 'sidebar.dashboard',
    type: 'group',
    children: [
      {
        id: 'statistics.dashboard.index',
        title: 'لوحة القيادة',
        messageId: 'sidebar.dashboard.index',
        icon: <BsBarChart />,
        path: '#',
      },
      {
        id: 'sidebar.dashboard.rapidAcces',
        title: 'الوصول السريع',
        messageId: 'sidebar.dashboard.rapidAcces',
        icon: <BsBarChart />,
        path: '/rapid-acces',
      },
      {
        id: 'statistics.outcome',
        title: 'الحصيلة',
        messageId: 'sidebar.statistics.outcome',
        icon: <MdOutlineAnalytics />,
        type: 'collapse',
        children: [
          {
            id: 'statistics.outcome.orientation',
            title: 'حصيلة التوجيه',
            messageId: 'sidebar.statistics.outcome.orientation',
            icon: <RiDashboardLine />,
            path: '#',
          },
          {
            id: 'statistics.outcome.guidance',
            title: 'حصيلة الإرشاد',
            messageId: 'sidebar.statistics.outcome.guidance',
            icon: <RiDashboardLine />,
            path: '#',
          },
          {
            id: 'statistics.outcome.media',
            title: 'حصيلة الإعلام',
            messageId: 'sidebar.statistics.outcome.media',
            icon: <RiDashboardLine />,
            path: '#',
          },
          {
            id: 'statistics.outcome.calendar',
            title: 'حصيلة التقويم',
            messageId: 'sidebar.statistics.outcome.Calendar',
            icon: <RiDashboardLine />,
            path: '#',
          },
        ],
      },
      {
        id: 'statistics.operations.followup',
        title: 'متابعة العمليات',
        messageId: 'sidebar.statistics.operations.followup',
        icon: <RiBarChart2Line />,
        path: '#',
      },
      {
        id: 'dashboard.estabs.informations',
        title: ' السيرة التربوية للمؤسّسة',
        messageId: 'dashboard.estabs.informations',
        icon: <RiBarChart2Line />,
        path: '#',
      },
      {
        id: 'dashboard.cards',
        title: 'بطاقات المتابعة الارشادية',
        messageId: 'dashboard.cards',
        icon: <MdOutlineAnalytics />,
        type: 'collapse',
        children: [
          {
            id: 'dashboard.cards.student',
            title: 'البطاقات  للتلميذ',
            messageId: 'dashboard.cards.student',
            icon: <RiDashboardLine />,
            path: '/cards/student',
          },
          {
            id: 'dashboard.cards.class',
            title: 'البطاقات  للقسم',
            messageId: 'dashboard.cards.class',
            icon: <RiDashboardLine />,
            path: '/cards/classe',
          },
          {
            id: 'dashboard.cards.level',
            title: 'البطاقات  المستوى',
            messageId: 'dashboard.cards.level',
            icon: <RiDashboardLine />,
            path: '/cards/level',
          },
          {
            id: 'dashboard.cards.speciality',
            title: 'البطاقات  المؤسسة',
            messageId: 'dashboard.cards.speciality',
            icon: <RiDashboardLine />,
            path: '/cards/speciality',
          }, ,
          {
            id: 'dashboard.cards.subject',
            title: 'البطاقات  المؤسسة',
            messageId: 'dashboard.cards.subject',
            icon: <RiDashboardLine />,
            path: '/cards/subject',
          }, ,
          {
            id: 'dashboard.cards.estab',
            title: 'البطاقات  المؤسسة',
            messageId: 'dashboard.cards.estab',
            icon: <RiDashboardLine />,
            path: '/cards/establishment',
          },
          {
            id: 'dashboard.cards.responsible',
            title: 'البطاقات  الولي',
            messageId: 'dashboard.cards.responsible',
            icon: <RiDashboardLine />,
            path: '#',
          },
        ],
      },
      {
        id: 'dashboard.week.task',
        title: 'البرمجة الاسبوهبة ',
        messageId: 'dashboard.week.task',
        icon: <HiOutlineAcademicCap />,
        path: '/week-programs',
      },
      {
        id: 'schoolyear.programme',
        title: 'البرنامج السنوي',
        messageId: 'sidebar.schoolyear.programme',
        icon: <HiOutlineAcademicCap />,
        path: '/year-program',
      },
      {
        id: 'schoolyear.technicalcards',
        title: 'البطاقات التقنية/النشاطات',
        messageId: 'sidebar.schoolyear.technicalcards',
        icon: <BsBriefcase />,
        path: '/technical-cards',
      },
      {
        id: 'schoolyear.educationalmemoirs',
        title: 'المذكرات التربوية',
        messageId: 'sidebar.schoolyear.educationalmemoirs',
        icon: <BiBookReader />,
        path: '#',
      },
      {
        id: 'recordingdata',
        title: 'تسجيل بيانات',
        messageId: 'sidebar.recordingdata',
        icon: <FaRegCalendarAlt />,
        type: 'collapse',
        children: [
          {
            id: 'recordingdata.class',
            title: 'الأقسام',
            messageId: 'sidebar.recordingdata.class',
            icon: <FaRegHospital />,
            path: '/classes',
          },
          {
            id: 'recordingdata.students',
            title: 'التلاميذ',
            messageId: 'sidebar.recordingdata.students',
            icon: <FaRegHospital />,
            path: '/students',
          },
          ,
          {
            id: 'recordingdata.professors',
            title: 'الاساتذة',
            messageId: 'sidebar.recordingdata.professors',
            icon: <FaRegHospital />,
            path: '/professors',
          }
          ,
          {
            id: 'recordingdata.notes',
            title: 'النتائج',
            messageId: 'sidebar.recordingdata.notes',
            icon: <FaRegHospital />,
            path: '/notes',
          },
          {
            id: 'recordingdata.desires',
            title: 'رغبات التوجيه',
            messageId: 'sidebar.recordingdata.desires',
            icon: <FaRegHospital />,
            path: '/desires',
          },
        ],
      },
      {
        id: 'media',
        title: 'الإعلام',
        messageId: 'sidebar.media',
        icon: <BiRss />,

        type: 'collapse',
        children: [
          {
            id: 'media.activities',
            title: 'متابعة نشاط الإعلام',
            messageId: 'sidebar.media.activities',
            icon: <BiRss />,
            path: '#',
          },
          {
            id: 'media.wek',
            title: 'الأسبوع الوطني للإعلام',
            messageId: 'sidebar.media.week',
            icon: <BiRss />,
            path: '#',
          },
          {
            id: 'media.formation.survey',
            title: 'إستقصاء التكوين',
            messageId: 'sidebar.media.formation.survey',
            icon: <BiRss />,
            path: '#',
          },
          {
            id: 'media.cell',
            title: 'خلية الإعلام',
            messageId: 'sidebar.media.cell',
            icon: <BiRss />,
            path: '#',
          },
        ],
      },
      {
        id: 'orientation',
        title: 'التوجيه',
        messageId: 'sidebar.orientation',
        icon: <BsQuestionDiamond />,

        type: 'collapse',
        children: [
          {
            id: 'orientation.progressive',
            title: 'التوجيه التدريجي',
            messageId: 'sidebar.orientation.progressive',
            icon: <RiShieldUserLine />,
            path: '#',
          },
          {
            id: 'orientation.advance',
            title: 'التوجيه المسبق',
            messageId: 'sidebar.orientation.advance',
            icon: <RiShieldUserLine />,
            path: '#',
          },
          {
            id: 'orientation.educationalregulation',
            title: 'التنظيم التربوي',
            messageId: 'sidebar.orientation.educationalregulation',
            icon: <RiShieldUserLine />,
            path: '#',
          },
          {
            id: 'orientation.questionnaire',
            title: 'استبيان الميول',
            messageId: 'sidebar.orientation.questionnaire',
            icon: <BsQuestionDiamond />,
            path: '#',
          },
        ],
      },
      {
        id: 'followupguidance',
        title: 'المتابعة و الإرشاد',
        messageId: 'sidebar.followupguidance',
        icon: <CgUserList />,

        type: 'collapse',
        children: [
          {
            id: 'followupguidance.interviews',
            title: 'سجل المقابلات',
            messageId: 'sidebar.followupguidance.interviews',
            icon: <CgUserList />,
            path: '/interviews',
          },
          {
            id: 'followupguidance.flowup',
            title: 'سجل المتابعة',
            messageId: 'sidebar.followupguidance.flowup',
            icon: <CgUserList />,
            path: '/followups',
          }
          ,
          {
            id: 'followupguidance.guidanceGroups',
            title: 'المجموعات الارشادية',
            messageId: 'sidebar.followupguidance.guidanceGroups',
            icon: <CgUserList />,
            path: '/guidance-groups',
          }
        ],
      },
      {
        id: 'evaluation',
        title: 'التقويم',
        messageId: 'sidebar.evaluation',
        icon: <MdOutlineAnalytics />,

        type: 'collapse',
        children: [
          {
            id: 'evaluation.priorlearning',
            title: 'المكتسبات القبلية',
            messageId: 'sidebar.evaluation.priorlearning',
            icon: <MdOutlineAnalytics />,
            path: '#',
          },
          {
            id: 'evaluation.continuous',
            title: 'التقويم المستمر',
            messageId: 'sidebar.evaluation.continuous',
            icon: <MdOutlineAnalytics />,
            path: '#',
          },
          {
            id: 'evaluation.baccalaureate',
            title: 'البكالوريا',
            messageId: 'sidebar.evaluation.baccalaureate',
            icon: <MdOutlineAnalytics />,
            path: '#',
          },
          {
            id: 'evaluation.middleexam',
            title: 'ش ت م',
            messageId: 'sidebar.evaluation.middleexam',
            icon: <MdOutlineAnalytics />,
            path: '#',
          },
          {
            id: 'evaluation.comparativeanalysis',
            title: 'التحليل المقارن',
            messageId: 'sidebar.evaluation.comparativeanalysis',
            icon: <MdOutlineAnalytics />,
            path: '#',
          }, {
            id: 'evaluation.Coordination',
            title: 'التنسيق بين الأطوار',
            messageId: 'sidebar.evaluation.Coordination',
            icon: <MdOutlineAnalytics />,
            path: '#',
          },
        ],
      },
      {
        id: 'reports',
        title: 'التقارير',
        messageId: 'sidebar.reports',
        icon: <TbFileInvoice />,

        type: 'collapse',
        children: [{
          id: 'reports.dailyactivityreports',
          title: 'تقارير اليومية',
          messageId: 'sidebar.reports.dailyactivityreports',
          icon: <TbFileInvoice />,
          path: '/daily-activities',
        },
        {
          id: 'reports.termreports',
          title: 'التقاريرالنشاطات اليويمة',
          messageId: 'sidebar.reports.termreports',
          icon: <TbFileInvoice />,
          path: '/trimestres',
        },
        {
          id: 'reports.activityreports',
          title: 'تقارير النشاطات',
          messageId: 'sidebar.reports.activityreports',
          icon: <TbFileInvoice />,
          path: '/donne-tasks',
        },
        ],
      },
      {
        id: 'formaltexts',
        title: 'النصوص الرسمية',
        messageId: 'sidebar.formaltexts',
        icon: <MdOutlineDns />,
        path: '#',
      },
      {
        id: 'messages',
        title: 'الرسائل',
        messageId: 'sidebar.messages',
        icon: <FiMail />,
        path: '#',
      },
      {
        id: 'notifications',
        title: 'الإشعارات',
        messageId: 'sidebar.notifications',
        icon: <IoMdNotificationsOutline />,
        path: '#',
      },
      {
        id: 'settings',
        title: 'الإعدادات',
        messageId: 'sidebar.settings',
        type: 'collapse',
        children: [
          {
            id: 'settings.programsettings',
            title: 'إعدادات البرنامج',
            messageId: 'sidebar.settings.programsettings',
            icon: <MdOutlineManageAccounts />,
            path: '#',
          },
          {
            id: 'settings.usersettings',
            title: 'إعدادات المستخدم',
            messageId: 'sidebar.settings.usersettings',
            icon: <MdOutlineManageAccounts />,
            type: 'collapse',
            path: '#',
          },
          {
            id: 'settings.institutionsettings',
            title: 'إعدادات المؤسسة',
            messageId: 'sidebar.settings.institutionsettings',
            icon: <MdOutlineManageAccounts />,
            path: '/establishment-settings',
          },
        ],
      },
      {
        id: 'aboutapp',
        title: 'عن التطبيق',
        messageId: 'sidebar.aboutapp',
        path: '#',
      },
      {
        id: 'helpcenter',
        title: 'مركز المساعدة',
        messageId: 'sidebar.helpcenter',
        path: '#',
        children: [
          {
            id: 'TestApp',
            title: 'تجريب التطبيق',
            messageId: 'sidebar.testApp',
            path: '/test'
          }
        ]
      },
      {
        id:'TestApp',
        title:'تجريب التطبيق',
        messageId:'sidebar.testApp',
        path:'/test'
      }
    ],
  },
];

export default routesConfig;

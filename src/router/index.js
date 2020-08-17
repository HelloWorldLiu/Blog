import Vue from "vue";
import VueRouter from "vue-router";

import JwtService from "@/common/jwt.service";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LandingPage",
    props: true,
    component: () => import("@/views/LandingPage.vue")
  },
  {
    path: "/#/:id",
    name: "LandingPageContact",
    props: true,
    component: () => import("@/views/LandingPage.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue")
  },
  {
    path: "/password/forget",
    name: "ForgetPassword",
    component: () => import("@/views/ForgetPassword.vue")
  },
  {
    path: "/password/reset",
    name: "ResetPassword",
    component: () => import("@/views/ResetPassword.vue")
  },
  {
    path: "/line/bind",
    name: "BindLineLogin",
    component: () => import("@/views/line/BindLineLogin.vue")
  },
  {
    path: "/line/login",
    name: "LineLogin",
    component: () => import("@/views/line/Login.vue")
  },

  // ===== 會員中心（？） =====
  {
    path: "/home",
    component: () => import("@/views/home/Index.vue"),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/home/Dashboard.vue")
      },

      {
        path: "enrollment",
        component: () => import("@/views/home/enrollment/Index.vue"),
        children: [
          {
            path: "",
            name: "EnrollmentList",
            component: () => import("@/views/home/enrollment/List.vue")
          },
          {
            path: ":id",
            props: true,
            name: "EnrollmentDetail",
            component: () => import("@/views/home/enrollment/Detail.vue")
          }
        ]
      },
      {
        path: "arrange",
        name: "Arrange",
        component: () => import("@/views/home/enrollment/Arrange.vue")
      },

      {
        path: "order",
        component: () => import("@/views/home/order/Index.vue"),
        children: [
          {
            path: "",
            name: "OrderList",
            component: () => import("@/views/home/order/List.vue")
          },
          {
            path: ":id",
            props: true,
            name: "OrderDetail",
            component: () => import("@/views/home/order/Detail.vue")
          }
        ]
      },

      {
        path: "*",
        redirect: { name: "Home" }
      }
    ]
  },
  // ===== 线上课程 ======
  {
    path: "/classes",
    name: "classes",
    component: () => import("@/views/classes/Index.vue"),
    children: []
  },
  {
    path: "/classes/:courseId",
    name: "viewCourse",
    component: () => import("@/views/classes/OLCourse/OLCourse.vue")
  },
  //练习题
  {
    path: "/practices/practice",
    name: "Practice",
    component: () => import("@/views/practices/Practices.vue")
  },
  //老师后台
  {
    path: "/courses/teacherbackend",
    component: () => import("@/views/courses/teacherBackend/Index.vue"),
    children: [
      {
        path: "courseslist",
        name: "teacherCoursesList",
        component: () => import("@/views/courses/teacherBackend/Courses.vue")
      },
      {
        path: "datalist",
        name: "teacherDataList",
        component: () => import("@/views/courses/teacherBackend/Data.vue")
      }
    ]
  },
  //学生后台
  {
    path: "/courses/my-courses/",
    name: "myCourses",
    component: () => import("@/views/courses/my-courses/Learning/Learning.vue")
  },
  {
    path: "/courses/course/",
    name: "studentCourse",
    component: () => import("@/views/courses/my-courses/Course/Course.vue")
  },
  // 管理员后台
  {
    path: "/courses/adminbackend",
    component: () => import("@/views/courses/adminBackend/Index.vue"),
    children: [
      {
        path: "courseslist",
        name: "adminCoursesList",
        component: () => import("@/views/courses/adminBackend/Courses.vue")
      }
    ]
  },
  //课程详情
  {
    path: "/courses/coursedetail",
    name: "courseDetail",
    component: () => import("@/views/courses/components/CourseDetail.vue")
  },
  //查看学生的课程进度
  {
    path: "/courses/studentprogress",
    name: "studentProgress",
    component: () => import("@/views/courses/components/StudentProgress.vue")
  },
  //课程编辑
  {
    path: "/courses/editcourse",
    name: "EditCourse",
    component: () =>
      import("@/views/courses/components/editCourse/EditCourse.vue")
  },
  // 家长后台
  {
    path: "/courses/parentbackend",
    component: () => import("@/views/courses/parentBackend/Index.vue"),
    children: [
      {
        path: "studentsList",
        name: "studentsList",
        component: () => import("@/views/courses/parentBackend/Data.vue")
      }
    ]
  },
  // 課程介紹
  {
    path: "/courses",
    name: "courseIntrosList",
    component: () => import("@/views/courseIntros/Index.vue"),
    children: []
  },
  {
    path: "/courses/create",
    name: "courseIntrosCreate",
    component: () => import("@/views/courseIntros/Create.vue"),
    children: []
  },
  {
    path: "/courses/:id/edit",
    name: "courseIntrosEdit",
    component: () => import("@/views/courseIntros/Edit.vue"),
    children: []
  },
  // 梯次
  {
    path: "/course-sessions",
    name: "courseSessionsList",
    component: () => import("@/views/courseSessions/Index.vue"),
    children: []
  },
  {
    path: "/course-sessions/create",
    name: "courseSessionsCreate",
    component: () => import("@/views/courseSessions/Create.vue"),
    children: []
  },
  {
    path: "/course-sessions/:id/edit",
    name: "courseSessionsEdit",
    component: () => import("@/views/courseSessions/Edit.vue"),
    children: []
  },
  // 班級
  {
    path: "/session-classes",
    name: "sessionClassesList",
    component: () => import("@/views/sessionClasses/Index.vue"),
    children: []
  },
  {
    path: "/session-classes/create",
    name: "sessionClassesCreate",
    component: () => import("@/views/sessionClasses/Create.vue"),
    children: []
  },
  {
    path: "/session-classes/:id/edit",
    name: "sessionClassesEdit",
    component: () => import("@/views/sessionClasses/Edit.vue"),
    children: []
  },
  {
    path: "/session-classes/:id/detail",
    name: "sessionClassesDetail",
    component: () => import("@/views/sessionClasses/Detail.vue"),
    children: []
  },
  // ===== TOEFL系统 ======
  {
    path: "/toefl",
    name: "ToeflList",
    component: () => import("@/views/toefl/toeflList/Index.vue")
  },
  {
    path: "/toefl/setTest",
    name: "SetTest",
    component: () => import("@/views/toefl/toeflTest/Index.vue")
  },
  {
    path: "/toefl/testresults",
    name: "ToeflTestResults",
    component: () => import("@/views/toefl/toeflTestResults/Index.vue")
  },
  {
    path: "/toefl/transcript",
    name: "Transcript",
    component: () => import("@/views/toefl/transcript/Index.vue")
  },
  {
    path: "/toefl/resolve",
    name: "ToeflResolve",
    component: () => import("@/views/toefl/toeflResolve/Index.vue"),
    meta: {
      showHeader: false,
      showFooter: false
    }
  },
  {
    path: "/toefl/test",
    name: "ToeflTest",
    component: () => import("@/views/toefl/toeflTest/Test.vue"),
    meta: {
      showHeader: false,
      showFooter: false
    }
  },
  // ===== TEST系统 ======
  //Timer 计时器
  {
    path: "/tests/timer",
    name: "Timer",
    component: () => import("@/views/tests/timer/Index.vue")
  },
  //Grading 试卷批改
  {
    path: "/tests/grading",
    name: "Grading",
    component: () => import("@/views/tests/grading/Index.vue")
  },
  {
    path: "/tests/grading/act",
    name: "GradingACT",
    component: () => import("@/views/tests/grading/Act.vue")
  },
  {
    path: "/tests/grading/sat",
    name: "GradingSAT",
    component: () => import("@/views/tests/grading/Sat.vue")
  },

  // 角色綁定
  {
    path: "/register-detail",
    name: "RegisterDetail",
    component: () => import("@/views/RegisterDetail.vue"),
    meta: {
      requiresAuth: true,
      skipCheckBind: true
    }
  },
  {
    path: "/user",
    name: "User",
    component: () => import("@/views/user/User.vue"),
    meta: {
      requiresAuth: true
    }
  },
  // profile
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/user/UserProfile.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/profile/:id",
    name: "ProfileForAdmin",
    component: () => import("@/views/user/ProfileForAdminEditUser.vue"),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/student-profile",
    name: "StudentProfile",
    component: () => import("@/views/user/ProfileForParentEditChild.vue"),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  // Header
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/headerRouter/about/About.vue")
  },
  {
    path: "/instructors",
    name: "Instructors",
    component: () => import("@/views/headerRouter/instructors/Instructors.vue")
  },
  // ClassesAndCounseling
  {
    path: "/classes-and-counseling",
    name: "ClassesAndCounseling",
    component: () => import("@/views/headerRouter/classes/Classes.vue")
  },
  {
    path: "/classes-and-counseling/class",
    name: "ClassTemplate",
    props: true,
    component: () =>
      import("@/components/classesandcounseling/ClassTemplate.vue")
  },
  {
    path: "/classes-and-counseling/sat-course-static",
    name: "SATCourseStatic",
    component: () =>
      import("@/components/classesandcounseling/SATCourseStatic.vue")
  },
  {
    path: "/classes-and-counseling/act-course",
    name: "ACTCourse",
    component: () => import("@/components/classesandcounseling/ACTCourse.vue")
  },
  {
    path: "/classes-and-counseling/sat-course-part2",
    name: "SATCoursePart2",
    component: () =>
      import("@/components/classesandcounseling/SATCoursePart2.vue")
  },
  {
    path: "/classes-and-counseling/sat-math-level2",
    name: "SATMathLevel2",
    component: () =>
      import("@/components/classesandcounseling/SATMathLevel2.vue")
  },
  {
    path: "/classes-and-counseling/sat-math",
    name: "SATMath",
    component: () => import("@/components/classesandcounseling/SATMath.vue")
  },
  {
    path: "/classes-and-counseling/private-inperson",
    name: "PrivateInperson",
    component: () =>
      import("@/components/classesandcounseling/PrivateInperson.vue")
  },
  {
    path: "/classes-and-counseling/private-online",
    name: "PrivateOnline",
    component: () =>
      import("@/components/classesandcounseling/PrivateOnline.vue")
  },
  {
    path: "/classes-and-counseling/mentoring-program",
    name: "MentoringProgram",
    component: () =>
      import("@/components/classesandcounseling/MentoringProgram.vue")
  },
  {
    path: "/classes-and-counseling/application-counseling",
    name: "ApplicationCounseling",
    component: () =>
      import("@/components/classesandcounseling/ApplicationCounseling.vue")
  },
  {
    path: "/classes-and-counseling/toefl-course",
    name: "TOEFLCourse",
    component: () => import("@/components/classesandcounseling/TOEFLCourse.vue")
  },
  {
    path: "/classes-and-counseling/toefl-eric",
    name: "TOEFLEric",
    component: () => import("@/components/classesandcounseling/TOEFLEric.vue")
  },
  {
    path: "/classes-and-counseling/sat-course-winter",
    name: "SATCourseWinter",
    component: () =>
      import("@/components/classesandcounseling/SATCourseWinter.vue")
  },
  // stories
  {
    path: "/stories",
    name: "Stories",
    component: () => import("@/views/headerRouter/stories/Stories.vue")
  },
  {
    path: "/blogs",
    name: "Blogs",
    beforeEnter() {
      location.href = "https://blog.ivy-way.com/";
    }
  },
  // 關於(FAQ)
  {
    path: "/faq",
    name: "Faq",
    component: () => import("@/views/headerRouter/about/Faq.vue"),
    redirect: { name: "FaqChild", params: { id: "about-us" } },
    props: true,
    meta: {
      skipCheckBind: true
    },
    children: [
      {
        path: ":id",
        name: "FaqChild",
        props: true,
        component: () => import("@/components/faq/CollapseItems")
      }
    ]
  },
  {
    path: "/edit-faq",
    name: "EditFaq",
    component: () => import("@/views/headerRouter/about/EditFaq.vue"),
    props: true,
    redirect: { name: "EditFaqHome" },
    children: [
      {
        path: "/edit-faq-home",
        name: "EditFaqHome",
        props: true,
        component: () => import("@/views/headerRouter/about/EditFaqHome.vue")
      },
      {
        path: "/edit-faq-main",
        name: "EditFaqMain",
        props: true,
        component: () => import("@/views/headerRouter/about/EditFaqMain.vue")
      },
      {
        path: "/edit-faq-category",
        name: "EditFaqCategory",
        props: true,
        component: () =>
          import("@/views/headerRouter/about/EditFaqCategory.vue")
      },
      {
        path: "/edit-faq-topic",
        name: "EditFaqTopic",
        props: true,
        component: () => import("@/views/headerRouter/about/EditFaqTopic.vue")
      },
      {
        path: "/edit-instructors-faq",
        name: "EditInstructorsFaq",
        props: true,
        component: () =>
          import("@/views/headerRouter/about/EditInstructorsFaq.vue")
      }
    ]
  },
  // flash cards
  {
    path: "/flashcards",
    name: "FlashCards",
    props: true,
    component: () => import("@/views/flashCards/FlashCards.vue"),
    meta: {
      showHeader: false,
      showFooter: false
    }
  },
  {
    path: "/flashcards/memorize",
    name: "MemorizeList",
    props: true,
    component: () => import("@/views/flashCards/MemorizeList.vue"),
    meta: {
      showHeader: false,
      showFooter: false
    }
  },

  // ===== 報名表 =====
  {
    path: "/enrollment",
    component: () => import("@/views/enrollment/Index.vue"),
    redirect: { name: "EnrollmentStep1" },
    children: [
      {
        path: "step1",
        name: "EnrollmentStep1",
        component: () => import("@/views/enrollment/Step1.vue")
      },
      {
        path: "step2",
        name: "EnrollmentStep2",
        component: () => import("@/views/enrollment/Step2.vue")
      },
      {
        path: "step3",
        name: "EnrollmentStep3",
        component: () => import("@/views/enrollment/Step3.vue")
      },
      {
        path: "success",
        name: "EnrollmentSuccess",
        component: () => import("@/views/enrollment/Success.vue")
      },
      {
        path: "*",
        redirect: { name: "EnrollmentStep1" }
      }
    ]
  },

  // TODO: 404
  {
    path: "*",
    name: "PageNotFound",
    component: () => import("@/views/_ViewExample.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  // 導向新的 router 會到新頁面的 top
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth && !JwtService.hasToken()) {
    next({
      name: "Login"
    });
  } else if (!to.meta.skipCheckBind && JwtService.hasToken()) {
    await store.dispatch("user/checkFinishBind");

    if (!store.state.user.finishBind) {
      next({
        name: "RegisterDetail"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./page/intro/intro.module').then(m => m.IntroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'tab1',
    loadChildren: () => import('./page/tab1/tab1.module').then(m => m.Tab1PageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./page/tab2/tab2.module').then(m => m.Tab2PageModule)
  },
  {
    path: 'tab3',
    loadChildren: () => import('./page/tab3/tab3.module').then(m => m.Tab3PageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./page/tab4/tab4.module').then(m => m.Tab4PageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./page/tab5/tab5.module').then(m => m.Tab5PageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./page/registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: 'message',
    loadChildren: () => import('./page/message/message.module').then(m => m.MessagePageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./page/intro/intro.module').then(m => m.IntroPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./page/notification/notification.module').then(m => m.NotificationPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./page/search/search.module').then(m => m.SearchPageModule)
  },
  {
    path: 'review',
    loadChildren: () => import('./page/review/review.module').then(m => m.ReviewPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./page/forgotpassword/forgotpassword.module').then(m => m.ForgotpasswordPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./page/feedback/feedback.module').then(m => m.FeedbackPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./page/report/report.module').then(m => m.ReportPageModule)
  },
  {
    path: 'concern',
    loadChildren: () => import('./page/concern/concern.module').then(m => m.ConcernPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./page/faq/faq.module').then(m => m.FaqPageModule)
  },
  {
    path: 'howtouseapp',
    loadChildren: () => import('./page/howtouseapp/howtouseapp.module').then(m => m.HowtouseappPageModule)
  },
  {
    path: 'othersprofile',
    loadChildren: () => import('./page/othersprofile/othersprofile.module').then(m => m.OthersprofilePageModule)
  },
  {
    path: 'skillcategory',
    loadChildren: () => import('./page/skillcategory/skillcategory.module').then(m => m.SkillcategoryPageModule)
  },
  {
    path: 'time-validation-accept',
    loadChildren: () => import('./page/time-validation-accept/time-validation-accept.module').then(m => m.TimeValidationAcceptPageModule)
  },
  {
    path: 'time-validation-request',
    loadChildren: () => import('./page/time-validation-request/time-validation-request.module').then(m => m.TimeValidationRequestPageModule)
  },
  {
    path: 'send-message',
    loadChildren: () => import('./page/send-message/send-message.module').then( m => m.SendMessagePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

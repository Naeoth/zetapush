import { StandardUserWorkflowConfigurer } from './grammar';
import { TimestampBasedUuidGenerator } from '../core';
import { StaticAccountStatusProvider, UsernamePasswordAccountDetails } from '../../standard-user-workflow/core';
import { AccountStatus } from '../../standard-user-workflow/api';

// prettier-ignore

// default workflow:
// user signups -> confirmation email -> click on link in email -> account confirmed on ZetaPush -> welcome page
// user logs in -> welcome page
// user asks for password reset -> send email -> click on link in email -> show page to reset password -> change password -> welcome page

// TODO: find a more understandable name (StandardUserWorkflow, B2CUserWorkflow, SelfRegistrationUserWorkflow ?)
// "Standard" user workflow:
//  - Account registration
//    - User signs up himself to the service using email/username+password
//      or using principal OAuth providers (Google, Github, Facebook)
//    - User chooses an avatar
//  - Authentication
//    - User logs in using email/username+password or using principal OAuth providers (Google, Github, Facebook)
//    -
// @Configuration
// class DefaultUserWorkflowConfigurer {
//   constructor(
//     private userManagementConfigurer: StandardUserWorkflowConfigurer,
//     private zetapushContext,
//     private properties
//   ) {}

//   configure() {
//     this.configureAccountRegistration(this.userManagementConfigurer.account().registration());
//     this.configureLogin(this.userManagementConfigurer.account().login());
//     this.configurePasswordReset(this.userManagementConfigurer.account().reset());
//   }

//   configureAccountRegistration(registrationConfigurer) {
//     registrationConfigurer
//       .uuid()
//         .generator({ useClass: TimestampBasedUuidGenerator })
//         .and()
//       .initalStatus()
//         .value(AccountStatus.waitingConfirmation)
//         .and()
//       .fields()
//         .scan()
//           .annotations(UsernamePasswordAccountDetails)
//           .and()
//         .and()
//       // .fields()
//       //   .field('username').optional().unique().and()
//       //   .field('email').required().unique().and()
//       //   .field('password').required().and()
//       //   .field('confirm-password').required().equals('password').and()
//       //   .field('avatar').optional().image().and()
//       // .oauth()
//       //   // TODO: for each provider −> keys, permissions, infos to retrieve
//       //   .github()
//       //   .google()
//       //   .facebook()
//       .welcome()
//         .email()
//           .from(`no-reply@${this.properties.get('email.from')}`)
//           .htmlTemplate(/*new MustacheTemplateProvider('templates/email/welcome.html')*/)
//             .inlineCss(/*new CssInliner('styles')*/).and()
//             .inlineImages(/*new Base64ImageInliner('images')*/).and()
//             .and()
//           .textTemplate(/*new MustacheTemplateProvider('templates/email/welcome.txt')*/)
//           .and()
//         .and()
//       .confirmation()
//         .email()
//           .from(`no-reply@${this.properties.get('email.from')}`)
//           // A token is generated by ZetaPush. Token MUST be included in the template
//           // Redirection URL may point to ZetaPush (so it may be dynamic) => Template variables MUST contain ZetaPush context
//           .htmlTemplate(/*new MustacheTemplateProvider('templates/email/confirm.html')*/)
//             .inlineCss(/*new CssInliner('styles')*/).and()
//             .inlineImages(/*new Base64ImageInliner('images')*/).and()
//             .and()
//           .textTemplate(/*new MustacheTemplateProvider('templates/email/confirm.txt')*/)
//           .and()
//         .and()
//       .redirection()
//         .successUrl(`${this.zetapushContext.frontUrl}#account-confirmed`)
//         .failureUrl(`${this.zetapushContext.frontUrl}#error`);
//   }

//   configureLogin(loginConfigurer) {
//     loginConfigurer.fields();
//     // .field(or('username', 'email')).and()
//     // .field('password')
//   }

//   configurePasswordReset(passwordResetConfigurer) {
//     passwordResetConfigurer
//       .reset()
//         .email()
//           // A token is generated by ZetaPush. Token MUST be included in the template
//           // Redirection URL may point to ZetaPush (so it may be dynamic) => Template variables MUST contain ZetaPush context
//           .htmlTemplate(/*new MustacheTemplateProvider('templates/email/reset-password.html')*/)
//             .inlineCss(/*new CssInliner('styles')*/).and()
//             .inlineImages(/*new Base64ImageInliner('images')*/).and()
//             .and()
//           .textTemplate(/*new MustacheTemplateProvider('templates/email/reset-password.txt')*/);
//   }

//   configureUserProfile(profileConfigurer) {
//     // profileConfigurer
//     //   .fields()
//   }
// }

// @Configuration
// class CustomUserManagementConfigurer {
//   constructor(private userManagementConfigurer: UserManagementConfigurer) {}

//   configureAccountRegistration(registrationConfigurer) {
//     registrationConfigurer
//       .fields()
//         //.add()
//         .override()
//           // EITHER chainable version
//           .field('username').required().min(5).max(30)
//           // OR configuration object version
//           .field({username: {required: true, min: 5, max: 30}})
//           // OR configuration based on annotations
//           .fields(new AnnotatedFieldsScanner(SignupInfo))
//       .and()
//       .confirmation()
//         .email()
//           // EITHER simple template directly from code
//           .htmlTemplate(new MustacheTemplateProvider('templates/email/confirm.html'))
//             .inlineCss('styles')
//             .inlineImages('images')
//             .and()
//           .textTemplate(new MustacheTemplateProvider('templates/email/confirm.txt'))
//           // OR template using ZetaPush templating
//           .htmlTemplate(new TemplateEngineCloudServiceProvider(```
//             template content
//           ```))
//             .inlineCss('styles')
//             .inlineImages('images')
//           // OR template using external service templating (mailchimp)
//           .htmlTemplate(new MailChimpTemplateProvider(mailchimpAccount, milchimpTemplateName))
//           // OR directly using a string (template processing could be done elsewhere)
//           .htmlTemplate((user) => `template content ${user.firstname}`)
//   }

//   configurePasswordReset(passwordResetConfigurer) {
//     passwordResetConfigurer
//       .reset()
//         // replace email by sms
//         .sms()
//           .textTemplate(new MustacheTemplateProvider('templates/sms/reset-password.txt'))
//   }
// }

// @Configuration
// class FullyCustomUserManagementConfigurer {
//   constructor(private userManagementConfigurer: UserManagementConfigurer) {}

//   configure() {
//     this.userManagementConfigurer
//       .account()
//         .registration(new MyCustomAccountRegistrationManager('username'))
//           .confirmation(new MyCustomAccountConfirmationManager())
//       .password()
//         .reset(new MyCustomPasswordResetManager())
//   }
// }

// this.userManagementConfigurer.build()
// this.userManagementConfigurer
//   .registration()
//     .account()
//       .fields()
//         .scan(SignupInfo)
//           .annotations()
//             .validation()
//             .and()
//             // .toto()
//           .and()
//         .field('username')
//           .validation()
//             .required()
//             .min(25)
//         .field({
//           username: {
//             required: true,
//             min: 25
//           }
//         })

// this.userManagementConfigurer
// .registration()
//   .account()
//     .fields()
//       .scan(SignupInfo)

//   this.userManagementConfigurer.build()

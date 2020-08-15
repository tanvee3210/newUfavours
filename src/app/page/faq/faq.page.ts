import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  /**
   * The data structure that will be used for supplying the accordion content
   * @public
   * @property technologies
   * @type {Array}
   */
  public technologies: Array<{ name: string, description: string }> = [
    {
      name: "Q - Do I have to give or receive favours with the same person who's either requested my time or given their time to me?",
      description: 'A - No, you are not limited to the giving or receiving of favours with the same person. You can give someone your time and then request from someone completely different.'
    },
    {
      name: 'Q - How can I do someone a favour if no-one has messaged me?',
      description: 'A - A way to do this is to widen your skills on offer. Something as simple as doing a neighbours shopping for half an hour or helping someone local with jobs they might have. Or if you have received time from someone you can ask them if they require any assistance in their day to day activities.'
    },
    {
      name: "Q - How do I know if it's safe to let someone in my home?",
      description: "A - Like any other service you may wish to receive, you must complete your due diligence. You wouldn't hire a tradesman without looking at his website, reviews etc. This due diligence is to be done independent of this app to obtain as much information as you can about someone prior to agreeing to the favour."
    },
    {
      name: 'Q - Where do material costs fit into this?',
      description: 'A - This app is based purely on doing someone a favour, giving no more than your time. Anh materials that may be involved should be agreed by both parties independant of this app. Givers of time should decide their own threshold of the giving of materials. For example; a beauty therapist doing a massage may not consider the amount of oil used. A builder who has agreed to build a wall will want to agree the cost of materials beforehand. Costs and any monetry values are outside of the remit of this app.'
    },
    {
      name: "Q - What if I've given time but it's not been validated and as such it's causing an alert?",
      description: "A - See 'Report a concern'. Any users of the app who do not respond to time validation requests will be monitored and removed from using the app if necessary."
    },
    {
      name: "Q - What if I'm not happy with the favour I've received?",
      description: 'A - You have three options - 1) Decline the time validation request and provide feedback so this can be investigated. 2) Leave a review on the givers profile. 3) Report a concern.'
    },
    {
      name: "Q - What if I don't agree with the amount of time in the validation request?",
      description: 'A - You have three options when responding - accept, propose a new time or decline and feedback.'
    },
    {
      name: "Q - Can't find an answer to your question?",
      description: "A - Ask a question' link"
    }
  ];


  /**
   * Captures and console logs the value emitted from the user depressing the accordion component's <ion-button> element 
   * @public
   * @method captureName
   * @param {any}		event 				The captured event
   * @returns {none}
   */
  public captureName(event: any): void {
    console.log(`Captured name by event value: ${event}`);
  }
}

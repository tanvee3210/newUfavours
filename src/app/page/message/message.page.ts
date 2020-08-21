import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { ApiServiceService } from '../../api-service.service';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { from } from 'rxjs';
declare var google, map, infoWindow;

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  sender_id: any;
  receiver_id: any;
  // token: any;
  message_type: any;
  message: any;
  userExist: any;
  viewMessageList: any;

  constructor(private router: Router,
    public alertCtrl: AlertController,
    private http: Http,
    public api_service: ApiServiceService) {
    let thread = this.api_service.selectedThread;
    if (thread) {
      //THREAD SELECTED 
      console.log('threadid', this.api_service.selectedThread.thread_id);
      console.log('thread', thread);
    } else {
      this.router.navigate(['/', 'tab1']);
    }
  }

  ionViewDidEnter() {
    this.userExist = this.api_service.user.data
    console.log('userExist', this.userExist)
    this.api_service.selectedThread.thread_id
    this.sender_id = this.api_service.user.data.id
    console.log('sender_id', this.sender_id)
    this.getViewMessage()
  }

  ngOnInit() {
    /*this.userExist = this.api_service.user.data
    console.log('userExist', this.userExist)
    this.api_service.selectedThread.thread_id
    this.sender_id = this.api_service.user.data.id
    console.log('sender_id', this.sender_id)
    this.getViewMessage()*/
  }
  onBack() {
    this.router.navigate(['/', 'tab1'])
  }

  async onSend() {
    if (this.message.trim() != '') {
      let token = await this.api_service.user.Token.token;
      token = "Bearer " + token;
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", token);
      // let options:any = {headers:headers} 
      let receiver_id = this.api_service.selectedThread.sender_id;
      if (this.api_service.selectedThread.sender_id == this.api_service.user.data.id) {
        receiver_id = this.api_service.selectedThread.receiver_id;
      }
      let body = {
        sender_id: this.api_service.user.data.id,
        receiver_id: receiver_id,
        message_type: 0,
        message: this.message,
      };

      this.http.post(this.api_service.API_BASE + 'api/send_message', JSON.stringify(body), { headers: headers })
        .map((response) => response.json())
        .subscribe((data) => {
          let newMsg: any = {};
          if (data && data.data) {
         
            newMsg = data.data;
            newMsg.sender_name = this.api_service.user.data.username;
            newMsg.receiver_name = this.api_service.user.data.username;
            this.viewMessageList.push(newMsg);
          }
          this.getMessages(data);
          this.message=""

        },
          (error) => {
            console.log(error);
            //this.getusererror();
          });
    } else {
      //disable send button
    }
  }

  async getMessages(u: any) {
    const alert = await this.alertCtrl.create({
      message: "Message Send Successfully!.",
      buttons: [
        {
          text: "OK"
        }
      ]
    })
    await alert.present();
    this.router.navigate(['/', 'message'])
  }
  // ionViewDidEnter() {
  // view message
  async getViewMessage() {
    let token = this.api_service.user.Token.token;
    let thread = this.api_service.selectedThread;
    console.log('thread', thread)
    // console.log('token', token)
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);

    console.log(headers);
    this.http.get(this.api_service.API_BASE + 'api/view_msg/' + this.api_service.selectedThread.thread_id, { headers: headers })
      .map((response) => response.json())
      .subscribe((res) => {
        console.log(res);
        if (res && res.data && res.data.length > 0) {
          this.viewMessageList = res.data.reverse();
        } else {
          this.viewMessageList = [];
        }
      },
        error => {
          console.log('here error', error);
        });
  }

  isSender(sender_id: any, type: any) {

    if (sender_id != this.api_service.user.data.id) {
      let value: any = 'receiver-row';
      if (type == 'size1') {
        value = 4;
      }
      if (type == 'size2') {
        value = 8;
      }
      return value;
    } else {
      let value: any = 'sender-row';
      if (type == 'size1') {
        value = 8;
      }
      if (type == 'size2') {
        value = 4;
      }
      return value;
    }
  }








}

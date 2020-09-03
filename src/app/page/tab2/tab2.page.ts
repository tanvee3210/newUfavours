import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { ApiServiceService } from '../../api-service.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { from } from 'rxjs';
// declare var google, map, infoWindow;

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  Skilllist: any = [];
  createprofile:boolean = false;
  completeprofile:boolean=false
  qualificationList: any = [];
  fname: any;
  lname: any;
  name: any;
  skill: any;
  location: any;
  id: any;
  job: any;
  city: any;
  pincode: any;
  qualification: any;
  getcreateProfile: any;
  imgToUpload: any ="";
  _isMobileDevice = true;
  userdetailes: any
  data: any = {}
  otherFavourList: any = [];
  other_favour: any;
  bio: any;
  jobList: any = [];
  getJobList: any = [];
  avgRating: any = 0;
  tempImage:any;
  uploadFlag:boolean=false

  constructor(private router: Router,
    public alertCtrl: AlertController,
    private http: Http,
    private camera: Camera,
    private _ngZone: NgZone,
    public api_service: ApiServiceService) { }

  ionViewDidEnter() {
    this.imgToUpload="";
    this.fname="";
    this.lname="";
    this.skill="";
    this.job="";
    this.bio="";
    this.city="";
    this.pincode="";
    this.qualification="";
    this.other_favour="";
    this.getSkilllist();
    this.getUserDetails();
    this.getQualification()
    this.getotherfavours();
    this.api_service.getCurrentLocation();
    // this.userdetailes = this.api_service.user;
    // console.log('user', this.api_service.user);
    /*if (this.api_service.user.hasOwnProperty('Token')) {
      //RELOGIN HERE
      localStorage.clear();
      this.router.navigate(['/', 'login'])
    } else {
      this.getUserDetails();
    }*/
    // if (this.api_service.user && this.api_service.user.data && this.api_service.user.data.first_name && this.api_service.user.data.last_name) {
    //   this.createprofile = false
    //   this.getSkilllist();
    //   this.getQualification();
    //   this.getotherfavours();
    // } else {
    //   this.createprofile = true
    //   this.getSkilllist();
    //   this.getQualification()
    //   this.getotherfavours();
    // }
    // debugger
   
    //HERE UPDATE FOR SHOW
    // if (this.api_service.user && this.api_service.user.data && this.api_service.user.data.other_favour) {
    //   this.other_favour = this.api_service.user.data.other_favour;
    // }
    // if (this.api_service.user && this.api_service.user.data && this.api_service.user.data.qualification) {
    //   this.qualification = this.api_service.user.data.qualification;
    // }
    // if (this.api_service.user && this.api_service.user.data && this.api_service.user.data.name) {
    //   this.name = this.api_service.user.data.name;
    // }
    // if (this.api_service.user && this.api_service.user.data && this.api_service.user.data.job) {
    //   this.job = this.api_service.user.data.job;
    // }
    if (this.api_service.user && this.api_service.user.data && this.api_service.user.data.location) {
      this.location = this.api_service.user.data.location;
    }
    // if (this.api_service.user && this.api_service.user.data && this.api_service.user.data.picture) {
    //   this.imgToUpload = this.api_service.user.data.picture;
    // }

  }
  ngOnInit() {

  }
  
  async getUserDetails() {
      this.createprofile=false;
      this.completeprofile=false;
      // this.api_service.showLoader();
      let token = this.api_service.user.Token.token;
      token = "Bearer " + token;
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", token.toString());

      console.log(headers);
      this.http.get(this.api_service.API_BASE + 'api/details', { headers: headers })
        .map((response) => response.json())
        .subscribe((res) => {
          console.log(res);
          
          if(res.data && !res.data.first_name && !res.data.last_name){
            this.createprofile=true
          }
          else{
            this.completeprofile =true;
            this.api_service.user.data = res.data
            if (res && res.data && res.data.averageRating) {
               this.avgRating = res.data.averageRating;
            }
            if (res && res.data && res.data.name) {
               this.name = res.data.name;
            }
            if (res && res.data && res.data.job) {
               this.job = res.data.job;
            }
            if (res && res.data && res.data.qualification) {
            this.qualification = res.data.qualification;
            }
            if (res && res.data && res.data.other_favour) {
              this.other_favour = res.data.other_favour;
            }
            this.imgToUpload=""
            if (res && res.data && res.data.picture) {
              this.imgToUpload = this.api_service.API_BASE + res.data.picture;
            }
         
            // this.api_service.hideLoader();
          }
          // if (res && res.data && res.data.averageRating) {
          //   this.avgRating = res.data.averageRating;
           
          // }
          // if(res && res.data && res.data.picture){
          // this.imgToUpload = this.api_service.API_BASE+ res.data.picture;
          // }
          // if (res && res.data && res.data.id) {
          //   this.api_service.user.data = res.data;
          //   console.log('user', this.api_service.user);
          //   this.api_service.updateUser();
          // }
        },
          error => {
            console.log('here error', error);
          });
  }


  setUserDetails(userDetails) {
    this.getJobSkill(userDetails.skill);
    this.fname = userDetails.first_name
    this.lname = userDetails.last_name
    this.bio = userDetails.bio
    this.skill = userDetails.skill
    this.job = userDetails.job
    this.city = userDetails.city
    this.pincode = userDetails.pincode
    this.qualification = userDetails.qualification
    if(userDetails.picture){
      this.tempImage =  userDetails.picture
      this.imgToUpload = this.api_service.API_BASE + userDetails.picture
    }
    if(userDetails.other_favour){
      this.other_favour = userDetails.other_favour.split(",")
    }
 
  }
  onEdit() {
    this.setUserDetails(this.api_service.user.data);
    this.completeprofile=false;
    this.createprofile=true;
  }

  onSearch() {
    this.router.navigate(['/', 'search'])
  }

  async openCameraOption() {
    let alert = await this.alertCtrl.create({
      header: " Select Image",
      inputs: [
        {
          value: "1",
          type: "radio",
          label: "Gallery"
        },

        {
          value: "2",
          type: "radio",
          label: "Take Photo...."
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Ok",
          handler: data => {
            if (data) {
              this.chooseImage(data);
            } else {
              // invalid login
              return false;
            }
          }
        }
      ]
    })
    await alert.present();
  }


  isMobileDevice() {
    return this._isMobileDevice;
  }

  chooseImage(type) {
    var self = this;
    if (self.isMobileDevice()) {
      var options = self.GetPictureOption(parseInt(type));
      self.camera.getPicture(options).then(
        function (imageData) {
          self.imgToUpload = imageData;
          self.uploadFlag=true;
          self.imgToUpload = "data:image/png;base64," + self.imgToUpload;
          // self.imgs.push("data:image/png;base64," + self.imgToUpload);
          // self.uploadImage(self.imgToUpload)
          // self.profile_image = "data:image/png;base64," + self.imgToUpload;

          self._ngZone.run(() => {
            self.imgToUpload = imageData;
            // self.updateimg = self.imgToUpload;
            self.imgToUpload = "data:image/png;base64," + self.imgToUpload;
            // self.imgs.push("data:image/png;base64," + self.imgToUpload);
            // self.uploadImage(self.imgToUpload)
            // self.profile_image = self.sanitizer.bypassSecurityTrustResourceUrl(
            // "data:image/png;base64," + self.imgToUpload
            // );
          });
        },
        function (err) {
          self.uploadFlag=true;
          self.imgToUpload = self.getHardCodeCameraImage();
          self.imgToUpload = "data:image/png;base64," + self.imgToUpload;
          console.log(err);
        }
      );
    } else {
      self.imgToUpload = self.getHardCodeCameraImage();
      // self.imgToUpload = "data:image/png;base64," + self.imgToUpload;
    }

    // self.imgToUpload = this.getHardCodeCameraImage();
    // self.imgToUpload = 'data:image/png;base64,' + self.imgToUpload
    // self.imgs = "data:image/png;base64," + self.imgToUpload;
    // self.uploadImage(self.imgToUpload)
  }

  getHardCodeCameraImage() {
  // return "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";
  return  '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'
    //"https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"
  }

  GetPictureOption(type) {
    var sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    if (type == 2) sourceType = this.camera.PictureSourceType.CAMERA;

    var options = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      allowEdit: true,
      encodingType: this.camera.EncodingType.PNG,
      targetWidth: 800,
      targetHeight: 800,
      //popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    return options;
  }

  validation(text) {
    if (text == "validation") {
      this.router.navigate(['/', 'timevalidation'])
    } else {
      this.router.navigate(['/', 'message'])
    }
  }

  onDone() {
    this.router.navigate(['/', 'profile'])
  }


  // skilllist
  async getSkilllist() {
    let token = this.api_service.user.Token.token;
    // console.log('token', token)
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);

    console.log(headers);
    this.http.get(this.api_service.API_BASE + 'api/skill_list', { headers: headers })
      .map((response) => response.json())
      .subscribe((res) => {
        console.log(res);
        this.Skilllist = res.data;

      },
        error => {
          console.log('here error', error);
        });
  }


  // jobtitle
  getJobSkill(value) {

    if (!value) {
      return
    }

    let skillId = this.Skilllist.find(s => s.skill_name == value)
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + this.api_service.user.Token.token);

    console.log(headers);
    this.http.get(this.api_service.API_BASE + 'api/job/skill/' + skillId.id, { headers: headers })
      .map((response) => response.json())
      .subscribe((res) => {
        console.log(res);
        this.jobList = res.data;
      },
        error => {
          console.log('here error', error);
        });

  }

  // qualificationlist
  async getQualification() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + this.api_service.user.Token.token);

    console.log(headers);
    this.http.get(this.api_service.API_BASE + 'api/qualification', { headers: headers })
      .map((response) => response.json())
      .subscribe((res) => {
        console.log(res);
        this.qualificationList = res.data;
      },
        error => {
          console.log('here error', error);
        });
  }

  async getotherfavours() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + this.api_service.user.Token.token);

    console.log(headers);
    this.http.get(this.api_service.API_BASE + 'api/other_favours ', { headers: headers })
      .map((response) => response.json())
      .subscribe((res) => {
        console.log(res);
        this.otherFavourList = res;
      },
        error => {
          console.log('here error', error);
        });
  }

  // updateprofile
  async onUpdate() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + this.api_service.user.Token.token);
    let options: any = { headers: headers };

    if (this.fname && this.lname && this.bio && this.skill && this.job && this.city && this.pincode && this.qualification && this.other_favour) {
      let userObj:any = {
        first_name: this.fname,
        last_name: this.lname,
        bio: this.bio,
        skill: this.skill,
        job: this.job,
        city: this.city,
        pincode: this.pincode,
        qualification: this.qualification,
      
        other_favour: this.other_favour.toString()
      }

      if(this.uploadFlag){
        userObj.picture =  this.imgToUpload
      }
     

      this.http.post(this.api_service.API_BASE + 'api/update_profile', userObj, options)
        .map((response) => response.json())
        .subscribe(async (data) => {
          if(data){

          }
          await this.getUserDetails();
          this.getUserData(data);
        },
          (error) => {
            console.log(error);
            //this.getusererror();
          })
    }
    else {
      const alert = await this.alertCtrl.create({
        message: "All fields are mandatory",
        buttons: [
          {
            text: "OK"
          }
        ]
      })
      await alert.present();
    }

  }

  async getUserData(u: any) {
    this.api_service.user.data = u.data;
    console.log("here check", u.data);
    await this.api_service.updateUser();
    const alert = await this.alertCtrl.create({
      message: "Profile is Updated Successfully!.",
      buttons: [
        {
          text: "OK"
        }
      ]
    })
    await alert.present();
    this.createprofile = false;
    this.completeprofile=true;

  }

 

  async onLogout() {
    // localStorage.clear()
    // this.router.navigate(['/', 'login'])
    const alert = await this.alertCtrl.create({
      message: "Do you really want to logout ?",
      buttons: [
        {
          text: "YES",
          handler: data => {

            this.router.navigate(['/', 'login'])
            localStorage.clear();
            // this.api_service.toaster('logout successfully')
          }
        },
        {
          text: "NO"
        }
      ]
    });
    await alert.present();
  }
}
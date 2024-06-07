import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { User } from '../../../model/User.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent implements OnInit,AfterViewInit{
  roomID:string|null;
  @ViewChild('root')
  root!: ElementRef;
  user:User;

  constructor(
    private route :ActivatedRoute
  ){}
 
  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.route.params.subscribe(
      (params)=>{
        console.log(params);
        this.roomID = params['roomId']
        
      }
    )
  }
  ngAfterViewInit(): void {
    const appID = 15800812;
    const serverSecret = "28ecb8092d4e19f7ab7c8a842e2b56f8";
    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID, 
      serverSecret, 
      this.roomID,  
      Date.now().toString(),
      Date.now().toString(),
    );
    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
      // Start a call.
      zp.joinRoom({
        container: this.root.nativeElement,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
            window.location.protocol + '//' + 
            window.location.host + window.location.pathname +
              '?roomID=' +
              this.roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      });
  }

}

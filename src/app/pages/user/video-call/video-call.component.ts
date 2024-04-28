import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrl: './video-call.component.scss'
})
export class VideoCallComponent implements OnInit {
  roomId: string = ''; 

  constructor(
    private router:Router,
    private toster:ToastrService
  ){}


  ngOnInit(): void {

  }
  createMeeting(){
    console.log(this.roomId,"RoomId");
    if(this.roomId!= ''){
      const roomUrl = `/room/${this.roomId}`;
      window.open(roomUrl, '_blank');
    }else{
      this.toster.error("Give a room name")
    }
     
    
  }
}

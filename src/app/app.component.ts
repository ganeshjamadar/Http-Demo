import { Component, OnInit } from '@angular/core';
import { ServerService } from './server.service';
import { ServerModel } from './ServerModel.modle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  appName = this.serverService.getAppName(); 

  servers: ServerModel[] = [
    new ServerModel('Testserver', 10, this.generateId()),
    new ServerModel('Liveserver',100, this.generateId())
  ];

  constructor(private serverService: ServerService)
  {}

  ngOnInit()
  {
    //this.onGetServers()
  }

  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }
  onSave(){
    this.serverService.storeServers(this.servers)
    .subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  onUpdate(){
    this.serverService.updateServers(this.servers)
    .subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  onGetServers(){
    this.serverService.getServers()
    .subscribe(
      (response: ServerModel[]) => {
        this.servers = response;
        console.log(response);
      },
      (error) => console.log(error)
    );
  }

  private generateId() {
    return Math.round(Math.random() * 10000);
  }
}

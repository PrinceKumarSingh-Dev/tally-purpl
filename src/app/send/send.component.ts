import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-send',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './send.component.html'
})
export class SendComponent {

  text = '';
  response = '';

  constructor(private http: HttpClient) {}

  send() {
    this.http.post(
      'http://localhost:9000',
      this.text,
      { responseType: 'text' }
    ).subscribe(res => {
      this.response = res;
    });
  }
}

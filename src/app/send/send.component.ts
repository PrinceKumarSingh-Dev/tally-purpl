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
  tallyUrl = 'http://127.0.0.1:9000';
  backendUrl = 'http://localhost:9092/setup/subsidiary/send-to-tally?id=4';
  devbackendUrl = 'http://3.7.121.16:9092/setup/subsidiary/send-to-tally?id=4';

  constructor(private http: HttpClient) { }

  // STEP 1: Fetch XML from Spring Boot
  fetchXmlFromBackend() {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiU1VQRVJBRE1JTiIsIlN5c3RlbSBJZCI6ImIzY2Q5MmEzMmUwMDQ3Iiwic3Vic2lkaWFyaWVzIjpbNF0sInN1YiI6Ijk1N211bHRpdmVyc2Urc3VwZXJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NjcwMDQwMzQsImV4cCI6MTc2NzE3NjgzNH0.unBYtxBxROM2i9hWhacr57dJzRLSAFlKqGD7GYZDSrI';

    this.http.get(
      'http://localhost:9092/setup/subsidiary/send-to-tally?id=4',
      {
        responseType: 'text',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-APP-BU': '0'
        }
      }
    ).subscribe(xml => {
      this.text = xml;
      alert('XML fetched from backend');
    });
  }


  // STEP 2: Send XML to Tally (fire-and-forget)
  sendToTally() {
    fetch(this.tallyUrl, {
      method: 'POST',
      body: this.text,
      mode: 'no-cors'
    });

    alert('XML sent to Tally');
  }

  // Optional: status check
  checkStatus() {
    fetch(this.tallyUrl, {
      method: 'GET',
      mode: 'no-cors'
    });

    alert('Tally status request sent');
  }
}

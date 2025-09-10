import { Injectable, signal, computed } from '@angular/core';
import { FboData, Rank } from '../models/fbo-data.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
 
export const ALL_RANKS: Rank[] = [
  { level: 1, name: 'Forever Preferred Customer', requirements: '0 CCs' },
  { level: 2, name: 'Assistant Supervisor', requirements: '2 CCs' },
  { level: 3, name: 'Supervisor', requirements: '25 CCs' },
  { level: 4, name: 'Assistant Manager', requirements: '75 CCs' },
  { level: 5, name: 'Manager', requirements: '120 CCs' }
];
 
// Mock data to simulate a backend
const MOCK_FBO_DATA: FboData[] = [
{ id:'7637632',
  name: 'John Doe',
  memberLevel: 'Supervisor',
  totalCC: 50,
  thisMonthCC: 1.2,
  lastMonthCC: 1,
  downlineCount: 2,
  downline: [
      { name: 'Michael Chen', level: 'Level 3 - Supervisor'
      },
      { name: 'Emily Rodriguez', level: 'Level 3 - Supervisor',
      }
    ],
 
  thisMonthOrderCC: 1,
  lastMonthOrderCC: 1
}
];
 
@Injectable({
  providedIn: 'root'
})
export class FboService {
  private readonly fboId = signal<string | null>(sessionStorage.getItem('fboId'));
  fbo:any = null;
 
  readonly allRanks = ALL_RANKS;
 
 
   private apiUrl = 'http://localhost:8080/api/member'; // Your local API endpoint
  constructor(private http: HttpClient) {}
 
  // getMemberById(id: string): Observable<FboData> {
  //   console.log("id",id)
  //   return this.http.get<FboData>(`${this.apiUrl}/${id}`);
  // }
 
  // getMemberById(id: string): Observable<FboData> {
  //   return of(MOCK_FBO_DATA[0]);
  // }
 
 
getMemberById(id: string): Observable<FboData> {
  return this.http.get<FboData>(`${this.apiUrl+"/information"}/${id}`);
}
  sendMessage(distributorId: String, message: string): Observable<any> {
  const payload = { memberId: distributorId, message: message };
  console.log('Payload to send:', payload);
 
  return this.http.post<any>('http://localhost:8080/api/chat/user-request', payload, {
    headers: { 'Content-Type': 'application/json' }
  });
}
  login(fboId: string): void {
    console.log("fboId",fboId);
    this.getMemberById(fboId).subscribe({
  next: (res) => {
    if (res) {
      this.fbo=res;
      sessionStorage.setItem('fboId', res.id);
      this.fboId.set(res.id);
    } else {
      console.log(`FBO with ID "${fboId}" not found. Using default user.`);
      const defaultFbo = MOCK_FBO_DATA[0];
      sessionStorage.setItem('fboId', defaultFbo.id);
      this.fboId.set(defaultFbo.id);
    }
  },
  error: (err) => {
    console.error('Error fetching FBO:', err);
    const defaultFbo = MOCK_FBO_DATA[0];
    sessionStorage.setItem('fboId', defaultFbo.id);
    this.fboId.set(defaultFbo.id);
  }
});
  }
 
   readonly currentFbo = computed<FboData | null>(() => {
    const id = this.fboId();
    if (!id) return null;
    return this.fbo;
  });
 
 
 
 
  logout(): void {
    sessionStorage.removeItem('fboId');
    this.fboId.set(null);
  }
}
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Achievement {
  title: string;
  description: string;
  createdAt: string; // Pastikan ini sesuai dengan format tanggal yang dikirim oleh backend
}

@Component({
  selector: 'app-achivement',
  templateUrl: './achivement.component.html',
  styleUrls: ['./achivement.component.css']
})
export class AchivementComponent {
  achievementTitle: string = '';
  achievementDescription: string = '';
  achievements: Achievement[] = [];

  constructor(private http: HttpClient) {
    this.fetchAchievements();
  }

  shareAchievement(): void {
    if (this.achievementTitle.trim() && this.achievementDescription.trim()) {
      const newAchievement: Achievement = {
        title: this.achievementTitle,
        description: this.achievementDescription,
        createdAt: new Date().toISOString() // Menambahkan createdAt secara manual
      };

      // Send the achievement to backend
      this.http.post<Achievement>('http://localhost:5000/api/achievements/add', newAchievement)
        .subscribe(
          (response) => {
            // Add the new achievement to the top of the list
            this.achievements.unshift(response); // Add to top of list
            this.achievementTitle = '';
            this.achievementDescription = '';
          },
          (error) => {
            console.error('Error adding achievement:', error);
          }
        );
    }
  }

  // Fetch existing achievements
  fetchAchievements() {
    this.http.get<Achievement[]>('http://localhost:5000/api/achievements')
      .subscribe(
        (achievements) => {
          this.achievements = achievements;
        },
        (error) => {
          console.error('Error fetching achievements:', error);
        }
      );
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service'; // Import service
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService, // Inject customer service
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize login form
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Handle login submission
  onSubmit(): void {
    if (this.loginForm.invalid) {
      alert('Please fill in all required fields correctly.');
      console.error('Validation error: Form is invalid.');
      return;
    }

    this.loading = true;
    this.customerService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.loading = false;
        const token = response.token; // Get token from response
        if (token) {
          sessionStorage.setItem('token', token); // Save token to sessionStorage
          sessionStorage.setItem('name', response.customerName); // Save token to sessionStorage
          console.log('Token saved successfully:', token);
          alert('Login successful!');
          this.router.navigate(['/Dashboard']); // Navigate to Dashboard
        } else {
          this.errorMessage = 'Login response is missing a token.';
          console.error(this.errorMessage);
        }
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error.message || 'Login failed.';
        alert(this.errorMessage); // Show alert for error
        console.error('Login error:', error); // Log error details
      },
    });
  }
}

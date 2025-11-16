package com.example.LMS.Dto.Response;

public class LoginResponse {

    private String jwtToken;
    private String username;
    private String role;

    public LoginResponse(String jwtToken, String username, String role) {
        this.jwtToken = jwtToken;
        this.username = username;
        this.role = role;
    }

    public String getJwtToken() { return jwtToken; }
    public String getUsername() { return username; }
    public String getRole() { return role; }
}

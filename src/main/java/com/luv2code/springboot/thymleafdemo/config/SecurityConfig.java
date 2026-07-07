package com.luv2code.springboot.thymleafdemo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {

        UserDetails admin = User.builder()
                .username("admin")
                .password(passwordEncoder().encode("admin123"))
                .roles("ADMIN")
                .build();

        UserDetails user = User.builder()
                .username("user")
                .password(passwordEncoder().encode("user123"))
                .roles("USER")
                .build();

        return new InMemoryUserDetailsManager(admin, user);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.authorizeHttpRequests(auth -> auth

                // Swagger
                .requestMatchers(
                        "/swagger-ui/**",
                        "/v3/api-docs/**")
                .permitAll()

                // GET APIs
                .requestMatchers(org.springframework.http.HttpMethod.GET,
                        "/v1/employee/**")
                .hasAnyRole("USER", "ADMIN")

                // POST APIs
                .requestMatchers(org.springframework.http.HttpMethod.POST,
                        "/v1/employee/**")
                .hasRole("ADMIN")

                // DELETE APIs
                .requestMatchers(org.springframework.http.HttpMethod.DELETE,
                        "/v1/employee/**")
                .hasRole("ADMIN")

                // GET APIs MVC
                .requestMatchers(org.springframework.http.HttpMethod.GET,
                        "/employees/getList/**")
                .hasAnyRole("USER", "ADMIN")

                // POST APIs MVC
                .requestMatchers(org.springframework.http.HttpMethod.POST,
                        "/employees/save/**")
                .hasRole("ADMIN")

                // Update APIs MVC
                .requestMatchers(org.springframework.http.HttpMethod.GET,
                        "/employees/showFormToUpdate/**")
                .hasRole("ADMIN")

                // Show form APIs MVC
                .requestMatchers(org.springframework.http.HttpMethod.GET,
                        "/employees/showFormForAdd/**")
                .hasRole("ADMIN")

                // DELETE APIs MVC
                .requestMatchers(org.springframework.http.HttpMethod.GET,
                        "/employees/delete/**")
                .hasRole("ADMIN")

                .anyRequest()
                .authenticated()
        );

        http.httpBasic(Customizer.withDefaults());

        http.csrf(csrf -> csrf.disable());

        return http.build();
    }
}
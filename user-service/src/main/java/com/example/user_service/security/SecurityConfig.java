package com.example.user_service.security;

import com.example.user_service.filter.JWTFilter;
import com.example.user_service.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.ArrayList;
import java.util.List;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    @Autowired
    private JWTFilter jwtFilter;
    @Autowired
    private UserRepository userRepository; // Injecter UserRepository

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            com.example.user_service.entities.User user = userRepository.findByEmail(username);
            if (user == null) {
                throw new UsernameNotFoundException("User not found with username: " + username);
            }

            // Créez un seul rôle à partir du champ 'role'
            GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + user.getRole());

            // Retournez un UserDetails avec un seul rôle
            return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), List.of(authority));
        };
    }



    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .requestMatchers("/api/users/login", "/auth/register").permitAll() // Routes accessibles sans authentification
                .requestMatchers("/api/users/**").hasRole("ADMIN")  // Exemple de route protégée par le rôle 'USER'
                .anyRequest().authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);


        return http.build(); // Construction et retour de la configuration de sécurité
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager(); // Gestionnaire d'authentification
    }
    @PostConstruct
    public void init() {
        // Exemple d'initialisation personnalisée
        // Vous pouvez effectuer ici une action spécifique sur le JWTFilter, ou autre logique
        System.out.println("SecurityConfig has been initialized and JWTFilter is ready!");
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Utilisation de BCrypt pour le hachage des mots de passe
    }
}

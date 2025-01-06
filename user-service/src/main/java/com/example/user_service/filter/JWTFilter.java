package com.example.user_service.filter;

import com.example.user_service.util.JWTUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.hibernate.validator.internal.util.stereotypes.Lazy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class JWTFilter extends OncePerRequestFilter {
    @Lazy
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JWTUtil jwtUtil;


    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String jwt = getJwtFromRequest(request);

        if (jwt != null && validateToken(jwt)) {
            String username = getUsernameFromToken(jwt);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            // Extraire le rôle du JWT et l'ajouter au contexte de sécurité
            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority("ROLE_" + getRoleFromToken(jwt))); // Ajout du rôle

            // Créez un Authentication
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    userDetails, null, authorities);

            // Placez-le dans le contexte de sécurité
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

    private boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey("votre_clé_secrète") // Remplacer par votre clé secrète
                    .parseClaimsJws(token); // Tente de parser le token
            return true; // Si tout se passe bien, le token est valide
        } catch (Exception e) {
            // Gérer l'exception (par exemple, token expiré ou mal signé)
            return false;
        }
    }
    private String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey("votre_clé_secrète") // Remplacer par votre clé secrète utilisée pour signer le JWT
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject(); // Retourne le nom d'utilisateur (souvent email)
    }private String getRoleFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey("votre_clé_secrète") // Remplacer par votre clé secrète utilisée pour signer le JWT
                .parseClaimsJws(token)
                .getBody();
        return claims.get("role", String.class); // Assurez-vous que le rôle est stocké sous le nom "role"
    }
    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7); // Retirer le "Bearer " du début du token
        }
        return null;
    }


}

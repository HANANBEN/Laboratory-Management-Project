///*
//package com.example.user_service.test;
//
//import com.example.user_service.entities.User;
//import com.example.user_service.repositories.UserRepository;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//@DataJpaTest // Utilise une base de données en mémoire pour les tests
//public class UserRepositoryTest {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Test
//    public void testFindByEmail() {
//        // 1. Préparer les données de test
//        User user = new User();
//        user.setEmail("test@example.com");
//        user.setPassword("password123");
//        user.setNomComplet("Test User");
//        user.setNumTel("0123456789");
//        user.setRole("USER");
//        userRepository.save(user);
//
//        // 2. Appeler la méthode à tester
//        User foundUser = userRepository.findByEmail("test@example.com");
//
//        // 3. Vérifier les résultats
//        assertThat(foundUser).isNotNull();
//        assertThat(foundUser.getEmail()).isEqualTo("test@example.com");
//        assertThat(foundUser.getNomComplet()).isEqualTo("Test User");
//    }
//}*/

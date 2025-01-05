package com.example.user_service.service;

import com.example.user_service.entities.User;
import com.example.user_service.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentHashMap;

@Component
public class ResetCodeService {
    @Autowired
    private UserRepository userRepository;

    private final ConcurrentHashMap<String, String> resetCodes = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, Long> expirationTimes = new ConcurrentHashMap<>();

    // Conversion manuelle : 10 minutes en millisecondes
    private static final long EXPIRATION_DURATION = 10 * 60 * 1000; // 10 minutes

    /**
     * Enregistre un code de réinitialisation pour un email donné et fixe une expiration.
     *
     * @param email L'email associé au code de réinitialisation
     * @param code  Le code de réinitialisation
     */
    public void saveResetCode(String email, String code) {
        resetCodes.put(email, code);
        expirationTimes.put(email, System.currentTimeMillis() + EXPIRATION_DURATION);
    }

    /**
     * Vérifie si le code de réinitialisation est valide (correct et non expiré).
     *
     * @param email L'email associé au code
     * @param code  Le code soumis par l'utilisateur
     * @return true si le code est valide, sinon false
     */
    public boolean isResetCodeValid(String email, String code) {
        if (!resetCodes.containsKey(email)) {
            return false; // Pas de code associé à cet email
        }

        String storedCode = resetCodes.get(email);
        Long expirationTime = expirationTimes.get(email);

        // Vérifiez que le code correspond et qu'il n'est pas expiré
        return storedCode.equals(code) && expirationTime > System.currentTimeMillis();
    }

    /**
     * Invalide un code de réinitialisation pour un email donné.
     *
     * @param email L'email dont le code doit être invalidé
     */
    public void invalidateCode(String email) {
        resetCodes.remove(email);
        expirationTimes.remove(email);
    }

    public boolean updatePassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return false;  // L'utilisateur n'existe pas
        }

        user.setPassword(newPassword);
        userRepository.save(user);
        return true;  // Mot de passe mis à jour avec succès
    }
}

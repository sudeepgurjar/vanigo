package com.vanigo.backend.repository;

import com.vanigo.backend.entity.Conversation;
import com.vanigo.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, UUID> {
    List<Conversation> findByUserOrderByStartedAtDesc(User user);
    List<Conversation> findByUserAndActiveTrueOrderByStartedAtDesc(User user);
}
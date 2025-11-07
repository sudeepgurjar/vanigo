package com.vanigo.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConversationResponse {
    private UUID id;
    private String title;
    private String summary;
    private Boolean active;
    private LocalDateTime startedAt;
    private LocalDateTime endedAt;
    private Integer messageCount;
    private List<MessageResponse> messages;
}
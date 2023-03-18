package com.soomgo.in42.domain.comment.service;

import com.soomgo.in42.domain.comment.Comment;
import com.soomgo.in42.domain.comment.repository.CommentRepository;
import com.soomgo.in42.domain.qustion.Question;
import com.soomgo.in42.domain.qustion.repository.QuestionRepository;
import com.soomgo.in42.domain.qustion.service.QuestionService;
import com.soomgo.in42.global.type.StatusType;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@AllArgsConstructor
public class CommentService {

    private final QuestionRepository questionRepository;
    private final CommentRepository commentRepository;

    @Transactional
    public Integer createCommentToQuestion(String content, Integer questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow(() -> new RuntimeException("질문을 찾을 수 없습니다!"));
        if (question.getStatus() != StatusType.MATCHED) {
            throw new RuntimeException("매칭중,종료 혹은 취소된 질문입니다!");
        }
        Comment comment = Comment.builder()
                .content(content)
                .question(question).build();
        question.setStatus(StatusType.COMPLETED);
        return commentRepository.save(comment).getId();
    }
}
